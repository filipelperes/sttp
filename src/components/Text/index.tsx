type ITextProps = { name: string, value: string; };

const Text = ({ name, value }: ITextProps) => (
   <p>
      {name.split(new RegExp(`(${value})`, 'i')).map((v) => (
         v.toLowerCase() === value.toLowerCase() ? (
            <span style={{ fontWeight: 800 }}>{v}</span>
         ) : (
            <>{v}</>
         )
      ))}
   </p>
);

export default Text;