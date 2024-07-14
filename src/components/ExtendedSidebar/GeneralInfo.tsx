import useInfoStore from "@/stores/info";

export default function GeneralInfo() {
    const generalInfo = useInfoStore((state) => state.data);
    return (
        <>
            <div>
                <h1>General Info</h1>
                <ul>
                    {Object.keys(generalInfo).map((key) => (
                        <li key={generalInfo[key].id}>
                            <h2>{generalInfo[key].name}</h2>
                            <h2>{generalInfo[key].luas}</h2>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}