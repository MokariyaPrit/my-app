import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { PrivateRoute } from "./routes/PrivateRoute";
import { RequireRole } from "./routes/RequireRole";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAuth } from "./context/AuthContext";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import AdminPanel from "./pages/AdminPanel";
import ManagerPanel from "./pages/ManagerPanel";
import AddCarPage from "./pages/AddCarPage";
import CarListPage from "./pages/CarListPage";
import CarDetails from "./pages/CarDetails";
import CarEditPage from "./pages/CarEditPage";
import AllCarsPage from "./pages/AllCarsPage";
import PublicCarsPage from "./pages/PublicCarsPage";
import ManagerCarsPage from "./pages/AllCarsPage";
import CarDetailsPage from "./pages/CarDetailsPage";

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or show loader

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />

      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
      />

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
                <Route
                  path="/admin"
                  element={
                    <RequireRole role="admin">
                      <AdminPanel />
                    </RequireRole>
                  }
                />
                <Route
                  path="/manager"
                  element={
                    <RequireRole role="manager">
                      <ManagerPanel />
                    </RequireRole>
                  }
                />
                <Route
                  path="/add-car"
                  element={
                    <RequireRole role="manager">
                      <AddCarPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/add-car"
                  element={
                    <RequireRole role="superadmin">
                      <AddCarPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/add-car"
                  element={
                    <RequireRole role="admin">
                      <AddCarPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/add-car"
                  element={
                    <RequireRole role="manager">
                      <CarListPage />
                    </RequireRole>
                  }
                />

                <Route
                  path="/add-car"
                  element={
                    <RequireRole role="admin">
                      <CarListPage />
                    </RequireRole>
                  }  
                />
                <Route
                  path="/add-car"
                  element={
                    <RequireRole role="superadmin">
                      <CarListPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="/secure/cars/:id"
                  element={
                    <RequireRole role="manager">
                      <CarDetails />
                    </RequireRole>
                  }
                />
                <Route
                  path="/secure/cars/:id"
                  element={
                    <RequireRole role="admin">
                      <CarDetails />
                    </RequireRole>
                  }
                />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/car-list" element={<CarListPage />} />
                <Route path="/cars/:id" element={<CarDetailsPage />} />
                <Route path="/cars/edit/:id" element={<CarEditPage />} />
                <Route path="/ManagerCarsPage" element={<ManagerCarsPage />} />
                <Route path="/cars/public" element={<PublicCarsPage />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
