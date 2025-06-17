import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Example: Navbar (optional) */}
    

      {/* Main content */}
        <Outlet />

      {/* Example: Footer (optional) */}
     
    </div>
  );
};

export default AuthLayout;
