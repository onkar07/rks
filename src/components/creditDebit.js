import React, { useRef, useState } from 'react'
import { db } from '../config/firebase';
import './creditDebit.css'
import { getDocs, collection, addDoc, onSnapshot } from 'firebase/firestore'
import { query, orderBy, limit, getDocuments } from "firebase/firestore";
function CreditDebit() {
  const [select, setSelect] = useState("debit")
  var currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const type = useRef();
  const subject = useRef();
  const amount = useRef();
  var bal;
  var comTime = [];
  var recArray = []
  var lastRec = [];
  var records = {
    time: currentTimeInSeconds,
    type: "",
    subject: "",
    amount: 0,
    bal: 0
  }
  const lastOne = async () => {
    try {
      const snap = await getDocs(collection(db, 'debitCredit'));
      snap.forEach((doc) => {
        var data = (doc.id, " => ", doc.data())
        recArray.push(data);
      });
      recArray.forEach(rec => {
        comTime.push(rec.time)
      })
      comTime.sort()
      var letest_time = comTime[comTime.length - 1]

      recArray.forEach(rec => {
        if (rec.time == letest_time)
          lastRec = rec
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEvent = async (e) => {
    await lastOne()
    console.log(lastRec)
    records.type = select
    records.subject = subject.current.value;
    records.amount = amount.current.value;
    if (records.type == "debit") {
      bal = lastRec.oldBal - Number(records.amount);
    }
    if (records.type == "credit") {
      bal = lastRec.oldBal + Number(records.amount);
    }
    records.bal = bal;

    try {
      const docRef = await addDoc(collection(db, 'debitCredit'), {
        Type: records.type,
        subject: records.subject,
        amount: Number(records.amount),
        time: records.time,
        oldBal: bal
      })
      alert("Saved")
    }
    catch (err) {
      console.log(err)
      alert("Falied")
    }
  }


  return (
    <div>
      <form id="debitCredit">
        <div class="form-group">
          <label for="exampleFormControlSelect1">जमा खर्च होशोब </label>
          <select class="form-control" value={select} onChange={(e) => { setSelect(e.target.value) }} id="exampleFormControlSelect1">
            <option name="type" value="debit">खर्च</option>
            <option name="type" value="credit">जमा</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">विषय</label>
          <input type="text" ref={subject} name="subject" class="form-control" id="exampleFormControlInput1" placeholder="विषय" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">रक्कम ₹</label>
          <input type="number" ref={amount} name="amount" class="form-control" id="exampleFormControlInput1" placeholder="रक्कम ₹" />
        </div>
        <button type="button" id="footer" class="btn btn-primary" onClick={(e) => {
          e.preventDefault();
          handleSubmitEvent()
        }}>Submit</button>
      </form>
    </div>
  )
}

export default CreditDebit
