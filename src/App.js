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
import AddEventPhoto from './Admin/AddEventPhoto';
import ProtectedRoute from './Admin/ProtectedRoute';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <BrowserRouter>
     <Analytics />
    <Routes>
     <Route path='/' element={<Adminlogin/>}/>
     <Route path='/adminhome' element={ <ProtectedRoute><Adminhome /></ProtectedRoute>}/>
      <Route path='/allprojects' element={ <ProtectedRoute><AllProjects /></ProtectedRoute>}/>
      <Route path='/addactivity' element={ <ProtectedRoute><AddActivity /></ProtectedRoute>}/>
      <Route path='/teammembers' element={ <ProtectedRoute><TeamMembers /></ProtectedRoute>}/>
      <Route path='/allactivities' element={ <ProtectedRoute><AllActivities /></ProtectedRoute>}/>
      <Route path='/addmember' element={ <ProtectedRoute><AddMember/></ProtectedRoute>}/>
      <Route path='/alladmins' element={ <ProtectedRoute><AllAdmins /></ProtectedRoute>}/>
      <Route path='/addeventphoto' element={ <ProtectedRoute><AddEventPhoto/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
