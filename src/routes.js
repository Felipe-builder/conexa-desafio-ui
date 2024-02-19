import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './pages/Login';
import Attendances from './pages/Attendances';
import NewAttendance from "./pages/NewAttendance";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/login" Component={Login}/>
        <Route path="/attendances" Component={Attendances}/>
        <Route path="/attendances/new_attendance" Component={NewAttendance}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;