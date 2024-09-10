import React from "react";
import { Box, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Header = () => {
  return (
    <Box sx={{ position: "fixed", top: "0", left: "0", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "20px", zIndex: 1000 }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        Sam Banks
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <IconButton href="https://github.com/sambanks5" target="_blank">
          <GitHubIcon />
        </IconButton>
        <IconButton href="https://linkedin.com/in/your-linkedin-profile" target="_blank">
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;