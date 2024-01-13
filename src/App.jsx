import React, { useState, useEffect } from "react";
import Betslip from "./components/betslip";
import "./App.css";
import { Container, ToggleButton, ToggleButtonGroup, Divider, Typography, FormControlLabel, Switch, Box, FormControl, Paper, Grid, Button, TextField, InputAdornment, MenuItem, Select, Grow } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { betTypes } from "./betcruncher";

function App() {
  const betcruncher = require("./betcruncher");


  const [betslip, setBetslip] = useState({
    stake: '0',
    type: "single",
    eachWay: false,
  });

  const [runners, setRunners] = useState([]);
  const [stake, setStake] = useState("0");
  const [odds, setOdds] = useState([]);
  const [error, setError] = useState(false);
  const [oddsFormat, setOddsFormat] = useState("fractional");
  const [placeTerms, setPlaceTerms] = useState(Array(betslip.selections).fill("1/4"));
  const [numSelections, setNumSelections] = useState(betTypes[betslip.type]?.selections || 0);
  const [status, setStatus] = useState(Array(betslip.selections).fill("Won"));

  const initializeRunners = (numSelections) => {
    setRunners((prevRunners) => {
      if (numSelections > prevRunners.length) {
        // If numSelections has increased, add new runners
        const newRunners = [...prevRunners];
        for (let i = prevRunners.length; i < numSelections; i++) {
          newRunners.push({ odds: "1/1", terms: "1/4", position: 1 });
        }
        return newRunners;
      } else if (numSelections < prevRunners.length) {
        // If numSelections has decreased, remove runners
        return prevRunners.slice(0, numSelections);
      } else {
        // If numSelections hasn't changed, return the existing runners
        return prevRunners;
      }
    });
  };

  // Call this function whenever numSelections changes
  useEffect(() => {
    initializeRunners(numSelections);
  }, [numSelections]);
  const types = Object.keys(betTypes);
  
  console.log(betslip);
  
  console.log(runners);

  const handleTypeChange = (type) => {
    setBetslip({ ...betslip, type });
    setNumSelections(betTypes[type]?.selections || 0);
  };

  const handleStakeChange = (event) => {
    const value = event.target.value;
    if (isNaN(value) || value < 0) {
      setError(true);
    } else {
      setError(false);
      setStake(value);
      setBetslip((prevBetslip) => ({ ...prevBetslip, stake: value }));
    }
  };

  const handleStatusChange = (index, value) => {
    setRunners((prevRunners) => {
      const newRunners = [...prevRunners];
      newRunners[index] = { ...newRunners[index], position: value };
      return newRunners;
    });
  };

  const handleOddsChange = (index, value) => {
    setRunners((prevRunners) => {
      const newRunners = [...prevRunners];
      newRunners[index] = { ...newRunners[index], odds: value };
      return newRunners;
    });
  };

  const handlePlaceTermsChange = (index, value) => {
    setRunners((prevRunners) => {
      const newRunners = [...prevRunners];
      newRunners[index] = { ...newRunners[index], terms: value };
      return newRunners;
    });
  };

  const handleFractionalOddsChange = (index, part, value) => {
    setRunners((prevRunners) => {
      const newRunners = [...prevRunners];
      const currentOdds = newRunners[index].odds.split('/');
      if (part === 'numerator') {
        currentOdds[0] = value;
      } else if (part === 'denominator') {
        currentOdds[1] = value;
      }
      newRunners[index] = { ...newRunners[index], odds: currentOdds.join('/') };
      return newRunners;
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" sx={{ p: 1, textAlign: "left" }}>
        Bet Calculator
      </Typography>
      <Grid container spacing={1} sx={{ my: 2 }}>
        <Grid item md={12} lg={6}>
          <Paper sx={{ minHeight: 700, width: "100%" }} elevation={8}>
          <Button variant="outlined" onClick={() => console.log(betcruncher.calculator(betslip, runners))}/>
            <Box sx={{ p: 2 }}>
              <FormControl>
                <Divider orientation="Horizontal" flexItem sx={{ mb: 3 }}>
                  Stake
                </Divider>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <TextField
                    variant="filled"
                    size="small"
                    type="amount"
                    value={stake}
                    onChange={handleStakeChange}
                    error={error}
                    helperText={error ? "Invalid input. Please enter a positive number." : ""}
                    sx={{ width: "100px" }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">£</InputAdornment>,
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={betslip.eachWay}
                        onChange={(event) =>
                          setBetslip((prevBetslip) => ({
                            ...prevBetslip,
                            eachWay: event.target.checked,
                          }))
                        }
                      />
                    }
                    label="Each Way"
                    labelPlacement="top"
                  />
                  <Box sx={{ border: '1px solid grey', borderRadius: '5px', p: 2, minWidth: '250px', textAlign: 'center' }}>

                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {betslip.eachWay ? ('£' + stake + ' Win Only') : ('£' + stake + ' Each Way')}
                    </Typography>

                    <Typography variant="h4">
                      {betslip.eachWay ? ('Total Stake: £' + stake * 2) : ('Total Stake: £' + stake)}
                    </Typography>

                  </Box>

                </Box>

                <Divider orientation="Horizontal" flexItem sx={{ my: 3 }}>
                  Bet Type
                </Divider>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    {types.map((type, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Button
                          variant="outlined"
                          onClick={() => handleTypeChange(type)}
                          fullWidth
                          sx={{
                            borderColor: betslip.type === type ? "secondary.main" : "action.disabled",
                          }} // Change border color if active
                        >
                          {type}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/*########## Selections ##########*/}

                <Divider orientation="Horizontal" flexItem sx={{ my: 1 }}>
                  Selections
                </Divider>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 2,
                  }}>
                  Number of Selections = {numSelections}
                  <Button variant="outlined" onClick={() => setNumSelections(numSelections + 1)} disabled={numSelections >= 14}>
                    +
                  </Button>
                  <Button variant="outlined" onClick={() => setNumSelections(numSelections - 1)} disabled={numSelections <= (betTypes[betslip.type]?.selections || 0)}>
                    -
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems="center" >
                      <Grid item>
                        <Typography variant="h4"></Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h4" >Status</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h4">Odds</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h4">Terms</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  {Array.from({ length: numSelections }).map((_, index) => (
                    <Grow in={true} key={index}>
                      <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item>
                            <Typography variant="h4">{index + 1}</Typography>
                          </Grid>
                          <Grid item>
                            <FormControl>
                              <Select variant="filled" sx={{ minWidth: '100px' }} value={status[index] || "Won"} onChange={(event) => handleStatusChange(index, event.target.value)}>
                                <MenuItem value={"Won"}>Won</MenuItem>
                                <MenuItem value={"Placed"}>Placed</MenuItem>
                                <MenuItem value={"Lost"}>Lost</MenuItem>
                                <MenuItem value={"Void"}>Void</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item>
                            {oddsFormat === "decimal" ? (
                              <TextField variant="filled" type="number" onChange={(event) => handleOddsChange(index, event.target.value)} sx={{ width: "100px" }} />
                            ) : (
                              <Grid container alignItems="center">
                                <Grid item>
                                  <TextField variant="filled" type="number" sx={{ width: "50px", mb: 1.5 }} onChange={(event) => handleFractionalOddsChange(index, "numerator", event.target.value)} />
                                </Grid>
                                <Grid item>
                                  <Typography variant="h2" sx={{ mx: 1 }}>
                                    /
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <TextField variant="filled" type="number" sx={{ width: "50px", mt: 1.5 }} onChange={(event) => handleFractionalOddsChange(index, "denominator", event.target.value)} />
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                          <Grid item>
                            <FormControl>
                              <Select variant="filled" value={placeTerms[index] || "1/4"} onChange={(event) => handlePlaceTermsChange(index, event.target.value)} disabled={!betslip.eachWay}>
                                <MenuItem value={"1/1"}>1/1</MenuItem>
                                <MenuItem value={"1/2"}>1/2</MenuItem>
                                <MenuItem value={"1/3"}>1/3</MenuItem>
                                <MenuItem value={"1/4"}>1/4</MenuItem>
                                <MenuItem value={"1/5"}>1/5</MenuItem>
                                <MenuItem value={"1/6"}>1/6</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grow>
                  ))}
                </Grid>
              </FormControl>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Betslip stake={stake} betType={betslip.type} eachWay={betslip.eachWay} odds={odds} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}></Box>

          <Paper sx={{ minHeight: 300, width: "80%", position: 'relative' }} elevation={8}>
            <Divider orientation="Horizontal" flexItem sx={{ py: 2 }}>
              Settings
            </Divider>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Typography variant="h5" sx={{ p: 1, textAlign: "left" }}>
                Odds Format
              </Typography>
              <ToggleButtonGroup
                value={oddsFormat}
                size="small"
                exclusive
                onChange={(event, newFormat) => {
                  if (newFormat !== null) {
                    setOddsFormat(newFormat);
                  }
                }}>
                <ToggleButton value="fractional">Fractional</ToggleButton>
                <ToggleButton value="decimal">Decimal</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ position: 'absolute', bottom: '0', right: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Typography variant="h5" sx={{ p: 1.5, textAlign: "left", marginBottom: "0" }}>
                Sam Banks 2024
              </Typography>

              <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
