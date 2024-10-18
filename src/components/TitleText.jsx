import React, { useState, useEffect } from "react";
import { Typography, Box, Fade, Chip } from "@mui/material";
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa"; 
import { GrJs } from "react-icons/gr";
import { SiMui, SiSqlite } from "react-icons/si";
import { useTheme } from "@mui/material/styles"; 

const TitleText = ({ hoveredLink, project }) => {
  const [fade, setFade] = useState(false);
  const theme = useTheme(); 

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 50); 
    return () => clearTimeout(timeout);
  }, [hoveredLink, project]);

  const linkTitle = {
    1: "Gravity",
    2: "Bet Monitor",
    3: "Bet Calculator",
    4: "PlaysTV Scraper",
    5: "Contact",
  };

  // colors for each project
  const projectColors = {
    2: "#ff0000", // Bet Monitor - Red
    3: "#00ff00", // Bet Calculator - Green
    4: "#0000ff", // PlaysTV Scraper - Blue
    5: "#ffff00", // Contact - Yellow
  };

  const languageIcons = {
    JavaScript: <GrJs style={{ color: "#f0db4f", fontSize: "1.5em" }} />, // JavaScript yellow
    React: <FaReact style={{ color: "#61dafb", fontSize: "1.5em" }} />, // React blue
    Python: <FaPython style={{ color: "#306998", fontSize: "1.5em" }} />, // Python blue
    HTML: <FaHtml5 style={{ color: "#e34c26", fontSize: "1.5em" }} />, // HTML orange
    CSS: <FaCss3Alt style={{ color: "#264de4", fontSize: "1.5em" }} />, // CSS blue
    MUI: <SiMui style={{ color: "#007fff", fontSize: "1.5em" }} />, // MUI blue
    SQLite: <SiSqlite style={{ color: "#003b57", fontSize: "1.5em" }} />, // SQL dark blue
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "10%",
        width: "40%",
        textAlign: "center",
        transform: "translateY(-50%)",
        backgroundColor: "white",
        opacity: 0.9,
        borderRadius: 5,
        zIndex: 1,
        padding: 2,
        "&:hover": {
          opacity: 1,
        },
        transition: "opacity 0.5s",
        [theme.breakpoints.down('sm')]: {
          width: "80%",
          left: "10%",
          padding: 1,
        },
      }}
    >
      <Fade in={fade} timeout={1000}>
        <Box sx={{ minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography
            key={hoveredLink}
            sx={{ color: "black", fontSize: 40, [theme.breakpoints.down('sm')]: { fontSize: 30 } }}
          >
            Sam Banks
          </Typography>
          {project ? (
            <Box sx={{ mt: 2, color: "black" }}>
              <Typography variant="h3" component="h4" sx={{ [theme.breakpoints.down('sm')]: { fontSize: 20 } }}>
                {project.name}
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, [theme.breakpoints.down('sm')]: { fontSize: 18 } }}>
                {project.header}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line', [theme.breakpoints.down('sm')]: { fontSize: 14 } }}>
                {project.description}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
                {project.languages.map((language, index) => (
                  <Chip
                    key={index}
                    label={language}
                    icon={languageIcons[language]}
                    variant="outlined"
                    sx={{ color: "black", height: "35px", [theme.breakpoints.down('sm')]: { height: "30px", fontSize: 12 } }}
                    clickable
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 2, color: "black" }}>
              <Typography variant="h4" sx={{ [theme.breakpoints.down('sm')]: { fontSize: 18 } }}>
                Project Key
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                {Object.keys(projectColors).map((projectId) => (
                  <Box key={projectId} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 20, height: 20, backgroundColor: projectColors[projectId], borderRadius: '50%' }} />
                    <Typography variant="body2" sx={{ [theme.breakpoints.down('sm')]: { fontSize: 14 } }}>
                      {linkTitle[projectId]}
                    </Typography>
                  </Box>
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