const router = require('express').Router();
const { getHomeController, get404Controller } = require('./controllers/homeController');
const authController = require('./controllers/authController');
const publicationController = require('./controllers/publicationController');
const { isAuthenticated } = require('./middlewares/authenticationMiddleware');
const { getProfileController } = require('./controllers/profileController');

router.get('/', getHomeController);

router.get('/register', authController.getRegisterController);
router.post('/register', authController.postRegisterController);
router.get('/login', authController.getLoginController);
router.post('/login', authController.postLoginController);
router.get('/logout', isAuthenticated, authController.getLogoutController);
router.get('/profile', isAuthenticated, getProfileController);

router.use('/pictures', publicationController)

router.use('*', get404Controller);

module.exports = router;