if (import.meta.env.DEV) {
  import('@welldone-software/why-did-you-render').then(({ default: whyDidYouRender }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import('react').then((reactModule: any) => {
      const React = reactModule.default ?? reactModule;
      whyDidYouRender(React, {
        trackAllPureComponents: true,
        collapseGroups: true,
        include: [/.*/],
        exclude: [/Icon/, /IoMdCloseCircle/, /RxChevronRight/, /TextHighlight/],
      });
    });
  });
}
