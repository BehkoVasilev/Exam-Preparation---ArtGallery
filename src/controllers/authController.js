const authService = require("../service/authService");
const { getErrorMessage } = require("../utils/errorUtils");

exports.getRegisterController = (req, res) => {
    res.render('auth/register');
};

exports.postRegisterController = async (req, res) => {
    const { username, password, repassword, address } = req.body;

    if (repassword == '') {
        return res.render('auth/register', { error: `Confirm password is required!` });
    }

    if (password !== repassword) {
        return res.render('auth/register', { error: `Password does not match!` });
    };

    const existingUser = await authService.getUserByUsername(username);

    if (existingUser) {
        return res.render('auth/register', { error: `User already exists!` })
    }
    try {
        const token = await authService.register(username, password, address);
        res.cookie('auth', token, { httpOnly: true });

    } catch (err) {
        return res.render('auth/register', { error: getErrorMessage(err) });
    }

    res.redirect('/')
};

exports.getLoginController = (req, res) => {
    res.render('auth/login')
};

exports.postLoginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
        res.cookie('auth', token, { httpOnly: true });

    } catch (err) {
        return res.render('auth/login', { error: getErrorMessage(err) });
    }

    res.redirect('/')
};

exports.getLogoutController = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}