import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  let [isChecked, setIsChecked] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let handleLogin = () => {
    console.log("clicked...");
    console.log("isChecked=", isChecked);
    console.log("email=", email);
    console.log("password=", password);

    let userData = JSON.stringify({
      username: email,
      password: password,
    });

    fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.message);
        localStorage.setItem("userDetails", JSON.stringify(data.message));
        window.location.href = `/${data.message.user.id}`;
        alert("Login successful");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div id="main_container">
      <section className="text-center text-lg-start">
        <div className="card mb-3">
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                alt="Trendy Pants and Shoes"
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
              />
            </div>
            <div className="col-lg-8">
              <div className="card-body py-5 px-md-5">
                <form>
                  {/* <!-- Email input --> */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example1"
                      className="form-control"
                      placeholder="eg: john.doe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form2Example1">
                      Username
                    </label>
                  </div>

                  {/* <!-- Password input --> */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example2"
                      className="form-control"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form2Example2">
                      Password
                    </label>
                  </div>

                  {/* <!-- 2 column grid layout htmlFor inline styling --> */}
                  <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                      {/* <!-- Checkbox --> */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="form2Example31"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example31"
                        >
                          {" "}
                          Remember me{" "}
                        </label>
                      </div>
                    </div>

                    <div className="col">
                      <a href="#!">Forgot password?</a>
                    </div>
                  </div>
                  <button
                    onClick={handleLogin}
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4 w-100"
                  >
                    Sign in
                  </button>
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signup" className="link-info">
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
