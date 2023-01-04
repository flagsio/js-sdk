import * as emitter from "emitter-io";
import { EmitterEvents } from "emitter-io";

import { FeatureConfiguration, FlagsioOptions, Target } from "./models";
import { calculateProbability, delay, evaluateCondition } from "./utilities";

const featureConfigurations: FeatureConfiguration[] = [];

let printDebugLogs = false;
let featureUpdatedCallback: ((featureId: string) => void) | undefined;
let connectionStatusChangedCallback: ((status: string) => void) | undefined;

enum ConnectionStatus {
    pending,
    connecting,
    disconnected,
    ready
}

let connectionStatus: ConnectionStatus = ConnectionStatus.pending;

let logger: (...data: any[]) => void;

const defaultOptions: FlagsioOptions = {
    host: "io.flagsio.com",
    port: 443,
    secure: true,
    debug: false,
    logger: consoleLog,
};

export interface ISdkClient {

    /*!
     * Helper function that will return when a connection is ready
     */
    waitForConnection: () => Promise<void>;
}

/*!
 * Creates and connects a FlagsioSdk client.
 *
 * A connection attempt will be made immediately upon calling this function.
 * To determine when it is ready to use, await [[ISdkClient.waitForConnection]], 
 * or add an optional event listener for the `"ready"` event using [[FlagsioOptions.on]].
 *
 *     // usage:
 *     import { connect } from 'flagsio-js-sdk';
 *     const client = connect(envId, apiKey, options);
 *
 * @param environmentId
 *   The environment Id.
 * @param apiKey
 *   The environment api key.
 * @param options
 *   Optional client configuration.
 * @return
 *   The new client instance.
 */
function connect(
    environmentId: string,
    apiKey: string,
    options?: Partial<FlagsioOptions>): ISdkClient {

    options = {
        ...options,
        host: options?.host ?? defaultOptions.host,
        port: options?.port ?? defaultOptions.port,
        secure: options?.secure !== undefined ? options.secure : defaultOptions.secure,
        debug: options?.debug !== undefined ? options.debug : defaultOptions.debug,
        logger: options?.logger ?? defaultOptions.logger,
    };

    logger = options?.logger ?? consoleLog;
    featureUpdatedCallback = options?.onFeatureUpdated ?? undefined;
    connectionStatusChangedCallback = options?.onConnectionStatusChanged ?? undefined;

    if (connectionStatus === ConnectionStatus.connecting || connectionStatus === ConnectionStatus.ready) {

        logger?.(`Client already ${connectionStatus === ConnectionStatus.connecting ? "connecting" : "connected"}`);

        return {
            waitForConnection: waitForConnection,
        };
    }
    setConnectionStatus(ConnectionStatus.connecting);

    printDebugLogs = options.debug ?? false;

    const client = emitter.connect({
        host: options.host,
        port: options.port,
        secure: options.secure,
    }, () => {

        logger?.("Client connected");
        setConnectionStatus(ConnectionStatus.ready);
    });

    client.on(EmitterEvents.disconnect, function (msg) {

        logger?.("Client disconnected", msg);
        setConnectionStatus(ConnectionStatus.disconnected);
    });

    client.on(EmitterEvents.message, function (msg) {

        const configuration = msg.asObject() as FeatureConfiguration;

        if (!isFeatureConfiguration(configuration)) {
            return;
        }

        cacheConfiguration(configuration);

        logger?.("Feature configurations updated:", JSON.stringify(featureConfigurations, null, 4));
    });

    client.subscribe({
        key: apiKey,
        channel: `FeatureFlags/${environmentId}/`,
    });

    client.link({
        key: apiKey,
        channel: `FeatureFlags/${environmentId}/`,
        private: true,
        name: "0",
        subscribe: true,
    });

    return {
        waitForConnection: waitForConnection,
    };
}

function isFeatureConfiguration(obj: any): obj is FeatureConfiguration {
    return "Key" in obj;
}

