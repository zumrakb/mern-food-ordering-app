import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/user-profile" element={<h1>USER PROFILE PAGE</h1>} />
      <Route path="*" element={<Navigate to="/" />} />{" "}
      {/* if user types a route which is not exist, then this can work. */}
    </Routes>
  );
};

export default AppRoutes;
