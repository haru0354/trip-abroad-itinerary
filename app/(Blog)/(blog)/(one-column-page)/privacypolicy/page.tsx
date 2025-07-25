import type { Metadata } from "next";
import Link from "next/link";

import { blogTitle } from "@/app/(blog)/config/blogConfig";

export const metadata: Metadata = {
  title: "プライバシーポリシー・免責事項",
  robots: {
    index: false,
  },
};

const page = () => {
  return (
    <>
      <h2>プライバシーポリシー</h2>
      <p>
        このプライバシーポリシーは、旅程表作成アプリ「
        <Link href="/" className="text-blue-600 font-medium">
          旅のメモリーブック
        </Link>
        」とブログ「
        <Link href="/blog" className="text-blue-600 font-medium">
          {blogTitle}
        </Link>
        」の利用に関する情報収集、利用、および開示に関する方針を説明します。
      </p>
      <h3 className="font-bold text-lg my-6">1. 収集される情報</h3>
      <ul className="border border-dashed border-blog-borderBlack p-3 md:p-6 mb-6 mx-1 md:mx-16">
        <li className="my-2">
          <p className="font-bold">ニックネーム</p>
          <p>
            ユーザーがアプリに登録する際に入力する任意のニックネームが収集されます。
          </p>
        </li>
        <li className="my-2">
          <p className="font-bold">メールアドレス</p>
          <p>
            ユーザーがアプリに登録する際に入力するメールアドレスが収集されます。これにより、ユーザーアカウントの作成、ログイン機能などの機能が提供されます。
          </p>
        </li>
        <li className="my-2">
          <p className="font-bold">パスワード</p>
          <p>
            ユーザーがアプリに登録する際に入力するパスワードが収集されます。これにより、ユーザーアカウントの作成、ログイン機能などの機能が提供されます。
          </p>
        </li>
        <li className="my-2">
          <p className="font-bold">クッキー</p>
          <p>
            当サイトでは、クッキーを使用してユーザーのブラウザに情報を保存する場合があります。クッキーは、ウェブサイトの機能やパフォーマンスの向上、ユーザーの設定の記憶、トラフィックの解析などに使用されます。ユーザーはブラウザの設定でクッキーの使用を管理することができます。
          </p>
        </li>
      </ul>
      <p>
        また、お問い合わせの際にはニックネーム・メールアドレスが収集されます。
      </p>

      <h3 className="font-bold text-lg my-6">2.収集された情報の利用</h3>

      <p>収集された情報は、以下の目的で利用されます</p>
      <ol className="border border-dashed border-blog-borderBlack py-4 px-10 mb-6 mx-1 md:mx-16 list-decimal">
        <li className="my-2">ユーザーアカウントの作成および管理。</li>
        <li className="my-2">ユーザーに関連する通知や重要な情報の提供。</li>
        <li className="my-2">
          サービスの改善や新機能の開発に役立つ統計データの収集および分析。
        </li>
        <li className="my-2">
          お問い合わせ頂いた内容への返答(但し、返答を約束するものではありません)
        </li>
      </ol>
      <h3 className="font-bold text-lg my-6">3.アクセス解析ツールについて</h3>
      <p>
        Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
      </p>
      <p>
        このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
      </p>

      <p>
        Googleアナリティクスに関する詳細情報は「{" "}
        <a
          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
          target="_blank"
          className="text-sky-500"
        >
          Googleアナリティクス利用規約
        </a>
        」 をご覧ください。
      </p>
      <h2>免責事項</h2>
      <p>
        この免責事項は、旅程表作成アプリ(旅のメモリーブック)とブログ(トラベルメモリー)の利用に関する方針を説明します。
      </p>
      <h3 className="font-bold text-lg my-6">情報の正確性</h3>
      <p>
        本アプリおよびブログに掲載されている情報は、できる限り正確性を期していますが、その正確性や安全性に関して保証するものではありません。
      </p>
      <p>
        ユーザーがこれらの情報に依拠する際は、自己の判断と責任で行ってください。
        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
      </p>
      <p>
        「本アプリやブログの情報は一般的な参考情報として提供されており、特定の状況に対する適切性や正確性を保証するものではありません。
      </p>
      <p>ユーザーは個別の状況に応じて専門家に相談することをお勧めします。</p>

      <h3 className="font-bold text-lg my-6">責任の制限</h3>
      <p>
        本アプリやブログの利用によって生じたいかなる損害に対しても、直接的な損害、間接的な損害、結果的な損害など、あらゆる種類の損害に対しても一切の責任を負いません。
      </p>
      <p>
        例えば、情報の誤りやサービスの停止による損害、第三者とのトラブルによる損害などが含まれます
      </p>

      <h3 className="font-bold text-lg my-6">外部リンク</h3>
      <p>
        本アプリやブログは、第三者のウェブサイトへのリンクを提供する場合がありますが、
        これらのリンク先のコンテンツやプライバシーポリシーについては一切の管理や責任を負いません。
      </p>
      <p>
        「外部リンク先のコンテンツやサービスについての信頼性や安全性についての保証はいたしません。
        外部サイトやサービスを利用する際は、ユーザー自身の責任で行ってください.
      </p>

      <h3 className="font-bold text-lg my-6">サービスの変更</h3>
      <p>
        本アプリやブログのサービス内容や提供される機能は予告なく変更、修正、中止される場合があります。
        これによってユーザーに生じたいかなる損害に対しても、一切の責任を負いかねます。
      </p>
      <p>
        この免責事項は、利用者に対して本サービスの利用に関する責任の範囲やリスクについて明確に説明するものです。
        利用者がサービスを利用する際には、この免責事項を十分に理解し、承諾した上で利用するようにしてください。
      </p>
    </>
  );
};

export default page;