function cacheConfiguration(featureConfiguration: FeatureConfiguration) {

    const index = featureConfigurations.findIndex(d => d.Key === featureConfiguration.Key);

    if (index > -1) {
        // remove if deleted
        if (featureConfiguration.Deleted) {
            featureConfigurations.splice(index, 1);

            featureUpdatedCallback?.(featureConfiguration.Key);
            return;
        }

        // replace configuration if its already in the cache, and it's older than the one received
        const existingConfiguration = featureConfigurations[index];

        if (existingConfiguration.Timestamp < featureConfiguration.Timestamp) {
            featureConfigurations[index] = featureConfiguration;
        }
    } else {
        featureConfigurations.push(featureConfiguration);
    }

    featureUpdatedCallback?.(featureConfiguration.Key);
}

/*!
 * Evaluates if a feature is enabled based on its configuration.
 *
 * Note that this function will reuse the same connection created in your app's entry point.
 * There is no need to pass around a reference to it or the client.
 * 
 *     // usage:
 *     import { hasFeature } from 'flagsio-js-sdk';
 *     const isEnabled = hasFeature("example-feature", false);
 * 
 * @param featureId
 *   The feature Id.
 * @param defaultValue
 *   A fall-back value in case the SDK loses connection or can't find a configuration for the given feature id.
 * @param userAttributes
 *   Optional user attributes.
 * @return
 *   The state of the feature.
 */
function hasFeature(
    featureId: string,
    defaultValue: boolean,
    userAttributes: {[key: string]: string} | undefined = undefined,
): boolean {

    const configuration = featureConfigurations.find(d => d.Key === featureId);

    logger?.(`Evaluating configuration for feature '${featureId}' :`, configuration);

    if (!configuration) {

        logger?.(`Returning default value for feature '${featureId}' :`, defaultValue);
        return defaultValue;
    }

    if (configuration.TargetId === Target.All) {

        logger?.(`Returning enabled for feature '${featureId}' :`, configuration.Enabled);
        return configuration.Enabled;
    }

    if (configuration.TargetId === Target.Percentage) {

        const percentage = configuration.Percentages.find(p => p.Value)?.Percentage ?? 0;

        const result = calculateProbability(percentage);

        logger?.(`Returning percentage probability for feature '${featureId}' :`, result);
        return result;
    }

    // if not attributes are passed fall back to the default value
    if (configuration.TargetId === Target.Rule &&
        userAttributes !== undefined &&
        Object.keys(userAttributes).length > 0) {

        const rules = configuration.TargetingRules.filter(r => !r.IsDefault);

        for (const rule of rules) {
            for (const condition of rule.Conditions) {

                const attributeValue = userAttributes[condition.Attribute];

                if (attributeValue) {

                    if (evaluateCondition(condition, attributeValue) != undefined) {

                        logger?.(`Returning rule value for feature '${featureId}' :`, rule);
                        return rule.Value;
                    }
                }
            }
        }

        const defaultRuleValue = configuration.TargetingRules.find(r => r.IsDefault)?.Value ?? defaultValue;

        logger?.(`Returning default rule value for feature '${featureId}' :`, defaultRuleValue);
        return defaultRuleValue;
    }

    return false;
}

function consoleLog(...data: any[]) {

    if (printDebugLogs) {
        console.log(...data);
    }
}

function setConnectionStatus(status: ConnectionStatus) {
    connectionStatus = status;
    connectionStatusChangedCallback?.(ConnectionStatus[status]);
}

async function waitForConnection() {
    const timeout = 60_000;
    const ms = 50;
    let count = 0;

    while (connectionStatus === ConnectionStatus.pending
    || connectionStatus === ConnectionStatus.connecting) {

        await delay(ms);
        count += ms;

        if (count > timeout) {

            logger?.(`Connection timed out after ${count}ms' :`);
            break;
        }
    }
}

export {
    connect,
    hasFeature,
};

export default {
    connect,
    hasFeature,
};
