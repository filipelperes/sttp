/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
   whyDidYouRender(React, {
      trackAllPureComponents: true,
      collapseGroups: true,
      include: [/.*/],
      exclude: [/Icon/, /IoMdCloseCircle/, /RxChevronRight/, /Text/]
   });
}