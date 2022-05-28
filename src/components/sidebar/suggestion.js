import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";


export default function Suggestions({ userId, following, loggedInUserDocId }) {
    const [profiles, setProfiles] = useState(null);
    useEffect(() => {
        async function suggestedProfiles(){
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        // console.log('userId', userId);
        if(userId){
            suggestedProfiles();
        }

        // console.log('profiles', profiles);

    },[userId,following]);

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col mobiles:w-full">
            <div className="text-sm flex items-center align-items justify-between mobiles:justify-center mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map( (profile) => (
                    <SuggestedProfile
                        key={profile.docId}
                        profileDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}

                    />
                ))}
            </div>
        </div>
    ) : null;
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
};