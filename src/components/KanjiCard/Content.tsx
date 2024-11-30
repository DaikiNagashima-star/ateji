import React from 'react';

interface ContentProps {
  explanation: string;
}

export function Content({ explanation }: ContentProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">Meaning</h4>
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Explanation</h4>
        <p className="text-gray-300 leading-relaxed">{explanation}</p>
      </div>
    </div>
  );
}