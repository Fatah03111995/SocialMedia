import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/LoginPage';
import ProfilePage from 'scenes/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
