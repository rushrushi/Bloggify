const {validateToken} = require("../services/authentication")

function checkForAuthenticationCookie(cookieName) {
    console.log(cookieName);
    
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        console.log(tokenCookieValue);
        
        if(!tokenCookieValue){
            console.log("Noo Token");
            
           return next()
        }

        try {
            console.log("Try section");
            
            const userPayload = validateToken(tokenCookieValue)
            console.log(userPayload);
            
            req.user = userPayload
        } catch (error) {
            console.log("Invalid Cookie", error.name, error.message);
            
        }

        return next()
    }
}


module.exports = {checkForAuthenticationCookie}