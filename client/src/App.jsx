import Select from "react-select";
import { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function App() {

  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {

  localStorage.setItem(
    "conversionHistory",
    JSON.stringify(history)
  );

}, [history]);
useEffect(() => {

  fetchCurrencies();

  const savedHistory =
    localStorage.getItem("conversionHistory");

  if (savedHistory) {
    setHistory(JSON.parse(savedHistory));
  }
  const savedTheme =
  localStorage.getItem("darkMode");

if (savedTheme !== null) {
  setDarkMode(JSON.parse(savedTheme));
}


}, []);

  const fetchCurrencies = async () => {

    const currencyList = [
      "USD",
      "INR",
      "EUR",
      "GBP",
      "JPY",
      "AUD",
      "CAD",
      "CHF",
      "CNY",
      "SGD",
      "AED",
      "NZD"
    ];

    setCurrencies(currencyList);
  };

  const convertCurrency = async () => {

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (from === to) {
      setResult(amount);
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        `https://open.er-api.com/v6/latest/${from}`
      );

      const data = await response.json();

      const rate = data.rates[to];

      const convertedAmount = (amount * rate).toFixed(2);

    setResult(convertedAmount);

setHistory((prev) => [
{
  amount,
  from,
  to,
  result: convertedAmount,
  date: new Date().toLocaleString(),
},
  ...prev,
]);

    } catch (error) {

      console.log(error);

      alert("Conversion Failed");
    }

    setLoading(false);
  };

  const swapCurrencies = () => {

    const temp = from;

    setFrom(to);
    setTo(temp);
  };

  return (

   <div className={`relative min-h-screen overflow-hidden flex items-center justify-center p-4 transition-all duration-500 ${
  darkMode
    ? "bg-[#0f172a]"
    : "bg-gradient-to-r from-blue-100 to-purple-100"
}`}>

      {/* Animated Background Blobs */}

      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      {/* Main Card */}
<div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
       className={`relative z-10 w-full max-w-md rounded-3xl border border-white/20 ${darkMode ? "bg-white/10" : "bg-white/60"} backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] p-8`}
      >
        <div className="flex justify-end mb-4">

  <button
    onClick={() => setDarkMode(!darkMode)}
    className="bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-md hover:bg-white/30 transition-all"
  >
    {darkMode ? "☀️ Light" : "🌙 Dark"}
  </button>

</div>
        <h1 className={`text-5xl font-extrabold text-center mb-2 ${
  darkMode ? "text-white" : "text-gray-900"
}`}>
          FX Flow
        </h1>

        <p className={`text-center mb-8 ${
  darkMode ? "text-gray-300" : "text-gray-700"
}`}>
          Real-Time Currency Converter
        </p>

        {/* Amount */}

        <div className="mb-5">

          <label className="text-white text-sm mb-2 block">
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
    className={`w-full p-4 rounded-2xl outline-none border border-white/20 focus:ring-2 focus:ring-blue-400 ${
  darkMode
    ? "bg-white/20 text-white placeholder-gray-300"
    : "bg-white text-gray-900 placeholder-gray-500"
}`}
          />

        </div>

        {/* From */}

        <div className="mb-5">

          <label
  className={`text-sm mb-2 block ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
            From
          </label>

  <Select
  options={currencies.map((currency) => ({
    value: currency,
    label: currency,
  }))}

  value={{ value: from, label: from }}

  onChange={(selectedOption) =>
    setFrom(selectedOption.value)
  }
/>

        </div>

        {/* Swap Button */}

        <div className="flex justify-center mb-5">

          <button
            onClick={swapCurrencies}
            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 p-4 rounded-full shadow-lg hover:scale-110"
          >

            <FaExchangeAlt className="text-white text-xl" />

          </button>

        </div>

        {/* To */}

        <div className="mb-6">

          <label className="text-white text-sm mb-2 block">
            To
          </label>

         <Select
  options={currencies.map((currency) => ({
    value: currency,
    label: currency,
  }))}

  value={{ value: to, label: to }}

  onChange={(selectedOption) =>
    setTo(selectedOption.value)
  }
/>

        </div>

        {/* Convert Button */}

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={convertCurrency}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-all text-white p-4 rounded-2xl text-lg font-bold shadow-lg"
        >

          {loading ? "Converting..." : "Convert Currency"}

        </motion.button>

        {/* Result */}
{/* Result + History */}

{result && (

   
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-8 rounded-2xl bg-white/10 border border-white/20 p-5 text-center"
  >

    <p className="text-gray-300 text-sm mb-2">
      Conversion Result
    </p>

    <h2 className="text-3xl font-bold text-white">
      {amount} {from}
    </h2>

    <div className="text-blue-300 text-2xl my-2">
      ↓
    </div>

    <h2 className="text-4xl font-extrabold text-green-400">
      {result} {to}
    </h2>

    

  </motion.div>

)}
        
        
      </motion.div>
      {/* History Sidebar */}

<div className="w-full lg:w-80 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] p-6">

  <h2 className="text-2xl font-bold text-white mb-5">
    Recent History
  </h2>

  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

    {history.length === 0 ? (

      <p className="text-gray-300">
        No conversions yet.
      </p>

    ) : (

      history.map((item, index) => (

        <div
          key={index}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white hover:bg-white/10 transition-all"
        >

          <p className="font-semibold text-lg">
            {item.amount} {item.from}
          </p>

          <p className="text-blue-300 text-xl">
            ↓
          </p>

          <p className="text-green-400 font-bold text-xl">
            {item.result} {item.to}
          </p>
          <p className="text-gray-400 text-sm mt-2">
  {item.date}
</p>

        </div>

      ))

    )}

  </div>

</div>

    </div>
  );
}

export default App;