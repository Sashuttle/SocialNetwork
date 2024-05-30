//Note: Import express and api
const router = require('express').Router();
const apiRoutes = require('./api');

//Note: Use API routes when path starts with /api
router.use('./api', apiRoutes);

//Note: Middleware
router.use((req, res) => {
    res.status(404).send("<h1> Page Not Found (404)</h1>");
});

module.exports = router;