import React, { useRef, useState } from 'react'
import { db } from '../config/firebase';
// import './creditDebit.css'
import { getDocs, collection, addDoc, onSnapshot } from 'firebase/firestore'
import { query, orderBy, limit, getDocuments } from "firebase/firestore";
function FeeEntry() {
    var currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const [month, setMonth] = useState("January")
    // const [dict, setDict] = useState([])
    
    var recArray = [];
    var dictt = [];
    var records = {
        student_id : "",
        fee_amount : 0,
        fee_month : "",
        fee_date : currentTimeInSeconds
    }
    
    
    var studentId = useRef();
    var amount = useRef();

    const handleSubmit = async () =>{
        records.student_id = studentId.current.value;
        records.fee_amount = amount.current.value;
        records.fee_month = month;
        console.log(records)
        try {
            const snap = await getDocs(collection(db, 'student_fees'));
            snap.forEach((doc) => {
              var data = (doc.id, " => ", doc.data())
              recArray.push(data);
            });

            for(let i=0; i<recArray.length; i++){
                dictt.push({id:recArray[i].student_Id,month:recArray[i].fee_month})
            }
            let cn = true;
            dictt.forEach(drec=>{
                if(drec.id == records.student_id && drec.month == records.fee_month){
                    return cn=false;
                }
            })
            if( cn == true){
                try {
            const docRef = await addDoc(collection(db, 'student_fees'), {
              student_Id: records.student_id,
              fee_amount: Number(records.fee_amount),
              fee_month: records.fee_month,
              fee_date: records.fee_date
            })
            if(docRef) alert("Saved")
          }
          catch (err) {
            console.log(err)
            alert("Falied")
          }
        console.log("saved")
            }
          }
          catch (err) {
            console.log(err)
          }

        // try {
        //     const docRef = await addDoc(collection(db, 'student_fees'), {
        //       student_Id: records.student_id,
        //       fee_amount: Number(records.fee_amount),
        //       fee_month: records.fee_month,
        //       fee_date: records.fee_date
        //     })
        //     if(docRef) alert("Saved")
        //   }
        //   catch (err) {
        //     console.log(err)
        //     alert("Falied")
        //   }
    }

    return (
        <div>
            <form id="debitCredit">
                <div class="form-group">
                    <label for="exampleFormControlInput1">विद्यार्थी नंबर </label>
                    <input type="text" ref={studentId} name="subject" class="form-control" id="exampleFormControlInput1" placeholder="विषय" />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">रक्कम ₹</label>
                    <input type="number" ref={amount} name="amount" class="form-control" id="exampleFormControlInput1" placeholder="रक्कम ₹" />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">फी चा महिना </label>
                    <select class="form-control" value={month} onChange={(e) => { setMonth(e.target.value) }} id="exampleFormControlSelect1">
                        <option name="month" value="January">जनवरी </option>
                        <option name="month" value="February">फरवरी </option>
                        <option name="month" value="March">मार्च </option>
                        <option name="month" value="April">अप्रैल </option>
                        <option name="month" value="May">मई </option>
                        <option name="month" value="June">जून </option>
                        <option name="month" value="July">जुलाई </option>
                        <option name="month" value="August">अगस्त </option>
                        <option name="month" value="September">सितंबर </option>
                        <option name="month" value="October">अक्टूबर </option>
                        <option name="month" value="November">नवंबर </option>
                        <option name="month" value="December">दिसंबर </option>

                    </select>
                </div>
                
                
                <button type="button" id="footer" class="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>Submit</button>
            </form>
        </div>
    )
}

export default FeeEntry
