
# 旅程表作成アプリの概要

|旅のしおり一覧| 旅程表画面 |
|-------|-------|
| ![旅のしおり一覧](/public/thumbnail/shiori01.jpg) | ![旅程表画面](/public/thumbnail/itinerary_thumbnail_02.jpg) |

「英語が話せない人でも安心して行ける海外旅行へ」をコンセプトに制作している、旅程表アプリとなっています。

私自身が英会話ができないですが、何度も海外旅行をしてきました。

英語が話せない同行する友人とでも楽しめるように、色々と事前に調べごとをしてメモを取っていくなどして、旅を楽しんできました。

その経験を元に、「私自身が使用する為」でもあり、「英語が話せない人でも海外旅行へ行きたい人」の為に制作しています。

Next.jsを利用したフルスタックアプリとして開発している旅程表アプリとなっています。

このリポジトリには以下の2つのアプリが含まれています。

- 旅程表アプリ
- Next.jsのISRブログ

ブログは旅程表アプリのマーケティングとして利用をする為、管理者のみが投稿できる仕様になっています。（ユーザーは作成した旅程表から帰国後にブログを作成できる機能を追加予定）

## 主な機能・特徴

旅程表アプリの主な機能

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


## ブログの概要

旅程表アプリのマーケティングの為、管理者のみが投稿できるブログアプリも一緒に同梱をしています。

IDやパスワードなどは、環境変数（.env）より設定ができる仕様にしています。

下記のリポジトリで単体のブログアプリとしてアップロードしています。

Github：https://github.com/haru0354/next-blog-isr.git



## 今後追加/変更する項目

- サイトマップの追加(実装済み)
- blogの目次の自動生成(実装済み)
- ブログのコンテンツにNext.JsのLinkコンポーネントを使用できるようにする(実装済み)
- ブログのコンテンツに作成したデザインコンポーネントが利用できるようにする(実装済み)

- shareのユーザーページを作成する。
- shareの一覧ページを作成する。
- formの制御をReact-Hook-Formに変更して記述を少なくする。
- 旅程表のデータを使いユーザーがブログを投稿できるようにする。
- 共有された旅程表にコメントを出来るようにする。
- ブログ・旅程表にタグを登録してクリックで適用する。
- 画像ライブラリから記事・カテゴリの部分でアップロードせずとも選択ができるようにする。
　(自分が使う分には必要ないので行わないかも)
