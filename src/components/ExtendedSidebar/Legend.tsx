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
                <h1 className="font-semibold tracking-wide">Layer List</h1>
                <ul>
                    {Object.keys(legend).map((key) => (
                        <li key={legend[key].id}>
                            <div className="h-full w-full">
                                <div className="mt-4 flex items-center justify-between p-1">
                                    <div className="flex items-center justify-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="defaultCheckbox relative flex h-[16px] min-h-[16px] w-[16px] min-w-[16px] items-center 
                            justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
                            checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-red-500 dark:checked:bg-brand-400"
                                            checked={legend[key].visibility}
                                            onChange={() =>
                                                handleCheckboxChange(key)
                                            }
                                        />
                                        <p className="text-base tracking-normal font-normal text-zinc-700 dark:text-white">
                                            {` `} {legend[key].name} Layer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
