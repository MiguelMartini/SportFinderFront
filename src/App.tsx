import "./App.css";
import { Button } from "./components/ui/button";
import "./index.css";

import Login from "./pages/Autentication/Login";
import Menu from "./components/custom/Menu";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="">
      <h1 className="bg-amber-300">Everyone</h1>
      <Button variant="outline">Button</Button>
      <Menu/>

      <Login/>
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default App;
