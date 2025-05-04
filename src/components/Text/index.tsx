type ITextProps = { name: string, value: string; };

const Text = ({ name, value }: ITextProps) => {
   const matchIndex = name.toLowerCase().indexOf(value.toLowerCase());

   return (
      <>
         {matchIndex === -1 || value.length === 0 ? { name }
            : (
               <>
                  {name.slice(0, matchIndex)}
                  <span style={{ textShadow: "1px 1px 0px rgba(0, 0, 0, 0.7)" }}>{name.slice(matchIndex, matchIndex + value.length)}</span>
                  {name.slice(matchIndex + value.length)}
               </>
            )}
      </>
   );
};

export default Text;