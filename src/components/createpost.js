import { useRef, useState, useContext } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase";
import FirebaseContext from "../context/firebase";


export default function CreatePost({ createP, setCreateP, userId }) {
    const [caption, setCaption] = useState('');

    const imageInput = useRef(null);
    const [postImage, setpostImage] = useState(null);
    const [photoId, setPhotoId] = useState(null);
    const { firebase } = useContext(FirebaseContext)



    const getImage = () => {
        imageInput.current.click();
        setPhotoId(`${userId}` + Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)));
    }

    const handlePost = () => {
        if (postImage == null || photoId==null) return;
        const imageRef = ref(storage, `images/${photoId}.jpg`)
        uploadBytes(imageRef, postImage).then(() => {
            uploadToFirestore();
            alert('Image uploaded')
        })
    }

    const uploadToFirestore = () => {
        getDownloadURL(ref(storage, `images/${photoId}.jpg`))
            .then(async (url) => {
                // console.log(url);
                await firebase
                    .firestore()
                    .collection('photos')
                    .add({
                        caption: caption,
                        comments: [],
                        dateCreated: Date.now(),
                        imageSrc: url,
                        likes: [],
                        photoId: photoId,
                        userId: userId,
                    });
                setCreateP((createP) => !createP)

            })
    }


    return createP ? (
        <div className="absolute top-0 h-full w-full flex justify-center items-center bg-gray-200/50">
            <div className="relative w-2/5 text-center flex-col justify-center items-center bg-white py-4 rounded-2xl ">
                <div className="pb-4 border-b-2 w-full">
                    <p
                        className="text-xl font-bold px-10"
                    >Create new Post</p>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute right-4 top-4"
                        onClick={() => setCreateP((createP) => !createP)}
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="flex flex-col items-center my-4 mx-4">
                    {!postImage ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-28 text-gray-base my-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    ) : (
                        <img
                            src={URL.createObjectURL(postImage)}
                            alt="image-preview"
                            className="mb-4"
                        />
                    )
                    }

                    <button
                        className="bg-blue-500 text-white px-5 py-2 rounded-md mb-8"
                        onClick={getImage}
                    >
                        Select a Picture
                    </button>

                    <input type="file" className="hidden" ref={imageInput} onChange={(event) => { setpostImage(event.target.files[0]); }} />

                    <input
                        aria-label="Add caption"
                        autoComplete="off"
                        className="text-md text-gray-base w-full py-5 px-4 mb-8"
                        type="text"
                        name="add-caption"
                        placeholder="Add a caption..."
                        onChange={({ target }) => setCaption(target.value)}
                    />
                    <button
                        className={`text-lg font-bold text-blue-medium `}
                        type="button"
                        // disabled={comment.length < 1}
                        onClick={handlePost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}