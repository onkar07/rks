import React, { useRef, useState } from 'react'
import { db } from '../config/firebase';
// import './creditDebit.css'
import { getDocs, collection, addDoc, writeBatch, doc } from 'firebase/firestore'
import { query, orderBy, limit, getDocuments } from "firebase/firestore";
function FeeEntry() {
    var currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const [month, setMonth] = useState("January")
    var monthly_fee = 1100;
    const batch = writeBatch(db);
    var monthArray = ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"]
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
              var data = (doc.id,doc.id, " => ", doc.data())
              recArray.push(doc.id, data);
              
            });
            let cn = true;
            for(let i=0; i<recArray.length; i++){
                if(recArray[i].student_Id == records.student_id, recArray[i].fee_month == records.fee_month){
                    console.log(recArray[i])
                    if (window.confirm("ह्या महिन्याची फी आधीच भरली आहे, तरीही भरायची का?")) {
                        if(records.fee_amount > 1100){
                            try {
                                const sfRef = doc(db, "student_fees", recArray[i-1]);
                                batch.update(sfRef, {"fee_amount": 1100});
                                console.log("updated")
                            }
                            catch (err) {
                                console.log(err)
                                alert("Falied")
                            }
                            var new_fee_amount = records.fee_amount - 1100;
                            if(new_fee_amount > 1){

                            let reminder = Number(new_fee_amount) % 1100;
                            let Doloop = Math.floor(Number(new_fee_amount) / 1100);
                            let month_count_u;
                            console.log(Doloop)
                            for(let i=0; i<12; i++){
                                if(records.fee_month == monthArray[i]){
                                    month_count_u = i;
                                }
                            }
                            for(let i=0; i<Doloop; i++){
                                try {
                                    const docRef = await addDoc(collection(db, 'student_fees'), {
                                        student_Id: records.student_id,
                                        fee_amount: 1100,
                                        fee_month: monthArray[i + 1 + month_count_u],
                                        fee_date: records.fee_date
                                    })
                                    if (docRef) alert("Saved")
                                }
                                catch (err) {
                                    console.log(err)
                                    alert("Falied")
                                }
                            }
                            if(reminder > 0){
                                try {
                                    const docRef = await addDoc(collection(db, 'student_fees'), {
                                        student_Id: records.student_id,
                                        fee_amount: reminder,
                                        fee_month: records.fee_month,
                                        fee_date: records.fee_date
                                    })
                                    if (docRef) alert("Saved")
                                }
                                catch (err) {
                                    console.log(err)
                                    alert("Falied")
                                }
                            }
                        }
                        }
                        else{
                            try {
                                const sfRef = doc(db, "student_fees", recArray[i-1]);
                                batch.update(sfRef, {"fee_amount": 1100});
                                console.log("updated")
                            }
                            catch (err) {
                                console.log(err)
                                alert("Falied")
                            }
                        }
                        
                      } else {
                        console.log("Declined")
                      }
                    return cn=false;
                }
                
            }
            if( cn == true){
                if(records.fee_amount > 1100){
                    let reminder = Number(records.fee_amount) % 1100;
                    let Doloop = Math.floor(Number(records.fee_amount) / 1100);
                    var month_count = 0;
                    console.log(Doloop)
                    for(let i=0; i<12; i++){
                        if(records.fee_month == monthArray[i]){
                            month_count = i;
                        }
                    }
                    for(let i=0; i<Doloop; i++){
                        try {
                            const docRef = await addDoc(collection(db, 'student_fees'), {
                                student_Id: records.student_id,
                                fee_amount: 1100,
                                fee_month: monthArray[i + 1 + month_count],
                                fee_date: records.fee_date
                            })
                            if (docRef) alert("Saved")
                        }
                        catch (err) {
                            console.log(err)
                            alert("Falied")
                        }
                    }
                    if(reminder > 0){
                        try {
                            const docRef = await addDoc(collection(db, 'student_fees'), {
                                student_Id: records.student_id,
                                fee_amount: reminder,
                                fee_month: records.fee_month,
                                fee_date: records.fee_date
                            })
                            if (docRef) alert("Saved")
                        }
                        catch (err) {
                            console.log(err)
                            alert("Falied")
                        }
                    }
                }
                else{
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
                }
            console.log("saved")
            }
          }
          catch (err) {
            console.log(err)
          }
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
