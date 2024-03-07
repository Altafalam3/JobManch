import React from "react";

const Sidebar = ({ setSelectedCompany, companyNames }) => {
    const handleCompanyClick = (companyName) => {
        setSelectedCompany(companyName);
    };

    return (
        <aside
            id="default-sidebar"
            className="fixed top-300 left-20 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-blue-800"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    {companyNames.map((companyName, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                onClick={() => handleCompanyClick(companyName)}
                            >
                                <span className="flex-1 ms-3">
                                    {companyName}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
