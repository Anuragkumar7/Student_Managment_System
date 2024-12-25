import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

const StudentDetails = () => {
  const [student, setStudent] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/student/details/" + id)
      .then((response) => {
        console.log(response);

        setStudent(response.data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000/student/logout")
     .then((result) => {
      console.log(result.data);
      if (result.data.status) {
        localStorage.removeItem("valid");
        navigate("/");
      } else {
        alert("Error while logging out");
      }
    });
  };
  return (
    <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer>
        <MDBRow className="justify-content-center ">
          <MDBCol md="9" lg="7" xl="10" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "210px", borderRadius: "10px" }}
                      src={`http://localhost:3000/Images/` + student.image_path}
                      alt="image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{student.name}</MDBCardTitle>
                    <p className="small text-muted mb-1 ">Unique ID</p>
                    <MDBCardText>{student.id}</MDBCardText>

                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-1">Salary</p>
                        <p className="mb-0">{student.salary}</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">976</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Address</p>
                        <p className="mb-0">{student.address}</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <MDBBtn className="me-1 flex-grow-1 btn-info">
                        Edit
                      </MDBBtn>
                      <MDBBtn
                        className="flex-grow-1 btn-danger"
                        onClick={handleLogout}
                      >
                        LogOut
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default StudentDetails;
