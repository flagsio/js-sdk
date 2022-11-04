"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const FlagsioSdk = require("@flagsio/flagsio-sdk");
const flagsio_sdk_1 = require("@flagsio/flagsio-sdk");
try {
    // prod
    // FlagsioSdk.connect("d026341c-7370-48d5-bbf6-f110209c576c", "HkFssojiNvbHmKa-B77agOBIfKWVREf-");
    // local dev
    flagsio_sdk_1.default.connect("e6cdfaa9-c732-4182-8911-54e5e8678178", "PPnFDrwvJ7_OzSPCD3GOInKLoCJaEoSG", {
        host: "127.0.0.1",
        port: 8080,
        secure: false,
        debug: false,
    });
    let trueCount = 0;
    let falseCount = 0;
    setInterval(() => {
        const enabled = flagsio_sdk_1.default.hasFeature("simple-flag", false);
        if (enabled) {
            trueCount++;
        }
        else {
            falseCount++;
        }
        console.log(`True: ${trueCount} False: ${falseCount}`);
    }, 1000);
}
catch (e) {
    console.log(e);
}
//# sourceMappingURL=app.js.map