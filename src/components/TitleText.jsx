import React from "react";
import { Typography, Box } from "@mui/material";

const TitleText = ({ hoveredLink }) => {
    console.log(hoveredLink);

// map hovered link to the title
  // Map languages to icons
  const linkTitle = {
    1: "Gravity",
    2: "Bet Monitor",
    3: "Bet Calculator",
    4: "PlaysTV Scraper",
    5: "Contact",
    };
  return (
    <Box sx={{ position: "absolute", top: "50%", width: "60%", textAlign: "center", transform: "translateY(-50%)" }}>
      {hoveredLink ? (
        <Typography sx={{ color: "black", fontSize: 50 }}>Hovered Link ID: {hoveredLink}</Typography>
      ) : (
        <Typography sx={{ color: "black", fontSize: 50 }}>Sam Banks</Typography>
      )}
    </Box>
  );
};

export default TitleText;