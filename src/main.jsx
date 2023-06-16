import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Avatar, Box, IconButton, Stack } from "@mui/material";
import { BorderColor } from "@mui/icons-material";
import Famosos from "./components/Famosos";

const RootComponent = () => {
  //const [famosoSel, setFamosoSel] = useState({}); // Estado y función para actualizarlo

  return (
    <React.StrictMode>
      <Box
        sx={{
          width: "95%",
          height: "97vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Famosos famosoSel={famosoSel} setFamosoSel={setFamosoSel} />
        <App famosoSel={famosoSel} setFamosoSel={setFamosoSel} /> */}
        <Famosos></Famosos>
        <App></App>
      </Box>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<RootComponent />);
