import Clock from "./components/Clock";
import Input from "./components/Input";
import HandleWindow from "./components/HandleWindow";
import { Suggestions } from "./utils/types/Suggestion";
import { useState } from "react";

function App() {
  const [focus, setFocus] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestions>([]);

  return (
    <div className="App">
      <Clock focus={focus} />
      <Input
        focus={focus}
        setFocus={setFocus}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
      />
      <HandleWindow
        setFocus={setFocus}
        focus={focus}
        setSuggestions={setSuggestions}
      />
    </div>
  );
}

export default App;