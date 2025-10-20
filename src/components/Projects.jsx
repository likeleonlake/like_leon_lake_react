import React, { useEffect } from "react";
import { motion } from "framer-motion";
import TagIcon from "./TagIcon";

export default function Projects({ setSelectedProject }) {
  const projects = [
    {
      id: 1,
      title: "JarsAI",
      subtitle: "What if we can bring external context to the actual widget state?",
      date: "May 2025",
      image: "./images/jarsai.png",
      tags: ["UI Design", "UX Design", "#Web Development"],
    },
    {
      id: 2,
      title: "Forma Studio",
      subtitle: "An internal tool to manage creative workflows.",
      date: "February 2025",
      image: "./images/forma.png",
      tags: ["UI Design", "#Frontend", "#Design System"],
    },
    {
      id: 3,
      title: "Portfolio Redesign",
      subtitle: "Redesign focused on motion, accessibility, and performance.",
      date: "October 2024",
      image: "./images/portfolio.png",
      tags: ["UX Design", "#React", "#Motion"],
    },
  ];

  useEffect(() => {
    const elements = document.querySelectorAll(".ratio-169");
    if (!elements.length) return;

    const observer = new ResizeObserver(() => {
      elements.forEach((el) => {
        const width = el.offsetWidth;
        el.style.height = `${(width * 9) / 16}px`;
      });
    });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="project-section wrapper" id="projects">
      {projects.map((project, index) => (
        <motion.article
          key={project.id}
          layoutId={`project-${project.id}`}
          className="project-cont"
        >
          <a
            href="#"
            className="project-card-cont"
            onClick={(e) => {
              e.preventDefault();
              setSelectedProject(project);
            }}
          >
            <div className="project-card-meta">
              <div className="project-card-top-cont">
                <h2 className="project-card-title text-headline">
                  {project.title}
                </h2>
                <p className="project-card-subtitle">{project.subtitle}</p>
              </div>

              <div className="project-card-bottom-cont">
                <div className="tag-cont">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      <TagIcon /> {tag}
                    </span>
                  ))}
                </div>
                <p className="project-card-date">{project.date}</p>
              </div>
            </div>

            <div className="project-image-cont ratio-169 shadow-rough">
              <img
                className="project-image"
                src={project.image}
                alt={`${project.title} Project Image`}
              />
            </div>
          </a>

          {index < projects.length - 1 && <div className="project-divider"></div>}
        </motion.article>
      ))}
    </section>
  );
}