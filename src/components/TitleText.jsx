import React, { useState, useEffect } from "react";
import { Typography, Box, Fade, Chip } from "@mui/material";
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa"; // Import icons from react-icons
import { GrJs } from "react-icons/gr";
import { SiMui } from "react-icons/si";

const TitleText = ({ hoveredLink, project }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 50); // Delay to trigger fade-out and then fade-in
    return () => clearTimeout(timeout);
  }, [hoveredLink, project]);

  // Map hovered link to the title
  const linkTitle = {
    1: "Gravity",
    2: "Bet Monitor",
    3: "Bet Calculator",
    4: "PlaysTV Scraper",
    5: "Contact",
  };

  // Map languages to icons
  const languageIcons = {
    JavaScript: <GrJs sx={{ color: "black" }} />,
    React: <FaReact sx={{ color: "black" }} />,
    Python: <FaPython sx={{ color: "black" }} />,
    HTML: <FaHtml5 sx={{ color: "black" }} />,
    CSS: <FaCss3Alt sx={{ color: "black" }} />,
    MUI: <SiMui sx={{ color: "black" }} />,
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        width: "60%",
        textAlign: "center",
        transform: "translateY(-50%)",
        backgroundColor: "white",
        opacity: 0.9,
        borderRadius: 5,
        zIndex: 1,
        padding: 2,

      }}
    >
      <Fade in={fade} timeout={1000}>
        <Box sx={{minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Typography
            key={hoveredLink}
            sx={{ color: "black", fontSize: 50 }}
          >
            {hoveredLink ? linkTitle[hoveredLink] : "Sam Banks"}
          </Typography>
          {project && (
            <Box sx={{ mt: 2, color: "black" }}>
              <Typography variant="h3" component="h4">
                {project.name}
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {project.header}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                {project.description}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
                {project.languages.map((language, index) => (
                  <Chip
                    key={index}
                    label={language}
                    icon={languageIcons[language]}
                    variant="outlined"
                    sx={{ color: "black", height: "35px" }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default TitleText;