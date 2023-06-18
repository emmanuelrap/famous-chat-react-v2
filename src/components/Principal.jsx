import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import Zoom from "@mui/material/Zoom";

import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import {
  Tooltip,
  Box,
  CircularProgress,
  Switch,
  TextField,
  Typography,
  Slider,
  Stack,
} from "@mui/material";
import Mensaje from "./Mensaje";
import Pregunta from "./Pregunta";
const API_KEY = import.meta.env.VITE_API_KEY;
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/system";
const StyledLabel = styled("span")({
  marginRight: "0.5rem",
});

function Principal({ famosoSel }) {
  const [message, setMessage] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tipoResp, setTipoRes] = useState("Respuesta Detallada");
  const [tipoModelo, setTipoModelo] = useState("text-davinci-002");
  const [configOpen, setConfigOpen] = React.useState(false);
  const [nivelRespuesta, setNivelRespuesta] = React.useState(1.0);

  const [sugerenciaMostrar, setSugerenciaMostrar] = useState(
    "Escribe aquí lo que quieras decirme..."
  );

  const sugerencias = [
    "Hazme una Pregunta.",
    "¿quieres reír? ¡Pídeme un chiste!",
    "Pídeme hacer un Resumen.",
    "Copia Aquí tu error de programación.",
    "¿No sabes que película ver? ¡Pídeme Sugerencias!",
    "¿Estas a dieta? Pídeme consejos",
    "Pideme una receta de cocina",
    "  ¿Te digo que puedes hacer con tus ingredientes que tienes a la mano?",
  ];

  useEffect(() => {
    ejecutarCada5Segundos();
  }, []);

  async function ejecutarCada5Segundos() {
    if (message == "") {
      setInterval(() => {
        const randomNumber = Math.floor(Math.random() * sugerencias.length);
        setSugerenciaMostrar(sugerencias[randomNumber]);
      }, 8000);
    }
  }

  async function TurboOpenIA() {
    //Mandar mi pregunta al chat
    const nuevaPregunta = {
      key: uuidv4(),
      content: message,
      tipoMensaje: "pregunta",
      role: "user",
    };
    setMensajes([...mensajes, nuevaPregunta]);
    setLoading(true);

    let allMessages = [];

    mensajes.map((mensaje) => {
      let obj = { role: mensaje.role, content: mensaje.content };
      allMessages.push(obj);
    });
    //Ingresamos la pregunta actual
    let obj = { role: nuevaPregunta.role, content: nuevaPregunta.content };
    allMessages.push(obj);

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: allMessages,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        //console.log("Respuesta:", data);data.choices[0].message.content;
        const respuesta = {
          key: uuidv4(),
          content: data.choices[0].message.content,
          urlAvatar: famosoSel.urlAvatar,
          tipoMensaje: "respuesta",
          role: "system",
        };
        let arreglo = mensajes;
        arreglo.push(nuevaPregunta);
        arreglo.push(respuesta);
        setMensajes(arreglo);
        setLoading(false);
      });
  }

  async function OpenIA() {
    //Mandar mi pregunta al chat
    const nuevaPregunta = {
      key: uuidv4(),
      content: message,
      tipoMensaje: "pregunta",
      role: "user",
    };
    setMensajes([...mensajes, nuevaPregunta]);
    setLoading(true);

    const APIBody = {
      model: tipoModelo,
      prompt:
        "Quiero que me respondas a mi pregunta o comentario como si tú fueras" +
        famosoSel.nombre +
        ":" +
        message,
      temperature: nivelRespuesta,
      max_tokens: 300,
      top_p: nivelRespuesta,
      //+Variabilidad -Certeza
      frequency_penalty: 0.9,
      //+Originalidad -Enfoque
      presence_penalty: 0.5,
    };

    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        const respuesta = {
          key: uuidv4(),
          content: data.choices[0].text.trim(),
          urlAvatar: famosoSel.urlAvatar,
          tipoMensaje: "respuesta",
          role: "system",
        };
        let arreglo = mensajes;
        arreglo.push(nuevaPregunta);
        arreglo.push(respuesta);
        setMensajes(arreglo);
        setLoading(false);
      });
  }

  //---------- H A N D L E S -----------//
  const handleOpenConfig = () => {
    setConfigOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      OpenIA();
    }
  };
  const handleCloseConfig = () => {
    setConfigOpen(false);
  };
  const handleChangeSlider = (event, value) => {
    let nivel = value / 10;
    setNivelRespuesta(nivel);
  };
  async function handleChangeTypeResp() {
    if (tipoResp == "Respuesta Detallada") {
      setTipoRes("Respuesta Rápida");
      setTipoModelo("text-davinci-002");
    } else {
      setTipoRes("Respuesta Detallada");
      setTipoModelo("text-davinci-003");
    }
  }

  const handleBorrar = () => {
    setMessage("");
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          padding: 2,
          width: "95%",
          height: "80%",
          border: 2, // Grosor del borde en píxeles
          BorderColor: "white", // Color del borde
          borderRadius: 5,
          mr: 0,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {mensajes.length == 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <Stack sx={{ alignItems: "center" }}>
              <h1>¿Con quien quieres Chatear?</h1>

              <h3>Who do you want to chat with? </h3>
            </Stack>
          </Box>
        )}

        {mensajes.map((content) => {
          if (content.tipoMensaje == "pregunta")
            return <Pregunta content={content} />;
          else return <Mensaje content={content} />;
        })}
      </Box>
      <TextField
        onKeyDown={handleKeyDown}
        disabled={loading}
        sx={{ width: "90%", mx: 0, mt: 1, ml: 5 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={sugerenciaMostrar}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton edge="start" onClick={handleBorrar}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                TransitionComponent={Zoom}
                open={configOpen}
                onClose={handleCloseConfig}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                PopperProps={{
                  disablePortal: true,
                }}
                interactive
                title={
                  <Box sx={{ p: 2, minWidth: "200px" }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        edge="end"
                        onClick={handleCloseConfig}
                        sx={{ p: 0 }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <Tooltip
                      title="A mayor nivel más diversidad y Creatividad, a menor nivel Mas coherencia y Certividad"
                      sx={{ fontSize: "20px" }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ marginBottom: "10px", ml: 2, mb: -0.6 }}
                      >
                        Nivel de Respuesta
                      </Typography>
                    </Tooltip>
                    <Box width={200}>
                      <Slider
                        defaultValue={5}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        min={1}
                        max={10}
                        onChange={handleChangeSlider}
                      />
                    </Box>
                    <FormControlLabel
                      control={<Switch onChange={handleChangeTypeResp} />}
                      label={tipoResp}
                    />
                  </Box>
                }
                arrow
              >
                <Tooltip title="IA Settings">
                  <IconButton edge="end" onClick={handleOpenConfig}>
                    <SettingsIcon style={{ fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
              </Tooltip>
              {/*  */}
              <IconButton
                edge="end"
                onClick={TurboOpenIA}
                disabled={loading || message == ""}
                sx={{ ml: 1, mr: 0.5 }}
              >
                {loading ? (
                  <CircularProgress size={25} />
                ) : (
                  <SendIcon style={{ fontSize: 30 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default Principal;
