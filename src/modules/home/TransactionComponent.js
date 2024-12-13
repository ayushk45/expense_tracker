import React, { useContext, useEffect, useState } from "react";
import "./TransactionComponent.css";
import { data } from "./overviewComponent";

function TransactionComponent() {
  let txnDetail = useContext(data);

  const [searchTxn, setSearchTxn] = useState("");
  const [allData, setAllData] = useState(txnDetail);

  const filterData = () => {
    if (searchTxn === "") {
      setAllData(txnDetail);
      return;
    }
    let txn = [...txnDetail];
    txn = txn.filter((el) => {
      return el.des.toLowerCase().startsWith(searchTxn.toLowerCase().trim());
    });
    setAllData(txn);
  };
  useEffect(() => {
    filterData();
  }, [searchTxn, txnDetail]);

  return (
    <div className="txn-cont">
      <div className="txn-head">Transaction History</div>
      <div>
        <input
          className="search-box"
          type="text"
          placeholder="Search transaction"
          value={searchTxn}
          onChange={(e) => {
            setSearchTxn(e.target.value);
          }}
        />
      </div>
      {allData.map((el) => {
        return el.type === "EXPENSE" ? (
          <div className="txn" id="border-red">
            <h2>{el.des}</h2>
            <h2>{el.amt}</h2>
          </div>
        ) : (
          <div className="txn" id="border-gr">
            <h2>{el.des}</h2>
            <h2>{el.amt}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionComponent;
