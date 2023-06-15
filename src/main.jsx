import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Box } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <App />
    </Box>
  </React.StrictMode>
);
