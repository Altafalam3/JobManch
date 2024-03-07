import React, { useState } from "react";
import Chats from "./Chats";
// import RoundedBtn from "./Common/RoundedBtn";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import { pp } from "../assets/whatsapp";

function LeftMenu() {
    const [filter, setFilter] = useState(false);

    return (
        // LeftMenu container
        <div className="flex flex-col w-100 h-screen">
            {/* Profile nav */}
            <div className="flex justify-between items-center bg-[#FFFFFF] h-[60px] p-3">
                {/* Profile picture */}
                <img
                    src={pp}
                    alt="profile_picture"
                    className="rounded-full w-[40px]"
                />
            </div>

            <Chats filter={filter} />
        </div>
    );
}

export default LeftMenu;
