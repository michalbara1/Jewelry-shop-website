// routes/products.js
const router = require("express").Router();
const Product = require("../models/product");

router.get("/products", async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let genre = req.query.genre || "All";

        const genreOption = ["rings", "necklace", "bracelets"];

        genre = genre === "All" ? [...genreOption] : genre.split(",");
        sort = req.query.sort ? req.query.sort.split(",") : [sort];

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const query = {
            name: { $regex: search, $options: "i" },
            genre: { $in: genre },
        };

        const products = await Product.find(query)
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await Product.countDocuments(query);

        const response = {
            error: false,
            total,
            genre: genreOption,
            products,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error("Error fetching search results:", err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;
