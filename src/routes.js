import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './pages/Login';
import Attendances from './pages/Attendances';
import NewAttendance from './pages/NewAttendance';
import EditAttendance from './pages/EditAttendance';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/login" Component={Login}/>
        <Route path="/attendances" Component={Attendances}/>
        <Route path="/attendances/new_attendance" Component={NewAttendance}/>
        <Route path="/attendances/:attendance_id" Component={EditAttendance}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;