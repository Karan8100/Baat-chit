import {useState} from 'react';
import { Link } from 'react-router';
import {  useQueryClient } from '@tanstack/react-query';

import { ShipWheelIcon } from 'lucide-react'; // Ensure you have this icon installed
import { useMutation } from '@tanstack/react-query';
import { signup } from '../lib/api';
const SignUpPage = () => {
    // Create a QueryClient instance
   const queryClient = useQueryClient();

    const [signupData, setSignupData] = useState({
        fullName:"",
        email:"",
        password:"",
    });
    
   //see short form of this using hooks for login and signup in the api.js file

    const {mutate:signupMutation,isPending,error} = useMutation({
       mutationFn: signup,
       onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['authUser'] }); //refetch authUser data after signup
        console.log('User created successfully');
      },
    //   onError: (error) => {
    //   console.error('Failed to create user', error.response?.data || error.message);
    //  },
    });

    const handleSignup = (e) =>{
        e.preventDefault();
        signupMutation(signupData);

    }
  return (
<<<<<<< HEAD
    <div className='h-screen flex justify-center items-center p-4 sm:p-6 md:p-8 ' >
=======
    <div className='h-screen flex justify-center items-center p-4 sm:p-6 md:p-8 '>
>>>>>>> fe81b756a312bd7ab6906ec7a3ccd2085e90f4ed
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
          {/* SIGNUP FORM - LEFT SIDE */}
           <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
             {/* {logo} */}
             <div className="mb-4 flex items-center justify-start gap-2">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Baat-chit
              </span>
             </div>

             {/* ERROR MESSAGE IF ANY */}
            {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
            )}
            {/* Form section */}
             <div className='w-full'>
               <form action="" onSubmit={handleSignup}>
                 <div className='space-y-4'>
                   <div>
                    <h2 className='text-xl font-semibold'>Create and Account</h2>
                    <p className='text-sm opacity-60'>Join this App and start your language learning adventure</p>

                   </div>
                   
                   <div className='space-y-3'>
                   <div className='form-control w-full'>
                     <label className='label'> Full Name </label>
                     <input type="text"
                      placeholder='Enter your full name'
                      className='input input-bordered w-full placeholder:opacity-40'
                      value={signupData.fullName}
                      onChange={(e)=> setSignupData({...signupData,fullName: e.target.value})}
                      required
                     />
                     </div>

                     <div className='form-control w-full'>
                     <label className='label'>Email</label>
                     <input type="email"
                      placeholder='Enter your email'
                      className='input input-bordered w-full placeholder:opacity-40'
                      value={signupData.email}
                      onChange={(e)=> setSignupData({...signupData,email: e.target.value})}
                      required
                     />
                     </div>
                      {/* email */}
                     <div className='form-control w-full'>
                     <label className='label'>Password</label>
                     <input type="password"
                      placeholder='Enter Password'
                      className='input input-bordered w-full placeholder:opacity-40'
                      value={signupData.password}
                      onChange={(e)=> setSignupData({...signupData,password: e.target.value})}
                      required
                     />
                     </div>

                   <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the {" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                    </div>
                   </div>

                   <button className='btn btn-primary w-full' type='submit'>
                      {isPending ? (<>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating Account...
                        </>

                      ): ("Create Account")}
                   </button>

                   <div>
                     <p className='text-sm text-center opacity-60'>
                       Already have an account?{" "}
                       <Link to="/login" className=' text-primary font-semibold hover:underline'> Sign in</Link>
                     </p>
                   </div>

                 </div>
               </form>
             </div>
           </div>

           {/* IMAGE - RIGHT SIDE */}
           <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="Video call-pana.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
          </div>

        </div>
       
    </div>
  );
};

export default SignUpPage;
