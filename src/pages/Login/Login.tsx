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
  const [validErrors, setValidErrors] = useState<ILoginInputs>({
    username: "",
    password: "",
  });

  function changeHandler(e: any) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function submitHandler(e: any) {
    e.preventDefault();

    if (inputs.username.length < 8) {
      setValidErrors({
        ...validErrors,
        username: "You need to have at least 8 charcters in your username",
      });
    }

    console.log(inputs);
  }

  return (
    <div className="login-page">
      <Header />
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <h1>Login</h1>
        {validErrors.username && <p>{validErrors.username}</p>}
        <input
          className="form-el"
          name="username"
          type="text"
          placeholder="Username"
          onChange={(e) => changeHandler(e)}
        />
        <input
          className="form-el"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => changeHandler(e)}
        />
        <input className="form-btn" type="submit" />
      </form>
    </div>
  );
}
