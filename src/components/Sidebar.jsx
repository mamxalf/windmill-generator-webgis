"use client";

import { useState } from "react";

import Legend from "./ExtendedSidebar/Legend";
import Example from "./ExtendedSidebar/Example";
import GeneralInfo from "./ExtendedSidebar/GeneralInfo";
import StationInfo from "./ExtendedSidebar/Station";

function ExtendSidebar({ onClick, children }) {
    return (
        <div className="flex w-96 h-screen flex-row justify-between justify-items-center border-e bg-white">
            <div className="px-4 py-6">{children}</div>
            <div className="px-4 py-6">
                <button
                    onClick={onClick}
                    className="group relative flex w-full justify-center rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18.3639 7.75735L16.9497 6.34314L11.2929 12L16.9497 17.6568L18.3639 16.2426L14.1213 12L18.3639 7.75735Z"
                            fill="currentColor"
                        />
                        <path
                            d="M11.2929 6.34314L12.7071 7.75735L8.46447 12L12.7071 16.2426L11.2929 17.6568L5.63605 12L11.2929 6.34314Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [componentChild, setComponentChild] = useState();
    const [isActiveMenu, setIsActiveMenu] = useState();

    function handleClick(props) {
        if (props === "legend") {
            setComponentChild(<Legend />);
        }

        if (props === "example") {
            setComponentChild(<Example />);
        }

        if (props === "info") {
            setComponentChild(<GeneralInfo />);
        }

        if (props === "station") {
            setComponentChild(<StationInfo />);
        }

        setIsActiveMenu(props);
        setIsOpen(true);
    }

    const handleChildClick = (props) => {
        setIsOpen(!props);
    };

    return (
        <>
            <div className="flex w-52 h-screen flex-col justify-between border-e bg-white">
                <div className="px-4 py-6">
                    <h1 className="text-center font-semibold text-emerald-700 text-xl">
                        Windmill Generator
                    </h1>
                    <ul className="mt-6 space-y-1">
                        <li>
                            <a
                                onClick={() => handleClick("legend")}
                                href="#"
                                className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 ${
                                    isActiveMenu === "legend"
                                        ? "bg-gray-100"
                                        : ""
                                }`}
                            >
                                Legends
                            </a>
                        </li>

                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                    <span className="text-sm font-medium">
                                        {" "}
                                        Information{" "}
                                    </span>

                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a
                                            onClick={() =>
                                                handleClick("info")
                                            }
                                            href="#"
                                            className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 ${isActiveMenu === "info"
                                                ? "bg-gray-100"
                                                : ""
                                                }`}
                                        >
                                            General Info
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() =>
                                                handleClick("station")
                                            }
                                            href="#"
                                            className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 ${isActiveMenu === "station"
                                                ? "bg-gray-100"
                                                : ""
                                                }`}
                                        >
                                            Station Info
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() =>
                                                handleClick("example")
                                            }
                                            href="#"
                                            className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 ${
                                                isActiveMenu === "example"
                                                    ? "bg-gray-100"
                                                    : ""
                                            }`}
                                        >
                                            Example
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>

            {isOpen ? (
                <ExtendSidebar onClick={handleChildClick}>
                    {" "}
                    {componentChild}{" "}
                </ExtendSidebar>
            ) : (
                ""
            )}
        </>
    );
}
