This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

##
Next.js App Router 환경에서 전체보기(목록), 추가하기, 상세보기를 별도의 페이지 라우트로 분리한 구조입니다. 여러 페이지 간에 할 일 데이터를 공유하고 유지하기 위해 React Context와 localStorage를 결합하여 구현

##
```
app/
├── context/
│   └── TodoContext.tsx          # [수정] updateTodo 함수 추가
├── todos/
│   ├── new/
│   │   └── page.tsx             # 추가하기 페이지
│   └── [id]/
│       ├── edit/
│       │   └── page.tsx         # [신규] 수정하기 페이지 (/todos/[id]/edit)
│       └── page.tsx             # [수정] 상세보기 페이지에 '수정' 버튼 추가
├── layout.tsx
└── page.tsx

```
```
Next.js App Router에서 대괄호([])는 URL 경로의 특정 부분을 변수처럼 받아 처리하는 동적 라우팅(Dynamic Routes)을 정의할 때 사용

폴더 이름을 대괄호로 감싸면 해당 위치에 들어오는 어떤 URL 경로든 매칭되어 페이지나 API 라우트로 연결

```


|폴더 이름 예시	 |매칭되는 URL 예시	|params 전달 값	|설명|
|---|---|---|---| 
|app/blog/[slug]/page.tsx|	/blog/hello-world|	{ slug: 'hello-world' }	|단일 동적 세그먼트 매칭|
|app/shop/[...slug]/page.tsx	|/shop/a, /shop/a/b/c	|{ slug: ['a', 'b', 'c'] }	|하위 경로 전체 매칭 (Catch-all)|
|app/docs/[[...slug]]/page.tsx|	/docs, /docs/a/b|	{}, { slug: ['a', 'b'] }	|기본 경로(/docs)까지 포함하는 매칭 (Optional Catch-all)|


```

// app/blog/[slug]/page.tsx

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <h1>게시글 슬러그: {slug}</h1>
    </main>
  );
}
```
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
