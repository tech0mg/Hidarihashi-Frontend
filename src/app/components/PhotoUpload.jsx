import React, { useState } from "react";

const PhotoUpload = ({ apiUrl, onUploadSuccess, onError }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false); // ローディング状態
    const [successMessage, setSuccessMessage] = useState(null); // 成功メッセージ
    const [errorMessage, setErrorMessage] = useState(null); // エラーメッセージ


  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessage(null); // エラーをリセット
      setSuccessMessage(null); // 成功メッセージをリセット
    };
  
    const handleFileUpload = async () => {
      if (!selectedFile) {
        onError(new Error("ファイルを選択してください"));
        setErrorMessage(error.message);
        onError(error);
        return;
      }
  
      const formData = new FormData();
      formData.append("photo", selectedFile);

      setLoading(true); // ローディング開始
      setErrorMessage(null); // エラーをリセット
  
      try {
        const response = await fetch(`${apiUrl}/api/upload-photo`, {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) throw new Error("アップロードに失敗しました");
  
        const responseData = await response.json();
        onUploadSuccess(responseData); 
        setSelectedFile(null);
        setPreviewUrl(null);
        setSuccessMessage("アップロードが成功しました！"); // 成功メッセージ
      } catch (error) {
        console.error("Error uploading photo:", error);
        setErrorMessage(error.message);
        onError(error);
      } finally {
        setLoading(false); // ローディング終了
      }
    };
  
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-center mb-4">思い出の写真をアップロード</h2>
        
        {/* ファイル選択 */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* サムネイル表示 */}
        {previewUrl && (
          <div className="mt-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg shadow-md mx-auto"
            />
          </div>
        )}

        {/* エラーメッセージ表示 */}
        {errorMessage && (
            <div className="mt-2 text-red-500 text-center">
                エラー: {errorMessage}
            </div>
        )}

        {/* 成功メッセージ表示 */}
        {successMessage && (
            <div className="mt-2 text-green-500 text-center">
                {successMessage}
            </div>
        )}

        {/* ローディングスピナー */}
        {loading && (
            <div className="mt-4 text-center">
                <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 mx-auto animate-spin"></div>
            </div>
        )}

        {/* アップロードボタン */}
        <button
          onClick={handleFileUpload}
          disabled={loading} // ローディング中はボタンを無効化
          className={`mt-4 px-4 py-2 rounded-md text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "アップロード中..." : "アップロード"}
        </button>
      </div>
    );
  };
  
  export default PhotoUpload;
  