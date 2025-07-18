import React from 'react'
import StudentContext from './StudentContext'

const StudentState = (props) => {
    const Students = [
        {
        _id:1,
        name:"Manshi",
        email:"manshi@gmail.com",
        age:19,
        course:"python"
    },
    {
        _id:2,
        name:"Bishnu",
        email:"bishnu@gmail.com",
        age:20,
        course:"java"
    },
    {
        _id:3,
        name:"Shruti",
        email:"shruti@gmail.com",
        age:16,
        course:"javascript"
    }
    ];
    const [student, setStudent] = React.useState(students);

    const allStudent = async() => {
        try {
            const response = await fetch("https://localhost:5000/students/add", {
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "std-token": "abcdefkhis",
                }
            });
            const data = await response.json();
            setStudent(data);
        } catch (error) {
            console.log("error", error);
            res.status(500).send("internal server error");
        }
    }
    
  return (
    <StudentContext.Provider value={{student}}>
      {props.children}
    </StudentContext.Provider>
  )
}

export default StudentState
