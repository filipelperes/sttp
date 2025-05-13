import type { CSSProperties } from "react";

type ITextProps = {
   name: string,
   value: string;
   style?: CSSProperties;
};

const Text = ({ name, value, style = { fontWeight: 800 } }: ITextProps) => (
   <p>
      {name.split(new RegExp(`(${value})`, 'i')).map(v => (
         v.toLowerCase() === value.toLowerCase() ? (
            <span style={style}>{v}</span>
         ) : (
            <>{v}</>
         )
      ))}
   </p>
);

export default Text;