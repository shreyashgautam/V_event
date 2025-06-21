
const Buy = require("../../models/Buy");
const Merch = require("../../models/Merch");
const User = require("../../models/User"); // ✅ import User model

// ✅ Buy a merch
exports.buyMerch = async (req, res) => {
  try {
    const { regNo, merchId } = req.body;

    // ✅ 1. Check if user exists
    const student = await User.findOne({ regNo });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // ✅ 2. Check if merch exists
    const merch = await Merch.findOne({ merchId });
    if (!merch) {
      return res.status(404).json({ success: false, message: "Merch not found" });
    }

    // ✅ 3. Check if already bought
    const alreadyBought = await Buy.findOne({ regNo, merchId });
    if (alreadyBought) {
      return res.status(409).json({ success: false, message: "You already bought this merch" });
    }

    // ✅ 4. Check stock availability
    const totalBuys = await Buy.countDocuments({ merchId });
    if (totalBuys >= merch.noOfPieces) {
      return res.status(400).json({ success: false, message: "Merch is out of stock" });
    }

    // ✅ 5. Proceed to buy
    const newBuy = await Buy.create({
      regNo,
      merchId,
      merchName: merch.name,
      merchOrg: merch.org,
    });

    return res.status(201).json({
      success: true,
      message: "Merch bought successfully",
      data: newBuy,
    });

  } catch (error) {
    console.error("Merch buy error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get all merch bought by a student
exports.getStudentBuys = async (req, res) => {
  try {
    const { regNo } = req.params;

    const buys = await Buy.find({ regNo });

    if (buys.length === 0) {
      return res.status(404).json({ success: false, message: "No merch purchases found for this student" });
    }

    return res.status(200).json({ success: true, data: buys });

  } catch (error) {
    console.error("Student merch fetch error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch merch purchases" });
  }
};
