const express = require('express');

const router = express.Router();
const newsController = require('../controllers/news');
const fetchUserMiddleware = require('../middlewares/fetchUser');

router.get('/all',newsController.getAllArticles);

router.get('/', fetchUserMiddleware , newsController.getArticles);

router.post('/', fetchUserMiddleware , newsController.postArticle);

router.put('/', fetchUserMiddleware , newsController.editArticle);

router.delete('/', fetchUserMiddleware , newsController.deleteArticle);

module.exports = router;