import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, CircularProgress, TextField } from "@mui/material";

import Principal from "./components/Principal";
import Famosos from "./components/Famosos";

function App() {
  const [message, setMessage] = useState("");
  const [famosoSel, setFamosoSel] = useState({});

  useEffect(() => {
    console.log("El famoso sel es:", famosoSel);
  }, [famosoSel]);

  return (
    <Box
      sx={{
        width: "95%",
        height: "97vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Famosos famosoSel={famosoSel} setFamosoSel={setFamosoSel}></Famosos>
      <Principal></Principal>
    </Box>
  );
}
export default App;
