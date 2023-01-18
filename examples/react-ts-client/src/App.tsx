import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Component from "./Component";

import { connect, hasFeature } from "@flagsio/js-sdk/browser";

function App() {

    useEffect(() => {
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
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Component/>
            </header>
        </div>
    );
}

export default App;
