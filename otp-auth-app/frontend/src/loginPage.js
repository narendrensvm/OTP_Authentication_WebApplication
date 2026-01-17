import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const [val, setVal] = useState("")
  const [msg, setMsg] = useState("")
  const nav = useNavigate()

  function send() {
    if (!val) {
      setMsg("Please enter email or phone")
      return
    }
    fetch("http://localhost:5000/sendOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: val }),
    })
      .then((res) =>
        res.json().then((data) => ({
          status: res.status,
          body: data,
        }))
      )
      .then((result) => {
        if (result.status === 403) {
          alert(result.body.message)
          return
        }
        if (result.status === 200) {
          localStorage.setItem("idVal", val)
          setMsg("")
          nav("/otp")
        }
      })
      .catch(() => {
        setMsg("Server not responding")
      })
  }
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>
      <input
        placeholder="Email or Phone"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <br /><br />
      <button onClick={send}>Send OTP</button>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  )
}
export default LoginPage