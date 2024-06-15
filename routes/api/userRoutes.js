//importing express router and specific controller functions
const router = require('express').Router();
const { getAllUser, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

//define route for root path
router.route('/').get(getAllUser).post(createUser);

//define route for paths that include user id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//define routes for managing a users friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

//exporting the router object to be used in other parts of the applicaiton
module.exports = router;
