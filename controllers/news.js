const Article = require('../models/article');
const user = require('../models/user');

exports.getAllArticles = (req,res,next) => {
    Article.find()
    .then(articles=>{
        res.status(200).json({ type : "success" , articles : articles});
    })
    .catch(err=>{
        res.status(500).json({ type : "error" , message : "internal server error"});
    }) 
}

exports.getArticles = (req,res,next) => {
    const userId = req.user.id;
    if(!userId) return res.status(401).json({ type : "error" , message : "Unauthorized Request"});
    Article.find({userId : userId})
    .then(articles=>{
        res.status(200).json({ type : "success" , articles : articles});
    })
    .catch(err=>{
        res.status(500).json({ type : "error" , message : "internal server error"});
    })

};

exports.postArticle = (req, res, next) => {
    const userId = req.user.id;
    if(!userId) return res.status(401).json({ type : "error" , message : "Unauthorized Request"});
    
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const url = req.body.url;
    const author = req.body.author;
    const sourceName = req.body.sourceName;

    const article = new Article({
        title : title,
        description : description,
        imageUrl : imageUrl,
        url : url,
        author : author,
        sourceName : sourceName,
        userId : userId
    });

    article.save()
    .then(result=>{
        res.status(200).json({ type : "success" , message : "article added successfully"});
    })
    .catch(err=>{
        res.status(500).json({ type : "error" , message : "internal server error"});
    });

};

exports.editArticle = (req,res,next) => {
    const userId = req.user.id;
    if(!userId) return res.status(401).json({ type : "error" , message : "Unauthorized Request"});
    
    const articleId = req.body.articleId;
    const updateTitle = req.body.title;
    const updateDes = req.body.description;
    const updateImageUrl = req.body.imageUrl;
    const updateUrl = req.body.url;
    const updateAuthor = req.body.author;
    const updateSourceName = req.body.sourceName;

    Article.findById(articleId)
    .then(article => {
        article.title = updateTitle;
        article.description = updateDes;
        article.imageUrl = updateImageUrl;
        article.url = updateUrl;
        article.author = updateAuthor;
        article.sourceName = updateSourceName;

        return article.save();
    })
    .then(result=>{
        res.status(200).json({ type : "success" , message : "article edited successfully"});
    })
    .catch(err=>{
        res.status(500).json({ type : "error" , message : "internal server error"});
    });
};

exports.deleteArticle = (req,res,next)=> {
    const userId = req.user.id;
    if(!userId) return res.status(401).json({ type : "error" , message : "Unauthorized Request"});
    
    const articleId = req.body.articleId;

    Article.findByIdAndRemove(articleId)
    .then(result => {
        res.status(200).json({ type : "success" , message : "article deleted successfully"});
    })
    .catch(err=>{
        res.status(500).json({ type : "error" , message : "internal server error"});
    });

};