'use strict';

import FlagsioSdk from "flagsio-js-sdk";

try {
    const ENV_ID = 'ENTER YOUR ENVIRONMENT ID';
    const API_KEY = 'ENTER YOUR API KEY';

    // prod
    FlagsioSdk.connect(ENV_ID, API_KEY);

    // local dev
    // FlagsioSdk.connect(ENV_ID, API_KEY, {
    //     host: "127.0.0.1",
    //     port: 8080,
    //     secure: false,
    //     debug: false,
    // });

    let trueCount = 0;
    let falseCount = 0;

    setInterval(() => {
        const enabled = FlagsioSdk.hasFeature("simple-flag", false);

        if (enabled) {
            trueCount++;
        } else {
            falseCount++;
        }

        console.log(`True: ${trueCount} False: ${falseCount}`)
    }, 1000);

} catch (e) {

    console.log(e)
}
