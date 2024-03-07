import React, { useState } from "react";

function ProfileCard({
    position,
    company,
    location,
    status,
    timeAgo,
    description,
    workflow,
    eligibility,
    aboutLink,
}) {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        console.log(section); // Add this line to check if section is received correctly
        setActiveSection(activeSection === section ? null : section);
    };
    console.log(activeSection);

    return (
        <div className="bg-[#6e7bf4] w-9/12 rounded-lg p-4 mb-4 mx-5">
            <div className="flex items-center justify-between mb-4">
                {/* Job title */}
                <div>
                    <h2 className="text-lg font-bold text-dark">{position}</h2>
                    <p className="text-sm text-gray-700">{company}</p>
                    <p className="text-sm text-gray-600">{location}</p>
                </div>

                {/* Status */}
                <div className="text-right">
                    <p className="text-sm text-gray-700">{status}</p>
                    <p className="text-sm text-gray-600">{timeAgo}</p>
                </div>
            </div>

            {/* Toggle buttons */}
            <div className="flex justify-between mb-4">
                <button
                    className={`text-sm text-gray-600 focus:outline-none ${
                        activeSection === "description" && "text-white"
                    }`}
                    onClick={() => toggleSection("description")}
                >
                    Job Description
                </button>
                <button
                    className={`text-sm text-gray-600 focus:outline-none ${
                        activeSection === "workflow" && "text-white"
                    }`}
                    onClick={() => toggleSection("workflow")}
                >
                    Hiring Workflow
                </button>
                <button
                    className={`text-sm text-gray-600 focus:outline-none ${
                        activeSection === "eligibility" && "text-white"
                    }`}
                    onClick={() => toggleSection("eligibility")}
                >
                    Eligibility Criteria
                </button>
            </div>

            {/* Description */}
            {activeSection === "description" && (
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2">
                        Job Description
                    </h3>
                    <p className="text-sm text-gray-600">
                        {description || "No job description available"}
                    </p>
                </div>
            )}

            {/* Hiring Workflow */}
            {activeSection === "workflow" && (
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2">
                        Hiring Workflow
                    </h3>
                    <p className="text-sm text-gray-600">
                        {workflow || "No hiring workflow available"}
                    </p>
                </div>
            )}

            {/* Eligibility Criteria */}
            {activeSection === "eligibility" && (
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-black mb-2">
                        Eligibility Criteria
                    </h3>
                    <p className="text-sm text-gray-600">
                        {eligibility || "No eligibility criteria available"}
                    </p>
                </div>
            )}

            {/* About */}
            <div>
                <a
                    href={aboutLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-800 hover:text-white"
                >
                    About {company}
                </a>
            </div>
        </div>
    );
}

export default ProfileCard;
