import express from 'express';
const router = express.Router();

// Get TMDB Data
router.get("/",
    (req, res, next) => {
        res.redirect("/api-docs");
    });

export default router;