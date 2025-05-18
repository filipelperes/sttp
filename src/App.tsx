import Clock from "./components/Clock";
import CommandPalette from "./components/CommandPalette";
import HandleWindow from "./components/HandleWindow";

const App = () => (
  <div id="App" className="d-flex justify-center align-middle column pos-relative">
    <Clock />
    <CommandPalette />
    <HandleWindow />
  </div>
);


export default App;