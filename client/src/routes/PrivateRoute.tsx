import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
