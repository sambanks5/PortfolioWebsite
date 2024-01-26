import React, { useState } from "react";
import { Drawer, ToggleButton, ToggleButtonGroup, ButtonGroup, Button, Typography, Box, Divider } from "@mui/material";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import CalculateIcon from "@mui/icons-material/Calculate";
import TuneIcon from "@mui/icons-material/Tune";
import CheckIcon from '@mui/icons-material/Check';


const Header = ({ oddsFormat, setOddsFormat, showRule4, setShowRule4, handleFabClick }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ position: "sticky", top: "10px", right: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      BetCalc.io
      <ButtonGroup variant="text" aria-label="text button group" sx={{ background: "#114036" }}>
        <Button onClick={handleDrawerOpen}>
          Preferences
          <TuneIcon sx={{ ml: 1 }} />
        </Button>
        <Button onClick={handleFabClick}>
          <CalculateIcon sx={{ mr: 1 }} />
          Calculate
        </Button>
      </ButtonGroup>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
          <Typography variant="h4">
            Options
          </Typography>
          <Divider sx={{ width: "100%", my: 1 }} />
          <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Odds Format</Typography>
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
            <ToggleButton value="american">American</ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Show Rule4</Typography>
          <ToggleButton
            value="check"
            size="small"
            selected={showRule4}
            onChange={() => setShowRule4(!showRule4)}
          >
            <CheckIcon />
          </ToggleButton>
          <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Bonuses</Typography>


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
