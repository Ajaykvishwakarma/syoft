import { Route, Routes } from "react-router-dom"
import { NoticeBoard } from "../Boards/NoticeBoard"
import { Login } from "../Auth/Login/Login";
import { Navbar } from "../Navbar/Navbar";
import { Register } from "../Auth/Resister/Resister";
export const AllRoutes = () => {

    return (
        <>
        <Navbar />
            <Routes>
                <Route path="/" element={<NoticeBoard />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register /> } />
            </Routes>
        </>
    )
}