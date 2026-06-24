import Navbar from "@/components/Navbar";
import UploadCard from "@/components/UploadCard";
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-10">

        <UploadCard />

        <FeatureCards />

      </section>

    </main>
  );
}