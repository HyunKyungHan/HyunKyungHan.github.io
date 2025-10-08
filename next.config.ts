import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // ✅ 정적 내보내기
  images: { unoptimized: true },
  trailingSlash: true        // (옵션) 서브경로 새로고침 이슈 감소
};

export default nextConfig;
