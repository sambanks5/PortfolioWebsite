import React, { useState, useEffect } from "react";
import Calculator from "./components/calculator.jsx";
import Betslip from "./components/betslip";
import "./App.css";
import { Container, Fab, Grid } from "@mui/material";
import { betTypes } from "./betcruncher";
import CalculateIcon from "@mui/icons-material/Calculate";

import Header from "./components/header.jsx";

function App() {
  const [betslip, setBetslip] = useState({
    stake: "",
    type: "single",
    eachWay: false,
  });
  const [stake, setStake] = useState("");
  const oddsConverter = require("./oddsconverter.js");
  const [runners, setRunners] = useState([]);
  const [error, setError] = useState(false);
  const [oddsFormat, setOddsFormat] = useState("fractional");
  const [position, setPosition] = useState(Array(betslip.selections).fill(1));
  const [numSelections, setNumSelections] = useState(betTypes[betslip.type]?.selections || 0);

  console.log(runners);

  const initializeRunners = (numSelections) => {
    setRunners((prevRunners) => {
      if (numSelections > prevRunners.length) {
        const newRunners = [...prevRunners];
        for (let i = prevRunners.length; i < numSelections; i++) {
          newRunners.push({ odds: "1/1", terms: "1/4", position: 1 });
        }
        setPosition((prevPosition) => [...prevPosition, ...new Array(numSelections - prevPosition.length).fill(1)]);
        return newRunners;
      } else if (numSelections < prevRunners.length) {
        setPosition((prevPosition) => prevPosition.slice(0, numSelections));
        return prevRunners.slice(0, numSelections);
      } else {
        return prevRunners;
      }
    });
  };

  useEffect(() => {
    initializeRunners(numSelections);
  }, [numSelections]);

  const handleTypeChange = (event) => {
    const type = event.target.value;
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

  const handlePositionChange = (index, value) => {
    setPosition((prevPosition) => {
      const newPosition = [...prevPosition];
      newPosition[index] = parseInt(value, 10);
      return newPosition;
    });
  };

  useEffect(() => {
    setRunners((prevRunners) => {
      return prevRunners.map((runner, index) => {
        return { ...runner, position: position[index] };
      });
    });
  }, [position]);

  const handleOddsChange = (index, value) => {
    if (!value) {
      return;
    }

    setRunners((prevRunners) => {
      const newRunners = [...prevRunners];
      const decimalOdds = oddsConverter(value).decimal;
      newRunners[index] = { ...newRunners[index], odds: decimalOdds };
      return newRunners;
    });
  };

  const handleFractionalOddsChange = (index, part, value) => {
    if (!value) {
      return;
    }

    setRunners((prevRunners) => {
      const newRunners = [...prevRunners];
      let currentOdds = newRunners[index].fractionalOdds || { numerator: "1", denominator: "1" };
      if (part === "numerator") {
        currentOdds.numerator = value;
      } else if (part === "denominator") {
        currentOdds.denominator = value;
      }
      const fractionalOdds = `${currentOdds.numerator}/${currentOdds.denominator}`;
      const decimalOdds = oddsConverter(fractionalOdds).decimal;
      newRunners[index] = { ...newRunners[index], odds: decimalOdds, fractionalOdds: currentOdds };
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

  return (
    <>
      <Fab color="secondary" variant="extended" aria-label="calc" sx={{ position: "fixed", top: 50 }}>
        <CalculateIcon sx={{ mr: 1 }} />
        Calculate
      </Fab>
      <Container maxWidth="lg">
        <Header setOddsFormat={setOddsFormat} />
        <Calculator
          betslip={betslip}
          setBetslip={setBetslip}
          oddsFormat={oddsFormat}
          stake={stake}
          position={position}
          numSelections={numSelections}
          error={error}
          onStakeChange={handleStakeChange}
          onTypeChange={handleTypeChange}
          onPositionChange={handlePositionChange}
          onTermsChange={handlePlaceTermsChange}
          onDecimalChange={handleOddsChange}
          onFractionalChange={handleFractionalOddsChange}
        />

        <Grid id="betslip-container" item sm={12}>
          <Betslip betslip={betslip} runners={runners} />
        </Grid>
      </Container>
    </>
  );
}

export default App;
