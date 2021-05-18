import { useRef } from "react";

function SignUp({ signUpWithEmail }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <form className="loggin-form">
      <label className="label-fields">
        Email:
        <input
          className="form-input"
          type="email"
          ref={emailRef}
          placeholder="Enter email"
          required
        />
      </label>

      <label className="label-fields">
        Password:
        <input
          className="form-input"
          type="password"
          ref={passwordRef}
          placeholder="Enter password"
          required
        />
      </label>
      <button
        className="loggin-btn"
        onClick={() =>
          signUpWithEmail(emailRef.current.value, passwordRef.current.value)
        }
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
