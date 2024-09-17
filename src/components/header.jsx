import React from "react";
import { Box, Typography } from "@mui/material";


const Header = () => {
  return (
    <Box sx={{ position: "fixed", top: "0", left: "0", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "20px", zIndex: 1000 }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", color: "black"}}>
        <Typography fontSize={15}>Sam Banks</Typography>
      </Box>
    </Box>
  );
};

export default Header;