import Home from "./pages/Home"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"

const App = () => {
  return <main>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </main>
}

export default App