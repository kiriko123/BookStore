import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import NoPermitted from "./NoPermitted.jsx";

const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const user = useSelector((state) => state.account.user);
    console.log(user);
    const userRole = user.role.name;

    console.log(userRole);

    if(isAdminRoute && userRole === 'ROLE_ADMIN'){
        return (
            <>
                {props.children}
            </>
        )
    }else{
        return <NoPermitted/>
    }
}

const ProtectedRoute = (props) => {

    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    return(
        <>
            {isAuthenticated ?
                <>
                    <RoleBaseRoute>
                        {props.children}
                    </RoleBaseRoute>
                </>
                :
                <Navigate to='/login' replace/>
            }
        </>
    )
}
export default ProtectedRoute;