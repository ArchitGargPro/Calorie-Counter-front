class AuthUtil {
    static jwttoken;
    static user = null ;

    static getHeaders() {
        return {
            jwttoken: this.getJWTToken(),
        };
    }

     static getJWTToken() {
        return this.jwttoken || localStorage.getItem("jwttoken");
    }

    static getUser() {
        // console.log(localStorage.getItem("user"));
        return this.user || localStorage.getItem("user");
    }

     static clearJWTToken() {
        this.jwttoken = null;
        localStorage.setItem("jwttoken", "");

         this.user = null;
         localStorage.setItem("user", null);
    }

     static setJWTToken(jwttoken, user) {
        this.jwttoken = jwttoken;
        localStorage.setItem("jwttoken", jwttoken);
         this.user = user;
         localStorage.setItem("user", user);
    }
}

export default AuthUtil;
