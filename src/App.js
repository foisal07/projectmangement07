import { BrowserRouter, Switch, Route } from "react-router-dom";
import { firestore } from "./firbase/config";

import "./App.css";

// Pages and components
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import CreateProject from "./pages/project/CreateProject";
import ProjectDetail from "./pages/project/ProjectDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/project:id">
              <ProjectDetail />
            </Route>
            <Route path="/create">
              <CreateProject />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
