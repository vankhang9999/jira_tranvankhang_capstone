import Login from "./pages/Login/Login";
import { createBrowserHistory } from "history";
import { Router, Switch} from "react-router";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import JiraTemplate from "./templates/JiraTemplate/JiraTemplate";
import JiraBug from "./templates/JiraTemplate/JiraBug";
import CreateProject from "./pages/JiraBug/Createproject/CreateProject";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import ModalCyberBug from "./components/CyberBugsHOC/ModalCyberBug";



export const history = createBrowserHistory()
function App() {
  return (
    <Router  history={history}>
      <ModalCyberBug/> 
      <Switch>
        <HomeTemplate exact path='/' Component={Home}/>
        <HomeTemplate exact path='/home' Component={Home}/>
        <HomeTemplate exact path='/profile' Component={Home}/>
        <UserTemplate exact path='/login' Component={Login}/>
        <UserTemplate exact path='/register' Component={Register}/>
        <JiraTemplate excat path='/jirabugs' Component={JiraBug}/>
        <JiraTemplate excat path='/createproject' Component={CreateProject}/>
        <JiraTemplate excat path='/projectmanagement' Component={ProjectManagement}/>
      </Switch>
    </Router>
  );
}

export default App;
