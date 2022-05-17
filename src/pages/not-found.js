import { useEffect } from "react"

export default function NotFound() {

    useEffect(() => {
      document.title = '404- Not Found!'
    }, []);
    
    return (
        <div className="bg-gray-background">
            <div className="mx-auth max-w-screen-lg">
                <p className="text-center text-2xl">Error: 404 (Not Found)!</p>
            </div>
        </div>
    )
}