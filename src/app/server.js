import Link from 'next/link';
import React from 'react';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default function Home() {
  return (
    <>
      <div>
        <h1>Hello World</h1>
      </div>
      <div>
        <Link href={`/customers/login`}>
          <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">ログインページ</button>
        </Link>
        <Link href={`/customers/top`}>
          <button className="btn btn-neutral w-20 border-0 bg-blue-200 text-black hover:text-white">トップページ</button>
        </Link>
      </div>
    </>
  );
}
