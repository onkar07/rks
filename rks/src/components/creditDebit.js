import React, { useRef, useState } from 'react'
import {db} from '../config/firebase';
import './creditDebit.css'
import {getDocs, collection, addDoc, onSnapshot} from 'firebase/firestore'
import { query, orderBy, limit } from "firebase/firestore";  
function CreditDebit() {
  var currentTimeInSeconds=Math.floor(Date.now()/1000);
  const type = useRef();
  const subject = useRef();
  const amount = useRef();
  var bal;
  const [lastRec, setLastRec] = useState();
  var records = {
    time : currentTimeInSeconds,
    type : "",
    subject : "",
    amount : 0,
    bal : 0
  }
  const lastOne = async () =>{
    try{
     
      // const snap = await getDocs(collection(db, 'debitCredit'));
      const cred = collection(db, "debitCredit");
      // console.log(snap[snap.length]    )
      
      
      const q = query(cred, orderBy("time", "desc"), limit(1));
      console.log(q.data())
      // q.forEach(doc=>console.log(doc.data()))
    }
    catch(err){
      console.log(err)
    }
  }

  const handleSubmitEvent = async (e) =>{
    lastOne()
    records.type = type.current.value;
    records.subject = subject.current.value;
    records.amount = amount.current.value;
    if(records.type == "debit"){
      bal = lastRec - records.amount;
    }
    else{
      bal = lastRec + records.amount;
    }
    console.log(records.type, records.time)
    // try{
    // const docRef = await addDoc(collection(db, 'debitCredit'), {
    //   Type: records.type,
    //   subject: records.subject,
    //   amount: records.amount,
    //   time: records.time,
    //   oldBal: bal
    //   })
    //   console.log("Document written with ID: ", docRef);
    // }
    // catch(err) {
    //   alert(err)
    // }
  }

  

    return (
        <div>
            <form id="debitCredit">
  <div class="form-group">
    <label for="exampleFormControlSelect1">जमा खर्च होशोब </label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option ref={type} name="type" value="debit">खर्च</option>
      <option ref={type} name="type" value="credit">जमा</option>
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
  <button type="button" id="footer" class="btn btn-primary" onClick={(e)=>{
                e.preventDefault();
                lastOne()
            }}>Submit</button>
</form>
        </div>
    )
}

export default CreditDebit
