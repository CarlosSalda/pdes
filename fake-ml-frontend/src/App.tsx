import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Home, Login } from "./pages";
import { ProtectedRoute } from "./components";
import { useEffect, useState } from "react";
import { useStore } from "./store/useStore";
import { getUser } from "./helpers/api/apiCalls";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const token = useStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        await getUser(token);
      } catch {
        useStore.getState().setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // derivás la autenticación simplemente así
  const isAuthenticated = Boolean(token);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute element={Home} isAuthenticated={isAuthenticated} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute element={Home} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/single-product/:id"
          element={
            <ProtectedRoute
              element={ProductDetail}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
