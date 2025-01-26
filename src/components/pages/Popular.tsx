import React, { useState } from 'react';
import { PopularNamesList } from '../popular/PopularNamesList';
import { PopularNamesHeader } from '../popular/PopularNamesHeader';
import { PopularNameDetail } from '../popular/PopularNameDetail';
import type { PopularName } from '../../types/names';

export function Popular() {
  const [selectedName, setSelectedName] = useState<PopularName | null>(null);

  if (selectedName) {
    return (
      <PopularNameDetail
        name={selectedName}
        onBack={() => setSelectedName(null)}
      />
    );
  }

  return (
    <div className="animate-fade-in space-y-12">
      <PopularNamesHeader />
      <PopularNamesList onNameSelect={setSelectedName} />
    </div>
  );
}