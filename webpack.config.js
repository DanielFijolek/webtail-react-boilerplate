import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = (env) => {
  const isDevelopment = env.WEBPACK_SERVE;
  return {
    entry: './src/Index.tsx',

    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    performance: {
      maxAssetSize: 500000,
      maxEntrypointSize: 500000,
    },

    mode: isDevelopment ? 'development' : 'production',

    devtool: isDevelopment ? 'inline-source-map' : 'source-map',

    output: {
      path: path.resolve(__dirname, './build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },

    devServer: isDevelopment
      ? {
          open: true,
          static: {
            directory: path.resolve(__dirname, './build'),
          },
          historyApiFallback: true,
          hot: true,
        }
      : undefined,

    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: /node_modules/,
          use: ['file-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
    ],

    resolve: {
      extensions: ['*', '.tsx', '.ts', '.jsx', '.js'],
    },
  };
};

export default config;
