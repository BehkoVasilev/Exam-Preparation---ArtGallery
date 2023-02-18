const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const publicationService = require('../service/publicationService');
const { getErrorMessage } = require('../utils/errorUtils');



const routes = require('express').Router();

routes.get('/create', isAuthenticated, (req, res) => {
    res.render('pictures/create')
});

routes.post('/create', isAuthenticated, async (req, res) => {
    authorId = req.user._id;
    const publicationData = req.body;

    try {
        await publicationService.createOne(publicationData, authorId);
    } catch (err) {
        return res.render('pictures/create', { error: getErrorMessage(err) })
    }

    res.redirect('/pictures/gallery')
});

routes.get('/:picId/details', async (req, res) => {
    const publication = await publicationService.getOne(req.params.picId).lean();

    const isOwner = req.user?._id == publication.author;

    const isAlreadyShared = publication.shares.some(id => id.equals(req.user?._id));

    res.render('pictures/details', { publication, isOwner, isAlreadyShared })
});

routes.get('/:picId/edit', isAuthenticated, async (req, res) => {

    const publication = await publicationService.getOne(req.params.picId).lean();

    res.render('pictures/edit', { publication })
});

routes.post('/:picId/edit', async (req, res) => {
    const editData = req.body;
    const picId = req.params.picId;

    await publicationService.editOne(picId, editData).lean();

    res.redirect(`/pictures/${picId}/details`)
});

routes.get('/:picId/delete', async (req, res) => {
    await publicationService.deleteOne(req.params.picId);
    res.redirect('/pictures/gallery');
});

routes.get('/gallery', async (req, res) => {
    const publications = await publicationService.getAll();

    res.render('pictures/gallery', { publications });
});

routes.get('/:picId/share', async (req, res) => {
    const picId = req.params.picId;
    const userId = req.user._id;

    try{
        await publicationService.share(picId, userId)
        res.redirect('/')
    }catch(err) {
       return res.status(400).redirect('/404')
    };
});


module.exports = routes;

