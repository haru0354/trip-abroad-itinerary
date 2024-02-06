import FooterMenu from "./components/FooterMenu";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./(auth)/navigation/Navigation";
import getCurrentUser from "./action/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      {currentUser ? <div>認証中</div> : <div>未認証</div>}
      <Header />
      <Navigation currentUser={currentUser} />
      <Footer />
      <FooterMenu />
    </div>
  );
}
