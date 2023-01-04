export interface FlagsioOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    
    /*!
     * Enable debug console logs.
     */
    debug?: boolean;

    /*!
     * Optional logger override function.
     */
    logger?: (...data: object[]) => void;


    /*!
     * Optional connection status callback function.
     */
    onConnectionStatusChanged?: (status: string) => void;
    
    /*!
     * Optional feature updated callback function.
     */
    onFeatureUpdated?: (featureId: string) => void;
}
