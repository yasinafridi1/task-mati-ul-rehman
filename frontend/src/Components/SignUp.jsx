import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import axios from "axios";
import { server } from "../server";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, TextField } from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }

    // Clear password match error when user changes the password or confirm password
    if (name === "password" || name === "confirmPassword") {
      setPasswordMatchError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setPasswordMatchError(true);
      return;
    }

    try {
      await axios.post(
        `${server}/createUser`,
        { fullName, email, phoneNumber, password },
        {
          withCredentials: true,
        }
      );
      navigate("/login");
      <Alert severity="success">
        Your account has been created successfully.
      </Alert>;
    } catch (error) {
      <Alert severity="error">Something went wrong.</Alert>;
    }

    // Reset the form after submission
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={{ background: "#E9EFF4" }}>
      <div style={styles.container}>
        <AppBar position="static" style={styles.appBar}>
          <h2 style={styles.title}>Welcome to WedBook</h2>
        </AppBar>
        <form onSubmit={handleSubmit} style={styles.form}>
          <TextField
            id="filled-basic"
            rows={8}
            placeholder="Enter Full Name"
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            required
            style={styles.textField}
          />
          <TextField
            id="filled-basic"
            rows={8}
            placeholder="Enter Gmail"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            style={styles.textField}
          />
          <TextField
            id="filled-basic"
            rows={8}
            placeholder="Enter Phone Number"
            type="number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            required
            style={styles.textField}
          />
          <TextField
            id="filled-basic"
            rows={8}
            placeholder="Enter Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            style={styles.textField}
          />
          <TextField
            id="filled-basic"
            rows={8}
            placeholder="Enter Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            style={styles.textField}
          />
          {passwordMatchError && (
            <p style={styles.errorText}>
              Password and Confirm Password should be the same
            </p>
          )}
          <br />
          <Button variant="outlined" style={{ color: "#05C7AA" }} type="submit">
            Sign Up
          </Button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ color: "#05C7AA", marginRight: "10px" }}>
              Already have an account?
            </h3>{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <h3 style={{ color: "#05C7AA" }}>Login</h3>
            </Link>
          </div>
        </form>
      </div>
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

export default SignUp;
