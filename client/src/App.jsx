import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import BlogDetail from './pages/BlogDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
        {/* Navbar */}
        <nav className="bg-blue-900 p-4">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-white ">Welcome to Blog</Link>
            <div className="space-x-4">
              <Link to="/" className="text-white text-2xl hover:text-red-600">Home</Link>
              {isLoggedIn && (
                <Link to="/create" className="text-white text-2xl hover:text-blue-600">Create Post</Link>
              )}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-white text-2xl hover:text-red-600">Login</Link>
                  <Link to="/register" className="text-white hover:text-pink-600 text-2xl">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>
        
        {/* Page Content */}
        <main className="max-w-4xl mx-auto p-6">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <ProtectedRoute>
                  <BlogDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register onAuth={() => setIsLoggedIn(true)} />} />
            <Route path="/login" element={<Login onAuth={() => setIsLoggedIn(true)} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </main>
        <footer className='bg-gray-800 text-2xl text-white p-8 text-center'>
  <p>&copy; 2025 Bawiloussim N'GBABOU. All Rights Reserved.</p>
  <div className="mt-4 flex justify-center space-x-6">
    <a href="https://github.com/Bawiloussim" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400" aria-label="GitHub">
      <FaGithub size={32} />
    </a>
    <a href="https://www.linkedin.com/in/n-gbabou-bawiloussim-2424a627a/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400" aria-label="LinkedIn">
      <FaLinkedin size={32} />
    </a>
    <a href="mailto:bawiloussimngbabou1@gmail.com" className="hover:text-gray-400" aria-label="Email">
      <MdEmail size={32} />
    </a>
    <a href="https://wa.me/+22808462796" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400" aria-label="WhatsApp">
      <FaWhatsapp size={32} />
    </a>
  </div>
</footer>

      </div>
    </Router>
  );
}

export default App;