import React, { useState, useEffect } from 'react';  
import firebaseDb from "../config/firebase";  
import AddOrEditStudent from './addEditStudent';  
  
const StudentInfo= () => {  
  
    var [currentId, setCurrentId] = useState('');  
    var [studentObjects, setStudentObjects] = useState({})  

    useEffect(() => {  
        firebaseDb.child('Student').on('value', snapshot => {  
            if (snapshot.val() != null) {  
                setStudentObjects({  
                    ...snapshot.val()  
                });  
            }  else{
               setStudentObjects({});
            }
        })  
    }, [])  
  
  
    const addOrEdit = (obj) => {  
        if (currentId === '')  
            firebaseDb.child('Student').push(  
                obj,  
                err => {  
                    if (err)  
                        console.log(err)  
                    else  
                        setCurrentId('')  
                })  
        else  
            firebaseDb.child(`Student/${currentId}`).set(  
                obj,  
                err => {  
                    if (err)  
                        console.log(err)  
                    else  
                        setCurrentId('')  
                })  
    }  
  
    const onDelete = id => {  
        if (window.confirm('Are you sure to delete this record?')) {  
            firebaseDb.child(`Student/${id}`).remove(  
                err => {  
                    if (err)  
                        console.log(err)  
                    else  
                        setCurrentId('')  
                })  
        }  
    }  
  
    return (  
        <div className="card">  
            <div className="card-body pb-0">  
                <div className="card">  
                    <div className="card-header main-search dash-search">  
                        <h3>  
                            Student Information Details  
                    </h3>  
                    </div>  
                </div>  
                <div className="row">  
                    <AddOrEditStudent {...({ currentId, studentObjects, addOrEdit })}></AddOrEditStudent>
                    <div className="col-12 col-md-12">  
                        <div className="card">  
                            <div className="card-header">Student Management</div>  
                            <div className="card-body position-relative">  
                                <div className="table-responsive cnstr-record product-tbl">  
                                    <table className="table table-bordered heading-hvr">  
                                        <thead>  
                                            <tr>  
                                                <th className="active">Full Name</th>  
                                                <th>Roll No</th>  
                                                <th>Subject</th>  
                                                <th>Class</th>  
                                                <th width="60"> </th>  
                                                <th width="60"> </th>  
                                            </tr>  
                                        </thead>  
                                        <tbody>  
                                            {  
                                                Object.keys(studentObjects).map((key) => (  
                                                    <tr key={key}>  
                                                        <td>{studentObjects[key].FullName}</td>  
                                                        <td>{studentObjects[key].RollNo}</td>  
                                                        <td>{studentObjects[key].Subject}</td>  
                                                        <td>{studentObjects[key].Class}</td>  
  
                                                        <td className="case-record">  
                                                            <button type="button" className="btn btn-info"  
                                                                onClick={() => { setCurrentId(key) }}>Edit</button>  
  
                                                        </td>  
                                                        <td> <button type="button" className="btn btn-danger"  
                                                            onClick={() => { onDelete(key) }}>Delete</button></td>  
                                                    </tr>  
                                                ))  
                                            }  
                                        </tbody>  
                                    </table>  
                                </div>  
                            </div>  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </div>  
    );  
}  
  
export default StudentInfo;  