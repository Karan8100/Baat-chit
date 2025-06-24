import React from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';
import { CameraIcon, ShuffleIcon ,MapPinIcon, ShipWheelIcon, Loader2Icon } from 'lucide-react';
import { LANGUAGES } from "../constants";
 
const OnboardPage = () => {
  const queryClient = useQueryClient();
  const { authUser} = useAuthUser();
  const [formState,setFormState] = useState({
    fullName:authUser?.fullName || "",
    bio:authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",

    learningLanguage: authUser?.learningLanguage || "",

    location:authUser?.location||"",

    profilePic:authUser?.profilePic ||"",
  })

  const {mutate:onBoardingMutation,isPending} = useMutation({
    mutationFn:completeOnboarding,
    onSuccess: ()=>{
      
     toast.success("profile onboarded successfully");
     queryClient.invalidateQueries({queryKey:["authUser"]});
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to onboard profile");
    },
  })

  const handleSubmit =(e) =>{
    e.preventDefault();
    onBoardingMutation(formState);
    //you can also write mutate(formState) instead of onBoardingMutation(formState)
  } 

  const generateRandomAvatar = () =>{
    const seed = encodeURIComponent(user.fullName || user.email);
    const style = "avataaars";
    const random_Avatar = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
    
     setFormState({ ...formState, profilePic: random_Avatar });
    toast.success("Random profile picture generated!");
  }
  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl '>
        <div className='card-body p-6 sm:p-8 '>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete your profile</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
           {/* profile pic container contains button and profile pic*/}
           <div className='flex flex-col items-center justify-center space-y-4'>
            {/* image preview */}
             <div className='size-32 rounded-full border-2 border-white bg-base-300 overflow-hidden '>
              {formState.profilePic ?(
               <img 
               src={formState.profilePic} 
               alt="profile preview"
               className='w-full h-full object-cover' 
               />
              ):(
                <div className='flex items-center justify-center h-full'>
                  <CameraIcon className='size-20 text-base-content opacity-25'/>
                </div>
               )
              }
             </div>
             {/* Generate random avatar button */}
             
            <button  className='btn btn-accent gap-2' onClick={generateRandomAvatar}>
               <ShuffleIcon className='size-4 mr-2'/>
               Generate Random Avatar
            </button>
                 
            
           </div>

           {/* fullname */}
           <div className='form-control'>
             <label className='label'>
              <span className='label-text font-bold opacity-80'>Full Name</span>
             </label>
             <input type="text" 
              name='fullName'
              value={formState.fullName}
              onChange={(e)=> setFormState({...formState,fullName:e.target.value})}
              placeholder='Enter your full name'
              className='input input-bordered w-full placeholder:opacity-40'
             
             />

           </div>

           {/* bio */}
           <div className='form-control'>
             <label className='label'>
              <span className='label-text font-bold opacity-80'>Bio</span>
             </label>
             <textarea 
              
              name='bio'
              value={formState.bio}
              onChange={(e)=> setFormState({...formState,bio:e.target.value})}
              placeholder='tell others about yourself'
              className='textarea textarea-bordered h-24 placeholder:opacity-40'

             
             />

           </div>

           {/* Language */}
           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Nativelanguage */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-bold opacity-80'>Native Language</span>
              </label>
              <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                <option value="" className='text-opacity-40'>Select your native language</option>
                 {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}

                </select>
            </div>
            {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold opacity-80">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
           </div>

          {/* Locations */}
            <div className='form-control'>
              <label className='label'>
                 <span className='label-text font-bold opacity-80'>Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>

          
            </div>
          {/* submit button */}
          <button
           type = 'submit'
           className='btn btn-secondary w-full rounded-3xl mt-4 gap-2 ' disabled = {isPending}>
            {!isPending ? (
             <>
              <ShipWheelIcon className = "size-4 "/>
              <span>Complete Onboarding</span>
             </>
            ):(
              <>
               <Loader2Icon className="size-4 animate-spin" />
               <span>Completing...</span>
              </>
            )}
           

          </button>


           </form>
          </div>
         </div>
        </div>
        
      
    
  );
};

export default OnboardPage;