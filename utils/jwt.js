const jwt = require('jsonwebtoken');

module.exports = {
     create (data){
        try {
            return jwt.sign(data,process.env.SECRET);
        } catch (error) {
            next(error)
        }
    },
    async verify (token){
        try {
            const match = await jwt.verify(token,process.env.SECRET);
            return match;
            
        } catch (error) {
            next(error)
        }
    }
}