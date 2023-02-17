
exports.getHomeController = async (req, res) => {
    res.render('home')
};

exports.get404Controller = (req, res) => {
    res.render('404')
};