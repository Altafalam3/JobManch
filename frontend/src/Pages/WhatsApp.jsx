import React, { useState, useEffect } from "react";
import Chat from "../Components/Common/Chat";
import axios from "axios";
import ChatDetail from "../Components/Common/ChatDetail"; // Import the ChatDetail component

function Chats() {
    const [jobApplications, setJobApplications] = useState();
    const [selectedJobIndex, setSelectedJobIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8800/api/company"); // Replace "your_port" with the port your backend server is running on
                setJobApplications(response.data.data);
                console.log(response.data.data)
                // Assuming the response contains an array of jobs under the "data" key
                setLoading(false);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }

        fetchJobs();
    }, []);

    // // Handle click event for selecting a chat
    const handleChatClick = (job) => {
        selectedJobIndex(job);
        // onSelectChat(index); // Pass the selected chat index to the parent component
    };

    return (
        <div className="flex flex-row overflow-y-scroll cursor-pointer h-200 w-screen">
            {/* Render chats */}
            <div className="w-1/3">
                {!loading && jobApplications.map((job, index) => (
                    <div key={index}>
                        <Chat
                            job={job}
                            onClick={() => handleChatClick(job)}
                        />
                    </div>
                ))}
            </div>
            <div className="w-2/3">
                {/* Render ChatDetail if a chat is selected */}
                {selectedJobIndex !== null && (
                    <ChatDetail
                        jobDetail={selectedJobIndex}
                    />
                )}
            </div>
        </div>
    );
}

export default Chats;
