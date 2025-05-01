import Clock from "./components/Clock";
import Search from "./components/Search";
import HandleWindow from "./components/HandleWindow";
import StoreProvider from "./StoreProvider";

function App() {

  return (
    <StoreProvider>
      <div className="App">
        <Clock />
        <Search />
        <HandleWindow />
      </div>
    </StoreProvider>
  );
}

export default App;