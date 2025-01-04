import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register components of Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);
const Sip = () => {
  const [monthly_invest, setmonthly_invest] = useState(5000);
  const [roi, setroi] = useState(12);
  const [time, settime] = useState(7);

  // Results state
  const [resulmonthly_invest, setresultmonthly_invest] = useState("");
  const [resultroi, setresultroi] = useState("");
  const [resulttime, setresulttime] = useState("");

  const calculate = (e) => {
    e.preventDefault();
    const monthly_invest1 = parseInt(monthly_invest);
    const time1 = parseInt(time);
    const roi1 = parseFloat(roi) / 100;

    if (monthly_invest1 <= 0 || time1 <= 0 || roi1 <= 0) {
      alert("Please don't enter negative or zero values.");
      return;
    }
    if (isNaN(monthly_invest1) || isNaN(time1) || isNaN(roi1)) {
      alert("Please enter valid numeric values.");
      return;
    }
    const n = 12;
    const p = time1 * 12;
    const monthly_int_rate = roi1 / n;
    const total_invest = monthly_invest1 * p;
    const total_return =
      monthly_invest1 *
      (((Math.pow(1 + monthly_int_rate, p) - 1) / monthly_int_rate) *
        (1 + monthly_int_rate));

    const wealth_gain = total_return - total_invest;

    setresultmonthly_invest(total_invest.toFixed(0));
    setresulttime(wealth_gain.toFixed(0));
    setresultroi(total_return.toFixed(0));
    console.log(
      "monthly investment:",
      monthly_invest,
      "rate of interest:",
      roi,
      "time period",
      time
    );
  };

  // chartjs data
  const data = {
    labels: ["Invested Amount", "Est. Returns"],
    datasets: [
      {
        label: "My Dataset",
        data: [resulmonthly_invest, resulttime],
        backgroundColor: ["#7ED321", "#4A90E2"],
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} ₹`;
          },
        },
      },
    },
    cutout: "70%", // Makes it a donut shape
  };

  // Reset function
  const reset = (e) => {
    e.preventDefault();
    setmonthly_invest("");
    setroi("");
    settime("");
    setresultmonthly_invest("");
    setresulttime("");
    setresultroi("");
  };

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r flex items-center justify-center sm:flex-row flex-col relative sm:top-0">
        <div className="flex flex-col w-full sm:w-[450px] rounded-2xl p-8 border-2 justify-center items-center border-white m-10 shadow-2xl bg-white bg-opacity-90 top-[180px] sm:top-0 relative">
          <form className="" onSubmit={calculate}>
            <h2 className="font-bold text-4xl text-gray-800 mb-6">
              SIP Calculator
            </h2>

            {/* Monthly Investment */}
            <label
              htmlFor="monthly-invest"
              className="text-lg font-semibold text-gray-700 w-full mb-4"
            >
              Monthly Investment (₹): <span>{monthly_invest}</span>
              <input
                type="range"
                name="monthly-invest"
                value={monthly_invest}
                onChange={(e) => setmonthly_invest(e.target.value)}
                className="my-2 w-full shadow-lg space-x-2 cursor-cursor-pointer"
                required
                min={500}
                step={500}
                max={100000}
              />
            </label>

            {/* Rate of Interest */}
            <label
              htmlFor="roi"
              className="text-lg font-semibold text-gray-700 w-full mb-4"
            >
              Rate of Interest (%): {roi}
              <input
                type="range"
                name="roi"
                min={1}
                max={30}
                step={0.5}
                value={roi}
                onChange={(e) => setroi(e.target.value)}
                className="my-2 cursor-pointer w-full shadow-lg "
                required
              />
            </label>

            {/* Time Period */}
            <label
              htmlFor="period"
              className="text-lg font-semibold text-gray-700 w-full mb-4 "
            >
              Time Period (Years): {time}
              <input
                type="range"
                name="period"
                min={1}
                max={50}
                value={time}
                onChange={(e) => settime(e.target.value)}
                className="my-2 w-full shadow-lg cursor-pointer"
                required
              />
            </label>

            {/* Buttons */}
            <div className="flex space-x-3 w-full justify-between mt-6">
              <button className="border-2 border-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 text-white w-[100px] hover:from-blue-500 hover:to-blue-700 transition rounded-lg p-3 shadow-md">
                Calculate
              </button>
              <button
                className="border-2 border-red-500 bg-gradient-to-r from-red-400 to-red-600 text-white w-[100px] hover:from-red-500 hover:to-red-700 transition rounded-lg p-3 shadow-md"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </form>
          {/* result */}
          <div className="w-full sm:w-[350px] p-6 mt-8 mx-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl shadow-xl text-white">
            <h3 className="text-2xl font-semibold mb-4">Results</h3>
            {
              <div>
                <p className="text-lg mb-2">
                  <strong>Total Investment:</strong> ₹ {resulmonthly_invest}
                </p>
                <p className="text-lg mb-2">
                  <strong>Total Return:</strong> ₹ {resultroi}
                </p>
                <p className="text-lg mb-2">
                  <strong>Wealth Gain:</strong> ₹ {resulttime}
                </p>
              </div>
            }
          </div>
        </div>

        {/* Results Section */}

        <div className="min-w-[350px] sm:top-0 top-[150px] relative">
          <h2>SIP Calculator</h2>

          <Doughnut data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default Sip;
