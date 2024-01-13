import React from "react";
import { Container, Typography, Box, FormControl, Paper, Grid, Button, TextField } from "@mui/material";

const Betslip = ({ stake, betType, eachWay, odds }) => {
  // const bettingModule = require("/betcruncher");

  // // console.log(stake, betType, eachWay);
  // const [betslip, setBetslip] = React.useState({
  //   type: "",
  //   stake: "",
  //   betType: "",
  //   eachWay: false,
  //   odds: [],
  // });

  // function calculateBet(betslip, runners) {
  //   try {
  //     const result = bettingModule.calculator(betslip, runners);
  //     console.log(`Total stake: ${result.totalStake}`);
  //     console.log(`Returns: ${result.returns}`);
  //     console.log(`Profit: ${result.profit}`);
  //   } catch (error) {
  //     console.error(`Error calculating bet: ${error.message}`);
  //   }
  // }

  return (
    <Paper sx={{ width: "80%", p: 2 }} elevation={8}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Result
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Stake: {stake} {stake !== null && stake !== "" && (eachWay ? "Each Way" : "Win Only")}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Bet Type: {betType}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Odds: {odds.join(", ")}
      </Typography>
      {/* <Button variant="outlined" onClick={() => calculateBet(betslip, runners)} fullWidth /> */}
    </Paper>
  );
};

export default Betslip;
