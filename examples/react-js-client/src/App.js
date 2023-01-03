import {useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Component from "./Component";

import { connect, hasFeature } from "flagsio-js-sdk/browser";

function App() {

    useEffect(() => {

        const ENV_ID = 'ENTER YOUR ENVIRONMENT ID';
        const API_KEY = 'ENTER YOUR API KEY';

        // prod
        let client = connect(ENV_ID, API_KEY,
            {
                // debug: true,
                // logger:(...data:object[])=>{
                //      console.log("Client: ",data)
                // },
                // on: (status: string) => {
                //     console.log("Status:", status);
                // },
            });

        // local dev
        // let client = connect(ENV_ID, API_KEY, {
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
