import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from '../src/scenes/homePage/index';
import SignIn from '../src/scenes/signInPage/index';
import SignUp from "../src/scenes/signUpPage/index"
import ForgotPassword from './scenes/updatePassword/forgotPassword';
import ChangePassword from './scenes/updatePassword/changePassword';
import FileUpload from './scenes/fileUploadPage';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={isAuth ? <ChangePassword /> : <Navigate to="/signin"/>} />
          <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/signin"/>}/>
          <Route path="/workspace/:workspaceID" element={isAuth ? <HomePage /> : <Navigate to="/signin"/>}/>
          <Route path="/workspace/:workspaceID/file-upload" element={isAuth ? <FileUpload /> : <Navigate to="/signin"/>}/>
          <Route path="*" element={isAuth ? <Navigate to="/" /> : <Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
