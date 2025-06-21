const Buy = require("../../models/Buy");
const Merch = require("../../models/Merch");

// ✅ Get all merch purchases
exports.getAllBuys = async (req, res) => {
  try {
    const purchases = await Buy.find();
    return res.status(200).json({ success: true, data: purchases });
  } catch (error) {
    console.error("Fetch buys error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch purchases" });
  }
};

// ✅ Get purchases by merchId
exports.getBuysByMerchId = async (req, res) => {
  try {
    const { merchId } = req.params;

    const purchases = await Buy.find({ merchId });

    if (purchases.length === 0) {
      return res.status(404).json({ success: false, message: "No purchases found for this merch ID" });
    }

    return res.status(200).json({ success: true, data: purchases });
  } catch (error) {
    console.error("Merch ID fetch error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch purchases by merch ID" });
  }
};

// ✅ Delete a merch purchase by _id
exports.deleteBuyById = async (req, res) => {
  try {
    const { buyId } = req.params;

    const deleted = await Buy.findByIdAndDelete(buyId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }

    return res.status(200).json({ success: true, message: "Purchase deleted successfully" });
  } catch (error) {
    console.error("Delete buy error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete purchase" });
  }
};
