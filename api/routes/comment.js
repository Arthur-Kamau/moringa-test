var express = require('express');
var router = express.Router();

const randUtil = require('../util/rand-util');
const { randInBetween } = randUtil;

var CommentModel = require('../model/comment');



/* get art . comment. */
router.get('/all', async function (req, res, next) {
    var artTypes = await CommentModel.findAll();

    return res.json({ "success": true, data: artTypes });
});


/* get art . comment. */
router.get('/item/:commentId?', async function (req, res, next) {


    let commentId = 0;
    if (req.params.commentId != undefined) {

        commentId = req.params.commentId;

    }

    if (commentId != 0) {

        const commentIdInt = parseInt(commentId);

        var artTypes = await CommentModel.findOne({

            where: {
                id: commentIdInt
            },

        });
        return res.json({ "success": true, data: artTypes });
    } else {
        var artTypes = await CommentModel.findAll();

        return res.json({ "success": true, data: artTypes });
    }



});

router.post('/add', async function (req, res, next) {

    if (req.body.comment == undefined || req.body.comment.length == 0) {
        return res.json({
            "success": false,
            "reason": "comment missing or empty"

        });
    }

    //for simplicity but idealy we would extract it frm the jwt token
    if (req.body.email == undefined || req.body.email.length == 0) {
        return res.json({
            "success": false,
            "reason": "email missing or empty"

        });
    }

    const commentIdItem = Math.floor(1_000_000 + Math.random() * 3.142 * 998);
    const us = await CommentModel.create({
        commentId: commentIdItem,
        comment: req.body.comment,
        ownerId: req.body.email,//for simplicity but idealy we would extract it frm the jwt token

    });
    await us.save();

    return res.json({
        "success": true,
    });
});

router.put('/update', async function (req, res, next) {

    if (req.body.commentId == undefined || req.body.commentId.length == 0) {
        return res.json({
            "success": false,
            "reason": "comment id missing or empty"

        });
    }

    if (req.body.comment == undefined || req.body.comment.length == 0) {
        return res.json({
            "success": false,
            "reason": "comment to change missing or empty"

        });
    }

    const commentIdInt = parseInt(req.body.commentId);
    console.log("herre i am "+commentIdInt)
    await CommentModel.update({ comment: req.body.comment }, {
        where: {
            commentId: commentIdInt
        }
    });

    return res.json({
        "success": true,
    });
});


router.delete('/remove', async function (req, res, next) {

    if (req.body.commentId == undefined || req.body.commentId.length == 0) {
        return res.json({
            "success": false,
            "reason": "comment id missing or empty"

        });
    }

    const commentIdInt = parseInt(req.body.commentId);;
    await CommentModel.destroy({
        where: {
            id: commentIdInt
        }
    });

    return res.json({
        "success": true,
    });

});
module.exports = router;