const express = require("express");
const { upload } = require("../../helpers/cloudinary");

const {
  handleImageUpload,
  addMerch,
  editMerch,
  fetchAllMerch,
  deleteMerch,
} = require("../../controllers/admin/Merch-controller");

const router = express.Router();

// Upload image for merch
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// Add new merch
router.post("/add", addMerch);

// Edit merch
router.put("/edit/:merchId", editMerch);

// Delete merch
router.delete("/delete/:merchId", deleteMerch);

// Fetch all merch
router.get("/get", fetchAllMerch);

module.exports = router;
