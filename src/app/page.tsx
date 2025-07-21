"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import ExperienceSection from "@/components/ExperienceSection";
import MobileNav from "@/components/MobileNav";
import SectionWrapper from "@/components/SectionWrapper";
import Project from "@/components/Project";
import Ui from "@/components/Ui";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-[#0d1117]">
        <SectionWrapper>
          <Header />
        </SectionWrapper>

        <SectionWrapper >
          <Hero />
          <Ui />
        </SectionWrapper>

        <SectionWrapper>
          <ExperienceSection />
          <Ui />
        </SectionWrapper>

        <SectionWrapper>
          <Skills />
          <Ui />
        </SectionWrapper>


        <SectionWrapper>
          <Project />
          <Ui />
        </SectionWrapper>


        <SectionWrapper>
          <Footer />
        </SectionWrapper>



        <MobileNav />
      </div>
    </>
  );
}
