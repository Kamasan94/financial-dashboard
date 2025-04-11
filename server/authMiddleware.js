// Reads JWT form header Authorization
// Verify it
// Add req.userId into the request

const jwtSecret = process.env.jwtSecret;

module.exports = {
    authHanlder: function(req, res, next){
        const token = req.get("Authorization");
        if(!token){
            return res.status(401).send('Access Denied');
        }
        
        jwt.verify(token, jwtSecret, (err, user) =>{
            console.log(err);
            if(err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
};

