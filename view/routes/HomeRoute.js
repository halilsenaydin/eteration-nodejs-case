import express from 'express';
const router = express.Router();

// Get TMDB Data
router.get("/",
    (req, res, next) => {
        res.json(req.result);
    });

export default router;