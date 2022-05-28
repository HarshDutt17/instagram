import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../lib/firebase";

export default function avatarsUrl(username) {
    const [imgUrl, setImgUrl] = useState('')
    const avatarPathRef = ref(storage, `avatars/${username}.jpg`)

    getDownloadURL(avatarPathRef).then((url) => {
        setImgUrl(url);
    });

    return imgUrl;
}