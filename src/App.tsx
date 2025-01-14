import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Game } from "./pages/Game"
import { Lobby } from "./pages/Lobby"
import { useAuthenticator } from "@aws-amplify/ui-react"
import { motion } from "framer-motion"

function App() {
  const { signOut } = useAuthenticator()
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-8 py-4 rounded-full text-xl font-bold flex items-center gap-2"
            onClick={signOut}
          >
            Sign out
          </motion.button>
        </Routes>
      </div>
    </Router>
  )
}

export default App
