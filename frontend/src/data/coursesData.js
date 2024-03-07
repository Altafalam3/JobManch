const coursesData = [
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

export default coursesData;
