module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'node': true,
        'jquery': true
    },
    'extends': [
        'eslint:recommended'
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12
    },
    'globals': {
        'game': true,
        'ui': true,
        'keyboard': true,
        'SoundNode': true,
        'Howl': true,
        'Howler': true,
        'Macro': true,
        'Hooks': true,
        'Application': true,
        'Dialog': true,
        'FilePicker': true,
        'Handlebars': true,
        'getTemplate': true
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
