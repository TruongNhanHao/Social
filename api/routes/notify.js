const router = require("express").Router();
const Notify = require("../models/Notify");

router.post("/", async (req, res) => {
  const newNotify = new Notify(req.body);
  try {
    const savedComment = await newNotify.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all
router.get("/:id", async (req, res) => {
  try {
    const notify = await Notify.find({
      userId: { $in: [req.params.id] },
    });
    res.status(200).json(notify);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne(req.params.id);
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
    res.status(200).json("the notify has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/add/:_id", async (req, res) => {
  try {
    await Notify.findByIdAndUpdate(req.params._id, {
      $push: {
        notifications: {
          senderId: req.body.senderId,
          receiverId: req.body.receiverId,
          postId: req.body.postId,
          senderName: req.body.senderName,
          type: req.body.type,
        },
      },
    });
    res.status(200).json("The notify has been push");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/pull/:_id", async (req, res) => {
  try {
    await Notify.findByIdAndUpdate(req.params._id, {
      $pull: {
        notifications: { _id: req.body._id },
      },
    });
    res.status(200).json("The notify has been push");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
