const config = function (api) {
  api.cache(true);

  const presets = [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3.22,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ];

  return {
    presets,
  };
};

export default config;
