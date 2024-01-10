import MainContent from '@/components/MainContent';
import Formater, { Mode } from '@/components/Formater';
import React from 'react';

const mock = '<root><content>Chaitin</content></root>';

const XMLFmt: React.FC = () => {
  return (
    <MainContent>
      <Formater mock={mock} mode={Mode.XML} accept='.xml' />
    </MainContent>
  );
};

export default XMLFmt;
