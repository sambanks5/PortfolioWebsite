import React, { useState } from "react";
import { Fab, Drawer, ToggleButton, ToggleButtonGroup, Typography, Box } from "@mui/material";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import TuneIcon from "@mui/icons-material/Tune";

const Header = ({ oddsFormat, setOddsFormat}) => {
    
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
      };
    
      const handleDrawerClose = () => {
        setDrawerOpen(false);
      };

  return (
      <Box sx={{ position: "sticky", top: "10px", right: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        Bet Calculator
        <Fab color="secondary" variant="extended" aria-label="add" onClick={handleDrawerOpen}>
          <TuneIcon />
        </Fab>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Options
            </Typography>
            <ToggleButtonGroup
              value={oddsFormat}
              size="small"
              exclusive
              orientation="vertical"
              onChange={(event, newFormat) => {
                if (newFormat !== null) {
                  setOddsFormat(newFormat);
                }
              }}
              sx={{ width: 150 }}>
              <ToggleButton value="fractional">Fractional</ToggleButton>
              <ToggleButton value="decimal">Decimal</ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ p: 2, position: "absolute", bottom: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h5">Sam Banks 2024</Typography>

              <Link href="https://github.com/sambanks5" target="_blank" rel="noopener noreferrer">
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </Link>
            </Box>
          </Box>
        </Drawer>
      </Box>
  );
};

export default Header;
