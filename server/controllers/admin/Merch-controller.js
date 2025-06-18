const { imageUploadUtil } = require("../../helpers/cloudinary");
const Merch = require("../../models/Merch");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({ success: true, result });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};

const addMerch = async (req, res) => {
    try {
      const { name, org, price, merchId, type, noOfPieces, image } = req.body;
  
      const existingMerch = await Merch.findOne({ merchId });
      if (existingMerch) {
        return res.status(400).json({
          success: false,
          message: "Merch with this ID already exists",
        });
      }
  
      const newMerch = new Merch({ name, org, price, merchId, type, noOfPieces, image });
      await newMerch.save();
  
      res.status(201).json({ success: true, data: newMerch });
    } catch (error) {
      console.error("Add merch error:", error);
      res.status(500).json({ success: false, message: "Failed to add merch" });
    }
  };
  

const fetchAllMerch = async (req, res) => {
  try {
    const merchList = await Merch.find({});
    res.status(200).json({ success: true, data: merchList });
  } catch (error) {
    console.error("Fetch merch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch merch" });
  }
};

const editMerch = async (req, res) => {
  try {
    const { merchId } = req.params; // this is custom merchId like "MERCH03"
    const updatedData = req.body;

    // Check if the merchId is being changed and it already exists
    if (updatedData.merchId && updatedData.merchId !== merchId) {
      const existing = await Merch.findOne({ merchId: updatedData.merchId });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Another merch with this ID already exists",
        });
      }
    }

    const merch = await Merch.findOneAndUpdate({ merchId }, updatedData, { new: true });

    if (!merch) {
      return res.status(404).json({ success: false, message: "Merch not found" });
    }

    res.status(200).json({ success: true, data: merch });
  } catch (error) {
    console.error("Edit merch error:", error);
    res.status(500).json({ success: false, message: "Failed to edit merch" });
  }
};


const deleteMerch = async (req, res) => {
  try {
    const { merchId } = req.params;
    const merch = await Merch.findOneAndDelete({ merchId });

    if (!merch) {
      return res.status(404).json({ success: false, message: "Merch not found" });
    }

    res.status(200).json({ success: true, message: "Merch deleted successfully" });
  } catch (error) {
    console.error("Delete merch error:", error);
    res.status(500).json({ success: false, message: "Failed to delete merch" });
  }
};

module.exports = {
  handleImageUpload,
  addMerch,
  fetchAllMerch,
  editMerch,
  deleteMerch,
};