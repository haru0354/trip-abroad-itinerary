import Link from "next/link";


const HeaderItinerary = () => {
  return (
    <header className="header">
    <div className="header__inner">
      <Link href="/">
        <img src="/images/logo_blue_2.png" alt="BookShelf" />
      </Link>
      <nav className="header__nav">
        <ul className="header__ul">
          <li className="header__list">
          <Link href="./memo">
          memo        
        </Link>
          </li>
          <li className="header__list">
          <Link href="./itinerary">
          itinerary
        </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>


  )
};

export default HeaderItinerary;
