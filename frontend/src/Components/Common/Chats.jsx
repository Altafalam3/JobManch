import React, { useState } from "react";
import Chat from "./Chat";
import ChatDetail from "./ChatDetail";
import { jobApplications } from "../data/whatsapp";
import { ImFolderDownload } from "react-icons/im";

function Chats({ filter }) {
    const [selectedChatIndex, setSelectedChatIndex] = useState(null);
    const [chats, setChats] = useState(jobApplications);

    // Handle click event for selecting a chat
    const handleChatClick = (index) => {
        setSelectedChatIndex(index === selectedChatIndex ? null : index);
        alert(`Chat ${index} clicked`);
    };

    return (
        <div className="flex flex-col overflow-y-scroll cursor-pointer h-200">
            <div className="flex justify-between items-center w-100 min-h-[0px] px-3 hover:bg-[#111]">
                <div className="flex justify-around items-center w-[150px]">
                    <span className="text-emerald-500 text-lg">
                        <ImFolderDownload />
                    </span>
                    <h1 className="text-white">Job Applications</h1>
                </div>
                <p className="text-emerald-500 text-xs font-dark">
                    {chats.length}
                </p>
            </div>

            {/* Render chats */}
            {chats.map((application, index) => (
                <div key={index}>
                    <Chat
                        pp={application.pp}
                        contact={application.position}
                        msg={`${application.company}, ${application.location}, ${application.timeAgo}`}
                        time=""
                        unreadMsgs={null}
                        onClick={() => handleChatClick(index)}
                    />
                    {/* Render ChatDetail if the chat is selected */}
                </div>
            ))}
        </div>
    );
}

export default Chats;
