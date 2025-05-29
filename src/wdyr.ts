/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (import.meta.env.DEV) {
   whyDidYouRender(React, {
      trackAllPureComponents: true,
      collapseGroups: true,
      include: [/.*/],
      exclude: [/Icon/, /IoMdCloseCircle/, /RxChevronRight/, /TextHighlight/]
   });
}