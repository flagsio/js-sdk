const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const getCommonConfig = (outputFileName) => ({

    entry: './src/index.ts',
    mode: "development",
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
        new ESLintPlugin({
            extensions: ['.tsx', '.ts', '.js'],
            exclude: 'node_modules'
        }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        { source: "package.json", destination: "dist/package.json" },
                    ],
                },
            },
        }),

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
                mode: 'write-dts'                
            },
        }),
        new ESLintPlugin({
            extensions: ['.tsx', '.ts', '.js'],
            exclude: 'node_modules'
        }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {source: "package.json", destination: "dist/package.json"},
                        {source: "dist/index.d.ts", destination: 'dist/browser.d.ts'},
                        {source: "README.md", destination: 'dist/README.md'},
                    ],
                },
            },
        }),
    ]
};

module.exports = [browserConfig, nodeConfig];
