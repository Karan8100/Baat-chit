import { Navigate, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardPage from "./pages/OnboardPage.jsx";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js"; // Custom hook to fetch authenticated user data
import  Layout  from "./components/Layout.jsx";

 // Custom axios instance for API calls

import { useThemeStore } from "./store/useThemeStore.js";

//we will use axios for data fetching


// Simpler syntax compared to fetch()
// Automatically transforms JSON data
// Supports request/response interceptors
// Handles errors and timeouts
// Allows setting base URLs and default headers
// Supports cancellation of requests



function App() {
 //we will use tanstack query for data fetching and caching
 //we will use react-hot-toast for notifications

// if(true) return <PageLoader/>; // Show loader while app is loading

// const {data:authData ,isLoading} = useQuery({
//   queryKey:["authUser"],
//   queryFn: getAuthUser,
//   retry :false,
// })
// const authUser = authData?.user;
const {theme} = useThemeStore();
//for stte management we will use zustand
const {isLoading, authUser} = useAuthUser(); // Custom hook to fetch authenticated user data
const isAuthenticated = Boolean(authUser); // Check if user is authenticated
const isOnboarded = authUser?.isOnboarded; // Check if user is onboarded
if(isLoading) return <PageLoader/>; // Show loader while fetching user data

  return (
    <div className="h-screen" data-theme = {theme}>
       <Toaster/>
       <Routes>
        {/* login */}
        <Route path="/"
         element = {isAuthenticated && isOnboarded ?
           ( <Layout showSidebar={true}>
            <HomePage />
          </Layout>):(
             <Navigate to= {!isAuthenticated ? "/login" : "/onboarding"}/>
         ) } />

         {/* signup */}
        <Route path="/signup" element = {isAuthenticated?(
          isOnboarded ?(
            <Navigate to="/" />
          ) : (
            <Navigate to="/onboarding" />
          )
        ):(
          <SignUpPage/>
        )

        } />

        {/* login */}

        <Route path="/login" element = {isAuthenticated?(
          isOnboarded ? (
            <Navigate to="/" />
          ) : (
            <Navigate to="/onboarding" />
          )
        ) : (
          <LoginPage />
        )} 
        />
        
        <Route path="/notifications" element = {isAuthenticated && isOnboarded ?(
          <Layout showSidebar={true}>
            <NotificationsPage/>
          </Layout>
        ):(
          !isAuthenticated ? (
            <Navigate to="/login"/>

          ):(
            <Navigate to="/onboarding"/>
          )
        )
         
        } />

        {/* Onboarding page */}
        <Route path="/onboarding" element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          } />

        <Route path="/call/:id" element = {
          isAuthenticated && isOnboarded ? (
            <CallPage/> 
          ):(
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
          )
        } />

        {/* Chatroute */}
        <Route path="/chat/:id" element = {
           isAuthenticated && isOnboarded ? (
             <Layout>
              <ChatPage/>
              </Layout>
              
           ):(
            <Navigate to={ !isAuthenticated ? "/login" : "onboarding"}/>
           )

        } />
        
       </Routes>
    </div>
  )
}

export default App
