import React from 'react'
import { LoaderIcon } from 'lucide-react'

const ChatLoader = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center '>
        <LoaderIcon className='animate-spin size-10 text-primary'/>
        <p className='mt-4 text-center text-lg font-mono'>Connecting to chat...</p>
      
    </div>
  )
}

export default ChatLoader
