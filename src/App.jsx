import React, { useState } from "react";
import Header from "./components/header.jsx";
import GravityBackground from "./components/GravityBackground.jsx";
import ProjectDisplay from "./components/ProjectDisplay.jsx";
import { Container } from "@mui/material";

function App() {
   // Step 1: Add State Management
   const [selectedProject, setSelectedProject] = useState(null);

   // Handler function to select a project
   const selectProject = (project) => {
      setSelectedProject(project);
   };

   return (
      <Container maxWidth>
         <Header />
         <GravityBackground selectProject={selectProject} />
         {selectedProject && <ProjectDisplay project={selectedProject} />}
      </Container>
   );
}

export default App;