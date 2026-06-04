const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
} = require("../controllers/inquiryController");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getInquiries)
  // No authentication required for creating an inquiry, as clients should be able to submit inquiries without needing to log in
  .post(createInquiry);

router
  .route("/:id")
  .get(authMiddleware, getInquiryById)
  .put(authMiddleware, updateInquiry)
  .delete(authMiddleware, deleteInquiry);

module.exports = router;