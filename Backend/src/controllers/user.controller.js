import FriendRequest from '../models/FriendRequest.js';
import user from '../models/User.js';

export async function getRecommendedUsers(req, res) {
 try{
    const currentUserId = req.user._id; //req.user.id this also works
    const currentUser  = req.user;
    // Find users who are not the current user and are onboarded
    const RecommendedUsers = await user.find({
        $and:[
            { _id: { $ne: currentUserId } }, // Exclude the current user
            { _id : {$nin : currentUser.friends }}, // Exclude friends of the current user
            { isOnboarded: true } // Only include users who have completed onboarding
        ]
    }).select("-password") // Exclude password from the response;
    res.status(200).json(RecommendedUsers);
 }catch(error){
    console.log("Error in getRecommendedUsers controllers" , error.message);
    return res.status(500).json({ message: "Internal server error" });
 }
}
export async function getMyFriends(req, res) {
  try{
    const User  = await user.findById(req.user._id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage");

     res.status(200).json(User.friends);
  }catch(error){
    console.log("Error in getMyFriends controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendFriendRequest(req,res){
    try{
        const myId = req.user._id;
        const  {id : recipientId} = req.params;  //maine req url me :id likha tha toh mujhe yaha bhi id likhna hoga

        //prevent sending friend request to self
        if(myId === recipientId){
            return res.status(400).json({message:"You cannot send a friend request to yourself"});
        }

        const recipient = await user.findById(recipientId);
        if(!recipient){
            return res.status(404).json({message : "user not found"});
        }
        //check if users are already frineds
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are already friends with this user"});
        }
        // Check if a friend request already exists
        const exisitingRequest = await FriendRequest.findOne({
            $or :[
                {sender : myId, receiver: recipientId},
                {sender : recipientId, receiver: myId},
            ],
        })

        if(exisitingRequest){
            return res.status(400).json({message:"Friend request already exists"});
        }

        const newFriendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json(
            newFriendRequest
        )
    }catch(error){
        console.log("Error in sendFriendRequest controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function acceptFriendRequest(req, res) {
    try{
       const {id: requestId} = req.params;

       const friendRequest = await FriendRequest.findById(requestId);
       if(!friendRequest){
           return res.status(404).json({message:"Friend request not found"});
       }

       //verify the current user is the receiver of the request
       if(friendRequest.recipient.toString() !== req.user._id.toString()){
           return res.status(403).json({message:"You are not authorized to accept this friend request"});
       }

       friendRequest.status = "accepted";
        await friendRequest.save();

         // Add each user to the other's friends list
    await user.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient }
    });
    await user.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender }  //add to set is method which add element if they do not already exists
    });

    res.status(200).json({ message: "Friend request accepted successfully" });
    }catch(error){
     console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Internal server error" });
    }
}
//ye samjhna hai pura populate wala part
export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}