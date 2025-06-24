import React from 'react'
import { VideoIcon } from 'lucide-react'

const CallButton = ({handleVideoCall}) => {
  return (
    <button onClick={handleVideoCall}className='btn btn-success btn-sm border border-black text-white absolute top-4 right-4'>
        <VideoIcon className='size-6'/>
    </button>
  )
}

export default CallButton
