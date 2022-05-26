import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-users";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";


export default function Header({
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
        docId: profileDocId, userId: profileUserId, fullName, username: profileUsername, following = [], followers = []
    }
}) {
    const { user } = useUser();
    const [isFollowingProfile, setisFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username != profileUsername;

    const handleToggleFollow = async() => {
        setisFollowingProfile(() => !isFollowingProfile);

        setFollowerCount({
            followerCount: !isFollowingProfile ? followerCount + 1 : followerCount - 1,
        })

        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    };

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setisFollowingProfile(isFollowing);
            // console.log(isFollowing);
        }

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }

    }, [user.username, profileUserId])

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                <img
                    className="rounded-full h-40 w-40 flex"
                    alt={`${profileUsername}-avatar`}
                    src={`/images/avatars/${profileUsername}.jpg`}
                    onError={({ currentTarget }) => {
                        currentTarget.onError = null;
                        currentTarget.src = "/images/avatars/default.jpg";
                    }}
                />
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4 ">{profileUsername}</p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-medium font-bold text-sn rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(event) => {
                                if (event.key == 'Enter') {
                                    handleToggleFollow();
                                }
                            }}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    {followers == undefined || following == undefined ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount} </span>{` `}{photosCount == 1 ? 'Post' : 'Posts'}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{followerCount} </span>{` `}{followerCount == 1 ? 'Follower' : 'Followers'}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{following.length} </span>{` `}Following
                            </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : `${fullName}` }</p>
                </div>
            </div>
        </div>
    );

}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        username: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        following: PropTypes.array.isRequired,
        followers: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
    }).isRequired,
}