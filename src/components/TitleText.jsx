import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Fade, Chip, Divider, IconButton } from "@mui/material";
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa";
import { Bs4Circle } from "react-icons/bs";
import { PiFileCSharp } from "react-icons/pi";
import { GrJs } from "react-icons/gr";
import { SiMui, SiSqlite, SiSelenium } from "react-icons/si";
import { useTheme } from "@mui/material/styles";

const TitleText = ({ hoveredLink, project }) => {
  const [fade, setFade] = useState(false);
  const [height, setHeight] = useState("auto");
  const contentRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 25);
    return () => clearTimeout(timeout);
  }, [hoveredLink, project]);

  useEffect(() => {
    if (contentRef.current) {
      const newHeight = contentRef.current.scrollHeight + 40;
      
      setHeight(newHeight);
    }
  }, [project, fade]);

  const aboutMe = {
    name: "Sam Banks",
    header: "Welcome to my Portfolio.",
    description: "Here, you can find projects I have completed and currently working on.",
    languages: ["Python", "React", "SQL", "HTML", "CSS"],
    skills: ["Project Management", "Analytics", "Web Development"],
  };

  const languageIcons = {
    JavaScript: <GrJs style={{ color: "grey", fontSize: "1.5em" }} />, // JavaScript yellow
    React: <FaReact style={{ color: "grey", fontSize: "1.5em" }} />, // React blue
    Python: <FaPython style={{ color: "grey", fontSize: "1.5em" }} />, // Python blue
    HTML: <FaHtml5 style={{ color: "grey", fontSize: "1.5em" }} />, // HTML orange
    CSS: <FaCss3Alt style={{ color: "grey", fontSize: "1.5em" }} />, // CSS blue
    MUI: <SiMui style={{ color: "grey", fontSize: "1.5em" }} />, // MUI blue
    SQL: <SiSqlite style={{ color: "grey", fontSize: "1.5em" }} />, // SQL dark blue
    "C#": <PiFileCSharp style={{ color: "grey", fontSize: "1.5em" }} />, // C# black
    BeautifulSoup: <Bs4Circle style={{ color: "grey", fontSize: "1.5em" }} />, // BeautifulSoup brown
    Selenium: <SiSelenium style={{ color: "grey", fontSize: "1.5em" }} />, // Selenium
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "600px",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        opacity: 0.9,
        borderRadius: 5,
        zIndex: 1,
        padding: 3,
        "&:hover": {
          opacity: 1,
        },
        transition: "opacity 0.5s, height 0.3s ease-in-out", 
        width: "550px", 
        height: height,
        minHeight: "320px",
        overflow: "hidden",
        [theme.breakpoints.down('lg')]: {
          width: "450px", 
        },
        [theme.breakpoints.down('md')]: {
          width: "400px", 
        },
        [theme.breakpoints.down('sm')]: {
          width: "300px", 
        },
      }}
    >
      <Fade in={fade} timeout={1000}>
        <Box className="content" ref={contentRef} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {project ? (
            <Box id="projInfo" sx={{ mt: 2, color: "black", width: "100%" }}>
              <Typography variant="h1" component="h4" sx={{ [theme.breakpoints.down('sm')]: { fontSize: 18 } }}>
                {project.name}
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, [theme.breakpoints.down('sm')]: { fontSize: 14 } }}>
                {project.header}
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, whiteSpace: 'pre-line', [theme.breakpoints.down('sm')]: { fontSize: 10 } }}>
                {project.description}
              </Typography>

              <Divider sx={{ my: 3, width: "100%", backgroundColor: "black" }} />

              <Box className="langBox" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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

                {project.github && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                      sx={{ color: "#000000", fontSize: 30, opacity: 0.6, transition: "opacity 0.5s", '&:hover': { opacity: 1 } }}
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
          ) : (
            <Box sx={{ mt: 2, color: "black", width: "100%" }}>
              <Typography variant="h2" sx={{ mt: 1, whiteSpace: 'pre-line', [theme.breakpoints.down('sm')]: { fontSize: 14 } }}>
                {aboutMe.header}
              </Typography>
              <Typography variant="h3" sx={{ mt: 2, mb: 4, whiteSpace: 'pre-line', [theme.breakpoints.down('sm')]: { fontSize: 12 } }}>
                {aboutMe.description}
              </Typography>

              <Divider sx={{ width: "100%", backgroundColor: "black", margin: "10px 0" }} />
              <Typography variant="body1" sx={{ mt: 4, [theme.breakpoints.down('sm')]: { fontSize: 11 } }}>
                What I do
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
                {aboutMe.languages.map((language, index) => (
                  <Chip
                    key={index}
                    label={language}
                    icon={languageIcons[language]}
                    variant="outlined"
                    sx={{
                      color: "black",
                      height: "30px", 
                      fontSize: 11, 
                      padding: "0 3px",
                      [theme.breakpoints.down('sm')]: {
                        height: "25px",
                        fontSize: 12, 
                        padding: "0 3px",
                      },
                      '& .MuiChip-icon': {
                        fontSize: 12, // Adjust the icon size
                        [theme.breakpoints.down('sm')]: { fontSize: 16 } 
                      }
                    }}
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
                    sx={{
                      color: "black",
                      height: "30px", 
                      fontSize: 11, 
                      padding: "0 3px",
                      [theme.breakpoints.down('sm')]: {
                        height: "25px", 
                        fontSize: 12, 
                        padding: "0 3px",
                      },
                      '& .MuiChip-icon': {
                        fontSize: 12, // Adjust the icon size
                        [theme.breakpoints.down('sm')]: { fontSize: 16 } 
                      }
                    }}
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