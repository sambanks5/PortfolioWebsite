import React, { useState, useEffect, useRef } from "react";
import { projectLinks, colors } from './GravityBackground';
import { lighten } from 'polished';
import { Typography, Box, Fade, Chip, Divider, IconButton } from "@mui/material";
import { FaReact, FaPython, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa";
import { Bs4Circle } from "react-icons/bs";
import { HiMiniHome } from "react-icons/hi2";
import { PiFileCSharp } from "react-icons/pi";
import { GrJs } from "react-icons/gr";
import { SiMui, SiSqlite, SiSelenium } from "react-icons/si";

const MainContainer = ({ setSelectedProject, hoveredLink, setHoveredLink, project, isMobile }) => {
  const [fade, setFade] = useState(false);
  const [height, setHeight] = useState("auto");
  const contentRef = useRef(null);

  useEffect(() => {
    console.log("Hovered Link ID inside TitleText component:", hoveredLink);
    console.log("isMobile:", isMobile);
  }, [hoveredLink, isMobile]);

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
    JavaScript: <GrJs style={{ color: "grey", fontSize: "1.5em" }} />,
    React: <FaReact style={{ color: "grey", fontSize: "1.5em" }} />,
    Python: <FaPython style={{ color: "grey", fontSize: "1.5em" }} />,
    HTML: <FaHtml5 style={{ color: "grey", fontSize: "1.5em" }} />,
    CSS: <FaCss3Alt style={{ color: "grey", fontSize: "1.5em" }} />,
    MUI: <SiMui style={{ color: "grey", fontSize: "1.5em" }} />,
    SQL: <SiSqlite style={{ color: "grey", fontSize: "1.5em" }} />,
    "C#": <PiFileCSharp style={{ color: "grey", fontSize: "1.5em" }} />,
    BeautifulSoup: <Bs4Circle style={{ color: "grey", fontSize: "1.5em" }} />,
    Selenium: <SiSelenium style={{ color: "grey", fontSize: "1.5em" }} />,
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: isMobile ? "20%" : "30%",
        left: isMobile ? "15px" : "100px",
        backgroundColor: isMobile ? "transparent" : "white",
        opacity: 0.9,
        borderRadius: 5,
        zIndex: 1,
        padding: 3,
        "&:hover": {
          opacity: 1,
        },
        transition: "opacity 0.5s, height 0.2s ease-in-out",
        width: isMobile ? "95%" : "530px",
        height: height,
        minHeight: "320px",
        overflow: "hidden",
      }}
    >
      <Fade in={fade} timeout={1000}>
        <Box className="content" ref={contentRef} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {project ? (
            <Box id="projInfo" sx={{ mt: 2, color: "black", width: "100%" }}>
              <Typography variant="h1" component="h4" sx={{ fontSize: isMobile ? 20 : 20 }}>
                {project.name}
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, fontSize: isMobile ? 16 : 18 }}>
                {project.header}
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, whiteSpace: 'pre-line', fontSize: isMobile ? 14 : 14 }}>
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
                      sx={{ color: "black", height: isMobile ? "30px" : "35px", fontSize: isMobile ? 12 : 14 }}
                      clickable
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    sx={{ color: "#000000", fontSize: 30, opacity: 0.6, transition: "opacity 0.5s", '&:hover': { opacity: 1 } }}
                    aria-label="Home"
                    onClick={() => setSelectedProject(null)}
                  >
                    <HiMiniHome style={{ fontSize: "30px" }} />
                  </IconButton>
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
              <Typography variant="h2" sx={{ mt: 1, whiteSpace: 'pre-line', fontSize: isMobile ? 14 : 18 }}>
                {aboutMe.header}
              </Typography>
              <Typography variant="h3" sx={{ mt: 2, mb: 4, whiteSpace: 'pre-line', fontSize: isMobile ? 12 : 14 }}>
                {aboutMe.description}
              </Typography>
              {!isMobile && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
                    {aboutMe.languages.map((language, index) => (
                      <Chip
                        key={index}
                        label={language}
                        icon={languageIcons[language]}
                        variant="outlined"
                        sx={{
                          color: "black",
                          height: isMobile ? "25px" : "30px",
                          fontSize: isMobile ? 12 : 14,
                          padding: "0 3px",
                          '& .MuiChip-icon': {
                            fontSize: isMobile ? 16 : 18,
                          }
                        }}
                        clickable
                      />
                    ))}
                  </Box>
                  <Divider sx={{ width: "100%", backgroundColor: "black", my: 4 }} />
                  <Box sx={{ width: "100%", display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: "center" }}>
                    {projectLinks.slice(1).map((link, index) => {
                      const color = colors[index + 1]; // Skip the first color
                      return (
                        <Chip
                          key={link.id}
                          label={link.name}
                          icon={<Box sx={{ width: 16, height: 16, backgroundColor: color ? `#${color.toString(16)}` : 'transparent', borderRadius: '50%' }} />}
                          variant="filled"
                          onClick={() => setSelectedProject(link.id)}
                          onMouseEnter={() => {
                            
                            setHoveredLink(link.id);
                          }}
                          onMouseLeave={() => {
                            setHoveredLink(null);
                          }}
                          sx={{
                            color: "black",
                            height: isMobile ? "25px" : "30px",
                            fontSize: isMobile ? 12 : 14,
                            padding: "0 3px",
                            '& .MuiChip-icon': {
                              fontSize: isMobile ? 16 : 18,
                            },
                            '&:hover': { backgroundColor: lighten(0.2, `#${color.toString(16)}`) }
                          }}
                          clickable
                        />
                      );
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default MainContainer;