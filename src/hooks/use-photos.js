import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getPhotos } from "../services/firebase";

export default function usePhotos() {
    const [photos, setPhotos] = useState(null);

    const {
        user: { uid: userId = '' }
    } = useContext(UserContext)


    useEffect(() => {
        async function getTimelinePhotos() {
            const [{following}] = await getUserByUserId(userId);
            let followedUserPhotos = [];
            // check to see if user follows anyone
            if(following.length > 0){
                followedUserPhotos = await getPhotos( userId, following );
            }

            // rearranging content to newest first
            followedUserPhotos.sort( (a,b) => b.dateCreated - a.dateCreated);
            setPhotos( followedUserPhotos );
        }

        // if(userId){
            getTimelinePhotos();
        // }
    }, [userId]);

    return { photos };
}