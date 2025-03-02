// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Füge eine Regel hinzu, die source-map-loader in node_modules ignoriert
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.use) {
          rule.use = rule.use.map(u => {
            if (u.loader && u.loader.includes('source-map-loader')) {
              return {
                ...u,
                options: {
                  ...u.options,
                  filterSourceMappingUrl: (url, resourcePath) => {
                    // Ignoriere Source Maps aus node_modules
                    return resourcePath.includes('node_modules');
                  },
                },
              };
            }
            return u;
          });
        }
        return rule;
      });
      return webpackConfig;
    },
  },
};

  