import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500">
      <div className="bg-footer-image bg-cover bg-center h-[140px]"></div>
      <div>
        <ul className="flex items-center justify-center">
          <li className="pt-2 px-6 text-xs">プライバシーポリシー</li>
          <li className="pt-2 px-6 text-xs">お問い合わせ</li>
        </ul>
      </div>
      <div className="flex items-center justify-center mb-[65px]">
        <p className="p-3 text-xs">
          &copy;「旅のメモリーブック」 - 海外旅行のしおりアプリ-
        </p>
      </div>
    </footer>
  );
};

export default Footer;
