
class AuthUtil {
    static jwttoken;
    static user = '' ;

    static getHeaders() {
        return {
            jwttoken: this.getJWTToken(),
        };
    }

     static getJWTToken() {
        return this.jwttoken || localStorage.getItem("jwttoken");
    }

    static getUser() {
       try {
           JSON.parse(localStorage.getItem("user"))
       }catch (e) {
          return ''
       }
        return this.user || JSON.parse(localStorage.getItem("user"));
   //JSON.parse(localStorage.getItem("user"))  this is showing error when user is empty string '' instead of object
    }

     static clearJWTToken() {
        this.jwttoken = null;
        localStorage.setItem("jwttoken", "");

         this.user = '';   //localStorage.setItem("user", null); null and undefined got converted to string, thus to true
         localStorage.setItem("user", this.user);
//localstorage store values in string format, thus every type is converted to string , except empty string which is already
// string and is considered false,
    }

     static setJWTToken(jwttoken, user) {
        this.jwttoken = jwttoken;
        localStorage.setItem("jwttoken", jwttoken);
         this.user = user;
         // console.log('<<<<<<<<<<<<<<<<<<setJWTToken>>>>>>>>>>>>>>>', JSON.stringify(this.user));
         localStorage.setItem("user", JSON.stringify(this.user));
    }
}

export default AuthUtil;
