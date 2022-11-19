import { useAuth0 } from "@auth0/auth0-react";
const Security = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isAuthenticated) {
        localStorage.setItem('userid', user.sub.split('|')[1]);
        localStorage.setItem('username', user.name);
    } else {
    }

};


function CheckAuth() {
    return (
        <div>
            <Security />
        </div>
    );
}

export default CheckAuth;