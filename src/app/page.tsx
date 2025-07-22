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
      <div className="bg-[#0d1117] bg-[url('https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?q=80&w=1048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover bg-center text-white">
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
