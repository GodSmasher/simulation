module.exports = {
    jest: {
      configure: (jestConfig) => {
        jestConfig.transformIgnorePatterns = [
          "/node_modules/(?!(?:(?:@testing-library)/))"
        ];
        return jestConfig;
      }
    }
  };
  