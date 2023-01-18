/*!
 * ClientOptions is an options object with optional configurations for the SDK client.
 */
export interface ClientOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    
    /*!
     * Set to `true` to output the SDK client logs. Default: `false`.
     */
    debug?: boolean;

    /*!
     * Custom logger function. This will be called only if `debug` is set to `true`. Default: `undefined`.
     */
    logger?: (...data: object[]) => void;


    /*!
     * Connection status callback function. Default: `undefined`.
     */
    onConnectionStatusChanged?: (status: string) => void;
    
    /*!
     * Feature updated callback function. This will be called when a feature configuration is updated. Default: `undefined`.
     */
    onFeatureUpdated?: (featureKey: string) => void;
}
