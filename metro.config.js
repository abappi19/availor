const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// required for execuTorch
config.resolver.assetExts.push('pte');
config.resolver.assetExts.push('bin');

module.exports = withNativewind(config);
