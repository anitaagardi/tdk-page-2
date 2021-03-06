const { defaults } = require('jest-config');
module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'js'],
    "setupFilesAfterEnv": [
        "./jest.setup.js"
    ],
}