import MainContent from '@/components/MainContent';
import Formater, { Mode } from '@/components/Formater';
import React from 'react';

const mock =
  '.a{position:absolute;box-sizing:border-box;min-width:100%;contain:style size layout;font-variant-ligatures:no-common-ligatures;}.a:focus{box-shadow:inset 0 0 0 2px #5E9ED6;outline:none;}';

const CSSFmt: React.FC = () => {
  return (
    <MainContent>
      <Formater mock={mock} mode={Mode.CSS} accept='.css' />
    </MainContent>
  );
};

export default CSSFmt;
