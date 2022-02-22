const jwt = require("jsonwebtoken");

module.exports = 
{
    authenticate(request, response, next)
    {
        jwt.verify(
            request.cookies.usertoken,
            process.env.JWT_SECRET,
            (error, payload) => 
            {
                if (error)
                {
                    console.log(error);
                    response.status(401).json({verified: false})
                }
                else
                {
                    console.log(payload);
                    request.jwtpayload = payload;
                    next();
                }
            })
    }
}