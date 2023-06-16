import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material";
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

const Pregunta = ({ pregunta }) => {
  //   const classes = useStyles();

  return (
    // <Paper className={classes.box}>
    <Box>
      <Stack direction="row">
        <Box
          sx={{
            width: "100%",
            height: "5%",
            ml: "15%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              padding: "8px 16px", // Ajusta el espaciado interno según tus preferencias
              borderRadius: "12px", // Ajusta el radio de las esquinas redondeadas según tus preferencias
              backgroundColor: "#E0E0E0", // Ajusta el color de fondo según tus preferencias
            }}
          >
            {pregunta}
          </Typography>
        </Box>
        <Tooltip title="Tú">
          <Avatar
            src={
              "https://th.bing.com/th/id/OIP.04D0YadWF5JBe1MuS4DxugHaHa?pid=ImgDet&rs=1"
            }
            sx={{ mx: 1, my: "auto" }}
          ></Avatar>
        </Tooltip>
      </Stack>

      <br />
    </Box>
    // </Paper>
  );
};

export default Pregunta;
