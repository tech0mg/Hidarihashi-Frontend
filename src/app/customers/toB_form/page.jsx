"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/Header";

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    theme: "",
    startDate: new Date(),
    startTime: "11:00",
    duration: "150",
    description: "",
    items: ["", "", ""],
    location: {
      postalCode: "",
      address: "",
      building: "",
      phone: "",
      venueName: "",
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

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      startDate: date,
    }));
  };

  const handleTimeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      startTime: e.target.value,
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
    <div className="bg-[#F9F7F5] flex flex-col min-h-screen">
      {/* ヘッダー */}
      <Header onHomeClick={() => navigateTo("top")} />
      <h1 className="p-4 text-2xl font-bold mb-6 text-center text-[#8B7A6B]">イベント登録画面</h1>
      <div className="mx-4 space-y-8">
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
          <div className="flex flex-col items-start gap-6 bg-[#F9F7F5] p-4 rounded border border-[#D7CEC5]">
            {/* ファイルアップロードボタン */}
            <button className="px-6 py-2 bg-[#D7CEC5] text-[#8B7A6B] rounded-full hover:bg-[#A39181] transition">
              ファイルをアップロード
            </button>
            {/* 注意事項 */}
            <div className="flex flex-col">
            <p className="text-sm font-bold text-[#F3B3CC] mb-2">GOOD</p>
              <ul className="text-sm text-[#F3B3CC] list-disc list-inside">
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
        <div className="bg-white shadow-md p-4 rounded">
          <h2 className="text-lg font-bold text-[#8B7A6B] mb-4">イベント詳細情報</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-bold text-[#8B7A6B]">開催日</label>
              <DatePicker
                selected={formData.startDate}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                className="w-full border border-[#D7CEC5] p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-[#8B7A6B]">開催時間</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleTimeChange}
                className="w-full border border-[#D7CEC5] p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-[#8B7A6B]">所要時間 (分)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full border border-[#D7CEC5] p-2 rounded"
                placeholder="例: 150"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2 font-bold text-[#8B7A6B]">イベント紹介文 (子ども向け)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-[#D7CEC5] p-2 rounded"
              placeholder="例: 人気店ガエターノの店主自らに教わるピッツァ教室。親子で好きなものをのせて、おいしいピザを焼きましょう！"
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block mb-2 font-bold text-[#8B7A6B]">持ち物</label>
            <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  value={formData.items[index] || ""}
                  onChange={(e) => handleArrayChange(index, e.target.value)}
                  className="w-full border border-[#D7CEC5] p-2 rounded"
                  placeholder={`例: ${
                    index === 0
                      ? "エプロン"
                      : index === 1
                      ? "三角巾"
                      : index === 2
                      ? "手ふきタオル"
                      : "持ち物を追加"
                  }`}
                />
              ))}
            </div>
          </div>
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
            name="venueName"
            value={formData.location.venueName}
            onChange={handleLocationChange}
            placeholder="開催場所名"
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

        {/* 募集要項 */}
        <div className="bg-white shadow-md p-4 rounded">
          <h2 className="text-lg font-bold text-[#8B7A6B] mb-4">イベント募集要項</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* 最小人数 */}
            <div>
              <label className="block mb-2 font-bold text-[#8B7A6B]">最小人数</label>
              <input
                type="number"
                name="minParticipants"
                value={formData.participation.minParticipants || ""}
                onChange={handleParticipationChange}
                placeholder="3"
                className="w-full border border-[#D7CEC5] p-2 rounded"
              />
            </div>
            {/* 最大人数 */}
            <div>
              <label className="block mb-2 font-bold text-[#8B7A6B]">最大人数</label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.participation.maxParticipants}
                onChange={handleParticipationChange}
                placeholder="10"
                className="w-full border border-[#D7CEC5] p-2 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* 募集締切日 */}
            <div>
              <label className="block mb-2 font-bold text-[#8B7A6B]">募集締切日</label>
              <DatePicker
                selected={formData.participation.deadline || new Date()}
                onChange={(date) =>
                  handleParticipationChange({ target: { name: "deadline", value: date } })
                }
                dateFormat="yyyy/MM/dd"
                className="w-full border border-[#D7CEC5] p-2 rounded"
              />
            </div>
            {/* 参加費 */}
            <div>
              <label className="block mb-2 font-bold text-[#8B7A6B]">参加費</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="cost"
                  value={formData.participation.cost}
                  onChange={handleParticipationChange}
                  placeholder="500"
                  className="w-full border border-[#D7CEC5] p-2 rounded"
                />
                <span className="text-[#8B7A6B]">円</span>
              </div>
            </div>
          </div>
          {/* 申し込み方法 */}
          <div className="mt-4">
            <label className="block mb-2 font-bold text-[#8B7A6B]">申し込み方法</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="applicationMethod"
                  value="app"
                  checked={formData.participation.applicationMethod === "app"}
                  onChange={handleParticipationChange}
                  className="accent-[#8B7A6B]"
                />
                <span className="text-[#8B7A6B]">アプリで申し込み</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="applicationMethod"
                  value="external"
                  checked={formData.participation.applicationMethod === "external"}
                  onChange={handleParticipationChange}
                  className="accent-[#8B7A6B]"
                />
                <span className="text-[#8B7A6B]">外部サイトにて申し込み</span>
              </label>
            </div>
            {formData.participation.applicationMethod === "external" && (
              <input
                type="url"
                name="applicationUrl"
                value={formData.participation.applicationUrl || ""}
                onChange={handleParticipationChange}
                placeholder="URLを入力してください"
                className="w-full border border-[#D7CEC5] p-2 rounded mt-2"
              />
            )}
          </div>
        </div>

        {/* 登録ボタン */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#D7CEC5] text-[#8B7A6B] py-3 rounded font-bold hover:bg-[#A39181] transition"
        >
          この内容で登録する
        </button>

      </div>
    </div>
  );
};

export default EventRegistrationForm;
