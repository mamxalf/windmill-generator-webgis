"use client";

import { useRef, useEffect, useState } from "react";

import Legend from "../ExtendedSidebar/Legend";
import Example from "../ExtendedSidebar/Example";

function ExtendSidebar({ children }) {
    console.log(children);
    return (
        <div className="w-96 h-screen bg-red-500 text-white flex flex-row-reverse items-start justify-items-start">
            {children}
        </div>
    );
}

export default function Sidebar() {
    const [isOpen] = useState(false);

    const [componentChild, setComponentChild] = useState();

    function handleClick(props) {
        if (props === "legend") {
            setComponentChild(<Legend />);
        }

        if (props === "example") {
            setComponentChild(<Example />);
        }
    }

    return (
        <>
            <div className="w-48 h-screen bg-gray-800 text-white flex flex-col shadow-lg">
                <div className="p-4 text-2xl font-bold">Windmill</div>
                <nav className="flex-1 px-2 space-y-2">
                    <button
                        onClick={() => handleClick("legend")}
                        className="block py-2.5 px-4 rounded hover:bg-gray-700"
                    >
                        Legend
                    </button>

                    <button
                        onClick={() => handleClick("example")}
                        className="block py-2.5 px-4 rounded hover:bg-gray-700"
                    >
                        Example
                    </button>
                </nav>
            </div>

            {isOpen ? <ExtendSidebar> {componentChild} </ExtendSidebar> : ""}
        </>
    );
}

// export default Sidebar
