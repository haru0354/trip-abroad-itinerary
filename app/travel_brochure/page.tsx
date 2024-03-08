import Section1ColumnRight from "../components/homePage/Section1ColumnRight";
import Section3ColumnIcon from "../components/homePage/Section3ColumnIcon";
import SectionText from "../components/homePage/SectionText";
import QA from "../components/homePage/QA";
import Hero from "../components/homePage/Hero";
import SignupButton from "../components/ui/SignupButton";
import getCurrentUser from "../action/getCurrentUser";
import HeaderItinerary from "../components/HeaderItinerary";
import LoginModal from "../components/auth/authUi/LoginModal";
import SignupModal from "../components/auth/authUi/SignupModal";
import Section3ColumnImage from "../components/homePage/Section3ColumnImage";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <SignupModal />
      <LoginModal />
      <HeaderItinerary currentUser={currentUser} />
      <Hero />
      <main>
        <div className="w-[1150px] bg-white">
          <div>
            <h2 className="bg-blue-400 text-xl font-semibold text-white text-center rounded my-10 p-5">
              旅程表作成のしおりアプリ「旅のメモリーブック」で出来ること
            </h2>
            <Section3ColumnImage
              title1="旅程表の作成"
              title2="メモの作成"
              title3="表示切替メモ機能"
              content1="旅程表が簡単に作成可能!!日付や時間で自動で並び変えるので面倒な作業はいりません。必要なのは「いつ・何をする」を記載することだけです。"
              content2="旅行準備は出発前のパスポートの取得や持ち物の準備、旅行中の海外旅行保険の連絡先など様々です。簡単にメモができるので必要なことがすぐに確認可能。"
              content3="非表示からボタンクリックで表示に切り替えるメモ機能があります。旅程表の見やすさやデザインを損なわずにメモをすることができるようになっています"
              image1Url="/travelogue.jpg"
              image2Url="/memo-create.jpg"
              image3Url="/switching memo.jpg"
              image1Alt="旅程表の作成"
              image2Alt="旅行準備のメモ"
              image3Alt="メモの切り替え"
            />
            <h2 className="bg-blue-400 text-xl font-semibold text-white text-center rounded my-10 p-5">
              「旅のメモリーブック」がおすすめな人
            </h2>
            <Section1ColumnRight
              src="/overseas_trip.jpg"
              alt="海外旅行"
              name="英語が話せない人でも海外旅行へ"
              content="英語が話せない人でも安心して海外旅行へをコンセプトに作成されたアプリです。"
              content2="海外だと分からないことも多いです。事前に旅程やメモをして旅行準備さえすれば英語が話せなくても海外旅行ができるようになってます。"
              content3="現地で必要なタイミングでメモを閲覧できるので、言語の壁があっても安心して旅行が可能です。"
            />
            <Section1ColumnRight
              src="/travel_expenses.jpg"
              alt="旅行費用"
              name="旅行費用を安くしたい10代・20代・30代"
              content="PC・スマホ・タブレットから完全無料で利用が可能な国内旅行・海外旅行のしおりアプリです。"
              content2="10代・20代・30代は色々と遊びや趣味や人付き合いでの出費もあります。そのため、旅行費用を安くしつつ快適で楽しい旅行をしたい人も多いです。"
              content3="事前に旅程やメモして準備することで、現地で通訳やガイドの費用を抑えることもでき、かつ旅行でも添乗員同行のツアーでなくても快適な旅行ができます"
            />
            <SectionText
              title="旅のメモリーブックとは"
              name1="PC・スマホから利用できる無料のアプリ"
              name2="簡単に旅のしおり（旅程表・メモ）の作成が可能"
              name3="国内旅行だけでなく英語が話せない人の海外旅行のしおりとしての機能"
              content="表示切替ボタンにより、必要なタイミングで必要なメモを閲覧が可能。英語が話せない人でも「目的地への具体的な行き方（乗り換え方法・バス番号・時間）」をはじめ、「食事予定のメニューの英語名や呼び方」など、事前にメモをすることで安心して海外旅行が可能。"
            />
            <Section3ColumnIcon
              title="旅のメモリーブック3つの特徴"
              name1="国内・海外の旅行に対応"
              name2="思い出を残せるアプリ"
              name3="旅程表は複数作成可能"
              content1="旅のメモリーブックは国内と海外の両方に使える、旅程表アプリとなっています。安心して海外旅行をする為の豊富なメモ機能がありますが、国内旅行にも使えます。"
              content2="旅程表を作成できるだけではありません。旅行中や帰国後にも思い出を残せるように設定がされています。旅行前は旅程表から、帰国後は思い出の記録へと残せます"
              content3="旅程表は複数作成可能となっています。旅行は1度だけでなく何度も良く人は多いです。複数の旅行にそれぞれの旅程表が作成できるようになっています。"
            />
            <h2 className="bg-blue-400 text-xl font-semibold text-white text-center rounded my-10 p-5">
              思い出の旅行記になるアプリ
            </h2>
            <Section1ColumnRight
              src="/travelogue.jpg"
              alt="旅行記"
              name="帰国後にしおりを思い出のアルバムへ"
              content="旅のメモリーブックは各旅程の写真を載せることができるようになっています。"
              content2="旅行中や旅行後に撮影した観光地や料理など様々な写真を載せましょう。"
              content3="「旅程表を作成できるアプリ」なだけではなく、「思い出に残るアルバム・旅行記を作成できるアプリ」になっています。"
            />
            <Section1ColumnRight
              src="/trip_list.jpg"
              alt="旅行記"
              name="次の旅行の予定も作れる"
              content="旅のメモリーブックは複数の旅行プランを作成することができます"
              content2="旅行は当日だけでなく、「どんな旅行をしたいか？」旅程表を作るのもたのしみのひとつです。"
              content3="いつか行って見たい旅行プランの作成を楽しむましょう。また、実際の旅行が決まったのなら新しい旅程表を作成することもできます。"
            />
            <h2 className="bg-blue-400 text-xl font-semibold text-white rounded my-8 p-5 text-center">
              よくある質問
            </h2>
            <QA
              title="アカウントの作成に必要なのは何ですか？"
              content="2種類のアカウントの作成方法に対応しています。メールアドレス・Googleアカウントを利用した方法があります。必要となるのはニックネーム・メールアドレス・パスワードの3つ、またはGoogleアカウントだけです。わずらわしい作業はなしで「すぐにでも簡単に旅程表を作成できる」をコンセプトの1つとして作られています。"
            />
            <QA
              title="本当に無料で利用できますか？"
              content="旅のメモリーブックは完全に無料で利用できるアプリとなっています。アカウントを10秒ほどで作成後はすぐにアプリの全機能を利用することが可能で、すぐにでも国内・海外旅行のしおりとして旅程表の作成などできます。"
            />
            <QA
              title="「iphone」や「android」で使用できますか？"
              content="はい。もちろん可能です。PC・スマートフォン・タブレットとあらゆる端末で使用をすることができます。そのため、iphone・androidで作成途中のアプリを、同じアカウントを使用してPCのwindowsやmacでの編集をすることも可能です。"
            />
            <QA
              title="pcで作成したのをスマホで閲覧できますか？"
              content="PC・スマホ・タブレットと端末に関係なく、あらゆる端末で閲覧・作成ができます。作成したアカウントでログインをすればどの端末からでも閲覧・作成・編集が可能です。
            "
            />
            <div className="text-center py-4">
              <SignupButton />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
