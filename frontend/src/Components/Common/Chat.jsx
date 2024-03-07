import React from "react";

function Chat({ job }) {
    const handleClick = () => {
        // onClick();
        // alert(`Chat ${contact} clicked`);
    };

    return (
        <div
            className={`flex justify-between items-center cursor-pointer w-full h-auto px-3 py-4 border-b border-gray-300 hover:bg-gray-100`}
            onClick={handleClick}
        >
            {/* Profile picture */}
            <img
                src={job.pp} // Assuming the job object has a property for profile picture
                alt="profile_picture"
                className="rounded-full w-12 h-12 mr-4"
            />

            {/* Info container */}
            <div className="flex flex-col justify-between flex-1">
                <div>
                    <h1 className="font-semibold text-lg mb-1">{job.companyName}</h1>
                    <p className="text-sm text-gray-600">{job.jobDescription}</p>
                </div>

                {/* Time and number of messages */}
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600">{job.duration}</p>
                    <p className="text-sm text-gray-600">{job.stipend}</p>
                </div>

                {/* Download job documents */}
                <a
                    href={job.documents}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-blue-600 hover:underline"
                    download
                >
                    Download Job Documents
                </a>
            </div>
        </div>
    );
}

export default Chat;
