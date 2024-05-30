// app/page.tsx
import dynamic from 'next/dynamic';
import Head from 'next/head';
import '../styles/leaflet.css';

// Dynamically import the Map component with { ssr: false }
const Map = dynamic(() => import('../components/Map'), { ssr: false });


export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js with Leaflet</title>
        <meta name="description" content="Integrating Next.js with Leaflet.js using TypeScript" />
      </Head>
      <Map />
    </div>
  );
}
