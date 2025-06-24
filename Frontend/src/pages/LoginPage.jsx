import React from 'react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router';

const LoginPage = () => {
  const queryClient = useQueryClient();
  // const { authUser, isLoading } = useAuthUser();
  const [loginData, setLoginData] =useState({
    email:"",
    password:"",
  });

  const {mutate:loginMutation,isPending,error} = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] }); // refetch authUser data after login
      console.log('User logged in successfully');
    },

  })

   const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ' >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full
       max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
       
        {/* login FORM - LEFT SIDE */}
        <div className='flex flex-col w-full p-4 sm:p-8  lg:w-1/2'>
        {/* Logo */}

        <div className="mb-4 flex items-center justify-start gap-2">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Baat-chit
              </span>
        </div>
        {/* error if any */}
        {error && (
          <div className='alert alert-error mb-2'>
            <span>{error.response.data?.message}</span>
          </div>
        )}
        
        {/* form section */}

        <form  onSubmit={handleLogin} className='w-full space-y-4'>
          {/* text content */}
          <div>
            <h2 className='text-xl font-semibold font-mono'>Welcome Back</h2>
            <p className='text-sm opacity-70'>Sign in to your account to continue your journey</p>
          </div>

          {/* form control aayega ab */}
          <div className='flex flex-col space-y-3'>
            {/* email */}
            <div className='form-control'>
              <label className='label font-sans font-semibold text-sm'>
                Email
              </label>
              <input type="email" 
               placeholder='hello@123.com'
               className='input input-bordered w-full'
               value={loginData.email}
               onChange={(e)=>setLoginData({email:e.target.value})}
               required
              
              />
            </div>

            {/* password */}
            <div className='form-control'>
              <label className='label font-sans font-semibold text-sm'>
                Password
              </label>
              <input type="password" 
               placeholder='******'
               className='input input-bordered w-full'
               value={loginData.password}
               onChange={(e)=>setLoginData({...loginData, password:e.target.value})}
               required
              
              />
            </div>

            {/* button */}
            <button type='submit' className='btn btn-primary w-full ' disabled={isPending}>
            {isPending ? (<>
                        <span className="loading loading-spinner loading-sm"></span>
                        Signing in...
                        </>

                      ): ("Sign In")}
            </button>

            {/* dont have account */}
            <div className=' text-center'>
              <p className='text-sm '>
                 don't have an account?{" "}
                 <Link to="/signup" className="text-primary hover:underline">
               Create One
              </Link>
              </p>
              
            </div>

          </div>
        </form>
        </div>

        {/* Image section */}
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

export default LoginPage;
