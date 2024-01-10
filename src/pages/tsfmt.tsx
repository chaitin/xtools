import MainContent from '@/components/MainContent';
import Formater, { Mode } from '@/components/Formater';
import React from 'react';

const mock =
  "interface MyInterface {\n  foo(): string,\n  bar: Array<number>,\n}\n\nexport abstract class Foo implements MyInterface {\n  foo() {\n            // TODO: return an actual value here\n        return 'hello'\n      }\n  get bar() {\n    return [  1,\n\n      2, 3,\n    ]\n  }\n}\n\ntype RequestType = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'OPTIONS' | 'CONNECT' | 'DELETE' | 'TRACE'\n";

const TSFmt: React.FC = () => {
  return (
    <MainContent>
      <Formater mock={mock} mode={Mode.TypeScript} accept='.ts, .tsx' />
    </MainContent>
  );
};

export default TSFmt;
