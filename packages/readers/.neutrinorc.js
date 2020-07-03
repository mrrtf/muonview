const airbnbBase = require('@neutrinojs/airbnb-base');
const node = require('@neutrinojs/node');
const jest = require('@neutrinojs/jest');

module.exports = {
    options: {
        root: __dirname
    },
    use: [
        airbnbBase({
            eslint: {
                baseConfig: {
                    extends: ["plugin:jest/recommended"],
                    plugins: ["import", "jest"],
                    env: {
                        "jest/globals": true,
                    },
                    rules: {
                        'max-len': 'off'
                    }
                }
            }
        }
        ),
        node(),
        jest(),
    ],
};
