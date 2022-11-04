const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const getCommonConfig = (outputFileName) => ({

    entry: './src/index.ts',
    mode: "development",
    devtool: "source-map",
    output: {
        filename: outputFileName,
        path: path.resolve(__dirname, "dist"),
        library: {
            type: "commonjs2",
        },
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                exclude: ["/node_modules/"],
                use: {
                    loader: 'ts-loader',
                }
            }

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."]
    }
});

const browserConfig = {
    ...getCommonConfig("browser.js"),
    target: "web",
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/

        new NodePolyfillPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                build: true,
                mode: 'write-dts',
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/package.json", to: "../dist/package.json" }
            ]
        }),
        new ESLintPlugin({
            extensions: ['.tsx', '.ts', '.js'],
            exclude: 'node_modules'
        })

    ]
};

const nodeConfig = {
    ...getCommonConfig("index.js"),
    target: "node",
    externals: [nodeExternals()],
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/

        new ForkTsCheckerWebpackPlugin({
            typescript: {
                build: true,
                mode: 'write-dts',
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/package.json", to: "../dist/package.json" },
                { from: "./dist/index.d.ts", to: "../dist/browser.d.ts" }
            ]
        }),
        new ESLintPlugin({
            extensions: ['.tsx', '.ts', '.js'],
            exclude: 'node_modules'
        })

    ]
};

module.exports = [nodeConfig, browserConfig];
module.exports.parallelism = 2;
