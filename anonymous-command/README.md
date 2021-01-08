# Anonymous Command Lanbda Function For Slack
以下のレポジトリを元に作成
https://github.com/verzac/typescript-aws-sam

# Prerequisites
- install aws-sam-cli
- install aws-cli (userの設定も)
- install node
- install ngrock

# Usage
- ngrokでlocalhost:3000にslackのリクエストをフォワードする
```
ngrock http 3000
```

- localでlamdaの起動
```
cd hello-world
npm install
npm run start-api
```

# Running Tests
```
cd src
npm install
npm run test
```

# Deploy
```
cp ./src/package.json .
sam build
sam deploy
```