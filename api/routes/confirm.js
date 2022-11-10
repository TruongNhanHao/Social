const router = require("express").Router();
const ConFirm = require("../models/Confirm");

//create a post

router.post("/", async (req, res) => {
  const newConFirm = new ConFirm(req.body);
  try {
    const savedConFirm = await newConFirm.save();
    res.status(200).json(savedConFirm);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const confirm = await ConFirm.findById(req.params.id);
    await confirm.deleteOne();
    res.status(200).json("the confirm has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const confirm = await ConFirm.find({ receiverId: req.params.id });
    res.status(200).json(confirm);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
