"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { AnimatePresence, motion, useInView } from "framer-motion";

const categoryGroups = [
  {
    title: "Platform",
    tags: ["Web", "Mobile", "Terminal"],
  },
  {
    title: "Game Engines",
    tags: ["Godot", "Unity", "Unreal Engine"],
  },
  {
    title: "Domain",
    tags: ["UI/UX", "Fullstack", "Prompt Engineering", "Machine Learning", "Computer Vision", "AI Agents", "Ecommerce"],
  },
];

const projectsData = [
  {
    id: 1,
    title: "React Portfolio Website",
    type: "Website",
    description: "My portfolio website built with React and Tailwind CSS.",
    detailedDescription: "A responsive portfolio website showcasing my skills and projects built with React and Tailwind CSS.",
    image: "/images/projects/PortfolioWebsite_display.png",
    tag: ["All", "Web", "UI/UX"],
    gitUrl: "https://github.com/Elysium-6/Portfolio-Website",
    previewUrl: "/",
    videoUrl: "",
  },
  {
    id: 2,
    title: "ScamSensei",
    type: "Mobile Application",
    description: "A scam detection and prevention application built with React and Firebase. Powered by the DeepSeek API, it analyses user responses to better train them to identify scams and phishing attempts.",
    detailedDescription: "A scam detection and prevention application built with React, Python and Firebase. Consisting of four components, the frontend, the database and the two AI agents, implemented in Python, which provide the chat-based and phone call-based training sessions. The primary stack is coded in React Typescript with the database hosted on Firebase. The chat and call agents are powered by DeepSeek and Twilio respectively.",
    details: {
      sections: [
        {
          type: "text",
          title: "Problem",
          body: "Many users are not confident recognising scams or phishing attempts, especially when a message feels urgent or personalised. These attacks often exploit human hesitation rather than technical vulnerability.",
        },
        {
          type: "text",
          title: "Solution",
          body: "ScamSensei turns awareness into practice by giving users realistic scam scenarios and immediate feedback on how to respond. The app teaches users to slow down, verify the signal, and recognise manipulation tactics before they become victims.",
        },
        {
          type: "text",
          title: "Implementation",
          body: "The mobile frontend was built with React and TypeScript, with Firebase used for authentication and data storage. I also implemented two AI agents in Python: one for chat-based scam coaching and another for phone-call style training simulations powered by Twilio and DeepSeek APIs.",
        },
        {
          type: "list",
          title: "Key features",
          items: [
            "Realistic scam training scenarios",
            "AI-powered chat guidance",
            "Phone-call simulation for practical learning",
            "Feedback loop to strengthen user judgement",
          ],
        },
      ],
    },
    image: "/images/projects/ScamSensei_display.png",
    tag: ["All", "Mobile", "UI/UX", "Prompt Engineering"],
    gitUrl: "",
    previewUrl: "/",
    videoUrl: "",
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
    type: "Mobile Application",
    description: "An application that helps users ages 16-20 navigate their career paths by providing personalized advice and resources.",
    details: {
      sections: [
        {
          type: "text",
          title: "Problem",
          body: "Young people often struggle to make career decisions because they lack clear guidance, personalised pathways, and tools to evaluate their strengths against different opportunities.",
        },
        {
          type: "text",
          title: "Solution",
          body: "Career Guru helps users understand their interests, evaluate suitable routes, and access targeted resources based on their aspirations and current stage of career exploration.",
        },
        {
          type: "text",
          title: "Implementation",
          body: "The app was designed as a mobile-first experience with a clear, accessible interface. It uses AI-assisted recommendations to tailor suggestions while keeping the experience simple enough for younger users to engage with easily.",
        },
        {
          type: "list",
          title: "Key features",
          items: [
            "Personalized career guidance",
            "Skill and interest matching",
            "Clear educational and career pathways",
            "Mobile-first UX for younger users",
          ],
        },
      ],
    },
    image: "/images/projects/CareerGuru_display.png",
    tag: ["All", "Mobile", "UI/UX", "Prompt Engineering"],
    gitUrl: "/",
    previewUrl: "/",
    videoUrl: "",
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
    detailedDescription: "Introducing the Tinker Noggins:\nWolly - Solves Wordle by appliying information theory to an existing list of words and filtering based on each guess. Uses Selenium to interact with the web game.",
    image: "/images/projects/TinkerNoggins_display.png",
    tag: ["All", "AI Agents", "Computer Vision", "UI/UX"],
    gitUrl: "/",
    previewUrl: "/",
    videoUrl: "",
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
  {
    id: 8,
    title: "Ledger",
    type: "TUI Application",
    description: "A simple personal finance tracker application run in the terminal. Built with Textual in Python.",
    image: "/images/projects/Ledger_display.png",
    tag: ["All", "Ecommerce", "Terminal", "UI/UX"],
    gitUrl: "/",
    previewUrl: "/",
    videoUrl: "",
  },
  {
    id: 9,
    title: "TrickyTactics",
    type: "Video Game",
    description: "A strategy-based autobattler game built in Godot. Players build their own teams of unique units over the course of several rounds and compete in different arenas.",
    image: "/images/projects/TrickyTactics_display.png",
    tag: ["All", "Godot", "Game"],
    gitUrl: "/",
    previewUrl: "/",
    videoUrl: "",
    community: true,
  },
];

const ProjectsSection = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const toggleTag = (tagName) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tagName)
        ? currentTags.filter((item) => item !== tagName)
        : [...currentTags, tagName]
    );
  };

  const clearFilters = () => setSelectedTags([]);

  const filteredProjects = projectsData.filter((project) =>
    selectedTags.every((filter) => project.tag.includes(filter))
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="px-4 w-full">
      <div className="mx-auto mb-8 w-full max-w-full md:mb-12">
        <h2 className="text-3xl font-bold text-white text-center md:text-4xl">
          My Projects
        </h2>
        <div className="flex justify-center flex-col items-start gap-4 w-full">
          <div className="w-full flex flex-wrap items-center justify-start gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-between gap-2 rounded-full border border-white bg-[#121212] px-4 py-2 text-sm font-medium text-white transition hover:border-[#121212] hover:bg-white hover:text-[#121212]"
              onClick={() => setIsFilterOpen((prev) => !prev)}
            >
              <span className="truncate">Filters: {selectedTags.length > 0 ? selectedTags.length + " active" : "None"}</span>
              <span
                className={`text-sm transition-transform duration-200 ${
                  isFilterOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-white bg-[#121212] px-3 py-2 text-sm text-white transition hover:border-[#121212] hover:bg-white hover:text-[#121212]"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-5xl rounded-3xl border border-white bg-[#121212] p-4 shadow-lg shadow-black/25"
            >
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                    Filter projects
                  </p>
                  <p className="text-xs text-white">
                    Select one or more tags to narrow results.
                  </p>
                </div>
                <span className="rounded-full border border-white bg-[#121212] px-3 py-1 text-xs text-white">
                  {selectedTags.length} selected
                </span>
              </div>

              <div className="border-t border-white"></div>

              <div className="mt-4 space-y-6">
                {categoryGroups.map((group) => (
                  <div key={group.title} className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      {group.title}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                      {group.tags.map((category) => {
                        const active = selectedTags.includes(category);
                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => toggleTag(category)}
                            className={`rounded-full border px-3 py-2 text-sm font-medium text-center transition ${
                              active
                                ? "border-white bg-white text-[#121212]"
                                : "border-white bg-[#121212] text-white hover:border-white hover:bg-white/10"
                            }`}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-white"></div>
            </motion.div>
          )}
        </AnimatePresence>
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
              type={project.type ? project.type : "Project"}
              description={project.description}
              detailedDescription={project.detailedDescription}
              details={project.details}
              tags={project.tag}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              videoUrl={project.videoUrl}
              community={project.community}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
