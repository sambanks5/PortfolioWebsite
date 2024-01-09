import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const calculate = require("./betcruncher");

  const [betslip, setBetslip] = useState({
    stake: 0,
    type: "single",
    eachWay: false,
  });
  const [runners, setRunners] = useState([
    { odds: "0/1", terms: "1/4", position: 1 },
  ]);

  const handleCalculate = () => {
    const result = calculate(betslip, runners);
    console.log(result);
    return result;
  };

  const handleBetslipChange = (e) => {
    setBetslip({ ...betslip, [e.target.name]: e.target.value });
  };

  const handleOddsChange = (e) => {
    const newRunners = [...runners];
    newRunners[0].odds = e.target.value;
    setRunners(newRunners);
  };

  return (
    <div className="App">
      <h1 className="calculator-title">Bet Calculator</h1>

      <div className="calculator-container">
      <form>
         <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Bet Stake</label>
            <input
               class="form-control"
               id="stake-field"
               name="stake"
               type="amount"
               placeholder="Stake"
               onChange={handleBetslipChange}
            />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
         </div>
         <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1"/>
         </div>
         <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
         </div>
         <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        {/* <input
          id="stake-field"
          name="stake"
          placeholder="Stake"
          onChange={handleBetslipChange}
        />
        <input
          id="selections-field"
          name="selections"
          type="number"
          placeholder="Number of Selections"
          onChange={handleBetslipChange}
        />
        <select
          id="type-field"
          name="type"
          value={betslip.type}
          onChange={handleBetslipChange}
        >
          <option value="single">Single</option>
          {/* Add more options as needed */}
        {/* </select> */}
        <button onClick={handleCalculate}>Calculate</button>
      </div>
    </div>
  );
}

export default App;