import {useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Component from "./Component";

import FlagsioSdk from "flagsio-js-sdk/browser";

function App() {

    useEffect(() => {

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

            console.log(`True: ${trueCount} False: ${falseCount}`);
        }, 1000);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
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
