import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Adminlogin from './Admin/Adminlogin';
import Adminhome from './Admin/Adminhome';
import AllProjects from './Admin/AllProjects';
import AllActivities from './Admin/AllActivities';
import TeamMembers from './Admin/TeamMembers';
import AddMember from './Admin/AddMember';
import AddActivity from './Admin/AddActivity';
import AllAdmins from './Admin/AllAdmins';

function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Adminlogin/>}/>
     <Route path='/adminhome' element={<Adminhome />}/>
      <Route path='/allprojects' element={<AllProjects />}/>
      <Route path='/addactivity' element={<AddActivity />}/>
      <Route path='/teammembers' element={<TeamMembers />}/>
      <Route path='/allactivities' element={<AllActivities />}/>
      <Route path='/addmember' element={<AddMember/>}/>
      <Route path='/alladmins' element={<AllAdmins />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
