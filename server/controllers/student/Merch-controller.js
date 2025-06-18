// controllers/student/merchStudentController.js
const Merch = require("../../models/Merch");

const getFilteredMerch = async (req, res) => {
  try {
    const { org = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};
    if (org.length) {
      filters.org = { $in: org.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "newest":
        sort.createdAt = -1;
        break;
      case "oldest":
        sort.createdAt = 1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const merch = await Merch.find(filters).sort(sort);
    res.status(200).json({ success: true, data: merch });
  } catch (error) {
    console.error("Filter merch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch merch" });
  }
};

const getMerchDetails = async (req, res) => {
  try {
    const { merchId } = req.params;
    const merch = await Merch.findById(id);

    if (!merch) {
      return res.status(404).json({ success: false, message: "Merch not found" });
    }

    res.status(200).json({ success: true, data: merch });
  } catch (error) {
    console.error("Get merch details error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch merch details" });
  }
};

module.exports = { getFilteredMerch, getMerchDetails };