import { useLocation,Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {  ShipWheelIcon,HomeIcon,UsersIcon,BellIcon } from "lucide-react";
 
const Sidebar = () => {

   const {authUser} =  useAuthUser();
  const location =  useLocation(); //will show current path in console
  const currentPath = location.pathname; //get current path
    //console.log("Current Path:", currentPath); //depending on current path we can show active sidebar item
    return (
      //what is bg-base
       <div className="w-64 hidden lg:flex flex-col h-screen sticky top-0 border-r border-base-300 bg-base-200 " >
         <div className="p-5 border-b border-base-300">
            <Link to="/" className="flex items-center gap-2">

             <ShipWheelIcon className="size-9 text-primary" />
             <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
               Baat-chit
               </span>
            </Link>
         </div>

         <nav className="flex-1 p-4 space-y-1">
            {/* home icon */}
         <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        {/* friendsicon */}
        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>

        {/* notification*/}
        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
         </nav>
         
         {/* user profile section */}
         <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
       </div>
    )
   }
   export default Sidebar;