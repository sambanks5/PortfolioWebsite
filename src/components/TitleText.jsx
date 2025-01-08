import React, { useState, useEffect } from "react";
import { Typography, Box, Fade, Chip, Divider, IconButton } from "@mui/material";
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa";
import { Bs4Circle } from "react-icons/bs";
import { PiFileCSharp } from "react-icons/pi";
import { GrJs } from "react-icons/gr";
import { SiMui, SiSqlite, SiSelenium } from "react-icons/si";
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
    name: "Sam Banks",
    header: "Welcome to my Portfolio.",
    description: "Here, you can find examples of my work, including projects I have completed and currently working on.",
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
    "C#": <PiFileCSharp style={{ color: "#000000", fontSize: "1.5em" }} />, // C# black
    BeautifulSoup: <Bs4Circle style={{ color: "#5c3d0e", fontSize: "1.5em" }} />, // BeautifulSoup brown
    Selenium: <SiSelenium style={{ color: "#43B02A", fontSize: "1.5em" }} />, // Selenium
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "10%",
        width: "35%",
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
        [theme.breakpoints.down('md')]: {
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
              <Typography variant="h1" component="h4" sx={{ [theme.breakpoints.down('sm')]: { fontSize: 20 } }}>
                {project.name}
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, [theme.breakpoints.down('sm')]: { fontSize: 18 } }}>
                {project.header}
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, whiteSpace: 'pre-line', [theme.breakpoints.down('sm')]: { fontSize: 14 } }}>
                {project.description}
              </Typography>

              <Divider sx={{ my: 3, width: "100%", backgroundColor: "black" }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
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
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
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
          ) : (
            <Box sx={{ color: "black" }}>
              {/* <Typography variant="h1" sx={{ [theme.breakpoints.down('sm')]: { fontSize: 18 } }}>
                {aboutMe.name}
              </Typography>
              <Divider sx={{ width: "100%", backgroundColor: "black", margin: "10px 0" }} /> */}
              <Typography variant="h2" sx={{ mt: 1, whiteSpace: 'pre-line', [theme.breakpoints.down('sm')]: { fontSize: 14 } }}>
                {aboutMe.header}
              </Typography>
              <Typography variant="h3" sx={{ my: 4, whiteSpace: 'pre-line', [theme.breakpoints.down('sm')]: { fontSize: 12 } }}>
                {aboutMe.description}
              </Typography>


              <Divider sx={{ width: "100%", backgroundColor: "black", margin: "10px 0" }} />
              <Typography variant="body1" sx={{ mt: 4, [theme.breakpoints.down('sm')]: { fontSize: 18 } }}>
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
                      height: "30px", // Adjust the height of the chip
                      fontSize: 11, // Adjust the font size of the label
                      padding: "0 3px", // Adjust the padding inside the chip
                      [theme.breakpoints.down('sm')]: {
                        height: "25px", // Adjust the height for small screens
                        fontSize: 12, // Adjust the font size for small screens
                        padding: "0 3px", // Adjust the padding for small screens
                      },
                      '& .MuiChip-icon': {
                        fontSize: 12, // Adjust the icon size
                        [theme.breakpoints.down('sm')]: { fontSize: 16 } // Adjust the icon size for small screens
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
                      height: "30px", // Adjust the height of the chip
                      fontSize: 11, // Adjust the font size of the label
                      padding: "0 3px", // Adjust the padding inside the chip
                      [theme.breakpoints.down('sm')]: {
                        height: "25px", // Adjust the height for small screens
                        fontSize: 12, // Adjust the font size for small screens
                        padding: "0 3px", // Adjust the padding for small screens
                      },
                      '& .MuiChip-icon': {
                        fontSize: 12, // Adjust the icon size
                        [theme.breakpoints.down('sm')]: { fontSize: 16 } // Adjust the icon size for small screens
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