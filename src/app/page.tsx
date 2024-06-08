import Map from '@/components/Map';

export default function Home() {
  return (
    <>
      <Map maptilerKey={process.env.MAPTILER_KEY} />
    </>
  );
}
