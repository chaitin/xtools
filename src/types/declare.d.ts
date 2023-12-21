declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.json' {
  const value: unknown;
  export default value;
}

declare module '*.ttf' {
  const value: string;
  export default value;
}

declare module '*.otf' {
  const value: string;
  export default value;
}

declare module '*.woff' {
  const value: string;
  export default value;
}

declare module '*.woff2' {
  const value: string;
  export default value;
}

declare const PARTNER: string;

type SocketClient = {
  ids: number;
  on: (event: string, data?: unknown) => void;
  emit: (event: string, data?: unknown) => void;
  connected: boolean;
  disconnect: () => void;
};

declare module 'nextPage/nextpage';
