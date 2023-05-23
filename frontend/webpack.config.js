const path = require('path');
const DotenvPlugin = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { title, version } = require('./package.json');

const production = process.argv.includes('production');

module.exports = {
  entry: path.join(__dirname, './src/index.jsx'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? 'assets/js/[name].[contenthash].js' : 'assets/js/[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],

    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    },
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !production,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !production,
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e?)g|gif)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DotenvPlugin({ systemvars: true }),
    new MiniCssExtractPlugin({
      filename: production ? 'assets/css/[name].[contenthash].css' : 'assets/css/[name].css',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/img'),
          to: path.resolve(__dirname, 'dist/assets/img'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title,
      version,
      // eslint-disable-next-line max-len
      // data: isProduction ? '<%- data %>' : `{"_id":"6061a6649dfa370101e5231f","advertiserIdName":["134365 - TestAdvertiserUsers"],"plaVariationsToUpload":[{"name":"base - B","selected":false},{"name":"base - FSQ","selected":false},{"name":"base - SQ","selected":true}],"issueType":"Playable","plaVariationsThatWentLive":[],"excludeDevices":null,"advertiserEmail":"eugene.makarenko@ironsrc.com","fileChecksum":null,"orientation":null,"titleAppName":"Game Dev Tycoon","updated":"2021-03-26T14:05:52.000Z","advertiserName":"TestAdvertiserUsers","isLiveTitle":false,"squad":{"value":"Lightning","id":"21148"},"advertiserTier":"3","isQaFail":false,"priority":"Major","externalCreativeType":{"value":"Playable + End card","id":"20701"},"orientations":[{"value":"Portrait","id":"20725"}],"creativeURL":null,"vendorOther":null,"vendor":null,"protocol":null,"creativePOC":null,"creativeVersion":null,"internalApprovers":[{"email":"volodymyr.maksymchuk@ironsrc.com","status":"pending"},{"email":"plwx@ironsrc.com","status":"approved"}],"androidTitleFreeText":null,"androidTitleBundleId":"Game Dev Tycoon - com.greenheartgames.gdt","iosTitleFreeText":null,"iosTitleBundleId":"Game Dev Tycoon - com.greenheartgames.gdtmobile","advertiserNameFreeText":null,"fileSize":null,"isApprovalSkipped":false,"isQaAllowedInParallel":false,"isQaPass":false,"status":"internalApprovalCont","advertiserId":"134365","isFreeOrientation":true,"defaultOrientation":"portrait","linksToCreatives":[],"variationsThatWentLive":[],"variationsToUpload":[{"name":"base - B","selected":false},{"name":"base - FSQ","selected":true},{"name":"base - SQ","selected":true}],"title":"yuyuuyuy","language":"20841","contentIssues":null,"technicalIssues":null,"uxIssues":null,"internalReviewCommentId":null,"rawStatus":{"name":"internal approval cont.","id":"14519"},"demos":[{"url":"https://pwcreatives.s3.amazonaws.com/democreatives-staging/TestAdvertiserUsers-134365/Game%20Dev%20Tycoon/iec/SPLWX-15729-tapper-base-B/src/index.html","description":"regular version","id":"Version A"},{"url":"https://pwcreatives.s3.amazonaws.com/democreatives-staging/TestAdvertiserUsers-134365/Game%20Dev%20Tycoon/iec/SPLWX-15729-tapper-base-SQ/src/index.html","description":"superQuick version","id":"Version B"},{"url":"https://pwcreatives.s3.amazonaws.com/democreatives-staging/TestAdvertiserUsers-134365/Game%20Dev%20Tycoon/iec/SPLWX-15729-tapper-base-FSQ/src/index.html","description":"fullScreenQuick version","id":"Version C"}],"isRotatable":false,"variationsLabels":{"defaultCreativeLabels":["mech_scratch","mech_drag and drop"],"variation1":{"name":"base - B","labels":["mech_xray"]},"variation2":{"name":"base - FSQ","labels":[]},"variation3":{"name":"base - SQ","labels":[]}},"issueKey":"SPLWX-15729","project":"SPLWX","type":"iec","csmEmail":"michael.kopelovich@ironsrc.com","accountManagerEmail":"eugene.makarenko@ironsrc.com","operationsEmail":"Emmanuel.Bergman@ironsrc.com","__v":0,"state":"internalIEC","approversMessage":"","approver":"dm9sb2R5bXlyLm1ha3N5bWNodWtAaXJvbnNyYy5jb20=","iecLabels":["mech_scratch","mech_drag and drop","mech_xray","mech_swipe","mech_tap","mech_tap&hold","desi_no title","desi_with button in main frame","desi_animated BG","desi_animated Character","desi_animated extra elements","desi_juicy button","desi_intro","desi_fake level endframe","main_weapons","main_character - male","main_character - female","main_character - animal","main_cars","main_skins","main_gold and money","main_real money","them_seasonal","them_sports","them_action","them_puzzle","them_rpg","them_racing","them_asmr","them_runner","int_1","int_2","int_3","int_4","int_5","int_6","int_7","int_8","int_9","int_10","conc_gameplay","conc_misleading gameplay","conc_unauthentic gameplay","conc_cinematic","conc_skins","conc_multi choice","conc_multi level","conc_long(8s+)","conc_long(15s+)","conc_long(20s+)","conc_always fail","conc_always win","conc_short(7or less)","conc_hitOrMiss","conc_poster","hin_static pointer","hin_animated pointer","hin_arrow","hin_text only","hin_fingerprint","hin_glowing button","hin_pedal","hin_lever","hin_customised","sys_ab test","sys_localised","sys_refresh","sys_fix","sys_endtimer(20)","them_lucky","them_idle","them_dating","them_finance","them_word","them_renovation","them_cards","them_casino","them_kids","them_io","them_arcade","them_simulation","them_shooter"]}`,
      // publicPath: '/',
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
    }),
  ],
  devServer: {
    static: path.resolve(__dirname + '/dist'),
    port: 3000,
    host: '0.0.0.0',
    hot: false,
  },
  watchOptions: {
    aggregateTimeout: 500, // delay before reloading
    poll: 1000, // enable polling since fsevents are not supported in docker
  },
};
