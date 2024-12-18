"use client"; // 必須ディレクティブ

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    parent_nickname: '',
    child_nickname: '',
    gender: '',
    grade: '',
    location: '',
    email: '',
    password: '',
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);
  };


  const handleLogin = () => {
    router.push("/customers/login"); // loginに遷移
  };

  return (
    <div className="bg-[#F9F7F5] flex flex-col min-h-screen">
      {/* ヘッダー */}
      <Header onHomeClick={() => navigateTo("top")} />
      <h2 className="p-6 text-center text-2xl font-bold mb-6">アカウント登録</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 mx-6"
      >
        <div>
          <label className="block font-semibold mb-2">保護者のニックネーム</label>
          <input
            name="parent_nickname"
            type="text"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="例: パパ・ママ"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">お子様のニックネーム</label>
          <input
            name="child_nickname"
            type="text"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="例: タロウ"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">お子様の性別</label>
          <select
            name="gender"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">性別を選択してください</option>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="回答しない">回答しない</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">学年</label>
          <select
            name="grade"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">学年を選択してください</option>
            <option value="未就学児">未就学児</option>
            <option value="小学1年生">小学1年生</option>
            <option value="小学2年生">小学2年生</option>
            <option value="小学3年生">小学3年生</option>
            <option value="小学4年生">小学4年生</option>
            <option value="小学5年生">小学5年生</option>
            <option value="小学6年生">小学6年生</option>
            <option value="中学生以上">中学生以上</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">出発地</label>
          <input
            name="location"
            type="text"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="例: 東京都台東区秋葉原"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">メールアドレス</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="例: example@example.com"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">パスワード</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="8文字以上のパスワードを入力してください"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition focus:outline-none focus:ring focus:ring-blue-300"
        >
          確認画面へ
        </button>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-[#A39181] text-white font-semibold rounded-md hover:bg-[#8B7A6B] transition"
        >
          ログイン画面に戻る
        </button>
      </form>
    </div>
  );
}