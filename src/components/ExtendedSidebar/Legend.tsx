"use client";

import useLayerStore from "@/stores/layer";

export default function Legend() {
    const legend = useLayerStore((state) => state.legend);
    const toggleVisibility = useLayerStore((state) => state.toggleVisibility);

    const handleCheckboxChange = (itemId: string) => {
        toggleVisibility(itemId);
    };
    return (
        <>
            <div>
                <h1>Layer List</h1>
                <ul>
                    {Object.keys(legend).map((key) => (
                        <li key={legend[key].id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={legend[key].visibility}
                                    onChange={() => handleCheckboxChange(key)}
                                />
                                {` `} {legend[key].name} Layer
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}