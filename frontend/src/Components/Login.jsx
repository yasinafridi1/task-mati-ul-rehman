import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import axios from "axios";
import { server } from "../server";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${server}/login`, formData, { withCredentials: true })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        alert("Something went wrong.");
      });

    setFormData({
      phoneNumber: "",
      password: "",
    });
  };

  return (
    <div style={{ background: "#E9EFF4" }}>
      <div style={styles.container}>
        <AppBar position="static" style={styles.appBar}>
          <h2 style={styles.title}> Login to WedBook </h2>{" "}
        </AppBar>{" "}
        <form onSubmit={handleSubmit} style={styles.form}>
          <TextField
            id="filled-basic"
            rows={8}
            placeholder="Enter Phone Number"
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={styles.textField}
          />{" "}
          <TextField
            id="filled-basic"
            rows={8}
            placeholder="Enter Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.textField}
          />{" "}
          <br />
          <Button variant="outlined" style={{ color: "#05C7AA" }} type="submit">
            Login{" "}
          </Button>{" "}
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ color: "#05C7AA", marginRight: "10px" }}>
              Don 't have an account?{" "}
            </h3>{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <h3 style={{ color: "#05C7AA" }}> SignUp </h3>{" "}
            </Link>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

const styles = {
  container: {
    margin: "auto",
    textAlign: "center",
    marginTop: "90px",
    backgroundColor: "#E9EFF4",
  },
  appBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "967px",
    height: "155px",
    backgroundColor: "#05C7AA",
    position: "absolute",
    left: "50%",
    top: "20%",
    transform: "translate(-50%, -50%)", // Center the element
  },
  textField: {
    borderRadius: "40px",
    width: "789px",
    height: "60px",
    margin: "10px",
    border: "2px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#FFFFFF",
    paddingTop: "120px", // Adjust this to match the height of the AppBar
  },
  label: {
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    margin: "5px 0",
  },
  errorText: {
    color: "red",
  },
};

export default Login;
