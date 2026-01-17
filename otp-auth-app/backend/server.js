const express = require("express")
const cors = require("cors")
const { v4: uuid } = require("uuid")

const app = express()
app.use(cors())
app.use(express.json())

let otpData = {}
let blocked = {}
let sessionMap = {}

function makeOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
app.post("/sendOtp", (req, res) => {
  const userVal = req.body.identifier

  if (!userVal) {
    res.status(400).json({ message: "Value required" })
    return
  }
  if (blocked[userVal] && blocked[userVal] > Date.now()) {
    let mins = Math.ceil((blocked[userVal] - Date.now()) / 60000)
    res.status(403).json({ message: "Blocked for " + mins + " minute(s)" })
    return
  }
  let code = makeOtp()
  otpData[userVal] = {
    code: code,
    time: Date.now() + 2 * 60 * 1000,
    tries: 0,
  }
  console.log("OTP for", userVal, "is", code)

  res.json({ ok: true })
})
app.post("/checkOtp", (req, res) => {
  const userVal = req.body.identifier
  const entered = req.body.otp
  if (!userVal || !entered) {
    res.status(400).json({ message: "Missing data" })
    return
  }
  let saved = otpData[userVal]
  if (!saved) {
    res.status(400).json({ message: "No code found" })
    return
  }
  if (saved.time < Date.now()) {
    delete otpData[userVal]
    res.status(400).json({ message: "Code expired" })
    return
  }
  if (saved.code === entered) {
    let token = uuid()
    sessionMap[token] = userVal
    delete otpData[userVal]
    res.json({ token: token })
    return
  }
  saved.tries += 1
  if (saved.tries >= 3) {
    blocked[userVal] = Date.now() + 10 * 60 * 1000
    delete otpData[userVal]
    res.status(403).json({ message: "Too many tries, blocked" })
    return
  }
  res.status(401).json({ message: "Wrong code" })
})
app.get("/whoami", (req, res) => {
  const t = req.headers.authorization
  if (!t || !sessionMap[t]) {
    res.status(401).json({ message: "Not allowed" })
    return
  }
  res.json({ user: sessionMap[t] })
})
app.listen(5000, () => {
  console.log("Backend running on 5000")
})
