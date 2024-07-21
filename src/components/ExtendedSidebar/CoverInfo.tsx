import useInfoStore from "@/stores/info";

export default function CoverInfo() {
    const coverInfo = useInfoStore((state) => state.data);
    return (
        <>
            <div>
                <h1>Cover Info</h1>
                <ul>
                    {Object.keys(coverInfo).map((key) => (
                        <li key={coverInfo[key].id}>
                            <h2>{coverInfo[key].name}</h2>
                            <h2>{coverInfo[key].luas}</h2>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}