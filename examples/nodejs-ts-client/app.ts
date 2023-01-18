
import { connect, hasFeature } from "@flagsio/js-sdk";

try {
    // prod    
    let client = connect("ENVIRONMENT_ID", "ENVIRONMENT_KEY",
        {
            // debug: true,
            // logger:(...data:object[])=>{
            //      console.log("Client: ",data)
            // },

            // onConnectionStatusChanged: (status: string) => {
            //     console.log("Status:", status);
            // },

            // onFeatureUpdated: (featureKey: string) => {
            //
            //     const enabled = hasFeature(featureKey, false);
            //     console.log("Feature updated:", featureKey, enabled);
            // },
        });

    // local dev
    // let client = connect("ENVIRONMENT_ID", "ENVIRONMENT_KEY", {
    //     host: "127.0.0.1",
    //     port: 8080,
    //     secure: false,
    //     debug: true,
    // });

    // optional callback
    // client.waitForConnection()
    //     .then(() => {
    //         console.log("'waitForConnection' callback");
    //     });


    let trueCount = 0;
    let falseCount = 0;

    setInterval(() => {
        const enabled = hasFeature("simple-flag", false);

        if (enabled) {
            trueCount++;
        } else {
            falseCount++;
        }

        console.log(`True: ${trueCount} False: ${falseCount}`);
    }, 1000);

} catch (e) {

    console.log(e);
}
