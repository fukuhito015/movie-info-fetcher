# Movie Information Fetcher

## 開発背景

ChatGPT API を使ってみたかった

## 機能概要

このシステムは、テキストボックスに入力した内容に基づいて、映画情報を取得するアプリケーションです。以下の機能を提供します。

1. **映画情報の取得**:

   - ユーザーがテキストボックスに映画名を入力すると、その映画の詳細情報（タイトル、監督、公開年、あらすじなど）を取得します。
   - 映画情報は gpt-3.5-turbo-1106（ChatGPT API） を使用して取得します。

2. **サムネイルの表示**:
   - 入力された映画名に対応するポスター画像（サムネイル）を取得し、表示します。
   - 映画情報は DALL-E3（ChatGPT API） を使用して取得します。

## 使用技術

- **TypeScript**: システム全体のプログラミング言語。
- **NextJS**: フロントエンド・バックエンドのフレームワーク。
- **ChatGPI API**: 映画情報とサムネイル画像の取得に使用。

## インストール方法

1. リポジトリをクローンします。

   ```sh
   git clone git@github.com:fukuhito015/movie-info-fetcher.git
   cd movie-info-fetcher
   ```

2. 依存関係をインストールします。

   ```sh
   npm i
   ```

3. 環境変数を設定します。

   ```
   cp .env.sample.env .env
   ```

   ```env
    OPENAI_API_KEY=your_openai_api_key
   ```

4. 起動します。
   ```sh
   npm run dev
   ```

## 環境変数

`OPENAI_API_KEY`: OpenAI の API キー
