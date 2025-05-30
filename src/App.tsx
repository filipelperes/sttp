import Clock from "@/components/Clock";
import HandleCommandPalette from "@/CommandPalette/components/HandleCommandPalette";
import HandleWindow from "@/components/HandleWindow";

const App = () => (
  <div id="App" className="d-flex justify-center align-middle column pos-relative">
    <Clock />
    <HandleCommandPalette />
    <HandleWindow />
  </div>
);


export default App;
