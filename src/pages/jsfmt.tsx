import MainContent from '@/components/MainContent';
import Formater, { Mode } from '@/components/Formater';
import React from 'react';

const mock =
  'function fibonacci(n){if(n<=1){return n}else{return fibonacci(n-1)+fibonacci(n-2)}}for(let i=0;i<10;i++){console.log(fibonacci(i))}';

const JSFmt: React.FC = () => {
  return (
    <MainContent>
      <Formater mock={mock} mode={Mode.JavaScript} accept='.js' />
    </MainContent>
  );
};

export default JSFmt;
