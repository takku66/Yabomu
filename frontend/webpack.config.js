const path = require("path");
module.exports = {
  // devtool: 'inline-source-map',
  devtool: 'inline-source-map',
  cache: true,
  mode: 'development',
  entry: {
      //todolist:'../src/main/ts/Todolist/TodoView.ts', 
      bundle:'./src/index.js', 
    },
    output: {
      path: __dirname,
      filename: '../src/main/resources/static/js/[name].js' //まとめた結果出力されるファイル名
    },
    resolve: {
      extensions: ['.ts', '.js'] //拡張子がtsだったらTypescirptでコンパイルする
    },
    module: {
      rules: [
        // {
        //   test: /\.ts$/,
        //   loader: 'ts-loader' //ts-loader使うよ
        // },
        {
          test: path.join(__dirname, '.'),
          exclude: /(node_modules)/,
          use: [{
              loader: 'babel-loader',
              options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"]
              }
          }]
        },
        // {
        //    test: /\\.css/, use: "css-loader" 
        // }
      ]
    }
  }