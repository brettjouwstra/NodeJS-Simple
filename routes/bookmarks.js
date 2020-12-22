const express = require('express');

const router = express.Router();

const Bookmark = require('../models/Bookmark');

//ROUTE - GET All Bookmarks - http://URL/list
router.get("/", async (req, res) => { //No need to change point because set the routing endpoints using middleware in app.js
    try {
        const allBookmarks = await Bookmark.find();
        res.json(allBookmarks)
    }catch(err){
        res.json({ message:err })
    }
});

// ROUTE - POST New Bookmark - http://URL/list/new
router.post("/new", async (req, res) => { 
    const newBookmark = new Bookmark({
        title: req.body.title,
        url: req.body.url,
        tags: req.body.tags,
        primaryTag: req.body.tags[0]
    });
    try {
        const confirm = await newBookmark.save();
        res.json(confirm)
    }catch(err) {
        res.json({message: err})
    }
});

// ROUTE - GET One Bookmark by ID - http://URL/list/<documentId>
router.get("/:bookmarkId", async (req, res) => {
    try {
        const oneBookmark = await Bookmark.findById(req.params.bookmarkId);
        res.json(oneBookmark);
    }catch(err){
        res.json({ message:err })
    }
});

//ROUTE - DELETE a Bookmark by ID - http://URL/list/<documentId>
router.delete("/:bookmarkId", async (req, res) => {
    try {
        const oneBookmark = await Bookmark.remove({ _id:req.params.bookmarkId });
        res.json({ message:"Bookmark Removed"});
    }catch(err){
        res.json({ message:err })
    }
});

//ROUTE - UPDATE a Bookmark by ID - http://URL/list/<documentId>
router.patch("/:bookmarkId", async (req, res) => {
    try {
        const oneBookmark = await Bookmark.updateOne({ _id:req.params.bookmarkId }, 
            {$set: {
                title: req.body.title,
                url: req.body.url,
                tags: req.body.tags,
                primaryTag: req.body.primaryTag,
                date: req.body.date
            } });

        res.json({ message:oneBookmark });
    }catch(err){
        res.json({ message:err })
    }
});

module.exports = router;

// Note that req.body ties to the Postman/Insomnia forms by the same name it's the request body. 