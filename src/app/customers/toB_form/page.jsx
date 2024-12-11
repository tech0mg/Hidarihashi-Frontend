"use client";
import React, { useState } from "react";

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    theme: "",
    startDate: "",
    startTime: "",
    duration: "",
    description: "",
    items: ["", "", ""],
    location: {
      postalCode: "",
      address: "",
      building: "",
      phone: "",
    },
    participation: {
      maxParticipants: "",
      cost: "",
      deadline: "",
      notes: "",
      includeTax: true,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagSelection = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleArrayChange = (index, value) => {
    const newItems = [...formData.items];
    newItems[index] = value;
    setFormData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleParticipationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      participation: {
        ...prev.participation,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="p-6 bg-[#F9F7F5] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#8B7A6B]">イベント登録画面</h1>
      <div className="space-y-6">
        {/* イベントタイトル */}
        <div>
          <label className="block mb-2 font-bold text-[#8B7A6B]">イベントタイトル</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-[#D7CEC5] p-2 rounded"
            placeholder="タイトルを入力"
          />
        </div>

        {/* イベントTOP画像 */}
        <div>
          <label className="block mb-2 font-bold text-[#8B7A6B]">イベントTOP画像</label>
          <div className="flex items-start gap-6 bg-[#F9F7F5] p-4 rounded border border-[#D7CEC5]">
            {/* ファイルアップロードボタン */}
            <button className="px-6 py-2 bg-[#D7CEC5] text-[#8B7A6B] rounded-full hover:bg-[#A39181] transition">
              ファイルをアップロード
            </button>
            {/* 注意事項 */}
            <div className="flex flex-col">
              <p className="text-sm font-bold text-[#8B7A6B] mb-2">GOOD</p>
              <ul className="text-sm text-[#8B7A6B] list-disc list-inside">
                <li>明るく鮮やか</li>
                <li>動きがある</li>
                <li>子ども視点</li>
                <li>楽しそうな表情</li>
              </ul>
              <p className="text-sm font-bold text-[#8B7A6B] mt-4 mb-2">NG</p>
              <ul className="text-sm text-[#8B7A6B] list-disc list-inside">
                <li>暗く地味な色</li>
                <li>動きが見えない</li>
                <li>大人向けの構図</li>
                <li>スケール感がない</li>
              </ul>
            </div>
          </div>
        </div>

        {/* イベントタグ */}
        <div>
          <label className="block mb-2 font-bold text-[#8B7A6B]">関連タグ</label>
          <div className="flex flex-wrap gap-2">
            {["#りょうり", "#おやこ", "#わいわい", "#あそぶ", "#つくる", "#たべる", "#ワクワク", "#ドキドキ", "#うんどう", "#みる"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagSelection(tag)}
                className={`px-4 py-2 rounded border ${
                  formData.tags.includes(tag)
                    ? "bg-[#A39181] text-white"
                    : "bg-white text-[#8B7A6B] border-[#D7CEC5]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* イベント詳細 */}
        <div>
          <label className="block mb-2 font-bold  text-[#8B7A6B]">イベント内容</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-[#D7CEC5] p-2 rounded"
          ></textarea>
        </div>

        {/* 場所 */}
        <div>
          <label className="block mb-2 font-bold">イベント会場情報</label>
          <input
            type="text"
            name="postalCode"
            value={formData.location.postalCode}
            onChange={handleLocationChange}
            placeholder="郵便番号"
            className="w-full border border-gray-300 p-2 rounded mb-2"
          />
          <input
            type="text"
            name="address"
            value={formData.location.address}
            onChange={handleLocationChange}
            placeholder="住所"
            className="w-full border border-gray-300 p-2 rounded mb-2"
          />
          <input
            type="text"
            name="phone"
            value={formData.location.phone}
            onChange={handleLocationChange}
            placeholder="電話番号"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* 参加費 */}
        <div>
          <label className="block mb-2 font-bold">参加費情報</label>
          <input
            type="text"
            name="maxParticipants"
            value={formData.participation.maxParticipants}
            onChange={handleParticipationChange}
            placeholder="最大参加人数"
            className="w-full border border-gray-300 p-2 rounded mb-2"
          />
          <input
            type="text"
            name="cost"
            value={formData.participation.cost}
            onChange={handleParticipationChange}
            placeholder="参加費"
            className="w-full border border-gray-300 p-2 rounded mb-2"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="includeTax"
              checked={formData.participation.includeTax}
              onChange={handleParticipationChange}
            />
            <span>税込み</span>
          </div>
        </div>

        {/* 登録ボタン */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-600"
        >
          この内容で登録する
        </button>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
