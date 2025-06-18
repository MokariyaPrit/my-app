import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { PrivateRoute } from './routes/PrivateRoute';
import { RequireRole } from './routes/RequireRole';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { useAuth } from './context/AuthContext';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Unauthorized from './pages/Unauthorized';

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or show loader

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />

      <Route
        path="*"
        element={
          <PrivateRoute>
            <Layout>
              <Routes>
                {/* ✅ Role Protected Route */}
                <Route
                  path="/superadmin"
                  element={
                    <RequireRole role="superadmin">
                      <SuperAdminDashboard />
                    </RequireRole>
                  }
                />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
