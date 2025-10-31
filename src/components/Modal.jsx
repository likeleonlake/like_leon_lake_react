import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TagIcon from "./TagIcon";
import { XMarkIcon } from "./Icons";
import Divider from "./Divider";
import "./../styles/components/modal.css";

export default function Modal({ project, onClose }) {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (!project) return;

    // 🚫 Bloquear scroll del fondo
    document.body.style.overflow = "hidden";

    const fakeLoad = setTimeout(() => setContentLoaded(true), 300);

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(fakeLoad);
    };
  }, [project]);

  if (!project) return null;

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.article
        layoutId={`project-${project.id}`}
        className="project-cont modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔘 Botón de cierre */}
        <motion.div 
          className="modal-button-pos"
          initial={{ opacity: 0, top: -40 }}  // 👈 Empieza 40px arriba
          animate={{ opacity: 1, top: 'var(--dimension-600)' }}    // 👈 Se mueve a su posición
          transition={{ 
            delay: 0.2,                      // Espera a que el modal se abra
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]        // Curva suave
          }}
        >
          <div className="button-secondary-cont shadow-deep">
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              <XMarkIcon className="icon-close" />
            </button>
          </div>
        </motion.div>

        {/* 🔹 HERO */}
        <div className="project-card-cont">
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
              <p className="card-date">{project.date}</p>
            </div>
          </div>

          <div className="project-image-cont ratio-169">
            <img
              className="project-image"
              src={project.image}
              alt={`${project.title} Project Image`}
            />
          </div>
        </div>

        {/* 🔸 Divider visible */}
        <div>
          <Divider />
        </div>

        {/* 🔸 CONTENIDO DEL DETALLE */}
        <AnimatePresence mode="wait">
          {!contentLoaded ? (
            <motion.div
              key="loader"
              className="modal-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>Loading project details...</p>
            </motion.div>
          ) : (
            <motion.section
              key="content"
              className="modal-body"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h3>Project Overview</h3>
              <p>
                This project explores how motion and interaction can elevate user
                experience. The goal was to build a responsive and fluid interface
                that feels natural and purposeful.
              </p>

              <h3>My Role</h3>
              <ul>
                <li>UI/UX Design</li>
                <li>Frontend Development</li>
                <li>Animation & Motion Prototyping</li>
              </ul>

              <h3>Process</h3>
              <p>
                The design process began with low-fidelity wireframes and evolved
                through rapid prototyping in Figma and Framer. I focused heavily on
                transitions and interaction flow to keep the experience smooth.
              </p>

              <div className="modal-image-block ratio-169 shadow-rough">
                <img
                  src="./images/detail-placeholder.png"
                  alt="Process showcase"
                  className="modal-image"
                />
              </div>

              <h3>Outcome</h3>
              <p>
                The final design achieves a balance between clarity and motion. It
                serves as a case study in how motion design supports usability and
                brand personality simultaneously.
              </p>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.article>
    </motion.div>
  );
}
