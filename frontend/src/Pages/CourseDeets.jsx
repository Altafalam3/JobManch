import React from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../resources/Card"; // Import the Card component

const CourseDeets = () => {
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
        // Other course objects...
    ];
    const { courseTitle } = useParams();
    console.log(courseTitle);
    // Find the selected course based on the course title
    const selectedCourse = courses.find(
        (course) => course.title === courseTitle
    );

    return (
        <div className="flex flex-col items-center h-screen">
            <header className="bg-blue-700 text-white px-4 py-2 w-full">
                <h1 className="text-2xl font-bold">
                    WELCOME TO COURSE DETAILS
                </h1>
            </header>
            <div className="flex flex-col items-center mt-5">
                <h2 className="text-xl font-bold mb-3">
                    {selectedCourse ? selectedCourse.title : "Course Not Found"}
                </h2>
                <p className="text-lg">
                    {selectedCourse ? selectedCourse.description : ""}
                </p>
                {/* Pass the selectedCourse prop to the Card component */}
                <Link to={`/coursedeets`} selectedCourse={selectedCourse}>
                    View Course Details
                </Link>
            </div>
        </div>
    );
};

export default CourseDeets;
