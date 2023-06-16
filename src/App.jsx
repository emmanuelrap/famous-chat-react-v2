import { useEffect, useState } from "react";
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
      <Famosos setFamosoSel={setFamosoSel} />
      <Principal famosoSel={famosoSel} />
    </Box>
  );
}
export default App;
