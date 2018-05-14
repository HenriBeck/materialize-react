import Adapter from 'enzyme-adapter-react-16';
import browserEnv from 'browser-env';
import React from 'react';

declare module 'lodash.noop' {
  declare function noop(): void;

  declare export default typeof noop;
}

declare module 'lodash.merge' {
  declare function merge<O1: {}, O2: {}, O3: {}>(obj1: O1, obj2: O2, obj3?: O3): O1 & O2 & O3;

  declare export default typeof merge;
}

declare module 'clamp' {
  declare function clamp(value: number, min: number, max: number): number;

  declare export default typeof clamp;
}

declare module 'browser-env' {
  declare export default typeof browserEnv;
}

declare module 'enzyme-adapter-react-16' {
  declare export default typeof Adapter;
}

declare module 'why-did-you-update' {
  declare function whyDidYouUpdate(react: typeof React, options?: {}): void;

  declare export default typeof whyDidYouUpdate;
}
