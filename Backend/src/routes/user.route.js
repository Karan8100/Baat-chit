import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMyFriends, getRecommendedUsers ,sendFriendRequest,getFriendRequests,acceptFriendRequest ,getOutgoingFriendReqs} from '../controllers/user.controller.js';



const router  = express.Router();

//apply protectRoute middleware to all routes in this file
router.use(protectRoute);

router.get('/',getRecommendedUsers);
router.get('/friends',getMyFriends);

router.post('/friends-request/:id',sendFriendRequest);  //we send id of the friend

router.put("/friends-request/:id/accept", acceptFriendRequest);

router.get('/friends-requests', getFriendRequests);

router.get('/outgoing-friends-requests',getOutgoingFriendReqs);



export default router;