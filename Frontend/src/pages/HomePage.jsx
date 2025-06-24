import {useQueryClient,useMutation,useQuery} from '@tanstack/react-query';
import { getRecommendedUsers,getUserFriends,getOutgoingFriendReqs,sendFriendRequest } from '../lib/api';
import { useState,useEffect } from 'react';
import { Link } from 'react-router';
import { UsersIcon } from 'lucide-react';
import FriendCard from '../components/FriendCard';
import NoFriendsFound from '../components/NoFriendsFound';
import RecommendedUserCard from '../components/RecommendedUserCard';

const HomePage = () => {
  const queryClient = useQueryClient();
 const [outgoingRequests, setOutgoingRequests] = useState(new Set());

  const {data: friends =[],isLoading:LoadingFriends} = useQuery({
    queryKey:["friends"],
    queryFn: getUserFriends,
  })
  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });
  const {data: RecommendedUsers=[],isLoading:LoadingUsers} = useQuery({
    queryKey:["users"],
    queryFn: getRecommendedUsers,
  })

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(()=>{
    const outGoingReqs = new Set();
    if(outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outGoingReqs.add(req.recipient._id );
      })
      setOutgoingRequests(outGoingReqs);
    }
  },[outgoingFriendReqs])
  return ( 
    <div className='p-4 sm:p-6 lg:p-8 '>
      <div className='container mx-auto space-y-10'>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          {/* it will contain two things Your Friend and notification button */}
          <h1 className='font-bold'>Your Friends</h1>
          <Link to="/notifications" className='btn btn-outline btn-sm'>
            <UsersIcon className='size-3' />
            <span className='ml-2'>friend requests </span>
          </Link>
        </div>

        {/* loader while loading friends */}
        {LoadingFriends ?(
          <div className='flex items-center justify-center'>
            <span className='loading loading-spinner loading-lg'></span>
          </div>
        ) : friends.length ===0 ? (<NoFriendsFound />):(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
        )}

        {/* Recommended users */}
        <div className='container flex flex-col'>
          <h1 className='font-bold text-xl md:text-3xl font-sans'>Meet new learners</h1>
          <p className="opacity-70">
            Discover perfect language exchange partners based on your profile
           </p>
        </div>

        {LoadingUsers ? (
          <div className='flex items-center justify-center'>
            <span className='loading loading-spinner loading-lg'></span>
          </div>
        ):RecommendedUsers.length === 0 ? (
          <div className='card bg-base-300 text-center'>
            <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
          </div>
        ):(
          <div className="max-h-[500px] overflow-y-auto pr-1">
           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {RecommendedUsers.map((user) => {
                 const hasRequestSent = outgoingRequests.has(user._id);

               return (
                <RecommendedUserCard
                 key={user._id}
                 user={user}
                 hasRequestSent={hasRequestSent}
                 sendRequest={() => sendRequestMutation(user._id)}
                 isPending={isPending}
              />
           );
          })}
           </div>
           </div>
        )}


        
        
        
      </div>
      
    </div>
  );
};

export default HomePage;