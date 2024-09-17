import React, { useState, useEffect } from "react";
import { Typography, Box, Fade } from "@mui/material";

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

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        width: "60%",
        textAlign: "center",
        transform: "translateY(-50%)",
      }}
    >
      <Fade in={fade} timeout={1000}>
        <Box>
          <Typography
            key={hoveredLink}
            sx={{ color: "black", fontSize: 50 }}
          >
            {hoveredLink ? linkTitle[hoveredLink] : "Sam Banks"}
          </Typography>
          {project && (
            <Box sx={{ mt: 2, color: "black" }}>
              <Typography variant="h6" component="h6">
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {project.header}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                {project.description}
              </Typography>
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default TitleText;