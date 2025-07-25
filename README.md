
# 旅程表作成アプリの概要

|旅のしおり一覧| 旅程表画面 |
|-------|-------|
| ![旅のしおり一覧](/public/thumbnail/shiori01.jpg) | ![旅程表画面](/public/thumbnail/itinerary_thumbnail_02.jpg) |

「英語が話せない人でも安心して行ける海外旅行へ」をコンセプトに制作している、「旅程表アプリ」となっています。

帰国後には「旅の記録」として残して見返したりできるように、旅行中に撮影した写真などを投稿できるようになっています。

また、一緒に「旅行に行く同行者にも旅程表を共有」したり、「SNSで共有」をすることが可能な機能も備えています。

Next.jsを利用したフルスタックアプリとして開発している旅程表アプリとなります。

このリポジトリには以下の2つのアプリが含まれています。

- 旅程表アプリ
- Next.jsのISRブログ

ブログは旅程表アプリのマーケティングとして利用をする為、管理者のみが投稿できる仕様になっています。


デプロイ先

旅程表アプリURL: https://www.my-travel-memory.com/

ブログURL: https://www.my-travel-memory.com/blog


## 主な機能・特徴

「旅程表アプリの主な機能」

- ユーザー認証機能
- 旅のしおりのCRUD
  - 旅程表のCRUD 
  - 旅のメモのCRUD
- 作成した旅程表の共有機能
- 旅程に画像の投稿
- 旅程の日付別に旅程を自動で表示（日付は1度のみ表示）
- 旅程の時間別に並び変え
- 旅程を時間で並び替え
- フォームバリデーション 
- 各種アニメーション

主な機能としては「旅のしおり」が作成でき、各しおりには「旅程」と「メモ」の作成ができるようになっています。

私自身が英会話ができないですが、何度も海外旅行をしてきました。

その経験を元に、「私自身が使用する為」でもあり、「英語が話せない人でも海外旅行へ行きたい人」の為に制作しています。

そのため、「旅のしおりとしてのメモ」だけでなく、「各旅程に2種類のメモ」をする箇所があったりと、事前に準備さえすれば英語が話せなくても旅行できるようにしています。

## 使用技術

```
「使用技術」

- Next.js 14
- Next.js Server Actions
- node.js
- Tailwind CSS（スタイル）
- NextAuth(認証)
- Supabase (画像のストレージ)
- PostgreSQL(Supabase)(DB)
- prisma(ORM)
```

```
「その他一部パッケージ」

- zod
- react-hook-form
- html-react-parser
- dompurify
- cheerio
- framer-motion
```

## アプリのサムネイル画像


|旅のしおり一覧| 旅程表の共有設定 |
|-------|-------|
| ![旅のしおり一覧](/public/thumbnail/shiori01.jpg) | ![旅程表の共有設定](/public/thumbnail/share.jpg) |

|旅程表画面 | メモ表示画面 |
|-------|-------|
| ![旅程表画面](/public/thumbnail/itinerary_thumbnail_02.jpg) | ![メモ表示画面](/public/thumbnail/memo.jpg) |

|初回はマニュアル表示 | 日時で並び替え |
|-------|-------|
| ![初回はマニュアル表示](/public/thumbnail/manual.jpg) | ![日時で並び替え](/public/thumbnail/auto-date01.jpg) |

|スマホサイズの旅程表/メモ | スマホサイズのフォーム |
|-------|-------|
| ![スマホサイズの旅程表/メモ](/public/thumbnail/sumaho.jpg) | ![スマホサイズのフォーム](/public/thumbnail/sumaho-form.jpg) |

|旅程表作成フォーム | メモ作成フォーム |
|-------|-------|
| ![旅程表作成フォーム](/public/thumbnail/itinerary-create.jpg) | ![メモ作成フォーム](/public/thumbnail/memo-create.jpg) |

|プロフィール変更 | フォームバリデーション |
|-------|-------|
| ![プロフィール変更](/public/thumbnail/profile.jpg) | ![フォームバリデーション](/public/thumbnail/balidate.jpg) |

|トップページ | ブログトップページ |
|-------|-------|
| ![トップページ](/public/thumbnail/itinerary_thumbnail.jpg) | ![ブログトップページ](/public/thumbnail/isr_thumbnail.jpg) |


## セットアップ手順

1. リポジトリをクローン：

```
git clone https://github.com/haru0354/trip-abroad-itinerary.git

cd trip-abroad-itinerary
```

2. 依存関係をインストール：

```
npm install
```

3. 環境ファイルを用意

```
cp .env.sample .env

env ファイルへの記載
```

4. サーバーを起動

```
npm run dev
```

### コマンドの概要

| コマンド      | 説明                                       |
| ------------- | ------------------------------------------ |
| `npm install` | フロントエンドの依存関係をインストール     |
| `npm run dev` | フロント・バックのサーバー起動と監視を開始 |

## 初期設定

「タイトル」「説明文」「デザイン変更」など、meta情報や一部のデザイン変更を簡単に管理ができるように、configファイルにまとめています。

各使用箇所ではconfigより値を読み込む仕様になっています。

```
「設定ファイル」

app > (blog) > config > blogConfig.ts

app > (memorybook) > config > itineraryConfig.ts
```

## 色彩の一括変更設定

このアプリはTailwind CSSで装飾をしています。

色彩は「tailwind.config.ts」のファイルで、簡単に一括で変更ができるように管理しています。

そのため、色彩の変更をしたい時はこのファイルでカラーコードを変更することで反映されます。

```
「色彩設定」

ディレクトリ > tailwind.config.ts

```


## ブログの概要

旅程表アプリのマーケティングの為、管理者のみが投稿できるブログアプリも一緒に同梱をしています。

IDやパスワードなどは、環境変数（.env）より設定ができる仕様にしています。

下記のリポジトリで単体のブログアプリとしてアップロードしています。

Github：https://github.com/haru0354/next-blog-isr.git

## 今後追加/変更する項目

- 旅程のモデルコースを旅程表にコピーできるようにする。

- 共有時に表示されるユーザーページの作成。
- 共有された旅程表の一覧ページを作成。
- 旅程表のデータを使いユーザーのブログ投稿
- 共有された旅程表にコメント。

### 追加済み機能
- サイトマップの追加(実装済み)
- blogの目次の自動生成(実装済み)
- ブログのコンテンツにNext.JsのLinkコンポーネントを使用できるようにする(実装済み)
- ブログのコンテンツに作成したデザインコンポーネントが利用できるようにする(実装済み)
