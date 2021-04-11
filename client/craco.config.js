const CracoLessPlugin = require('craco-less');
const cracoPluginSvgSprite = require("craco-plugin-svg-sprite");
const base64Loader = require('craco-base64-inline-loader')
module.exports = {
    plugins: [
        {
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
            lessOptions: {
                modifyVars: { '@primary-color': '#608341' },
                javascriptEnabled: true,
            },
            },
        },
        },
        { 
            plugin: base64Loader,
            options: {
                test: /\.(ttf|eot|otf|svg|woff(2)?)$/i ,
            }
        }
    ]
};