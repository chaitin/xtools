import MainContent from '@/components/MainContent';
import Formater, { Mode } from '@/components/Formater';
import React from 'react';

const mock = '<html><h1>Hello Chaitin</h1></html>';

const HTMLFmt: React.FC = () => {
  return (
    <MainContent>
      <Formater mock={mock} mode={Mode.HTML} accept='.html' />
    </MainContent>
  );
};

export default HTMLFmt;
