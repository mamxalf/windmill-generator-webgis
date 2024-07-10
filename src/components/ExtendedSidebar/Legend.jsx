"use client";

import { legend } from "@/lib/option";

export default function Legend() {
    return (
        <>
            <div>
                <h1>Hi Im Legend</h1>
            </div>
            <div>
                <h1>Layer</h1>
                <ul>
                    {Object.keys(legend).map(key => (
                        <li key={legend[key].id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={legend[key].id}
                                // onChange={() => onCheckboxChange(layerId)}
                                />
                                {legend[key].name} Layer
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}