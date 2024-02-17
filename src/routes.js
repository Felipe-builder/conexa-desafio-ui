import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './pages/Login';
import Attendance from './pages/Attendance';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/attendance" Component={Attendance}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;