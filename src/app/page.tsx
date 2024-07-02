import Map from "@/components/Map";

export default function Home() {
    return (
        <main>
            <Map maptilerKey={process.env.MAPTILER_KEY} />
        </main>
    );
}
