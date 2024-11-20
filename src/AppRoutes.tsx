import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>HOME PAGE</Layout>} />
      <Route path="/user-profile" element={<h1>USER PROFILE PAGE</h1>} />
      <Route path="*" element={<Navigate to="/" />} />{" "}
      {/* if user types a route which is not exist, then this can work. */}
    </Routes>
  );
};

export default AppRoutes;
