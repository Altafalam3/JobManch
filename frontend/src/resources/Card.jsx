import React from "react";
import { Doughnut } from "react-chartjs-2";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const Card = ({ title, description, chapters, items, chartData, course }) => {
    return (
        <Link to={course ? `/coursedeets/${course.title}` : "#"}>
            {/* Use the course prop to construct the link */}
            <div className="relative bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 w-72 h-80">
                <h3 className="text-2xl font-semibold text-white mb-2">
                    {title}
                </h3>
                <p className="text-lg text-white mb-6">{description}</p>
                <div className="absolute top-300 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                    <Doughnut
                        data={chartData}
                        options={{
                            maintainAspectRatio: false,
                            cutout: "80%", // Adjust the thickness here
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faPlay}
                        className="text-white text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ width: "1rem" }} // Adjust the width here
                    />
                </div>
                <div className="text-white text-xs flex justify-between items-center gap-1 mt-20">
                    <div>
                        <span className="block">Chapters</span>
                        <span className="block text-xl font-semibold">
                            {chapters}
                        </span>
                    </div>
                    <div>
                        <span className="block">Items</span>
                        <span className="block text-xl font-semibold">
                            {items}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
