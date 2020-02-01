module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: false,
        ecmaFeatures: {
            globalReturn: false,
        },
        plugins: [
            'estree',
            'jsx',
            'asyncGenerators',
            'classProperties',
            'doExpressions',
            'exportExtensions',
            'functionBind',
            'functionSent',
            'objectRestSpread',
            'dynamicImport',
            'nullishCoalescingOperator',
            'optionalChaining',
            'exportDefaultFrom'
        ],
        babelOptions: {
            configFile: "babel.config.js",
        },
    },
};