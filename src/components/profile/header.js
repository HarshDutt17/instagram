import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-users";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

import { storage } from "../../lib/firebase";
import { ref, uploadBytes } from "firebase/storage";

import avatarsUrl from "../../helper/avatarsUrl";


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

    const imageInput = useRef(null);
    const [avatarImage, setavatarImage] = useState(null)


    const handleToggleFollow = async () => {
        setisFollowingProfile(() => !isFollowingProfile);

        setFollowerCount({
            followerCount: !isFollowingProfile ? followerCount + 1 : followerCount - 1,
        })

        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    };

    const changeAvatar = () => {
        imageInput.current.click();
    }

    const uploadImage = () => {
        if (avatarImage == null) return;
        const imageRef = ref(storage, `avatars/${user.username}.jpg`)
        uploadBytes(imageRef, avatarImage).then(() => {
            alert('Avatar uploaded')
        })
    }

    const avatarPath = avatarsUrl(profileUsername);

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setisFollowingProfile(isFollowing);
            // console.log(isFollowing);
        }

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }

        if (avatarImage) {
            uploadImage();
        }

    }, [user.username, profileUserId, avatarImage])

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                <div className="relative group">
                    <img
                        className="rounded-full h-40 w-40 flex"
                        alt={`${profileUsername}-avatar`}
                        src={avatarPath}
                        onError={event => {
                            event.target.src = "/images/avatars/default.jpg";
                            event.onerror = null;
                        }}
                    />

                    {/* letting the user Change only his avatar  */}
                    {user.username == profileUsername && (
                        <div
                            className="absolute rounded-full bottom-0 left-0 bg-white/50 text-white z-10 w-full justify-center items-center h-full bg-black-faded group-hover:flex group-hover:flex-col hidden"
                            onClick={changeAvatar}
                        >
                            <p className="text-bolder text-xl text-center">Change avatar</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <input type="file" className="hidden" ref={imageInput} onChange={(event) => { setavatarImage(event.target.files[0]); }} />
                        </div>

                    )}
                </div>
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
                    <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : `${fullName}`}</p>
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