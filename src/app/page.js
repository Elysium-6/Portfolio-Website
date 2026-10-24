import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import Novatrix from "./ui/novatrix-background";


export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen">
        <Novatrix
          color={[1, 1, 1]}
          amplitude={0.5}
          mouseReact={true}
          speed={1.0}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <Navbar />
      <HeroSection />
      <div className="relative z-10 flex-1 bg-[#121212]">
        <div className="container mx-auto px-12 pt-18 pb-4">
          <AchievementsSection />
          <AboutSection />
          <ProjectsSection />
          <EmailSection />
        </div>
        <Footer />
      </div>
    </main>
  );
}
