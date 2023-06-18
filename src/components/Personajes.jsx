import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Personajes = ({ famosoSel, setFamosoSel }) => {
  const [isSelected, setIsSelected] = useState();
  const famosos = [
    "Doctor muy viejito",
    "una persona muy Loca con malas intensiones hacia mí",
    "Una chica que esta enamorada de mí",
    "Mi mamá que se preocupa por mí ",
    "mi perro que sabe hablar, y esta muy feliz de poder hablarme ",
    "Un genio de la lámpara mágica que me consederá 3 deseos",
    "Un rey que quiere que sea caballero ",
    "Un Espartano que esta en la guerra y quiere reclutar gente",
  ];

  const urls = [
    "https://www.topdoctors.es/files/Doctor/profile/prof_4912_20200610093808.png",
    "https://3.bp.blogspot.com/-F1lgMl1B3r8/Wh-G-QX3zTI/AAAAAAAACYw/rZfbVBcqoaUiLPKr-TJQiXWoMzrlqicaQCLcBGAs/s1600/1917.mt1.jpg",
    "https://media.istockphoto.com/id/1276933115/es/vector/mujer-chica-enamorada-de-corazones-sobre-un-fondo-rosa-ilustraci%C3%B3n-del-d%C3%ADa-de-san-valent%C3%ADn.jpg?s=612x612&w=0&k=20&c=6Ke1Ldiy-YxBQ0sobeRZlQyHyT20VPbOTZUu-9bhEkE=",
    "https://i0.wp.com/dialoguemos.ec/wp-content/uploads/2022/05/75092094_m.jpg?fit=1336%2C1024&ssl=1",
    "https://img.freepik.com/vector-gratis/lindo-perro-sacando-lengua-ilustracion-icono-dibujos-animados_138676-2709.jpg?w=2000",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR54uUbDEeO7mArCU5Q-5CNCyJmxfucedSXlQ&usqp=CAU",
    "https://elcomercio.pe/resizer/9rMkni0OutVQ50LN9_w24zWUoDA=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/F3ZZGFEPUFHEREJJTKHB7Z4NWI.jpg",
    "https://www.cambiatufisico.com/wp-content/uploads/entrenamiento-spartano.jpg",
  ];

  useEffect(() => {
    setFamosoSel({ nombre: famosos[0], urlAvatar: urls[0] });
  }, []);

  const handleClick = (seleccion) => {
    // localStorage.setItem("nombre", famosos[seleccion]);
    // localStorage.setItem("urlAvatar", urls[seleccion]);
    setFamosoSel({ nombre: famosos[seleccion], urlAvatar: urls[seleccion] });
    setIsSelected(seleccion);
  };
  // 0 Albert Einstein
  // 1 Leonardo da Vinci
  // 2 William Shakespeare
  // 3 Nelson Mandela
  // 4 Elon Musk
  // 5 Beyoncé
  // 6 Cristiano Ronaldo

  return (
    <Box
      sx={{
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        p: 1,
        ml: -4,
        width: "5rem",
        height: "23.5rem",

        mb: "10rem",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={() => handleClick(0)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 0 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Doctor">
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://www.topdoctors.es/files/Doctor/profile/prof_4912_20200610093808.png"
          />
        </Tooltip>
      </IconButton>

      <IconButton
        onClick={() => handleClick(1)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 1 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Persona No Cuerda">
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://3.bp.blogspot.com/-F1lgMl1B3r8/Wh-G-QX3zTI/AAAAAAAACYw/rZfbVBcqoaUiLPKr-TJQiXWoMzrlqicaQCLcBGAs/s1600/1917.mt1.jpg"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(2)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 2 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Chica Enamorada">
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://media.istockphoto.com/id/1276933115/es/vector/mujer-chica-enamorada-de-corazones-sobre-un-fondo-rosa-ilustraci%C3%B3n-del-d%C3%ADa-de-san-valent%C3%ADn.jpg?s=612x612&w=0&k=20&c=6Ke1Ldiy-YxBQ0sobeRZlQyHyT20VPbOTZUu-9bhEkE="
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(3)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 3 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Mi mamá">
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://i0.wp.com/dialoguemos.ec/wp-content/uploads/2022/05/75092094_m.jpg?fit=1336%2C1024&ssl=1"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(4)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 4 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Perro Hablador">
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://img.freepik.com/vector-gratis/lindo-perro-sacando-lengua-ilustracion-icono-dibujos-animados_138676-2709.jpg?w=2000"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(5)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 5 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Genio de la Lámpara">
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR54uUbDEeO7mArCU5Q-5CNCyJmxfucedSXlQ&usqp=CAU"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(6)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 6 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Rey">
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://elcomercio.pe/resizer/9rMkni0OutVQ50LN9_w24zWUoDA=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/F3ZZGFEPUFHEREJJTKHB7Z4NWI.jpg"
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleClick(7)}
        sx={{
          "& .MuiAvatar-root": {
            border: isSelected == 7 ? "5px solid blue" : "none",
          },
        }}
      >
        <Tooltip title="Espartano">
          <Avatar
            sx={{ width: 60, height: 60 }}
            src="https://www.cambiatufisico.com/wp-content/uploads/entrenamiento-spartano.jpg"
          />
        </Tooltip>
      </IconButton>
    </Box>
  );
};

export default Personajes;
