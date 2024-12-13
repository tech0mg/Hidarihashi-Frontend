"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F9F7F5]">
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 w-full flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#8B7A6B]">Kid's Compass 子供向けログイン</h1>
        <button
          onClick={goToTopPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          トップページに戻る
        </button>
      </header>

      {/* ログインフォーム */}
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white shadow-lg rounded-md p-8 w-96">
          <h1 className="text-2xl font-bold text-center text-[#8B7A6B] mb-6">子供向けログイン</h1>
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;