import React, { useState } from "react";
import Chat from "../Components/Common/Chat";
import { jobApplications } from "../data/whatsapp";
import ChatDetail from "../Components/Common/ChatDetail"; // Import the ChatDetail component

function Chats() {
    const [selectedChatIndex, setSelectedChatIndex] = useState(null);

    // Handle click event for selecting a chat
    const handleChatClick = (index) => {
        setSelectedChatIndex(index);
        // onSelectChat(index); // Pass the selected chat index to the parent component
    };

    return (
        <div className="flex flex-row overflow-y-scroll cursor-pointer h-200 w-screen">
            {/* Render chats */}
            <div className="w-1/3">
                {jobApplications.map((application, index) => (
                    <div key={index}>
                        <Chat
                            pp={application.pp}
                            contact={application.position}
                            msg={`${application.company}, ${application.location}, ${application.timeAgo}`}
                            time=""
                            unreadMsgs={null}
                            onClick={() => handleChatClick(index)}
                        />
                    </div>
                ))}
            </div>
            <div className="w-2/3">
                {/* Render ChatDetail if a chat is selected */}
                {selectedChatIndex !== null && (
                    <ChatDetail
                        jobDetail={jobApplications[selectedChatIndex]}
                    />
                )}
            </div>
        </div>
    );
}

export default Chats;
