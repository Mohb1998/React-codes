//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


//Ya ebn el nas 2esm el zeft database bade2 be 7arf capital
mongoose.connect("mongodb://localhost:27017/WikiDB", {
    useNewUrlParser: true
});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

///////////////////////////////////Requests Targetting all Articles////////////////////////

app.route("/articles")

    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })

    .post(function (req, res) {

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article.");
            } else {
                res.send(err);
            }
        });
    })

    .delete(function (req, res) {

        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all articles.");
            } else {
                res.send(err);
            }
        });
    });

////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.route("/articles/:articleTitle")

    .get(function (req, res) {

        Article.findOne({
            title: req.params.articleTitle
        }, function (err, foundArticle) {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No articles matching that title was found.");
            }
        });
    })

    //Replaces the entry therefore if a parameter is left out it will be deleted
    .put(function (req, res) {

        Article.updateOne({
                title: req.params.articleTitle
            }, {
                title: req.body.title,
                content: req.body.content
            },
            //{overwrite: true},
            function (err) {
                if (!err) {
                    res.send("Successfully updated the selected article.");
                }
            }
        );
    })

    //The patch is the same as put() but won't overwrite a parameter that has been left out
    .patch(function (req, res) {

        Article.updateOne({
                title: req.params.articleTitle
            }, {
                //Here we set a certain field only
                //The req.body is a JSON object that contains both title and content
                //when we send a patch request we will check the fields and update only the fields 
                //that have been updated
                $set: req.body
            },
            function (err) {
                if (!err) {
                    res.send("Successfully updated article.");
                } else {
                    res.send(err);
                }
            }
        );
    })

    .delete(function (req, res) {

        Article.deleteOne({
                title: req.params.articleTitle
            },
            function (err) {
                if (!err) {
                    res.send("Successfully deleted the corresponding article.");
                } else {
                    res.send(err);
                }
            }
        );
    });



app.listen(3000, function () {
    console.log("Server started on port 3000");
});