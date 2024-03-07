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
<<<<<<< HEAD
import WhatsApp2 from "./Pages/Whatsapp2.jsx";
import Resources from "./Pages/Resources.jsx";
import CourseDeets from "./Pages/CourseDeets.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
=======
import Studentcal from "./Pages/Studentcal.jsx";
import Forum from "./Pages/Forum.jsx";
import Notification from "./Pages/Notification.jsx";

>>>>>>> 34dc93c0a7e0a0a7e58bb01b7cfd29a10521bd2c
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
<<<<<<< HEAD
                        <Route path="/company" element={<WhatsApp2 />} />
                        <Route path="/resources" element={<Resources />} />

                        <Route
                            path="/coursedeets/:courseTitle"
                            element={<CourseDeets />}
                        />
=======
                        <Route path="/stucal" element={<Studentcal />} />
                        <Route path="/forum" element={<Forum/>} />
                        <Route path="/noti" element={<Notification/>} />
                        
                        
>>>>>>> 34dc93c0a7e0a0a7e58bb01b7cfd29a10521bd2c
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
