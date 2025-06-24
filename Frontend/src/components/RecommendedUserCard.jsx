// components/RecommendedUserCard.jsx
import { CheckCircleIcon, UserPlusIcon, MapPinIcon } from "lucide-react";
import { getLanguageFlag } from "./FriendCard";


const RecommendedUserCard = ({
  user,
  hasRequestSent,
  isPending,
  sendRequest,
}) => {
    const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300">
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full">
            <img src={user.profilePic} alt={user.fullName} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">{user.fullName}</h3>
            {user.location && (
              <div className="flex items-center text-xs opacity-70 mt-1">
                <MapPinIcon className="size-3 mr-1" />
                {user.location}
              </div>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-secondary">
            {getLanguageFlag(user.nativeLanguage)}
            Native: {capitialize(user.nativeLanguage)}
          </span>
          <span className="badge badge-outline">
            {getLanguageFlag(user.learningLanguage)}
            Learning: {capitialize(user.learningLanguage)}
          </span>
        </div>

        {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

        {/* Action button */}
        <button
          className={`btn w-full mt-2 ${
            hasRequestSent ? "btn-disabled" : "btn-primary"
          } `}
          onClick={sendRequest}
          disabled={hasRequestSent || isPending}
        >
          {hasRequestSent ? (
            <>
              <CheckCircleIcon className="size-4 mr-2" />
              Request Sent
            </>
          ) : (
            <>
              <UserPlusIcon className="size-4 mr-2" />
              Send Friend Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RecommendedUserCard;

