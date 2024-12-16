"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push("/customers/toB_form"); // toB_formへの遷移
  };

  const goToTopPage = () => {
    router.push("/customers/top_total"); // top_totalに遷移
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-main">
      {/* ヘッダー */}
      <div className="w-full">
          <Header />
      </div>

      {/* ログインフォーム */}
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white shadow-lg rounded-md p-8 w-96">
          <h1 className="text-2xl font-bold text-center text-[#8B7A6B] mb-6">
            企業様向けログイン
          </h1>

          {/* メールアドレス入力 */}
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

          {/* パスワード入力 */}
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

          {/* チェックボックス */}
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

          {/* ログインボタン */}
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
