const path = require("path");
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      todolist:'./src/main/ts/Todolist/TodoView.ts', 
    },
    output: {
      path: __dirname,
      filename: './src/main/resources/static/js/[name].js' //まとめた結果出力されるファイル名
    },
    resolve: {
      extensions: ['.ts', '.js'] //拡張子がtsだったらTypescirptでコンパイルする
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader' //ts-loader使うよ
        }
      ]
    }
  }