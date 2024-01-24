import React, { useState, useEffect } from "react";
import Header from "./components/header.jsx";
import Calculator from "./components/calculator.jsx";
import Betslip from "./components/betslip";
import "./App.css";
import { Container, Fab, Grid, Alert, Grow } from "@mui/material";
import { betTypes } from "./betcruncher";

function App() {
  const betcruncher = require("./betcruncher");
  const [betslip, setBetslip] = useState({
    stake: "",
    type: "single",
    eachWay: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState(null);
  const [stake, setStake] = useState("");
  const oddsConverter = require("./oddsconverter.js");
  const [runners, setRunners] = useState([]);
  const [error, setError] = useState(false);
  const [oddsFormat, setOddsFormat] = useState("fractional");
  const [terms, setTerms] = useState("1/4");
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

  const handleFabClick = async () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

    await calculateResult();
  };

  const calculateResult = () => {
    return new Promise((resolve, reject) => {
      console.log("betslip:", betslip);
      if (betslip && typeof betslip === "object" && betslip !== null && "type" in betslip && "eachWay" in betslip) {
        if (stake === 0 || stake === "") {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          resolve();
        } else {
          setResult(betcruncher.calculator(betslip, runners));
          resolve();
        }
      } else {
        reject();
      }
    });
  };

  return (
    <Container maxWidth>
        <Header setOddsFormat={setOddsFormat} handleFabClick={handleFabClick} />

      <Container id="main-container" maxWidth="lg">
        <Calculator
          betslip={betslip}
          oddsFormat={oddsFormat}
          stake={stake}
          position={position}
          terms={terms}
          numSelections={numSelections}
          error={error}
          setBetslip={setBetslip}
          onStakeChange={handleStakeChange}
          onTypeChange={handleTypeChange}
          onPositionChange={handlePositionChange}
          onTermsChange={handlePlaceTermsChange}
          onDecimalChange={handleOddsChange}
          onFractionalChange={handleFractionalOddsChange}
        />

        <Grow in={showAlert}>
          <Alert severity="error" sx={{ position: "fixed", top: 10, left: 500 }}>
            Please enter a stake
          </Alert>
        </Grow>

        <Grid id="betslip-container" item sm={12}>
          <Betslip handleFabClick={handleFabClick} result={result} />
        </Grid>
      </Container>
    </Container>
  );
}

export default App;
