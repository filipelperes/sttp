import Clock from "@/components/Clock";
import DateDisplay from "@/components/DateDisplay";
import HandleCommandPalette from "@/CommandPalette/components/HandleCommandPalette";
import HandleWindow from "@/components/HandleWindow";
import SettingsButton from "@/features/Settings/components/SettingsButton";
import WelcomeTour from "@/features/WelcomeTour/components/WelcomeTour";

const App = () => (
  <div id="App" className="flex items-center justify-center flex-col relative">
    <Clock />
    <DateDisplay />
    <HandleCommandPalette />
    <HandleWindow />
    <SettingsButton />
    <WelcomeTour />
  </div>
);

export default App;
