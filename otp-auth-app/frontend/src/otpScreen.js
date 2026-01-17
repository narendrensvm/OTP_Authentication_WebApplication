import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function OtpScreen() {
  const [code, setCode] = useState("")
  const nav = useNavigate()
  const userVal = localStorage.getItem("idVal")
  if (!userVal) {
    nav("/")
    return null
  }
  function checkOtp() {
    if (!code) {
      alert("Please enter OTP")
      return
    }
    fetch("http://localhost:5000/checkOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: userVal,
        otp: code,
      }),
    })
      .then((res) =>
        res.json().then((data) => ({
          status: res.status,
          body: data,
        }))
      )
      .then((result) => {
        if (result.status === 200 && result.body.token) {
          localStorage.setItem("tokenVal", result.body.token)
          nav("/Welcome")
          return
        }
        if (result.status === 401) {
          alert(result.body.message) 
          setCode("")
          return
        }
        if (result.status === 403 || result.status === 400) {
          alert(result.body.message)
          nav("/")
        }
      })
      .catch(() => {
        alert("Server problem, try again")
        nav("/")
      })
  }
  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h3>Enter OTP</h3>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br /><br />
      <button onClick={checkOtp}>Verify</button>
    </div>
  )
}

export default OtpScreen
