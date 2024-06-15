//importing express router and routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//fixme: may need to fix this
//use imported routes
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

//export the router to be used in other parts of the application
module.exports = router;