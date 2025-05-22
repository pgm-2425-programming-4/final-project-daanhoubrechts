export const API_URL = import.meta.env.PROD
  ? "https://final-project-daanhoubrechts-api.onrender.com/api"
  : "http://localhost:1340/api";

export const API_TOKEN = import.meta.env.PROD
  ? "c5b5f908a8e00dff159263d908b046b2d5c3c69468cda4a295c47fd0aa3a41855ad031d8e87d26b8e544ebe514ee0e52ca8953f0575197e4a3f43783d3124d1a6f495a2fa848018b23e6abd78b59f5a4c5e637e49f356aa7f146f0a4b008eea60c39241f5555c3bb5908c9a711a6b693175cd6c79139cf3fa217ac954cc54592"
  : "81f6b2732d4ad56de6515e0076481de5e0559e9db662a7b0a75aeeb43f2d5f05c69821aac3c475581c71e9e78349aca4565b3ff329fe1f2e448c5fe0407e8678e5d9fa6eee22818dd2e999704a2e78c8f21c315360a46691bee958fc8dc0808983db9ae8bd66cefa375d905bd5a09c4632c7a8d9c4834ad6fed1f6838e8c2c46";

export const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];
