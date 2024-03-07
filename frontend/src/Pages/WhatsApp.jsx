import React, { useState, useEffect } from "react";
import Chat from "../Components/Common/Chat";
import axios from "axios";
import ChatDetail from "../Components/Common/ChatDetail"; // Import the ChatDetail component

function Chats() {
    const [jobApplications, setJobApplications] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8800/api/company"); // Replace "your_port" with the port your backend server is running on
                setJobApplications(response.data.data);
                console.log(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }

        fetchJobs();
    }, []);

    const handleChatClick = (job) => {
        const index = jobApplications.indexOf(job);
        setSelectedJob(index);
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
            <div className="w-2/3 bg:white">
                {/* Render ChatDetail if a chat is selected */}
                {selectedJob && (
                    <ChatDetail jobDetail={jobApplications[selectedJob]}  />
                )}
            </div>
        </div>
    );
}

export default Chats;
