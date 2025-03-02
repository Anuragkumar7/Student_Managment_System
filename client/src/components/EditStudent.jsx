import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditStudent = () => {
  const { id } = useParams();
  const [studentData, setStudent] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });
const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/student/" + id)
      .then((result) => {
        setStudent({
          ...studentData,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch(err => console.log(err));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put("http://localhost:3000/auth/edit_student/" + id, studentData)
      .then((result) => {
        if(result.data.Status){
            navigate('/dashboard/student')
        } else{
            alert(result.data.Message)
        }
        // console.log(result.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Student Profile</h3>
        <form htmlFor="student" className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={studentData.name}
              onChange={(e) =>
                setStudent({ ...studentData, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={studentData.email}
              onChange={(e) =>
                setStudent({ ...studentData, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={studentData.salary}
              onChange={(e) =>
                setStudent({ ...studentData, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={studentData.address}
              onChange={(e) =>
                setStudent({ ...studentData, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={studentData.category_id}
              onChange={(e) =>
                setStudent({ ...studentData, category_id: e.target.value })
              }
            >
              {/* Default option */}
              <option value="" disabled selected>
                Select a Category
              </option>
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary w-100">
              Edit Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
