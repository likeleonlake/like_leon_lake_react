import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TagIcon from "./TagIcon";
import "./../styles.css";

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
  const elementos = document.querySelectorAll(".ratio-169");
  if (!elementos.length) return;

  const observer = new ResizeObserver(() => {
    elementos.forEach((el) => {
      const ancho = el.offsetWidth;
      el.style.height = `${(ancho * 9) / 16}px`;
    });
  });

  elementos.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

  return (
    <section className="project-section wrapper" id="projects">
      {projects.map((project, index) => (
        <article key={project.id}>
          <motion.a
            layoutId={`project-${project.id}`}
            href="#"
            className="project-cont"
            onClick={(e) => {
              e.preventDefault();
              setSelectedProject(project); // al hacer click se abre la modal
            }}
          >
            <div className="project-meta">
              <div className="project-top-cont">
                <h2 className="project-title text-headline">{project.title}</h2>
                <p className="project-subtitle">{project.subtitle}</p>
              </div>
              <div className="project-bottom-cont">
                <div className="tag-cont">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      <TagIcon /> {tag}
                    </span>
                  ))}
                </div>
                <p className="project-date">{project.date}</p>
              </div>
            </div>

            <div className="project-image-cont ratio-169 shadow-rough">
              <img
                className="project-image"
                src={project.image}
                alt={`${project.title} Project Image`}
              />
            </div>
          </motion.a>

          {index < projects.length - 1 && <div className="project-divider"></div>}
        </article>
      ))}
    </section>
  );
}