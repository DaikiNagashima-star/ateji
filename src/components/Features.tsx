import React from 'react';

export function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
      <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
        <h3 className="text-xl font-bold mb-2">伝統と現代</h3>
        <p className="text-gray-400">
          日本の伝統的な書道文化とAI技術の融合
        </p>
      </div>
      <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
        <h3 className="text-xl font-bold mb-2">美しい筆文字</h3>
        <p className="text-gray-400">
          プロの書道家が作成した美しいフォントを使用
        </p>
      </div>
      <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
        <h3 className="text-xl font-bold mb-2">自由な使用</h3>
        <p className="text-gray-400">
          SNSやプロフィールなど、様々な用途に利用可能
        </p>
      </div>
    </div>
  );
}