import React, {useEffect, useState} from "react";

import FlagsioSdk from "@flagsio/js-sdk/browser";
const { hasFeature } = FlagsioSdk;

function App() {

    const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);

    useEffect(() => {

        let trueCount = 0;
        let falseCount = 0;

        setInterval(() => {
            const v = hasFeature("simple-flag", false);

            if (v) {
                trueCount++;

            } else {
                falseCount++;
            }

            if (isFeatureEnabled !== v) {
                setIsFeatureEnabled(v);
            }

            console.log(`Component - True: ${trueCount} False: ${falseCount}`);
        }, 1000);
    }, []);

    return (
        <div>
            This is another component using a flag
            {isFeatureEnabled &&
                <div>
                    This is driven by the flag
                </div>}
        </div>
    );
}

export default App;
