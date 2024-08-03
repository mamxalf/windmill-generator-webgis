"use client";

import { useState } from "react";

import Legend from "./ExtendedSidebar/Legend";
import GeneralInfo from "./ExtendedSidebar/GeneralInfo";
import StationInfo from "./ExtendedSidebar/Station";
import CoverInfo from "./ExtendedSidebar/CoverInfo";
import Graph from "./ExtendedSidebar/Graph";

function ExtendSidebar({ onClick, children }) {
    return (
        <div className="flex w-96 h-screen flex-row justify-between border-e bg-white">
            <div className="px-4 py-6">{children}</div>
            <div className="px-4 py-6">
                <button
                    onClick={onClick}
                    className="group relative flex w-full justify-center rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    aria-label="Close Sidebar"
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

function SidebarItem({ onClick, isActive, children }) {
    return (
        <li>
            <a
                onClick={onClick}
                href="#"
                className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 ${isActive ? "bg-gray-100" : ""
                    }`}
                aria-current={isActive ? "page" : undefined}
            >
                {children}
            </a>
        </li>
    );
}

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [componentChild, setComponentChild] = useState(null);
    const [isActiveMenu, setIsActiveMenu] = useState(null);

    function handleClick(component, menu) {
        setComponentChild(component);
        setIsActiveMenu(menu);
        setIsOpen(true);
    }

    return (
        <>
            <div className="flex w-52 h-screen flex-col justify-between border-e bg-white">
                <div className="px-4 py-6">
                    <h1 className="text-center font-semibold text-emerald-700 text-xl">
                        Windmill Generator
                    </h1>
                    <hr className="my-2" />
                    <h1 className="text-center font-semibold text-emerald-700 text-xs">
                        X: <span id="x-point">0</span> Y: <span id="y-point">0</span>
                    </h1>
                    <h1 className="text-center font-semibold text-emerald-700 text-xs">
                        Lat: <span id="lat-point">0</span>
                    </h1>
                    <h1 className="text-center font-semibold text-emerald-700 text-xs">
                        Lng: <span id="lng-point">0</span>
                    </h1>
                    <div className="mt-5 text-center font-semibold text-emerald-700 text-xs">
                        Wind Speed and Direction:
                        <div id="wind-speed">
                        </div>
                    </div>

                    {/* docs: https://docs.maptiler.com/sdk-js/examples/weather-wind-direction/ */}
                    <h1>Date Time :</h1>
                    <div id="time-info">
                        <span id="time-text"></span>
                        <input type="range" id="time-slider" min="0" max="11" step="1"></input>
                    </div>

                    <ul className="mt-6 space-y-1">
                        <SidebarItem
                            onClick={() => handleClick(<Legend />, "legend")}
                            isActive={isActiveMenu === "legend"}
                        >
                            Legends
                        </SidebarItem>
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                    <span className="text-sm font-medium"> Information </span>
                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0L10 10.586l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>
                                <ul className="mt-2 space-y-1 px-4">
                                    <SidebarItem
                                        onClick={() => handleClick(<GeneralInfo />, "info")}
                                        isActive={isActiveMenu === "info"}
                                    >
                                        General Info
                                    </SidebarItem>
                                    <SidebarItem
                                        onClick={() => handleClick(<CoverInfo />, "cover")}
                                        isActive={isActiveMenu === "cover"}
                                    >
                                        Cover Info
                                    </SidebarItem>
                                    <SidebarItem
                                        onClick={() => handleClick(<StationInfo />, "station")}
                                        isActive={isActiveMenu === "station"}
                                    >
                                        Station Info
                                    </SidebarItem>
                                </ul>
                            </details>
                        </li>
                        <SidebarItem
                            onClick={() => handleClick(<Graph />, "graph")}
                            isActive={isActiveMenu === "graph"}
                        >
                            Graphs
                        </SidebarItem>
                    </ul>
                </div>
            </div>

            {isOpen && (
                <ExtendSidebar onClick={() => setIsOpen(false)}>
                    {componentChild}
                </ExtendSidebar>
            )}
        </>
    );
}
