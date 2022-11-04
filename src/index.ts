import * as emitter from "emitter-io";
import { EmitterEvents } from "emitter-io";

import { FeatureConfiguration, FlagsioOptions, Target } from "./models";
import { calculateProbability, evaluateCondition } from "./utilities";

const featureConfigurations: FeatureConfiguration[] = [];

let printDebugLogs = false;
let connecting = false;
let connected = false;

function connect(
    environmentId: string,
    apiKey: string,
    options: FlagsioOptions = {
        host: "io.flagsio.com",
        port: 443,
        secure: true,
        debug: false,
    },
) {
    if (connecting || connected) {

        debugLog(`Client already ${connecting ? "connecting" : "connected"}`);
        return;
    }
    connecting = true;

    printDebugLogs = options.debug;

    const client = emitter.connect({
        host: options.host,
        port: options.port,
        secure: options.secure,
    }, () => {

        debugLog("Client connected");
        connecting = false;
        connected = true;
    });

    client.on(EmitterEvents.disconnect, function (msg) {

        debugLog("Client disconnected");
        connected = false;
    });

    client.on(EmitterEvents.message, function (msg) {

        const configuration = msg.asObject() as FeatureConfiguration;

        if (!isFeatureConfiguration(configuration)) {
            return;
        }

        cacheConfiguration(configuration);

        debugLog("Feature configurations updated:", JSON.stringify(featureConfigurations, null, 4));
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
}

function hasFeature(
    featureId: string,
    defaultValue: boolean,
    userAttributes: {[key: string]: string} | undefined = undefined,
): boolean {

    const configuration = featureConfigurations.find(d => d.Key === featureId);

    debugLog(`Evaluating configuration for feature '${featureId}' :`, configuration);

    if (!configuration) {

        debugLog(`Returning default value for feature '${featureId}' :`, defaultValue);
        return defaultValue;
    }

    if (configuration.TargetId === Target.All) {

        debugLog(`Returning enabled for feature '${featureId}' :`, configuration.Enabled);
        return configuration.Enabled;
    }

    if (configuration.TargetId === Target.Percentage) {

        const percentage = configuration.Percentages.find(p => p.Value)?.Percentage ?? 0;

        const result = calculateProbability(percentage);

        debugLog(`Returning percentage probability for feature '${featureId}' :`, result);
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

                        debugLog(`Returning rule value for feature '${featureId}' :`, rule);
                        return rule.Value;
                    }
                }
            }
        }

        const defaultRuleValue = configuration.TargetingRules.find(r => r.IsDefault)?.Value ?? defaultValue;

        debugLog(`Returning default rule value for feature '${featureId}' :`, defaultRuleValue);
        return defaultRuleValue;
    }

    return false;
}

function debugLog(...data: any[]) {

    if (printDebugLogs) {
        console.log(...data);
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
