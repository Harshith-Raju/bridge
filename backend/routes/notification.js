const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const Business = require("../models/Business");
const { sendEmail } = require("../utils/email");

// Get Notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find({ status: "pending" }).populate("businessId");
    res.json(notifications);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Approve Business
router.post("/:id/approve", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    const business = await Business.findById(notification.businessId);
    business.status = "approved";
    await business.save();

    notification.status = "approved";
    await notification.save();

    await sendEmail({
      to: business.email,
      subject: "Company Registration Approved",
      text: `Your company "${business.companyName}" has been approved.`,
    });

    res.json({ message: "Business approved" });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Reject Business
router.post("/:id/reject", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    const business = await Business.findById(notification.businessId);
    business.status = "rejected";
    await business.save();

    notification.status = "rejected";
    await notification.save();

    await sendEmail({
      to: business.email,
      subject: "Company Registration Rejected",
      text: `Your company "${business.companyName}" has been rejected.`,
    });

    res.json({ message: "Business rejected" });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;