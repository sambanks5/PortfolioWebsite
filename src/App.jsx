import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
		stake: "",
		type: "single",
		eachWay: false,
	});

	const [runners, setRunners] = useState([]);

	const [stake, setStake] = useState("");
	const [odds, setOdds] = useState([]);
	const [error, setError] = useState(false);
	const [oddsFormat, setOddsFormat] = useState("fractional");
	const [status, setStatus] = useState(Array(betslip.selections).fill(1));
	const [numSelections, setNumSelections] = useState(betTypes[betslip.type]?.selections || 0);

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
		setStatus((prevStatus) => {
			const newStatus = [...prevStatus];
			newStatus[index] = parseInt(value, 10);
			return newStatus;
		});
	};

	useEffect(() => {
		setRunners((prevRunners) => {
			return prevRunners.map((runner, index) => {
				return { ...runner, position: status[index] };
			});
		});
	}, [status]);

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
		  let currentOdds = newRunners[index].odds;
		  if (typeof currentOdds === 'string') {
			currentOdds = currentOdds.split("/");
			if (part === "numerator") {
			  currentOdds[0] = value;
			} else if (part === "denominator") {
			  currentOdds[1] = value;
			}
			newRunners[index] = { ...newRunners[index], odds: currentOdds.join("/") };
		  }
		  return newRunners;
		});
	  };

	return (
		<Container maxWidth="xl">
			<Grid
				container
				spacing={2}
				sx={{ my: 1 }}>
				
				
				<Grid
					id="stake-container"
					item
					md={12}
					lg={8}>
					<Box sx={{borderRadius: 5, p: 2}}>
						<FormControl>
							<Divider
								orientation="Horizontal"
								flexItem
								sx={{ mb: 1 }}>
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
									variant="outlined"
									type="amount"
									value={stake}
									onChange={handleStakeChange}
									error={error}
									helperText={error ? "Invalid input. Please enter a positive number." : ""}
									sx={{ ml: 2, width: "100px", fontSize: "3rem" }}
									InputProps={{
										startAdornment: <InputAdornment position="start">£</InputAdornment>,
									}}
								/>
								
								<FormControlLabel
									control={
										<ToggleButtonGroup
										value={betslip.eachWay ? 'Each Way' : 'Win Only'}
										exclusive
										onChange={(event, newValue) =>
											setBetslip((prevBetslip) => ({
											...prevBetslip,
											eachWay: newValue === 'Each Way',
											}))
										}
										>
										<ToggleButton value="Win Only">Win Only</ToggleButton>
										<ToggleButton value="Each Way">Each Way</ToggleButton>
										</ToggleButtonGroup>
									}
									labelPlacement="start"
									/>
							</Box>

							<Divider
								orientation="Horizontal"
								flexItem
								sx={{ my: 1 }}>
								Bet Type
							</Divider>
							<Box>
								<Grid
									container
									spacing={2}>
									{types.map((type, index) => (
										<Grid
											item
											xs={6}
											sm={3}
											key={index}>
											<Button
												variant="outlined"
												onClick={() => handleTypeChange(type)}
												fullWidth
												sx={{
													borderColor: betslip.type === type ? "secondary.main" : "action.disabled",
													height: "50px",
													textTransform: "none",
												}}
											>
												{type.charAt(0).toUpperCase() + type.slice(1)}
											</Button>
										</Grid>
									))}
								</Grid>
							</Box>
						</FormControl>
					</Box>
					<Box sx={{ borderRadius: 5, p: 2 }}>
						<Divider
							orientation="Horizontal"
							flexItem>
							Selections
						</Divider>
						<Grid
							container
							spacing={0}
							id="Yes"
							>
							<Grid
								item
								xs={12}>
								<Grid
									container
									justifyContent="space-between">
									<Grid item>
										<Typography variant="h4"></Typography>
									</Grid>
									<Grid item>
										<Typography variant="h4">Status</Typography>
									</Grid>
									<Grid item>
										<Typography variant="h4">Odds</Typography>
									</Grid>
									<Grid item>
										<Typography variant="h4">Terms</Typography>
									</Grid>
								</Grid>
							</Grid>
							<TransitionGroup style={{ width: "100%" }}>
								{Array.from({ length: numSelections }).map((_, index) => (
									<Grow
										in={true}
										key={index}>
										<Grid
											item
											xs={12}>
											<Grid
												container
												justifyContent="space-between"
												alignItems="center"
												sx={{ pb: 1 }}>
												<Grid item>
													<Typography variant="h4" sx={{ml: 1}}>{index + 1}</Typography>
												</Grid>
												<Grid item>
													<FormControl>
														<Select
															variant="outlined"
															sx={{ minWidth: "150px", my: 1 }}
															value={status[index] !== undefined ? status[index] : 1}
															onChange={(event) => handleStatusChange(index, parseInt(event.target.value, 10))}>
															<MenuItem value={1}>Won</MenuItem>
															<MenuItem value={2}>Placed</MenuItem>
															<MenuItem value={0}>Lost</MenuItem>
															<MenuItem value={-1}>Void</MenuItem>
														</Select>
													</FormControl>
												</Grid>
												<Grid
													item
													sx={{ minWidth: "150px", display: "flex", justifyContent: "center" }}>
													{oddsFormat === "decimal" ? (
														<TextField
														variant="outlined"
														type="number"
														defaultValue="2.0"
														onChange={(event) => handleOddsChange(index, event.target.value)}
														sx={{ width: "100px" }}
														/>
													) : (
													<Grid container alignItems="center">
													<Grid item>
														<TextField
														variant="outlined"
														type="number"
														defaultValue="1"
														sx={{ width: "60px", mb: 1.5 }}
														onChange={(event) => handleFractionalOddsChange(index, "numerator", event.target.value)}
														/>
													</Grid>
													<Grid item>
														<Typography variant="h2" sx={{ mx: 1 }}>/</Typography>
													</Grid>
													<Grid item>
														<TextField
														variant="outlined"
														type="number"
														defaultValue="1"
														sx={{ width: "60px", mt: 1.5 }}
														onChange={(event) => handleFractionalOddsChange(index, "denominator", event.target.value)}
														/>
													</Grid>
													</Grid>
													)}
												</Grid>
												<Grid item>
													<FormControl>
														<Select
															variant="outlined"
															value={"1/4"}
															onChange={(event) => handlePlaceTermsChange(index, event.target.value)}
															disabled={!betslip.eachWay}>
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
											{/* <Divider
											orientation="Horizontal"
											flexItem
											sx={{ my: 1 }}
										/> */}
										</Grid>
									</Grow>
								))}
							</TransitionGroup>
						</Grid>
					</Box>
				</Grid>

				{/* <Grid
					id="selections-container"
					item
					md={12}
					lg={5}>

				</Grid> */}
				<Grid
					id="betslip-container"
					item
					sm={12}
					lg={3}>
					<Betslip
						betslip={betslip}
						runners={runners}
					/>
					<Box
						id="settings-container"
						sx={{  p: 2, mt: 2, position: "sticky", top: "280px" }}>
						<Divider
							orientation="Horizontal"
							flexItem
							sx={{ py: 2 }}>
							Settings
						</Divider>
						<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
							<Typography
								variant="h5"
								sx={{ p: 1, textAlign: "left" }}>
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
					</Box>
				</Grid>
			</Grid>

			<Box sx={{ position: "sticky", bottom: "0", right: "50px", display: "flex", flexDirection: "row", justifyContent:"end"}}>
				<Typography
					variant="h5"
					sx={{ p: 1.5, textAlign: "left", marginBottom: "0" }}>
					Sam Banks 2024
				</Typography>

				<Link
					href="https://github.com/sambanks5"
					target="_blank"
					rel="noopener noreferrer">
					<IconButton>
						<GitHubIcon />
					</IconButton>
				</Link>
			</Box>
		</Container>
	);
}

export default App;
