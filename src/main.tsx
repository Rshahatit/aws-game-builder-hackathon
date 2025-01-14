import { StrictMode } from "react"
import { Authenticator } from "@aws-amplify/ui-react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import "@aws-amplify/ui-react/styles.css"
import outputs from "../amplify_outputs.json"
import { Amplify } from "aws-amplify"

Amplify.configure(outputs)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </StrictMode>
)
