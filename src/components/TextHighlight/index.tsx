import { Fragment, memo, useMemo, type CSSProperties } from 'react';

interface ITextHighlightProps {
  name: string;
  value: string;
  highlightStyle?: CSSProperties;
}

const DEFAULT_HIGHLIGHT_STYLE: CSSProperties = { fontWeight: 800 };

const escapeRegex = (s: string): string =>
  s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const TextHighlight = memo(({
  name,
  value,
  highlightStyle = DEFAULT_HIGHLIGHT_STYLE,
}: ITextHighlightProps) => {
  const parts = useMemo(
    () => name.split(new RegExp(`(${escapeRegex(value)})`, 'i')),
    [name, value],
  );

  return (
    <p>
      {parts.map((v, i) =>
        v.toLowerCase() === value.toLowerCase() ? (
          <span key={i} style={highlightStyle}>{v}</span>
        ) : (
          <Fragment key={i}>{v}</Fragment>
        )
      )}
    </p>
  );
});

TextHighlight.displayName = 'TextHighlight';
export default TextHighlight;
