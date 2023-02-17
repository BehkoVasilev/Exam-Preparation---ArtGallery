const jwt = require('../lib/jwt');
const { SECRET } = require('../constants');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;

            res.locals.isAuthenticated = true

        } catch (err) {
            res.clearCookie('auth')
            return res.status(401).render('auth/login', { error: 'Invalid username or password!' })
        }

    }
    next();
}

exports.isAuthenticated = (req, res, next) => {
    if (!req.user) {
        res.redirect('/login')
    }

    next();
}