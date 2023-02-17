const express = require('express');
const setupViewEngine = require('./config/viewEngine');
const initDatabase = require('./config/initDatabase');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { authentication } = require('./middlewares/authenticationMiddleware');



const port = 3000;

const app = express();
setupViewEngine(app);

app.use(express.static('src/static'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

initDatabase()
    .then(() => app.listen(port, () => console.log(`Server is listening on port 3000...`)))
    .catch((err) => console.log(err.message))

