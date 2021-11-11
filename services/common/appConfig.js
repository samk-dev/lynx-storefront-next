const fs = require('fs');
const path = require('path');
const merge = require('deepmerge');
const prettier = require('prettier');

function ecommerceDriverConfig(defaultConfig = {}) {
    const driver = defaultConfig?.shopDriver.name;

    const driverNextconfig = require(path.join('../', driver, 'next.config'));
    const config = merge(defaultConfig, driverNextconfig);

    const tsPath = path.join(process.cwd(), 'tsconfig.json');
    const tsConfig = require(tsPath);

    tsConfig.compilerOptions.paths['@shop'] = [`services/${driver}`];
    tsConfig.compilerOptions.paths['@shop/*'] = [`services/${driver}/*`];

    fs.writeFileSync(
        tsPath,
        prettier.format(JSON.stringify(tsConfig), { parser: 'json' })
    );

    return config;
}

module.exports = { ecommerceDriverConfig };
