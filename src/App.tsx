import Clock from "@/components/Clock";
import HandleCommandPalette from "@/CommandPalette/components/HandleCommandPalette";
import HandleWindow from "@/components/HandleWindow";

const App = () => (
  <div id="App" className="flex items-center justify-center flex-col relative">
    <Clock />
    <HandleCommandPalette />
    <HandleWindow />
  </div>
);


export default App;
