import { Fragment, memo, useMemo, type CSSProperties } from "react";

type ITextProps = {
   name: string,
   value: string;
   style?: CSSProperties;
};

const TextHighlight = memo(({ name, value, style = { fontWeight: 800 } }: ITextProps) => {
   const parts = useMemo(() => (
      name.split(new RegExp(`(${value})`, 'i'))
   ), [name, value]);

   return (
      <p>
         {parts.map((v, i) => (
            <Fragment key={i}>
               {v.toLowerCase() === value.toLowerCase() ? (
                  <span style={style}>{v}</span>
               ) : (
                  v
               )}
            </Fragment>
         ))}
      </p>
   );
});

TextHighlight.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "TextHighlight",
};

export default TextHighlight;