
module.exports = {
    configureWebpack: {
        resolve: {
          alias: {
            components: '@/components',
            common:'@/common',
            "network":"@/network",
            assets:'@/assets',
            views:'@/views'
          }
        }
      }
}
