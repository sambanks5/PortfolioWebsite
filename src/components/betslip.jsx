import React, { useState } from "react";
import { Typography, Box, Paper, Divider, Grow, Fab } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";


const Betslip = ({ handleFabClick, result }) => {
  // const betcruncher = require("../betcruncher");
  // const [result, setResult] = useState(null);

  // const calculateResult = () => {
  //   console.log("betslip:", betslip);
  //   if (betslip && typeof betslip === "object" && betslip !== null && "stake" in betslip && "type" in betslip && "eachWay" in betslip) {
  //     setResult(betcruncher.calculator(betslip, runners));
  //   }
  // };

  return (
    <Paper sx={{ p: 2 }} elevation={8}>
      <Box sx={{ height: 100, display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
        <Grow in={!!result}>
          <Typography variant="h2">{result ? `Total Stake: £${result.totalStake}` : "Total Stake: £0"}</Typography>
        </Grow>
        <Divider orientation="vertical" flexItem />
        <Grow in={!!result}>
          <Typography variant="h2">{result ? `Returns: £${result.returns}` : "Returns: £0"}</Typography>
        </Grow>
        <Divider orientation="vertical" flexItem />
        <Grow in={!!result}>
          <Typography variant="h2">{result ? `Profit: £${result.profit}` : "Profit: £0"}</Typography>
        </Grow>
        <Fab color="secondary" variant="extended" aria-label="calc" onClick={handleFabClick}>
        <CalculateIcon sx={{ mr: 1 }} />
        Calculate
      </Fab>
      </Box>

    </Paper>
  );
};

export default Betslip;
