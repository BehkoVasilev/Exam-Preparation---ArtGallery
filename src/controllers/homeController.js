const publicationService = require('../service/publicationService');



exports.getHomeController = async (req, res) => {
    const publications = await publicationService.getAll();
    console.log(publications.shares)
    res.render('home', { publications });
};

exports.get404Controller = (req, res) => {
    res.render('404')
};