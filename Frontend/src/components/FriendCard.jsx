import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants'
import { Link } from 'react-router'

const FriendCard = ({friend}) => {
  return (
    <div className='card bg-base-300 shadow-sm hover:shadow-md transition-shadow duration-300 
    hover :-translate-y-1'>
      <div className='card-body p-4'>
        {/* UserInfo */}
        <div className='flex gap-3 items-center justify-start'>
          <div className='avatar size-12'>
            <img src={friend.profilePic} alt={friend.fullName} />

          </div>
          <span className='font-semibold text-xl'>{friend.fullName}</span>
        </div>

        {/* Actions */}
        <div className="flex  gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  )
}

export default FriendCard

export const getLanguageFlag=(language) =>{
  if(!language) return null;

  const lowerLang = language.toLowerCase();
  const flag_code = LANGUAGE_TO_FLAG[lowerLang];

  if (flag_code) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${flag_code}.png`}
        alt={`${lowerLang} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
} 


