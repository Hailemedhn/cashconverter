import React, { useState } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [rate,setRate] = useState(null);
  const [hideAlert, setHideAlert] = useState("hide");
  const [disapear, setDisapear] = useState("hide")

  const func = (e) => {
    let source = document.getElementsByClassName("from")[0].value;
    let currency = document.getElementsByClassName("to")[0].value;
    if(source === currency){
     // setAlert("Select Different Currencies.");
      setHideAlert("alert");
      setDisapear("alertContainer");
      return;
    }
    let fromCurrency = document.getElementsByClassName("fromInput")[0];
    let toCurrency = document.getElementsByClassName("toInput")[0];

    const url = "https://api.apilayer.com/currency_data/live?source="+source+"&currencies="+currency+"&apikey=Xa9auiYjcUse9X2OIkFBvZKSA45mog0B"
    axios.get(url).then((res) => {
       setRate(res.data.quotes[source+currency]);
      toCurrency.value="" +(parseFloat(rate) * parseFloat(fromCurrency.value)).toFixed(2);
      });

  }
const calcule = (e) => {

  const fromInput = document.getElementsByClassName("fromInput")[0];
  const toInput = document.getElementsByClassName("toInput")[0];

  if(e.target === fromInput){
    toInput.value= "" +(parseFloat(rate) * parseFloat(fromInput.value)).toFixed(2);
    console.log(parseFloat(fromInput.value));
  }else{
    fromInput.value = "" + (parseFloat(toInput.value)/ parseFloat(rate)).toFixed(2);
}
}
const removeAlert = () => {
  if(hideAlert === "alert"){
    setHideAlert("hide");
    setDisapear("hide");
  }
}
  return (
    <div className="App" onClick={removeAlert}>
      <div className="container">
      <div className="fromContainer">
         <select className="from" >
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="ETB">ETB</option>
          <option value="EUR">EUR</option>
         </select>
         <input type="number" className="fromInput" onChange={calcule} />
      </div>
      <div className="toContainer"> 
         <select className="to">
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="ETB">ETB</option>
          <option value="EUR">EUR</option>
         </select>
         <input type="number" className="toInput" onChange={calcule}/>
      </div>
        <button onClick={func} className="button">Calculate</button>  
      <div className="rate">{rate}</div>
     </div>
      <div className={disapear}>
         <div className={hideAlert}>Select Different Currencies.</div>
      </div>

    </div>
  );
}

export default App;