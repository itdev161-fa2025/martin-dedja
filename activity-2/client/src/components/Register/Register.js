import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = userData;

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (password !== passwordConfirm) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post(
          "http://localhost:5000/api/users",
          body,
          config
        );

        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
        return;
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => onChange(e)}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => onChange(e)}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => onChange(e)}
        placeholder="Password"
      />
      <input
        type="password"
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={(e) => onChange(e)}
        placeholder="Confirm Password"
      />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
