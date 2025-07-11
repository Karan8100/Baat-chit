import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

 const Layout = ({children,showSidebar = false})=>{

    return(
        <div className="h-screen overflow-hidden  " >
            <div className="flex">
                {showSidebar && <Sidebar/>}

                <div className="flex-1 flex flex-col">
                    <Navbar/>

                 {/* ab idhar home page aayeg */}
                 <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
            </div>
        </div>
    )
}
export default Layout;