import Skeleton from "react-loading-skeleton"
import usePhotos from "../hooks/use-photos"
import Post from "./post";

export default function Timeline() {
    //  we need logged in user's pics (hook)
    const { photos } = usePhotos();
    // console.log(photos)

    // on loading pics, we use react skeleton
    // if we have pics, render them( create post component)
    // if the user has no pics, tell them to create some photos
    return (
        <div className="container mobiles:col-span-3 col-span-2">
            {!photos ? (
                <>
                    <Skeleton count={4}  height={400} className="mb-4" />
                </>
            ) : photos?.length > 0 ? (
                photos.map((content) => <Post content={content} key={content.docId}/>)
            ) : (
                <p className="text-center text-2xl">Follow people to see their posts</p>
            )}
        </div>
    )
}