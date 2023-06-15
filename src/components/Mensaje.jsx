import { Avatar, Box, Stack } from "@mui/material";
import React from "react";

// import Paper from "@material-ui/core/Paper";

// const useStyles = makeStyles((theme) => ({
//   box: {
//     backgroundColor:
//       "#CCE6FF" /* Cambia este valor si deseas un tono de azul diferente */,
//     borderRadius:
//       "10px" /* Ajusta este valor para hacer los bordes más o menos redondeados */,
//     padding:
//       theme.spacing(
//         2
//       ) /* Ajusta este valor para aumentar o disminuir el espacio interno de la caja */,
//     width:
//       "300px" /* Ajusta este valor para cambiar el ancho de la caja según tus necesidades */,
//   },
// }));

const Mensaje = ({ mensaje }) => {
  //   const classes = useStyles();

  return (
    // <Paper className={classes.box}>
    <Box>
      <Stack direction="row">
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
          sx={{ mx: 1 }}
        ></Avatar>
        <Box
          sx={{
            width: "100%",
            height: "5%",
            mr: "30%",
            backgroundColor: "primary.dark",
          }}
        >
          {mensaje}
        </Box>
      </Stack>

      <br />
    </Box>
    // </Paper>
  );
};

export default Mensaje;
