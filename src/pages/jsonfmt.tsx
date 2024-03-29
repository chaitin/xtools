import MainContent from '@/components/MainContent';
import Formater, { Mode } from '@/components/Formater';
import React from 'react';

const mock = '{"id": 1, "name": "test"}';

const JsonFmt: React.FC = () => {
  return (
    <MainContent>
      <Formater mock={mock} mode={Mode.JSON} accept='.json' />
    </MainContent>
  );
};

export default JsonFmt;
