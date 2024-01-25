import React from "react";
import { Typography, Box, Paper, Divider, Grow, Fab } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";

const Betslip = ({ handleFabClick, result }) => {
	return (
		<Paper
			sx={{ p: 2 }}
			elevation={8}>
			<Box sx={{ height: 100, display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
				<Grow in={!!result}>
					<Typography variant="h2">{result ? `Total Stake: ${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(result.totalStake)}` : "Total Stake: £0.00"}</Typography>
				</Grow>
				<Divider
					orientation="vertical"
					flexItem
				/>
				<Grow in={!!result}>
					<Typography variant="h2">{result ? `Returns: ${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(result.returns)}` : "Returns: £0.00"}</Typography>
				</Grow>
				<Divider
					orientation="vertical"
					flexItem
				/>
				<Grow in={!!result}>
					<Typography variant="h2">{result ? `Profit: ${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(result.profit)}` : "Profit: £0.00"}</Typography>
				</Grow>
				<Fab
					color="secondary"
					variant="extended"
					aria-label="calc"
					onClick={handleFabClick}>
					<CalculateIcon sx={{ mr: 1 }} />
					Calculate
				</Fab>
			</Box>
		</Paper>
	);
};

export default Betslip;
