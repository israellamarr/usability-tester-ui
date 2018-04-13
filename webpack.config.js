const fs = require( 'fs' );
const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function development () {
  return {
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/only-dev-server',
      './src/'
    ],
    output: {
      path: __dirname,
      filename: 'app.js'
    },
    module: {
      rules: [
        {
          test: [ /\.jsx/, /\.js$/ ],
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'fast-sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          loader: 'svg-react-loader'
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.(jpe?g$|gif|png|eot|woff|ttf|svg})/,
          use: 'url-loader'
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('develop')
        }
      }),
      new HtmlWebpackPlugin({
        template: 'static/index.html'
      })
    ],
    resolve: {
      extensions: [ '.js', '.jsx' ],
      alias: {
        static: path.join( __dirname, 'static' ),
        app: path.join( __dirname, 'src' ),
        lib: path.join( __dirname, 'lib' )
      }
    },
    devServer: {
      host: '0.0.0.0',
      port: 8000,
      inline: true,
      historyApiFallback: true,
      hot: true
    }
  };
}

function production () {
  return {
    entry: [
      'babel-polyfill',
      './src/'
    ],
    output: {
      path: `${__dirname}/dist/`,
      filename: 'app.[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: [ /\.jsx/, /\.js$/ ],
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.css?$/,
          use: ExtractTextPlugin.extract( [
            {
              loader: 'css-loader',
              options: {
                url: true
              }
            }
          ] )
        },
        {
          test: /\.scss?$/,
          use: ExtractTextPlugin.extract([ 'css-loader', 'fast-sass-loader' ])
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.(jpe?g$|gif|png|eot|woff|ttf|svg)/,
          use: 'url-loader'
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin("[name].[chunkhash].css"),
      new HtmlWebpackPlugin({
        template: 'static/index.html',
        id: 'app-root',
      }),
    ],
    resolve: {
      extensions: [ '.js', '.jsx' ],
      alias: {
        static: path.join( __dirname, 'static' ),
        app: path.join( __dirname, 'src' ),
        lib: path.join( __dirname, 'lib' )
      }
    },
  }
}

module.exports = function ( env ) {
  if ( process.env.NODE_ENV === 'development') {
    return development( env );
  } else {
    return production();
  }
};
