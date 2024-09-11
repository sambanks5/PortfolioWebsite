import React, { useState } from "react";
import BetCalculator from "./BetCalculator";
import { Typography, Modal, Box, Chip, IconButton, Button } from "@mui/material";
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa"; // Import icons from react-icons
import { GrJs } from "react-icons/gr";
import { SiMui } from "react-icons/si";

function ProjectDisplay({ project, open, onClose }) {
  const [nestedModalOpen, setNestedModalOpen] = useState(false);

  const handleNestedModalOpen = () => {
    setNestedModalOpen(true);
  };

  const handleNestedModalClose = () => {
    setNestedModalOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: 0,
    boxShadow: 24,
    p: 5,
    outline: 0,
  };

  // Map languages to icons
  const languageIcons = {
    JavaScript: <GrJs />,
    React: <FaReact />,
    Python: <FaPython />,
    HTML: <FaHtml5 />,
    CSS: <FaCss3Alt />,
    MUI: <SiMui />,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Box sx={style}>
          <Box id="Hello" sx={{ width: 400, display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h2" component="h2">
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, width: "350px" }}>
                {project.header}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, whiteSpace: 'pre-line', width: "350px" }}>
                {project.description}
              </Typography>
              {project.id === 3 && (
                <Button variant="contained" onClick={handleNestedModalOpen} sx={{ mt: 2}}>
                  View Demo
                </Button>
              )}
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.languages.map((language, index) => (
                  <Chip
                    key={index}
                    label={language}
                    icon={languageIcons[language]} // Add icon to chip
                    variant="outlined"
                  />
                ))}
              </Box>
              {project.github && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <IconButton
                    component="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </IconButton>
                </Box>
              )}

            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={nestedModalOpen}
        onClose={handleNestedModalClose}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Box sx={{ ...style, width: '90%', height: '90%' }}>
          <BetCalculator />
        </Box>
      </Modal>
    </>
  );
}

export default ProjectDisplay;