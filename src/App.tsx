import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/users/:id"
          element={isLoggedIn ? <User /> : <Navigate to="/" />}
        />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
