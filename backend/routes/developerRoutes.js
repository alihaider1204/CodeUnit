const express = require("express");
const protect = require("../middleware/authMiddleware");
const developer = require("../middleware/developerMiddleware")

const { 
    createDeveloper, 
    getDeveloper, 
    updateDeveloper, 
    deleteDeveloper 
} = require("../controllers/developerController");


const { 
    getAllReviews, 
    addReview, 
    deleteReview 
} = require("../controllers/reviewController");


const { rateDeveloper } = require("../controllers/ratingController");


const router = express.Router();

// Developer routes
router.post("/", createDeveloper);
router.get("/:developerId", getDeveloper);
router.put("/:developerId", updateDeveloper);
router.delete("/:developerId", deleteDeveloper);

// Review routes
router.get("/:developerId", getAllReviews); // Get all reviews for a developer
router.post("/:developerId", addReview);   // Add a review for a developer
router.delete("/:reviewId", deleteReview); // Delete a review by ID

// Rating routes
router.post("/:developerId", rateDeveloper); // Add a rating for a developer

module.exports = router;
