"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const categories = ["All", "Web", "Mobile", "UI/UX", "Fullstack", "Prompt Engineering", "Machine Learning", "Computer Vision", "Game", "AI Agents", "Unity", "Unreal Engine"];

const projectsData = [
  {
    id: 1,
    title: "React Portfolio Website",
    description: "My portfolio website built with React and Tailwind CSS.",
    detailedDescription: "A responsive portfolio website showcasing my skills and projects built with React and Tailwind CSS.",
    image: "/images/projects/PortfolioWebsite_display.png",
    tag: ["All", "Web", "UI/UX"],
    gitUrl: "https://github.com/Elysium-6/Portfolio-Website",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "ScamSensei",
    description: "A scam detection and prevention application built with React and Firebase. Powered by the DeepSeek API, it analyses user responses to better train them to identify scams and phishing attempts.",
    detailedDescription: "A scam detection and prevention application built with React, Python and Firebase. Consisting of four components, the frontend, the database and the two AI agents, implemented in Python, which provide the chat-based and phone call-based training sessions. The primary stack is coded in React Typescript with the database hosted on Firebase. The chat and call agents are powered by DeepSeek and Twilio respectively.",
    image: "/images/projects/ScamSensei_display.png",
    tag: ["All", "Mobile", "UI/UX", "Prompt Engineering"],
    gitUrl: "",
    previewUrl: "/",
  },
  // {
  //   id: 3,
  //   title: "E-commerce Application",
  //   description: "TBA",
  //   image: "/images/projects/3.png",
  //   tag: ["All", "Mobile", "UI/UX", "Fullstack"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
  {
    id: 4,
    title: "Career Guru",
    description: "An application that helps users ages 16-20 navigate their career paths by providing personalized advice and resources.",
    image: "/images/projects/CareerGuru_display.png",
    tag: ["All", "Mobile", "UI/UX", "Prompt Engineering"],
    gitUrl: "/",
    previewUrl: "/",
  },
  // {
  //   id: 5,
  //   title: "Euterpe",
  //   description: "A music recommender system that uses machine learning algorithms to analyze user preferences and suggest new music based on their listening history.",
  //   image: "/images/projects/5.png",
  //   tag: ["All", "Machine Learning"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
  {
    id: 6,
    title: "Tinker Noggins",
    description: "A series of AI Agents that automatically solve popular online puzzles games such as Wordle, Zip and Mini Sudoku. Built with Python using Selenium and Tkinter",
    image: "/images/projects/TinkerNoggins_display.png",
    tag: ["All", "AI Agents", "Computer Vision", "UI/UX"],
    gitUrl: "/",
    previewUrl: "/",
  },
  // {
  //   id: 7,
  //   title: "Kingdoms of Chess",
  //   description: "A reimagination of the classic game of chess. Made in Unity",
  //   image: "/images/projects/7.png",
  //   tag: ["All", "Game", "Unity", "UI/UX", "Machine Learning"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="AI Agents"
          isSelected={tag === "AI Agents"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Fullstack"
          isSelected={tag === "Fullstack"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Game"
          isSelected={tag === "Game"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Machine Learning"
          isSelected={tag === "Machine Learning"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Prompt Engineering"
          isSelected={tag === "Prompt Engineering"}
        />
      </div>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="UI/UX"
          isSelected={tag === "UI/UX"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Unity"
          isSelected={tag === "Unity"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Unreal Engine"
          isSelected={tag === "Unreal Engine"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              detailedDescription={project.detailedDescription}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
