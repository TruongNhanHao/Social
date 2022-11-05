const router = require("express").Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all
router.get("/:postId", async (req, res) => {
  try {
    const comment = await Comment.find({
      postId: { $in: [req.params.postId] },
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get id
// router.get("/:id", async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);
//     res.status(200).json(comment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.from === req.body.from) {
      await comment.updateOne({ $set: req.body });
      res.status(200).json("the comment has been updated");
    } else {
      res.status(403).json("you can update only your comment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    await comment.deleteOne();
    res.status(200).json("the comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/feedback/:_id", async (req, res) => {
  try {
    const feedback = await Comment.findByIdAndUpdate(req.params._id, {
      $push: {
        feedback: { userId: req.body.userId, content: req.body.content },
      },
    });
    res.status(200).json("The comment has been feedback");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/feedback/u/:id", async (req, res) => {
  try {
    const feedbacks = await Comment.updateOne(
      {
        _id: req.params.id,
        "feedback._id": req.body._id,
      },
      {
        $set: {
          "feedback.$.content": req.body.content,
        },
      },
      { new: true }
    );
    res.status(200).json("da update", feedbacks);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/feedback/d/:id", async (req, res) => {
  try {
    const feedback = await Comment.findById(req.params.id);
    if (feedback) {
      await Comment.updateOne({
        $pull: {
          feedback: { _id: req.body._id },
        },
      });
      res.status(200).json("da xoa cm");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
