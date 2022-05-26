import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { getUserByUsername, getUserPhotosByUserId } from "../../services/firebase";
import Header from "./header";
import Photos from "./photos";



export default function Profile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0,
    }


    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUserId(user.userId);
            // console.log('photos', photos)
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }

        if (user) {
            getProfileInfoAndPhotos();
        }
    }, [user]);

    return (
        <>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={user}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    )
}

Profile.protoTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired
};