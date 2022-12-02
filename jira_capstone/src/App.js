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
import ModalAdmin from "./components/Admin/ModalAdmin/ModalAdmin";
import Dashboard from "./components/Admin/Task/Dashboard";
import EditUser from "./components/Admin/User/EditUser";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";



export const history = createBrowserHistory()
function App() {
  return (
    <Router  history={history}>
      <ModalCyberBug/> 
      <ModalAdmin/>
      <Switch>
        <JiraTemplate exact path='/' Component={ProjectManagement}/>
        <HomeTemplate exact path='/home' Component={Home}/>
        <HomeTemplate exact path='/profile' Component={Home}/>
        <UserTemplate exact path='/login' Component={Login}/>
        <UserTemplate exact path='/register' Component={Register}/>
        <JiraTemplate excat path='/jirabugs' Component={JiraBug}/>
        <JiraTemplate excat path='/createproject' Component={CreateProject}/>
        <JiraTemplate excat path='/projectmanagement' Component={ProjectManagement}/>
        <JiraTemplate excat path='/projectdetail/:projectId' Component={JiraBug}/>



        <AdminTemplate path='/admin' exact Component={Dashboard}/>
        <AdminTemplate path='/admin/dashboard' exact Component={Dashboard}/>
        <AdminTemplate path='/admin/edit' exact Component={EditUser}/>
      </Switch>
    </Router>
  );
}

export default App;
