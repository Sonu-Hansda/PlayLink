import { Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Headers from "./components/Headers"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Player from "./pages/Player"
import Changelog from "./pages/ChangeLog"
import Disclaimer from "./pages/Disclaimer"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Headers />
      <section className="container flex-grow border-b border-gray-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<Player />} />
          <Route path="/change-log" element={<Changelog/>}/>
          <Route path="/disclaimer" element={<Disclaimer/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
      <Footer />
    </div>
  )
}

export default App
