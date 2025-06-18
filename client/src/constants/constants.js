export const API_URL = import.meta.env.PROD
  ? "https://final-project-daanhoubrechts-api.onrender.com/api"
  : "http://localhost:1340/api";

export const API_TOKEN = import.meta.env.PROD
  ? "4c4561d0d33b8b438df006b847ea2a54e3ee4a4484a2c45ef592ca6056141b55fe8616689acd6f83344dbfd437ccb7d0b9a14f0aa1c9f1a71ff26ae7460f5ac10682475edaf09b13b8f3cccc944a01db72de07cee8260e2e4746ae256a22f714f72238c118d5020eb38ed5aeda9eba36fe59984352f87649fce2f755391c5835"
  : "81f6b2732d4ad56de6515e0076481de5e0559e9db662a7b0a75aeeb43f2d5f05c69821aac3c475581c71e9e78349aca4565b3ff329fe1f2e448c5fe0407e8678e5d9fa6eee22818dd2e999704a2e78c8f21c315360a46691bee958fc8dc0808983db9ae8bd66cefa375d905bd5a09c4632c7a8d9c4834ad6fed1f6838e8c2c46";

export const PAGE_SIZE_OPTIONS = [10, 15, 20, 30, 50];
