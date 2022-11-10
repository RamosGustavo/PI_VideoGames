import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/Landingpage/LandingPage";
import Home from "./components/Home/Home";
import Create from "./components/CreateVideogame/CreateVideogame.jsx"
import Detail from "./components/Detail/Detail";
// import Favourites from "./components/Favourites/Favourites";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route exact path="/videogames" component={Create} />
          <Route exact path="/videogame/:id" component={Detail} />
          {/* <Route exact path="/favourites" component={Favourites} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
