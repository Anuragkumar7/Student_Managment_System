import React, { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [studentTotal, setStudentTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    studentCount();
    TotalSalary();
    getAdmin();
  }, []);

  const adminCount = () => {
    axios
      .get("http://localhost:3000/auth/admin_count")
      .then((result) => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        } else {
          console.log(result.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };

  const studentCount = () => {
    axios
      .get("http://localhost:3000/auth/student_count")
      .then((response) => {
        // console.log(response.data);
        if (response.data.Status) {
          setStudentTotal(response.data.Result[0].students);
        }
      })
      .catch((err) => console.log(err));
  };

  const TotalSalary = () => {
    axios
      .get("http://localhost:3000/auth/total_salary")
      .then((response) => {
        console.log(response.data);
        if (response.data.Status) {
          setSalaryTotal(response.data.Result[0].salary);
        }
      })
      .catch((err) => console.log(err));
  };

  const getAdmin = () => {
    axios
      .get("http://localhost:3000/auth/admins")
      .then((response) => {
        console.log(response.data);

        if (response.data.Status) {
          setAdmins(response.data.Result);
        } else {
          console.log("Error: ", response.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };
 
  const handleDelete = (id) => {
   
    axios
      .delete("http://localhost:3000/auth/delete_admin/" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () =>{

  }
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Student</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{studentTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total: </h5>
            <h5>$ {salaryTotal}</h5>
          </div>
        </div>
      </div>

      <div className="mt-5 px-5 pt-3">
        <div className="text-center my-3">

        <h3>List Of Admins</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <td>Email</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {admins.map((e) =>  {
              return(
                <tr key={e.id}>
                  <td>{e.email}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2" onClick={handleEdit}>Edit</button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
