import { useEffect } from "react";
import Header from "../components/header";

export default function NotFound() {

    useEffect(() => {
      document.title = '404- Not Found!'
    }, []);
    
    return (
        <div className="bg-gray-100 h-screen">
            <Header />
            <div className="mx-auto max-w-screen-lg flex flex-col justify-center items-center pt-2 gap-4">
                <img
                src="/images/not-found.jpg"
                alt="404"
                width={420}
                />
                <p className="text-center text-4xl font-bold mt-4">Error: 404!!</p>
                <p className="text-center text-2xl text-gray-base">You landed on a non existing page</p>
            </div>
        </div>
    )
}