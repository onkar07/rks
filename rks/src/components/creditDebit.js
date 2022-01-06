import React from 'react'
import './creditDebit.css'
function CreditDebit() {
    return (
        <div>
            <form id="debitCredit">
  
  <div class="form-group">
    <label for="exampleFormControlSelect1">जमा खर्च होशोब </label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>खर्च</option>
      <option>जमा</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">विषय</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="विषय" />
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">रक्कम ₹</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="रक्कम ₹" />
  </div>
  
</form>
        </div>
    )
}

export default CreditDebit
