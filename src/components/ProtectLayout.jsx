import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <>
      {/* Render the current route's component */}
      <Outlet />
    </>
  );
}
