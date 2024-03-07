import React, { useState } from "react";
import Card from "../resources/Card";
import Sidebar from "../resources/SideBar";

const Resources = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    //     const companyNames = Array.from(
    //         new Set(courses.map((item) => item.company))
    //     );
    const courses = [
        {
            title: "Data Structures and Algorithms",
            description: "LeetCode's Interview Crash Course",
            chapters: 13,
            items: 149,
            chartData: {
                labels: ["Completed", "Remaining"],
                datasets: [
                    {
                        data: [1, 99], // Example data (1% completed)
                        backgroundColor: ["#5ACD56", "#E0E0E0"],
                        borderWidth: 0,
                    },
                ],
            },
            company: "JP Morgan", // Example company
        },
        {
            title: "Java Programming",
            description: "Master Java programming language",
            chapters: 15,
            items: 200,
            chartData: {
                labels: ["Completed", "Remaining"],
                datasets: [
                    {
                        data: [10, 90], // Example data (10% completed)
                        backgroundColor: ["#FF5722", "#E0E0E0"],
                        borderWidth: 0,
                    },
                ],
            },
            company: "Oracle",
        },
        {
            title: "System Design for Interviews and Beyond",
            description: "Learn how to design scalable systems",
            chapters: 10,
            items: 120,
            chartData: {
                labels: ["Completed", "Remaining"],
                datasets: [
                    {
                        data: [5, 95], // Example data (5% completed)
                        backgroundColor: ["#FBBF24", "#E0E0E0"],
                        borderWidth: 0,
                    },
                ],
            },
            company: "Deutsche Bank", // Example company
        },
        {
            title: "Java Programming",
            description: "Master Java programming language",
            chapters: 15,
            items: 200,
            chartData: {
                labels: ["Completed", "Remaining"],
                datasets: [
                    {
                        data: [10, 90], // Example data (10% completed)
                        backgroundColor: ["#FF5722", "#E0E0E0"],
                        borderWidth: 0,
                    },
                ],
            },
            company: "JP Morgan",
        },
        // Add more objects with different details as needed
    ];

    // Extract unique company names from the data array
    const companyNames = Array.from(
        new Set(courses.map((item) => item.company))
    );
    //     console.log(course);
    // Filter the data array based on the selected company
    const filteredData = selectedCompany
        ? courses.filter((item) => item.company === selectedCompany)
        : courses;

    return (
        <div className="flex flex-col items-center h-screen">
            <header className="flex justify-between w-full px-4 py-2 bg-blue-700 text-white">
                <h1 className="text-2xl font-bold">WELCOME TO RESOURCES</h1>
                <div className="relative inline-block text-left">
                    <button
                        id="dropdownDividerButton"
                        data-dropdown-toggle="dropdownDivider"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                    >
                        Dropdown divider
                        <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    <div
                        id="dropdownDivider"
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                        <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDividerButton"
                        >
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Earnings
                                </a>
                            </li>
                        </ul>
                        <div className="py-2">
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Separated link
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex flex-col">
                <Sidebar
                    setSelectedCompany={setSelectedCompany}
                    companyNames={companyNames}
                />
                <div className="flex flex-row gap-3">
                    {filteredData.map((item, index) => (
                        <Card key={index} {...item} courses={courses} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resources;
