import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./loginPage"
import OtpScreen from "./otpScreen"
import Welcome from "./Welcome"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/Welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App