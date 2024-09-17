import React, { useState } from "react";
import { Typography, Modal, Box, Chip, IconButton, useMediaQuery } from "@mui/material";
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa"; // Import icons from react-icons
import { GrJs } from "react-icons/gr";
import { SiMui } from "react-icons/si";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import betCalculatorGif from "../media/betCalculatorGif.gif";

function ProjectDisplay({ project, open, onClose }) {
  const isMobile = useMediaQuery('(max-width:600px)');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : 1000,
    height: isMobile ? '90%' : 800,
    bgcolor: 'background.paper',
    border: 0,
    boxShadow: 24,
    justifyContent: 'center',
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
          <Box id="Hello" sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", m: 2}}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mx: 2, width: isMobile ? "100%" : "50%" }}>
              <Typography variant="h2" component="h2" sx={{ fontSize: isMobile ? "1.5rem" : "2rem" }}>
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, width: isMobile ? "100%" : "350px", fontSize: 22  }}>
                {project.header}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, whiteSpace: 'pre-line', width: isMobile ? "100%" : "350px", fontSize: 20 }}>
                {project.description}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.languages.map((language, index) => (
                  <Chip
                    key={index}
                    label={language}
                    icon={languageIcons[language]}
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
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mx: 2, width: isMobile ? "100%" : "50%" }}>
              {project.id === 3 && (
                <img src={betCalculatorGif} alt="Bet Calculator Demo" style={{ width: isMobile ? "80%" : "420px", height: isMobile ? "auto" : "400px" }} />
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ProjectDisplay;