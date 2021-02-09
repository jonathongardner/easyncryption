process.env.VUE_APP_VERSION = process.env.npm_package_version
module.exports = {
  // options...
  publicPath: process.env.VUE_APP_BASE_URL || '/',
}
