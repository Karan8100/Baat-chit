import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = ()=>{
   const {theme} = useThemeStore(); // Assuming you have a theme store to manage themes
    return (
        <div className="min-h-screen flex items-center justify-center" data-theme={theme}>
            <LoaderIcon className="size-10 animate-spin text-primary" />
        </div>

    )
}
export default PageLoader;