import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './stores/auth-slice/index';
import CheckAuth from './components/common/check-auth';

import './index.css'; // Or wherever you added the Tailwind directives

// Auth pages
import Login from './pages/auth/login';
import Register from './pages/auth/register';

// Role-based Home Pages
import AdminDashboard from './pages/admin/dashboard';
import CoordinatorHome from './pages/coordinator/chome';
import StudentHome from './pages/student/home';

// Layouts (optional, or use fragments if not needed)
import AuthLayout from './components/auth/layout';
import AdminLayout from './components/admin/AdminLayout';
import CoordinatorLayout from './components/coordinator/coordinatorlayout';
import StudentLayout from './components/student/studentlayout';

// Unauthorized fallback
import UnauthorizedPage from './pages/UnauthorizedPage/UnauthorizedPage';
import Technical from './pages/student/techevent';
import NonTech from './pages/student/nontech';
import UserDashboard from './pages/student/dashboard';
import Merchandise from './pages/student/merch';
import Studentinfo from './pages/admin/studentinfo';
import AdminMerchandise from './pages/admin/merchandise';
import AdminEvent from './pages/admin/event';
import AdminStudentinfo from './pages/admin/studentinfo';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  // Auto check auth on app load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <Router>
      <Routes>

        {/* Auth Routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="stuinfo" element={<AdminStudentinfo />} />
          <Route path="event" element={<AdminEvent />} />
          <Route path="merch" element={<AdminMerchandise />} />
          




        </Route>

        {/* Coordinator Routes */}
        <Route
          path="/coordinator"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <CoordinatorLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<CoordinatorHome />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <StudentLayout />
            </CheckAuth>
          }
        >  
          <Route path="home" element={<StudentHome />} />
          <Route path="techevent" element={<Technical />} />
          <Route path="nontechevent" element={<NonTech />} />
          <Route path="merchendise" element={<Merchandise />} />
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        {/* Unauthorized access fallback */}
        <Route path="/unauth-page" element={<UnauthorizedPage />} />

      </Routes>
    </Router>
  );
}

export default App;
