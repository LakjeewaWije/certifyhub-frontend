import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children ,isLoggedIn  }: any) => {
    return isLoggedIn ? (
        children
    ) : (
        <Navigate
            to={`/login`}
        />
    );
};

export default PrivateRoute;