import React, { createContext, useEffect, useState } from "react";
import "./OverviewComponent.css";
import TransactionComponent from "./TransactionComponent";

const data = createContext();

function OverviewComponent() {
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState("EXPENSE");

  const [balance, setBalance] = useState(0);

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);


  const [txnData, setTxnData] = useState([]);

  const addTransaction = () => {
    let newTxn = {
      amt: amount,
      des: description,
      type: type,
    };
    setTxnData([...txnData, newTxn]);
    setDescription("");
    setAmount("");
  };

  const updateAccount = ()=> {
    let exp = 0;
    let inc = 0;
      txnData.map((el)=> {
        return (
          el.type === "EXPENSE" ? exp = exp+ (+el.amt) : inc = inc+ (+el.amt)
        )

      })
      setExpense(exp);
      setIncome(inc);
  }

  useEffect(()=> 
    updateAccount(), [txnData]
  )
  return (
    <div className="overview-cont">
      {/* <div className="overview-contents"> */}
              {/* heading */}
      <div className="head">EXPENSE TRACKER
      </div>

        <div className="overview">
          {/* balance */}
        <div className="balance">
        <h5>Balance: {income - expense}</h5>
      </div>

       {/* expense and income part */}
       <div className="exp-incm">
          <div className="incm">
            <p>Income</p>
            <p id="incm-amt">{income}</p>
          </div>

          <div className="exp">
            <p>Expense</p>
            <p id="exp-amt">{expense}</p>
          </div>

         
        </div>
        </div>

        {/* Transaction part */}

        <div className="new-txn">New Transaction</div>
        <div className="txn-details">
        <input
        className="txn-input"
          type="text"
          placeholder=" Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
        className="txn-input"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        </div>
       
      {/* radio button */}
       <div className="radio-btn">
       <input
          type="radio"
          id="expense"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
       </div>

       <div className="radio-btn">       
       <input
          type="radio"
          id="income"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">Income</label>
       </div>
      {/* add txn button */}
      <div>
        <button className="txn-input" id="add-txn-btn" onClick={addTransaction}>
          ADD TRANSACTION
        </button>
      </div>
      <data.Provider value={txnData}>
        <TransactionComponent />
      </data.Provider>
      {/* </div> */}
    </div>
  );
}

export default OverviewComponent;
export { data };
