import PropTypes, { func } from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import avatarsUrl from '../../helper/avatarsUrl';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId }) {
    const [followed, setFollowed] = useState(false)
    
    async function handleFollowUser(){
        setFollowed(true);

        // 2 firebase services
        // update the following array of logged in user
        await updateLoggedInUserFollowing( loggedInUserDocId, profileId, false);
        // update followers array of the user that has been followed
        await updateFollowedUserFollowers( profileDocId, userId, false);
    }

    const avatarPath = avatarsUrl(username);

    return !followed ? (
        <div className='flex flex-row items-center justify-between mobiles:justify-between mobiles:mx-8'>
            <div className='flex items-center justify-between'>
                <img
                    className='rounded-full h-8 w-8 flex mr-3'
                    src={avatarPath}
                    alt=""
                    onError={({ currentTarget }) => {
                        currentTarget.onError = null;
                        currentTarget.src = "/images/avatars/default.jpg";
                    }}
                />
                <Link to={`/p/${username}`}>
                    <p className='font-bold text-sm'>
                        {username}
                    </p>
                </Link>
            </div>
            <button
                className='text-xs font-bold text-blue-medium'
                type='button'
                onClick={handleFollowUser}
            >
                Follow
            </button>
        </div>
    ) : null
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
}