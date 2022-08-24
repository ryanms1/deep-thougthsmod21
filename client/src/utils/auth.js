import decode from 'jwt-decode'

class AuthService {
    //retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if the user is still logged in
    loggedIn() {
        // checks if there is a saved token and its still valid
        const token = this.getToken();
        // user type coersion to check if token is NOT undefined and the token is not expired
        return !!token && !this.isTokenExpired(token)
    }

    //check if hte token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token)
            if (decode.exp < Date.now() / 100) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from localstorage
    getToken() {
        //Retrieves the use token from localstorage
        return localStorage.getItem('id_token')
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        //Saves user token to localStorage
        localStorage.setItem('id_token', idToken)

        window.location.assign('/')
    }

    // clear token from localStorage and force logout with reload
    logout() {
        //clear user token and profile data from localstorage
        localStorage.removeItem('id_token')
        //this will reload the page and reset the state of the application
        window.location.assign('/')
    }
};

export default new AuthService();