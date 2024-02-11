import { useState } from "react";
import Header from "../../components/Header/Header.component";
import "./Signup.css";
import "toastify-js/src/toastify.css";

interface ISignUpInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [inputs, setInputs] = useState<ISignUpInputs>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(e: any) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function submitHandler(e: any) {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      console.log("Passwords don't match");
    }
    console.log(inputs);
  }

  return (
    <div className="signup-page">
      <Header />
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <h1>Sign Up</h1>
        <input
          className="form-el"
          name="username"
          type="text"
          placeholder="Username"
          onChange={(e) => changeHandler(e)}
        />
        <input
          className="form-el"
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => changeHandler(e)}
        />
        <input
          className="form-el"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => changeHandler(e)}
        />
        <input
          className="form-el"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => changeHandler(e)}
        />
        <input className="form-btn" type="submit" />
      </form>
    </div>
  );
}
