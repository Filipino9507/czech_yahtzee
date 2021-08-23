const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.tsx",
    target: "web",
    mode: "development",
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        port: 8080,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        alias: {
            "@app": path.resolve(__dirname, "src/app/"),
            "@util": path.resolve(__dirname, "src/util/"),
            "@models": path.resolve(__dirname, "src/models/"),
            "@features": path.resolve(__dirname, "src/features"),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
            },
            {
                enforce: "pre",
                exclude: "/node_modules/",
                test: [/\.js?$/, /\.ts?$/, /\.jsx?$/, /\.tsx?$/],
                loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                loader: "css-loader",
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "./src/yourfile.css",
        }),
    ],
};
