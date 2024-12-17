"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PhotoUpload from "../../../../components/PhotoUpload";
import PhotoGallery from "../../../../components/PhotoGallery";

const DetailPage = () => {
  const router = useRouter();
  const params = useParams(); // パラメータを取得
  const { id } = params; // 記録IDを取得
  const [record, setRecord] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // APIから特定の記録を取得
    const debugResponse = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/debug`);
        const debugData = await response.json();
        console.log("Debug API Response:", debugData);
      } catch (error) {
        console.error("Debug API Error:", error);
      }
    };
    debugResponse();
  }, [apiUrl]);


  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/kiroku-data/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch record: ${response.status}`);
        }
        const data = await response.json();
        setRecord(data);
        setUploadedPhotos(data.images || []);
      } catch (error) {
        console.error("Error fetching record:", error);
        setErrorMessage("記録データの取得に失敗しました。");
      }
    };

    fetchRecord();
  }, [id, apiUrl]);

  if (!record) {
    return <p>Loading...</p>;
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/kiroku-data/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...record, images: uploadedPhotos }),
      });
      if (!response.ok) {
        throw new Error(`Failed to save record: ${response.status}`);
      }
      alert("記録が保存されました！");
      setTimeout(() => {
        router.push("/customers/kiroku_list");
      }, 500); // 遷移タイミングを500ms遅らせる
    } catch (error) {
      console.error("Error saving record:", error);
      setErrorMessage("記録の保存に失敗しました。");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/kiroku-data/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`Failed to delete record: ${response.status}`);
      }
      alert("記録が削除されました！");
      router.push("/customers/kiroku_list");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("記録の削除に失敗しました。");
    }
  };

  const handleUploadSuccess = (responseData) => {
    console.log("Upload response:", responseData);
    if (!responseData) {
      setErrorMessage("アップロード応答が空です。");
      return;
  }
    if (responseData.photo_id && responseData.file_url) {
        setUploadedPhotos((prevPhotos) => [
            ...prevPhotos,
            { id: responseData.photo_id, url: responseData.file_url }
        ]);
    } else {
        setErrorMessage("アップロード応答に必要な情報が含まれていません。");
    }
};


const handleReset = () => {
  // 記録データとアップロード済み写真を元の状態に戻す
  setRecord(null);
  setUploadedPhotos([]);
  setErrorMessage(null);

  // 再度データをフェッチ
  const fetchRecord = async () => {
      try {
          const response = await fetch(`${apiUrl}/api/kiroku-data/${id}`);
          if (!response.ok) {
              throw new Error(`Failed to fetch record: ${response.status}`);
          }
          const data = await response.json();
          setRecord(data);
          setUploadedPhotos(data.images || []);
      } catch (error) {
          console.error("Error fetching record:", error);
          setErrorMessage("記録データの再取得に失敗しました。");
      }
  };
  fetchRecord();
};

const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
        const response = await fetch(`${apiUrl}/api/upload-photo`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error("アップロードに失敗しました");
        }
        const responseData = await response.json();
        handleUploadSuccess(responseData);
    } catch (error) {
        setErrorMessage(error.message);
    }
};


  if (!record) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#F9F7F5] p-6">
      <h1 className="text-2xl font-bold text-center text-[#8B7A6B] mb-6">
        {record.title}
      </h1>
      <p className="text-center text-gray-500 mb-4">いつ: {record.date}</p>
      <div className="space-y-4">
        {/* 楽しさと再訪希望 */}
        <div className="flex justify-between">
          <label className="block text-[#DA7997]">楽しさ:</label>
          <input
            type="number"
            min="0"
            max="5"
            value={record.rating}
            onChange={(e) => setRecord({ ...record, rating: e.target.value })}
            className="p-2 border rounded w-16"
          />
          <label className="block text-[#DA7997]">また行きたい:</label>
          <input
            type="number"
            min="0"
            max="5"
            value={record.revisit}
            onChange={(e) => setRecord({ ...record, revisit: e.target.value })}
            className="p-2 border rounded w-16"
          />
        </div>

        {/* 感想・レビュー */}
        <div>
          <label className="block text-[#DA7997] mb-2">感想・レビュー:</label>
          <textarea
            value={record.review}
            onChange={(e) => setRecord({ ...record, review: e.target.value })}
            rows={5}
            className="p-2 border border-gray-300 rounded w-full"
          ></textarea>
        </div>

        {/* 写真ギャラリー */}
        <PhotoGallery photos={uploadedPhotos} apiUrl={apiUrl} />

        {/* 写真アップロード */}
        <PhotoUpload
          apiUrl={apiUrl}
          onUpload={(file) => handleFileUpload(file)}
          onUploadSuccess={handleUploadSuccess}
          onError={(error) => setErrorMessage(error.message)}
        />

        {/* エラーメッセージ */}
        {errorMessage && (
          <div className="text-red-500 mt-2">
            エラーが発生しました: {errorMessage}
          </div>
        )}
      </div>

      {/* 保存・削除ボタン */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-[#DA7997] text-white rounded"
        >
          記録を削除する
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#8B7A6B] text-white rounded"
        >
          保存して戻る
        </button>

        <button
            onClick={handleReset}
            className="px-4 py-2 bg-[#8B7A6B] text-white rounded"
        >
            リセット
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          前のページに戻る
        </button>

      </div>
    </div>
  );
};

export default DetailPage;
