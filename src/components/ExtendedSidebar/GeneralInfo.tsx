import useInfoStore from "@/stores/info";

export default function GeneralInfo() {
    const generalInfo = useInfoStore((state) => state.data);
    return (
        <>
            <div>
                <h1>General Info</h1>
            </div>
        </>
    );
}