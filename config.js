/**
 * Global App configuration
 *
 * @desc Merges services config files into next.config.js
 *   && adds path alieses to each service for easier access
 *
 * @param {next.config.js}
 *
 */
const fs = require('fs');
const path = require('path');
const merge = require('deepmerge');
const prettier = require('prettier');

const currentDIR = process.cwd();

function driversConfig(defaultConfig = {}) {
  const ecommerceDriver = defaultConfig?.drivers?.shop;
  const ecommerceAlias = `services/shop/api/${ecommerceDriver}`;

  if (!ecommerceDriver) {
    throw new Error(
      "Shop driver name is missing, please provide a valid driver name in your next.config.js > drivers > shop. Ex: 'woocommerce'"
    );
  }

  const ecommerceConfig = require(path.join(
    `${currentDIR}/services/shop/api/`,
    ecommerceDriver,
    'next.config'
  ));

  const nextConfig = merge(defaultConfig, ecommerceConfig);

  const tsPath = path.join(currentDIR, 'tsconfig.json');
  const tsConfig = require(tsPath);

  tsConfig.compilerOptions.paths['@shopApi'] = [ecommerceAlias];
  tsConfig.compilerOptions.paths['@shopApi/*'] = [`${ecommerceAlias}/*`];

  fs.writeFileSync(
    tsPath,
    prettier.format(JSON.stringify(tsConfig), { parser: 'json' })
  );

  return nextConfig;
}

module.exports = { driversConfig };
