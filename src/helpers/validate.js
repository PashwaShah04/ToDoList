import jwtDecode from 'jwt-decode';

export const isJWTValid = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        throw new Error("No JWT available in the local storage");
    }

    const token = jwtDecode(user.token)
    if (token.username) {
        if (Date.now() >= token.exp * 1000) {
            throw new Error("Token has expired")
        }
        return true;
    } else {
        throw new Error("Unable to decode token")
    }
};