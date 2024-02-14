import { useState } from "react";
import Header from "../../components/Header/Header.component";
import "./Login.css";

interface ILoginInputs {
  username: string;
  password: string;
}

export default function Login() {
  const [inputs, setInputs] = useState<ILoginInputs>({
    username: "",
    password: "",
  });

  const errors: string[] = [];

  function changeHandler(e: any) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function submitHandler(e: any) {
    e.preventDefault();
    // We probably should add some more validations here
    console.log(inputs);
  }

  return (
    <div className="login-page">
      <Header />
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <h1>Login</h1>
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
