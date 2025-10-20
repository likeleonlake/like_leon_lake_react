import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./styles/index.css";
import Guides from "./components/Guides";
import Nav from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Modal from "./components/Modal";
import Button from "./components/buttons/Button";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <Guides />
      <Nav />
      <main>
        <Hero />
        <Button />
        <Projects setSelectedProject={setSelectedProject} />
      </main>

      {/* AnimatePresence envuelve el modal para animación de entrada/salida */}
      <AnimatePresence>
        {selectedProject && (
          <Modal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

