import React from "react";
import { Link } from "react-router-dom";

const CourseBar = ({ setSelectedCourse, courses }) => {
    const handleCourseClick = (course) => {
        setSelectedCourse(course);
    };

    return (
        <aside
            id="default-sidebar"
            className="fixed top-300 left-20 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-blue-800"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    {courses.map((course, index) => (
                        <li key={index}>
                            <Link
                                to={`/course-deets/${course.title}`}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                onClick={() => handleCourseClick(course)}
                            >
                                <span className="flex-1 ms-3">
                                    {course.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default CourseBar;
