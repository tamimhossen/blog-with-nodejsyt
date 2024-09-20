const express = require("express");
const router = express.Router();
const post = require("../models/Post.js");

//Routes
//Home
//Get method
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Nodejs Blog",
      description: " A simple nodejs blog application",
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await post
      .aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// router.get("", async (req, res) => {
//   const locals = {
//     title: "Nodejs Blog",
//     description: " A simple nodejs blog application",
//   };

//   try {
//     const data = await post.find();
//     res.render("index", { locals, data });
//   } catch (error) {
//     console.log(error);
//   }
// });

//Get method
//post:id

router.get("/post/:id", async (req, res) => {
  try {
    const slug = req.params.id;
    const data = await post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: " A simple nodejs blog application",
    };
    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});


//Post method
//post- Search Terms

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: " A simple nodejs blog application",
    };


    let searchTerm = req.body.searchTerm
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    // const data = await post.find();
    res.send(searchTerm);
  } catch (error) {
    console.log(error);
  }
});




router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
