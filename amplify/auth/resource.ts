import { defineAuth } from "@aws-amplify/backend"

// Define authentication configuration
export const auth = defineAuth({
  loginWith: {
    email: true,
    // Add additional authentication methods as needed
  },
})
