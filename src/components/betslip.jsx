import React, { useState } from "react";
import { Container, Typography, Box, FormControl, Paper, Grid, Button, TextField } from "@mui/material";

const Betslip = ({ betslip, runners }) => {
  const betcruncher = require("../betcruncher");
  const [result, setResult] = useState(null);

  const calculateResult = () => {
    console.log("betslip:", betslip);
    if (betslip && typeof betslip === "object" && betslip !== null && "stake" in betslip && "type" in betslip && "eachWay" in betslip) {
      setResult(betcruncher.calculator(betslip, runners));
    }
  };

  return (
    <Paper sx={{ p: 2, minHeight: 250 }} elevation={8}>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          {result ? `Total Stake: £${result.totalStake}` : "Total Stake: £0"}
        </Typography>
        <Typography variant="h2" sx={{ mb: 2 }}>
          {result ? `Returns: £${result.returns}` : "Returns: £0"}
        </Typography>
        <Typography variant="h2" sx={{ mb: 2 }}>
          {result ? `Profit: £${result.profit}` : "Profit: £0"}
        </Typography>
      </Box>

      <Button variant="outlined" onClick={calculateResult} fullWidth>
        Calculate
      </Button>
    
    </Paper>
  );
};

export default Betslip;
