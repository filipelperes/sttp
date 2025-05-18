import Clock from "./components/Clock";
import CommandPalette from "./components/CommandPalette";
import HandleWindow from "./components/HandleWindow";
import StoreProvider from "./providers/StoreProvider";

function App() {

  return (
    <StoreProvider>
      <div id="App" className="d-flex justify-center align-middle column pos-relative">
        <Clock />
        <CommandPalette />
        <HandleWindow />
      </div>
    </StoreProvider>
  );
}

export default App;