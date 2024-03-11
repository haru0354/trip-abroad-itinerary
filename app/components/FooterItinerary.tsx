const FooterItinerary = () => {
  return (
    <footer className="bg-blue-400">
      <div>
        <ul className="flex items-center justify-center">
          <li className="pt-2 px-6 text-xs">プライバシーポリシー</li>
          <li className="pt-2 px-6 text-xs">お問い合わせ</li>
        </ul>
      </div>
      <div className="flex items-center justify-center mb-[65px]">
        <p className="p-3 text-xs">
          &copy;国内旅行・海外旅行のしおりアプリ「旅のメモリーブック」
        </p>
      </div>
    </footer>
  );
};

export default FooterItinerary;
