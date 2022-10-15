import { isJWTValid } from '../helpers/validate'

export default function useUserDetails() {
    try {
        return isJWTValid();
    } catch (err) {
        localStorage.removeItem("user");
        return false;
    }
}
