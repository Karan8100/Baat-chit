import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { useLocation ,Link} from "react-router";
import { BellIcon, ShipWheelIcon ,LogOutIcon} from "lucide-react";
import ThemeSelect from "./ThemeSelect";

const Navbar = () => {
    const {authUser} = useAuthUser(); //because we need authUser to show profile pic in navbar
    const location = useLocation(); //will show current path in console
    const isChatpage = location.pathname?.startsWith("/chat"); //get current path

    const queryClient = useQueryClient();

    const {mutate:logoutMutation} = useMutation({
        mutationFn:logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] }); // refetch authUser data after logout
            console.log('User logged out successfully');
        },
    });

 return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center" >
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
            
          <div className={`flex ${isChatpage ? "justify-between" : "justify-end"} w-full items-center`}>
           
            {/* Logo only if chatpage */}
            {isChatpage && (
                 <div className="pl-5">
                 <Link to="/" className="flex items-center gap-2">
                   <ShipWheelIcon className="size-9 text-primary" />
                   <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                     Baat-Chit
                   </span>
                 </Link>
               </div>
            )}
            
            {/* Profile Pic and Logout Button and notifications */}
            <div className="gap-2 sm:gap-3 flex items-center justify-center">
                <Link to="/notifications">
                  <button className="btn btn-ghost btn-circle">
                    <BellIcon className="size-5 text-base-content opacity-70" />
                  </button>
                </Link>

                <div className="flex items-center gap-2">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-9 rounded-full">
                            <img src={authUser?.profilePic } alt="Profile" />
                        </div>
                    </div>
                    {/* <ThemeSelect/> */}
                    <ThemeSelect />

                     {/* Logout button */}
                  <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
                   <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                  </button>
                </div>
            </div>

            
          </div>
        </div>
    </nav>
 )
}
export default Navbar;