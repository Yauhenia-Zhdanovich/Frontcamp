const routes = require('express').Router();
const mongoose = require('mongoose');
const logger = require('../logger/logger');
const News = require('../models/news.model')

routes.get('/', (req, res) => {
    res.status(200).send('Welcome to the testies news website!');
    log(req);
})

routes.get('/news', (req, res) => {
    News.find()
    .exec()
    .then(docs => {
        res.status(200).json({status: 200, articles: docs});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    log(req);
});

routes.post('/news', (req, res) => {
    console.log(req.body, "body")
    const news = new News({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        urlToImage: req.body.urlToImage,
        url: req.body.url,
        author: req.body.author,
        source: req.body.source,
        publishedAt: req.body.publishedAt
    });
    news.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    res.status(200).json({ type: req.method, publishedNews: news });
    log(req);
});

routes.get('/news/:id', (req, res) => {
    const id = req.params.id;
    News.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message : 'No valid entry for this id'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    log(req);
});

routes.patch('/news/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    News.update({_id: id}, {$set: {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        urlToImage: req.body.urlToImage,
        url: req.body.url,
        author: req.body.author,
        publishedAt: req.body.publishedAt
    }})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    log(req);
});

routes.delete('/news/:id', (req, res) => {
    const id = req.params.id;
    News.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    log(req);
});

let log = (req) => {
    logger.log({
        level: 'info',
        url: req.headers.host + req.url,
        method: req.method,
        date: new Date()
    });
}

module.exports = routes;
