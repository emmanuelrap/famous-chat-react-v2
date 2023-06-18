import { useEffect, useState } from "react";
import { Box, CircularProgress, TextField } from "@mui/material";

import Principal from "./components/Principal";
import Famosos from "./components/Famosos";
import Personajes from "./components/Personajes";

function App() {
  const [message, setMessage] = useState("");
  const [famosoSel, setFamosoSel] = useState({});

  useEffect(() => {
    console.log("El famoso sel es:", famosoSel);
  }, [famosoSel]);

  return (
    <Box
      sx={{
        mt: "2rem",
        width: "95%",
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Famosos setFamosoSel={setFamosoSel} />
      <Principal famosoSel={famosoSel} />
      <Personajes setFamosoSel={setFamosoSel} />
    </Box>
  );
}
export default App;
