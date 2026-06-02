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
  .post(authMiddleware, createInquiry);

router
  .route("/:id")
  .get(authMiddleware, getInquiryById)
  .put(authMiddleware, updateInquiry)
  .delete(authMiddleware, deleteInquiry);

module.exports = router;