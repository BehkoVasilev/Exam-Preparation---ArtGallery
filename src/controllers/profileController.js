const { isAuthenticated } = require("../middlewares/authenticationMiddleware")

exports.getProfileController = (req, res) => {
    const user = req.user
    res.render('profile', { user })
}