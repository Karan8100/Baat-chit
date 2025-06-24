import {axiosInstance} from "./axios.js"

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async()=>{
   const response = await axiosInstance.post("/auth/logout");
   return response.data; // Assuming the response data contains a success message or status
}

//ye samjhna hai
//ye isliye kiya kyunki jab mai logout kar rha tha tab wo signin page pe mujhe redirect nhi kar rha tha
export const getAuthUser = async () =>{
    try{
       const response = await axiosInstance.get('/auth/me');
       return response.data // Assuming the response data contains the authenticated user information
    }catch(error){
        console.log("error in getAuthUser", error.message);
        return null; 
    }
    

}

export const completeOnboarding = async (userData) =>{
  const res = await axiosInstance.post("/auth/onboarding",userData);
  return res.data;
}
export const getRecommendedUsers = async ()=>{
  const response = await axiosInstance.get('/users');
  return response.data; // Assuming the response data contains an array of recommended users
}

export const getUserFriends = async () => {
  const response = await axiosInstance.get('/users/friends');
  return response.data; // Assuming the response data contains an array of friends
};

export const getOutgoingFriendReqs = async () =>{
  const response = await axiosInstance.get("/users/outgoing-friends-requests");
  return response.data; // Assuming the response data contains an array of outgoing friend requests
}

export const sendFriendRequest = async (friendId) => {
  const response = await axiosInstance.post(`/users/friends-request/${friendId}`);
  return response.data; // Assuming the response data contains the updated list of outgoing friend requests or a success message
}

export const getFriendRequests = async () => {
  const res = await axiosInstance.get('/users/friends-requests');
  return res.data;

}

export const acceptFriendRequest =async (requestId)=>{
  const res = await axiosInstance.put(`/users/friends-request/${requestId}/accept`);
  return res.data;
}
export const getStreamToken = async ()=>{
  const res = await axiosInstance.get('/chat/token');
  return res.data;
}