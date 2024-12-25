import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

const Student = () => {
  const navigate = useNavigate();
  const { id } = useParams();
const [student, setStudent] = useState([]);
useEffect(() => {
    axios.get("http://localhost:3000/auth/student")
    .then((result) => {
        if(result.data.Status){
            setStudent(result.data.Result)
        }else{
            console.log("Error: ", result.data.message)
        }
    })
    .catch((err) => console.log(err));
},[])

const handleDelete = (id) => {
 
  axios
    .delete(`http://localhost:3000/auth/delete_student/` + id)
    .then((result) => {
      if (result.data.Status) {
       window.location.reload();
        console.log("Student deleted successfully");
      } else {
        console.log("Error: ", result.data.message);
      }
    })
    .catch((err) => console.log(err));
};
  return (
    <div className="mt-5 px-5">
      <div className="d-flex justify-content-center">
        <h3>Student List</h3>
      </div>
      <Link to="/dashboard/add_student" className="btn btn-success">
        Add Student
      </Link>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Image</td>
              <td>Email</td>
              <td>Salary</td>
              <td>Address</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {student.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image_path}
                    className="student_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                 <Link to={`/dashboard/edit_student/`+e.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                  <button
                    className="btn btn-warning btn-sm"
                   onClick={()=>handleDelete(e.id)} 
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student