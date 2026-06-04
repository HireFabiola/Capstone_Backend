const Inquiry = require("../models/Inquiry");

// GET /api/inquiries
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving inquiries",
      error: error.message,
    });
  }
};

// GET /api/inquiries/:id
const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry not found",
      });
    }

    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving inquiry",
      error: error.message,
    });
  }
};

// POST /api/inquiries
const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create({
      ...req.body,
      owner: req.user?.id || process.env.DEFAULT_ADMIN_ID,
    });

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({
      message: "Error creating inquiry",
      error: error.message,
    });
  }
};

// PUT /api/inquiries/:id
const updateInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry not found",
      });
    }

    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({
      message: "Error updating inquiry",
      error: error.message,
    });
  }
};

// DELETE /api/inquiries/:id
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting inquiry",
      error: error.message,
    });
  }
};

module.exports = {
  getInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
};