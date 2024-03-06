import "./App.css";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Sidebar from "./Components/sidebar/Sidebar.jsx";
import Cal from "./Pages/calendar/Admincal.jsx";
import Studentform from "./Pages/Studentform.jsx";
import AdminForm from "./Pages/AdminForm.jsx";
import Studentcal from "./Pages/Studentcal.jsx";

function App() {
    return (
        <UserProvider>
            <>
                <BrowserRouter>
                    <div className="mt-0 ">
                        <Sidebar />
                    </div>
                    <div className=" grid justify-items-end ">
                        <Navbar />
                    </div>

                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cal" element={<Cal />} />
                        <Route path="/stuform" element={<Studentform />} />
                        <Route path="/adminform" element={<AdminForm />} />
                        <Route path="/stucal" element={<Studentcal />} />
                        
                    </Routes>
                    <div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </>
        </UserProvider>
    );
}

export default App;
