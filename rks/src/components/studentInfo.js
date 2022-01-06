import React, { useRef, useState } from 'react'
import {db} from '../config/firebase';
import './style.css'
import {collection, addDoc, getDocs, Timestamp} from 'firebase/firestore'
function StudentInfo() {
    const name = useRef()
    const fname = useRef()
    const surname = useRef()
    const age = useRef()
    const address = useRef()
    const mobile = useRef()
    const rname = useRef()
    const raddress = useRef()
    const rmobile = useRef()

    var records = {
        name: "",
        fname: "",
        surname: "",
        age: "",
        address : "",
        mobile : "",
        rname : "",
        raddress : "",
        rmobile : ""
      };

    const handleSubmit = async (e) => {
        try {
            records.name = name.current.value;
            records.fname = fname.current.value;
            records.surname = surname.current.value;
            records.age = age.current.value;
            records.address  = address.current.value
            records.mobile = mobile.current.value
            records.rname = rname.current.value
            records.raddress = raddress.current.value
            records.rmobile = rmobile.current.value
            console.log(records);
            const docRef = await addDoc(collection(db, 'students'), {
            first_name: records.name,
            father_name: records.fname,
            surname: records.surname,
            age: records.age,
            address:  records.address,
            mobile: records.mobile,
            rel_name: records.rname,
            rel_address: records.raddress,
            rel_mobile: records.rmobile
            })
            name.current.value = ""
            fname.current.value = ""
            surname.current.value = ""
            age.current.value = ""
            address.current.value = ""
            mobile.current.value = ""
            rname.current.value = ""
            raddress.current.value = ""
            rmobile.current.value = ""
                handleSubmit()
          console.log("Document written with ID: ", docRef);
        } catch (err) {
          alert(err)
        }
      }

    return (
            /* <input type="text" name="name" id="" placeholder='name' ref={name} />
            <input type="text" name="fname" id="" placeholder='surname' ref={fname}/>
            <input type="text" name="surname" id="" placeholder='surname' ref={surname}  />
            <input type="text" name="age" id="" placeholder='age' ref={age} /> */
            <div className="container" id="main">

        <div class="row text-center">

            <div class="col-lg-4 col-md-4 col-sm-4">
                <label>First Name : </label>
                <input type="text" name="name" placeholder='name' ref={name} required />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4">
                <br /><label>Middle Name : </label>
                <input type="text" name="fname" id="" placeholder='surname' ref={fname} required />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4">
                <br /><label>Last Name : </label> 
                <input type="text" name="surname" id="" placeholder='surname' ref={surname} required />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4">
                <br /><label>Address :  </label>
                <input type="text" name="address" id="" placeholder='address' ref={address} required />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4">
                <br /><label>Age of candidate: </label>
                <input type="text" name="age" id="" placeholder='age' ref={age} required />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4">
                <br /><label>Mobile No : </label>
                <input type="text" name="mobile" id="" placeholder='mobile' ref={mobile} required />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4">
                <br /><label>Relative Name :  </label>
                <input type="text" name="rname" id="" placeholder='name' ref={rname} required />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4">
                <br /><label>Rel Address : </label>
                <input type="text" name="raddress" id="" placeholder='address' ref={raddress} required />
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4">
                <br /><label>Rel Mobile No : </label>
                <input type="text" name="rmobile" id="" placeholder='mobile' ref={rmobile} required />
            </div>

           
              
        </div>
        <div class="mt-3">
            <label id="term">Terms and conditions</label>   
            <input type="checkbox"/>
            <br /><button type="button" id="footer" class="btn btn-primary" onClick={(e)=>{
                e.preventDefault();
                handleSubmit()
            }}>Submit</button>
          </div>
    
    </div>
            
    )
}

export default StudentInfo
