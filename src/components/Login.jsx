import React from "react";
import "./ProfileCard.css";
import avatar from "../assets/google.png";
import { supabase } from "../supabaseClient";

function Login({ name, age, city, followers, likes, photos }) {

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="card-container">
      <header>
        <img src={avatar} alt={name} />
      </header>

      <h1 className="bold-text">
        Smart Bookmark App <span className="normal-text"></span>
      </h1>

      <div className="social-container">
        <div className="followers">
          <h1 className="bold-text">~</h1>
        </div>

        <div className="likes">
          <h1 className="bold-text">Wellcome</h1>
          <h2 className="smaller-text"></h2>
        </div>

        <div className="photos">
          <h1 className="bold-text">~</h1>
        </div>
      </div>

      {/* Google Login Button Inside Card */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={loginWithGoogle}
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom : "10px",
          }}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
