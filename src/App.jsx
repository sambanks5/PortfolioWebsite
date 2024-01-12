import React, { useState } from "react";
import Betslip from "./components/betslip";
import "./App.css";
import { Container, ToggleButton, ToggleButtonGroup, Divider, Typography, FormControlLabel, Switch, Box, FormControl, Paper, Grid, Button, TextField, InputAdornment, MenuItem, Select, Grow } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { betTypes } from "./betcruncher";

function App() {
  const [betslip, setBetslip] = useState({
    stake: null,
    type: "single",
    eachWay: false,
  });

  const [stake, setStake] = useState("0");
  const [odds, setOdds] = useState([]);
  const [error, setError] = useState(false);
  const [oddsFormat, setOddsFormat] = useState("fractional");
  const [placeTerms, setPlaceTerms] = useState(Array(betslip.selections).fill("1/4"));

  const [numSelections, setNumSelections] = useState(betTypes[betslip.type]?.selections || 0);

  const [status, setStatus] = useState(Array(betslip.selections).fill("Won"));

  const types = Object.keys(betTypes);

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
      console.log(value);
    }
  };

  const handleStatusChange = (index, value) => {
    setStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = value;
      return newStatus;
    });
  };

  const handleOddsChange = (index, value) => {
    setOdds((prevOdds) => {
      const newOdds = [...prevOdds];
      newOdds[index] = value;
      return newOdds;
    });
  };

  const handleFractionalOddsChange = (index, part, value) => {
    setOdds((prevOdds) => {
      const newOdds = [...prevOdds];
      newOdds[index] = { ...newOdds[index], [part]: value };
      return newOdds;
    });
  };

  const handlePlaceTermsChange = (index, value) => {
    setPlaceTerms((prevPlaceTerms) => {
      const newPlaceTerms = [...prevPlaceTerms];
      newPlaceTerms[index] = value;
      return newPlaceTerms;
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
                    sx={{ ml: 5 }}
                  />
                  <Box sx={{ border: '1px solid grey', p: 2}}>

                    <Typography variant="h4" sx={{mb: 1}}>
                      {betslip.eachWay ? ( '£' + stake + ' Win Only') : ('£' + stake + ' Each Way')}
                    </Typography>

                    <Typography variant="h4">
                      {betslip.eachWay ? ('Total Stake: £' + stake*2) : ('Total Stake: £' + stake )}
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

                <Divider orientation="Horizontal" flexItem sx={{ my: 3 }}>
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

                <Box sx={{ my: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      my: 1,
                    }}>
                    <Typography variant="h4"></Typography>
                    <Typography variant="h4">Status</Typography>
                    <Typography variant="h4">Odds</Typography>
                    <Typography variant="h4">Terms</Typography>
                  </Box>

                  {Array.from({ length: numSelections }).map((_, index) => (
                    <Grow in={true} key={index}>
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          my: 1,
                          height: "80px",
                          textAlign: "center",
                        }}>
                        <Typography variant="h4" sx={{ width: "20px" }}>
                          {index + 1}
                        </Typography>
                        <FormControl sx={{ minWidth: 120 }}>
                          <Select variant="filled" value={status[index] || "Won"} sx={{ mr: 2 }} onChange={(event) => handleStatusChange(index, event.target.value)}>
                            <MenuItem value={"Won"}>Won</MenuItem>
                            <MenuItem value={"Placed"}>Placed</MenuItem>
                            <MenuItem value={"Lost"}>Lost</MenuItem>
                            <MenuItem value={"Void"}>Void</MenuItem>
                          </Select>
                        </FormControl>

                        {oddsFormat === "decimal" ? (
                          <TextField variant="filled" type="number" onChange={(event) => handleOddsChange(index, event.target.value)} sx={{ width: "100px" }} />
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}>
                            <TextField variant="filled" type="number" sx={{ width: "50px", mb: 1.5 }} onChange={(event) => handleFractionalOddsChange(index, "numerator", event.target.value)} />
                            <Typography variant="h2" sx={{ mx: 1 }}>
                              /
                            </Typography>
                            <TextField variant="filled" type="number" sx={{ width: "50px", mt: 1.5 }} onChange={(event) => handleFractionalOddsChange(index, "denominator", event.target.value)} />
                          </Box>
                        )}

                        <FormControl>
                          <Select variant="filled" value={placeTerms[index] || "1/4"} onChange={(event) => handlePlaceTermsChange(index, event.target.value)} disabled={!betslip.eachWay} sx={{ ml: 2, width: "100px" }}>
                            <MenuItem value={"1/1"}>1/1</MenuItem>
                            <MenuItem value={"1/2"}>1/2</MenuItem>
                            <MenuItem value={"1/3"}>1/3</MenuItem>
                            <MenuItem value={"1/4"}>1/4</MenuItem>
                            <MenuItem value={"1/5"}>1/5</MenuItem>
                            <MenuItem value={"1/6"}>1/6</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography variant="h4">Status</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4">Odds</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4">Terms</Typography>
                      </Grid>
                    </Grid>

                    {Array.from({ length: numSelections }).map((_, index) => (
                      <Grow in={true} key={index}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={3}>
                            <FormControl sx={{ minWidth: 120 }}>
                              <Select variant="filled" value={status[index] || "Won"} sx={{ mr: 2 }} onChange={(event) => handleStatusChange(index, event.target.value)}>
                                <MenuItem value={"Won"}>Won</MenuItem>
                                <MenuItem value={"Placed"}>Placed</MenuItem>
                                <MenuItem value={"Lost"}>Lost</MenuItem>
                                <MenuItem value={"Void"}>Void</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={3}>
                            {/* ... */}
                          </Grid>
                          <Grid item xs={3}>
                            <FormControl>
                              {/* ... */}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grow>
                    ))}
                    </Grow>
                  ))}
                </Box>
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

          <Paper sx={{ minHeight: 300, width: "80%" }} elevation={8}>
            <Divider orientation="Horizontal" flexItem sx={{ py: 2 }}>
              Settings
            </Divider>

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

            <Typography variant="h5" sx={{ p: 1, textAlign: "left", marginBottom: "0" }}>
              by Sam 2024
            </Typography>

            <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <IconButton>
                <GitHubIcon />
              </IconButton>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
