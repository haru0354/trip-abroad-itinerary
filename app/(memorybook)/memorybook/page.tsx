import { Suspense } from "react";
import SignupModal from "./components/ui/modal/SignupModal";
import FlexImageAndContents from "@/app/components/layout/FlexImageAndContents";
import ThreeIconAndContents from "@/app/components/layout/ThreeIconAndContents";
import ThreeImageAndContents from "@/app/components/layout/ThreeImageAndContents";
import CallToAction from "@/app/components/layout/CallToAction";
import QuestionAndAnswer from "@/app/components/layout/QuestionAndAnswer";
import Hero from "@/app/components/layout/Hero";
import SignupButton from "./components/ui/auth/SignupButton";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoginModal from "./components/ui/modal/LoginModal";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import Section from "@/app/components/layout/Section";
import Loading from "@/app/Loading";

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
      </Suspense>
      <Hero
        src="/hero_image.JPG"
        alt="メモリーブックのHERO画像"
        title="旅程表が作成できるしおりアプリ"
        secondTitle="「旅のメモリーブック」"
        contents={[
          "国内旅行・海外旅行で使える。",
          "PC・スマホ・タブレット対応の無料アプリ",
        ]}
        signUp={true}
      />
      <main>
        <div className="w-full">
          <section className="bg-white">
            <div className="max-w-[1150px] w-full py-2 md:py-6 px-4 mx-auto">
              <div className="flex items-center mx-0 py-8">
                <span className="flex-grow h-1 w-5 md:w-0 mr-1 md:mr-4 bg-gradient-to-l from-gray-600 to-transparent"></span>
                <h2 className="text-2xl md:text-3xl py-0 my-5 text-gray-700 text-center font-bold bg-transparent">
                  しおりアプリ「旅のメモリーブック」の機能の一部
                </h2>
                <span className="flex-grow h-1 w-5 md:w-0 mr-1 md:mr-4 bg-gradient-to-r from-gray-600 to-transparent"></span>
              </div>
              <ThreeImageAndContents
                items={[
                  {
                    title: "旅程表の作成",
                    content:
                      "旅程表が簡単に作成可能!!日付や時間で自動で並び変えるので面倒な作業はいりません。必要なのは「いつ・何をする」を記載することだけです。",
                    imageUrl: "/itinerary.jpg",
                    imageAlt: "旅程表の作成",
                  },
                  {
                    title: "メモの作成",
                    content:
                      "旅行準備は出発前のパスポートの取得や持ち物の準備、旅行中の海外旅行保険の連絡先など様々です。簡単にメモができるので必要なことがすぐに確認可能。",
                    imageUrl: "/memo-create.jpg",
                    imageAlt: "旅行準備のメモ",
                  },
                  {
                    title: "共有機能",
                    content:
                      "作成した旅程表は共有することが可能です。同行者がスケジュールを確認したり、LineやfacebookなどSNSでの共有が簡単に可能。共有するかしないかは切り替えれます。",
                    imageUrl: "/Itinerary-share.jpg",
                    imageAlt: "メモの切り替え",
                  },
                ]}
              />
            </div>
          </section>
          <Section
            name="「旅のメモリーブック」がおすすめな人"
            bgColor="bg-sky-50"
          >
            <FlexImageAndContents
              src="/overseas_trip01.jpg"
              alt="海外旅行"
              name="英語が話せない人でも海外旅行へ"
              contents={[
                "英語が話せない人でも安心して海外旅行へをコンセプトに作成されたアプリです。",
                "海外だと分からないことも多いです。事前に旅程やメモをして旅行準備さえすれば英語が話せなくても海外旅行ができるようになってます。",
                "現地で必要なタイミングでメモを閲覧できるので、言語の壁があっても安心して旅行が可能です。",
              ]}
            />
            <FlexImageAndContents
              src="/travel_expenses.jpg"
              alt="旅行費用"
              name="旅行費用を安くしたい10代・20代・30代"
              contents={[
                "PC・スマホ・タブレットから完全無料で利用が可能な国内旅行・海外旅行のしおりアプリです。",
                "10代・20代・30代は色々と遊びや趣味や人付き合いでの出費もあります。そのため、旅行費用を安くしつつ快適で楽しい旅行をしたい人も多いです。",
                "事前に旅程やメモして準備することで、現地で通訳やガイドの費用を抑えることもでき、かつ旅行でも添乗員同行のツアーでなくても快適な旅行ができます",
              ]}
              imageLeft={false}
            />
          </Section>
          <Section name="旅のメモリーブックとは" bgColor="bg-gray-50">
            <CallToAction
              lists={[
                "PC・スマホ・タブレットから利用できる無料のアプリ",
                "簡単に国内・海外の旅のしおり（旅程表）の作成が可能",
                "英語が話せない人でも安心して海外旅行できる豊富なメモ機能",
              ]}
              contents={[
                "表示切替ボタンにより、必要なタイミングで必要なメモを閲覧が可能。",
                "英語が話せない人でも「目的地への具体的な行き方（乗り換え方法・バス番号・時間）」をはじめ、「食事予定のメニューの英語名や呼び方」など、事前にメモをすることで安心して海外旅行が可能。",
              ]}
              signUp={true}
            />
          </Section>
          <Section name="旅のメモリーブック3つの特徴" bgColor="bg-white">
            <ThreeIconAndContents
              items={[
                {
                  title: "国内・海外の旅行に対応",
                  content:
                    "旅のメモリーブックは国内と海外の両方に使える、旅程表アプリとなっています。安心して海外旅行をする為の豊富なメモ機能がありますが、国内旅行にも使えます。",
                },
                {
                  title: "思い出を残せるアプリ",
                  content:
                    "旅程表を作成できるだけではありません。旅行中や帰国後にも思い出を残せるように設定がされています。旅行前は旅程表から、帰国後は思い出の記録へと残せます。",
                },
                {
                  title: "表示切替メモ機能",
                  content:
                    "非表示からボタンクリックで表示に切り替えるメモ機能があります。旅程表の見やすさやデザインを損なわずにメモをすることができるようになっています。",
                },
              ]}
            />
          </Section>
          <Section name="思い出の旅行記になるアプリ" bgColor="bg-sky-50">
            <FlexImageAndContents
              src="/travelogue.jpg"
              alt="旅行記"
              name="帰国後にしおりを思い出のアルバムへ"
              contents={[
                "旅のメモリーブックは各旅程の写真を載せることができるようになっています。",
                "旅行中や旅行後に撮影した観光地や料理など様々な写真を載せましょう。",
                "「旅程表を作成できるアプリ」なだけではなく、「思い出に残るアルバム・旅行記を作成できるアプリ」になっています。",
              ]}
            />
            <FlexImageAndContents
              src="/trip_list.jpg"
              alt="旅行記"
              name="次の旅行の予定も作れる"
              contents={[
                "旅のメモリーブックは複数の旅行プランを作成することができます",
                "旅行は当日だけでなく、「どんな旅行をしたいか？」旅程表を作るのもたのしみのひとつです。",
                "いつか行って見たい旅行プランの作成を楽しむましょう。また、実際の旅行が決まったのなら新しい旅程表を作成することもできます。",
              ]}
              imageLeft={false}
            />
          </Section>
          <Section name="よくある質問" bgColor="bg-white">
            <QuestionAndAnswer
              title="アカウントの作成に必要なのは何ですか？"
              content="2種類のアカウントの作成方法に対応しています。メールアドレス・Googleアカウントを利用した方法があります。必要となるのはニックネーム・メールアドレス・パスワードの3つ、またはGoogleアカウントだけです。わずらわしい作業はなしで「すぐにでも簡単に旅程表を作成できる」をコンセプトの1つとして作られています。"
            />
            <QuestionAndAnswer
              title="本当に無料で利用できますか？"
              content="旅のメモリーブックは完全に無料で利用できるアプリとなっています。アカウントを10秒ほどで作成後はすぐにアプリの全機能を利用することが可能で、すぐにでも国内・海外旅行のしおりとして旅程表の作成などできます。"
            />
            <QuestionAndAnswer
              title="「iphone」や「android」で使用できますか？"
              content="はい。もちろん可能です。PC・スマートフォン・タブレットの端末で使用をすることができます。そのため、iphone・androidで作成途中のアプリを、同じアカウントを使用してPCのwindowsやmacでの編集をすることも可能です。"
            />
            <QuestionAndAnswer
              title="pcで作成したのをスマホで閲覧できますか？"
              content="PC・スマホ・タブレットで閲覧・作成ができます。作成したアカウントでログインをすればどの端末からでも閲覧・作成・編集が可能です。
            "
            />
            <AnimatedItem
              elementType="div"
              animation="fadeInAndScaleVariants"
              className="text-center py-4"
            >
              <SignupButton />
            </AnimatedItem>
          </Section>
        </div>
      </main>
      <Footer isTopAppDirectory={true} />
      <SignupModal />
      <LoginModal />
    </>
  );
}
