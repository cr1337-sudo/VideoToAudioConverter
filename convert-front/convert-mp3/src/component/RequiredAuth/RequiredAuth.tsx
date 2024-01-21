import { Navigate, Outlet } from "react-router-dom";
import React from 'react';
interface RequireAuthProps {
    Token: string | undefined;
  }
  
 const RequireAuth: React.FC<RequireAuthProps> = ({Token}) => {

  if (!Token) {
    return <Navigate to={'/'}/>;
  }

  return <Outlet/>;
};

export default RequireAuth