module.exports = {
    // Specify the test environment
    testEnvironment: 'jsdom',
    // Specify transformations
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    // Specify which files to ignore when transforming
    transformIgnorePatterns: [
        '/node_modules/'
    ],
    // Map non-JS modules such as CSS to a stub file
    moduleNameMapper: {
        '\\.(css|scss|sass)$': 'identity-obj-proxy',
    },
    // Add additional settings if necessary
};
