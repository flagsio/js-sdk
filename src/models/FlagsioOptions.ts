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
    on?: (status: string) => void;
}
