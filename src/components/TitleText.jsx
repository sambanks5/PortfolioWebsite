import React, { useState, useEffect } from "react";
import { Typography, Box, Fade, Chip, Divider } from "@mui/material";
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

  const aboutMe = {
    name: "Hi, I'm Sam.",
    header: "Product Development Lead & Senior Trader",
    description: "I’m a Product Development Lead with experience managing development teams, coordinating product updates, and turning client and stakeholder feedback into practical solutions. In my current role, I’ve overseen product updates and feature improvements, ensuring seamless functionality and aligning projects with business goals.\n\nIn addition, I’ve developed Python and SQL tools for live analysis of betting patterns on incoming wagers, providing essential insights for in-house traders—streamlining workflows and now integral to the company’s operations. My work has directly supported growth initiatives and enhanced customer engagement.\n\nTo find out more, click around.",
    languages: ["Python", "React", "SQL", "HTML", "CSS"],
    skills: ["Project Management", "Problem Solving", "Analytics", "Communication & Collaboration"],
  };

  const languageIcons = {
    JavaScript: <GrJs style={{ color: "#f0db4f", fontSize: "1.5em" }} />, // JavaScript yellow
    React: <FaReact style={{ color: "#61dafb", fontSize: "1.5em" }} />, // React blue
    Python: <FaPython style={{ color: "#306998", fontSize: "1.5em" }} />, // Python blue
    HTML: <FaHtml5 style={{ color: "#e34c26", fontSize: "1.5em" }} />, // HTML orange
    CSS: <FaCss3Alt style={{ color: "#264de4", fontSize: "1.5em" }} />, // CSS blue
    MUI: <SiMui style={{ color: "#007fff", fontSize: "1.5em" }} />, // MUI blue
    SQL: <SiSqlite style={{ color: "#003b57", fontSize: "1.5em" }} />, // SQL dark blue
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
              <Typography variant="h1" sx={{ [theme.breakpoints.down('sm')]: { fontSize: 18 } }}>
                {aboutMe.name}
              </Typography>
              <Divider sx={{ width: "100%", backgroundColor: "black", margin: "10px 0" }} />
              <Typography variant="h2" sx={{ mt: 1, whiteSpace: 'pre-line', [theme.breakpoints.down('sm')]: { fontSize: 14 } }}>
                {aboutMe.header}
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, whiteSpace: 'pre-line', [theme.breakpoints.down('sm')]: { fontSize: 12 } }}>
                {aboutMe.description}
              </Typography>
              <Box sx={{ mt: 7, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
                {aboutMe.languages.map((language, index) => (
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
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
                  {aboutMe.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      variant="outlined"
                      sx={{ color: "black", height: "35px", [theme.breakpoints.down('sm')]: { height: "30px", fontSize: 12 } }}
                      clickable
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