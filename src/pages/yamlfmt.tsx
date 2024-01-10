import MainContent from '@/components/MainContent';
import Formater, { Mode } from '@/components/Formater';
import React from 'react';

const mock = 'a  : test\nb:\n- b1\n-   b2';

const YamlFmt: React.FC = () => {
  return (
    <MainContent>
      <Formater mock={mock} mode={Mode.YAML} accept='.yaml, .yml' />
    </MainContent>
  );
};

export default YamlFmt;
