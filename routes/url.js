const express = require('express');
const staticRouter = express.Router();
const URL = require('../models/url');

staticRouter.get('/url/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId: shortId}, {$push: {visitHistory: {timestamp: new Date()}}});
    if(entry){
        return res.redirect(entry.redirectURL);
    }
    else {
        return res.status(404).json('The short URL you are trying to access does not exist.');
    }
})

module.exports = staticRouter;