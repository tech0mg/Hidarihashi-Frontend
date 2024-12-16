"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CompassIcon from "../../components/icon/icon_compass"; // CompassIconをインポート
import Header from "../../components/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push("/customers/top"); // topへの遷移
  };

  const goToTopPage = () => {
    router.push("/customers/top_total"); // topのpage.jsxに遷移
  };

  const handleLoginNew = () => {
    router.push("/customers/login/login-new"); // login-newに遷移
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-main">
      {/* ヘッダー */}
      <div className="w-full">
          <Header />
      </div>

      {/* ログインフォーム */}
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white shadow-lg rounded-md p-8 w-96">
          <h1 className="text-2xl font-bold text-center text-[#8B7A6B] mb-6">ログイン</h1>
          <div className="mb-4">
            <label className="block text-[#8B7A6B] mb-2" htmlFor="email">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-[#D7CEC5] rounded-md"
              placeholder="メールアドレスを入力"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#8B7A6B] mb-2" htmlFor="password">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#D7CEC5] rounded-md"
              placeholder="パスワードを入力"
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-[#8B7A6B]">
              次回から入力を省略
            </label>
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-[#A39181] text-white rounded-md hover:bg-[#8B7A6B] transition"
          >
            ログイン
          </button>
          <button
            onClick={handleLoginNew}
            className="w-full mt-4 py-2 border border-[#D7CEC5] text-gray-500 rounded-md hover:border-[#8B7A6B] transition"
          >
            新規会員登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;