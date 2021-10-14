# vcManager

VCにランダムで人を振り分けたり、元に戻すBOT

## かんたんなつかいかた

`npm i` で必要なモジュールをインストール

(※dotenvは入っていませんので、環境変数の設定はご自身でどうぞ)

下記に記載されている環境変数を設定してから

`npm run prepare`を実行する

その後で
`npm run main` でBOTを起動できます

## 環境変数

`BOT_TOKEN`: BOTのトークン
`GUILD_ID`: コマンドを登録するギルド。指定がなければグローバルとして登録します

## npmスクリプト
`prepare`: buildとregisterをします

`build`: typescriptのビルドをします

`register`: コマンドを登録します。これをしないとコマンドが出てこないので注意

`main`: BOTを起動します