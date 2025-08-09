"use client"

import { useRef, useState } from "react"
import { TiPlus } from "react-icons/ti"

export default function Hero(){

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploaded, setIsUploaded] = useState(false);
    const [fileLink, setFileLink] = useState("");

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleUpload = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0]
            console.log("Uploading: ", file.name)

            // Make a generate link function which will take the link
            // from the S3 and make it a public URL

            const generatedLink = 'https';
            // const generatedLink = getLink(file.name)

            setFileLink(generatedLink);
            setIsUploaded(true);
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(fileLink)
            .then(() => {
                // TODO : Add a toaster instead
                alert("Link copied to clipboard")
            })
            .catch(() => {
                alert("Failed to copy link")
            })
    }

    return (
        <div className="mt-20 flex flex-col items-center justify-center">
            <div className="h-[40vh] w-[60vh] border-3 border-dashed rounded-lg flex items-center justify-center">
                <div
                    onClick={handleClick}
                    className="border rounded-full p-10 cursor-pointer hover:bg-gray-200 hover:text-black"
                >
                    <TiPlus size={35} />
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                />
            </div>

            <div className="mt-5">
                {
                    isUploaded ? (
                        <button onClick={handleCopyLink} className="px-4 text-2xl py-2 border-2 border-dashed rounded-lg hover:bg-gray-100 hover:text-black cursor-pointer">
                            Copy link
                        </button>
                    ) : (
                        <button className="px-4 text-2xl py-2 border-2 border-dashed rounded-lg hover:bg-gray-100 hover:text-black cursor-pointer">
                            Upload
                        </button>
                    )
                }
            </div>
        </div>

    )
}
