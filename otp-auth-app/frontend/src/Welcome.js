import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Welcome() {
  const [name, setName] = useState("")
  const nav = useNavigate()
  useEffect(() => {
    let t = localStorage.getItem("tokenVal")
    if (!t) {
      nav("/")
      return
    }
    fetch("http://localhost:5000/whoami", {
      headers: { Authorization: t },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setName(d.user)
        } else {
          nav("/")
        }
      })
      .catch(() => nav("/"))
  }, [nav])

  function out() {
    localStorage.clear()
    nav("/")
  }
  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Hello {name}</h2>
      <button onClick={out}>Logout</button>
    </div>
  )
}
export default Welcome