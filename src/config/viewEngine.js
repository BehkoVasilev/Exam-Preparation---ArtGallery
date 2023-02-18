const hbs = require('express-handlebars');

const handlebars = hbs.create({});

handlebars.handlebars.registerHelper('arrayLength', function (array) {
    return array.length === 0;
});

function setupViewEngine(app) {

    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}

module.exports = setupViewEngine;
