import React from "react";
import { motion } from "framer-motion";
import "./../styles.css"; // ajusta según tu estructura
import TagIcon from "./TagIcon";



export default function Modal({ project, onClose }) {

    console.log("motion:", motion);
  if (!project) return null; // evita renderizar si no hay proyecto seleccionado

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        layoutId= {`project-${project.id}`}
        className="project-cont"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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
      </motion.div>
    </motion.div>
  );
}
