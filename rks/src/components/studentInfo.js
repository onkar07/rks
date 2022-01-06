import React, { useRef, useState } from 'react'
import {db} from '../config/firebase';
import {collection, addDoc, getDocs, Timestamp} from 'firebase/firestore'
function StudentInfo() {
    const name = useRef()
    const fname = useRef()
    const surname = useRef()
    const age = useRef()


    const handleSubmit = async (e) => {
        console.log(fname.current.value)
        // console.log(name.value,
        //     fname,
        //     surname,
        //     age)
        // try {
        //     const docRef = await addDoc(collection(db, 'students'), {
        //     first_name: values.name,
        //     father_name: values.fname,
        //     surname: values.surname,
        //     age: values.age
        //     })
        //   console.log("Document written with ID: ", docRef);
        // } catch (err) {
        //   alert(err)
        // }
      }
    return (
        <div>
            <input type="text" name="name" id="" placeholder='name' ref={name} />
            <input type="text" name="fname" id="" placeholder='surname' ref={fname} values={fname.current} />
            <input type="text" name="surname" id="" placeholder='surname' ref={surname} values={surname.current} />
            <input type="text" name="age" id="" placeholder='age' ref={age} values={age.current}/>
            <button onClick={handleSubmit()}>submit</button>

        </div>
    )
}

export default StudentInfo
