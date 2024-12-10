"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FooterButton from "../../../components/FooterButton";

const ListDetailContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const image = searchParams.get("image");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Image Detail</h1>
      {image ? (
        <div className="flex flex-col items-center">
          {/* 親コンテナ */}
          <div className="mb-4 w-full max-w-xl">
            <div className="relative w-full" style={{ aspectRatio: "16 / 9", maxWidth: "500px", margin: "0 auto" }}>
              <img
                src={`${apiUrl}${image}`}
                alt="Selected Image"
                className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-lg"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  margin: "auto",
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">画像が選択されていません。</p>
      )}
      {/* フッターボタン */}
      <FooterButton />
    </div>
  );
};

const ListDetail = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ListDetailContent />
  </Suspense>
);

export default ListDetail;
