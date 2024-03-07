import React from "react";
import ProfileCard from "./ProfileCard";

function ChatDetail({ jobDetail }) {
    if (!jobDetail) {
        return null; // Render nothing if jobDetail is undefined
    }
    console.log(jobDetail);
    // const { pp, position, company, location, status, timeAgo } = jobDetail;

    return (
        <div className="flex h-screen">
            {/* Clickable container */}
            <div className="cursor-pointer w-screen">
                Profile card

                {<div className="bg-[#18262e] rounded-lg p-4 mb-4"> 
                <ProfileCard
                    pp={jobDetail.company}
                    position={jobDetail.jobDescription}
                    company={jobDetail.stipend}
                    location={jobDetail.duration}
                    status={jobDetail.documents}
                    timeAgo={jobDetail.upcomingSchedule}
                />
                 </div> }
            </div>
            {/* Bottom section}
            {/* Input area or other components can be added here if needed */}
        </div>
    );
}

export default ChatDetail;
