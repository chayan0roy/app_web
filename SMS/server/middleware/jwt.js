const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (getToken) => {

    if(!getToken) return res.status(401).json({ error: 'Token Not Found' });

    const token = getToken.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized' });

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        return decoded;
    }catch(err){
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.SECRET_KEY, {expiresIn: 30000});
}

module.exports = {jwtAuthMiddleware, generateToken};