import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  Slider,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
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
  const [tipoResp, setTipoRes] = useState("Respuesta Rápida");
  const [tipoModelo, setTipoModelo] = useState("text-davinci-002");
  const [configOpen, setConfigOpen] = React.useState(false);

  const [mensajesFavoritos, setMensajesFavoritos] = useState([]);

  const sugerencias = [
    "Hazme una Pregunta.",
    "¿quieres reír? ¡Pídeme un chiste!",
    "Pídeme hacer un Resumen.",
    "Copia Aquí tu error de programación.",
    "¿No sabes que película ver? ¡Pídeme Sugerencias!",
    "¿Estas a dieta? Pídeme consejos",
    "Pideme una receta de cocina",
    " ¿Te digo que puedes hacer con tus ingredientes que tienes a la mano?",
  ];

  const [sugerenciaMostrar, setSugerenciaMostrar] = useState("");

  useEffect(() => {
    ejecutarCada5Segundos();
  }, []);

  async function ejecutarCada5Segundos() {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * sugerencias.length);
      setSugerenciaMostrar(sugerencias[randomNumber]);
    }, 4000);
  }
  async function handleChangeTypeResp() {
    if (tipoResp == "Respuesta Detallada") {
      setTipoRes("Respuesta Rápida");
      setTipoModelo("text-davinci-002");
    } else {
      setTipoRes("Respuesta Detallada");
      setTipoModelo("text-davinci-003");
    }
  }

  const handleCloseConfig = () => {
    setConfigOpen(false);
  };
  const handleSend = () => {
    console.log("Valor del input:", tipoResp);
  };

  async function callOpenAIAPI() {
    console.log("mensajes:", mensajes);
    //Mandar mi pregunta al chat
    const nuevaPregunta = {
      key: uuidv4(),
      mensaje: message,
      tipoMensaje: "pregunta",
    };
    setMensajes([...mensajes, nuevaPregunta]);

    // setResponse("Se está Procesando tu pregunta, espera unos segundos más...");
    setLoading(true);

    const APIBody = {
      model: tipoModelo,
      prompt:
        "Quiero que me respondas a mi pregunta o comentario como si tú fueras" +
        famosoSel.nombre +
        ":" +
        message,
      temperature: 0,
      max_tokens: 300,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
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
          mensaje: data.choices[0].text.trim(),
          urlAvatar: famosoSel.urlAvatar,
          tipoMensaje: "respuesta",
        };
        let arreglo = mensajes;
        arreglo.push(nuevaPregunta);
        arreglo.push(respuesta);
        setMensajes(arreglo);
        setLoading(false);
      });
  }
  const handleOpenConfig = () => {
    setConfigOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box sx={{ width: "90%", height: "100%", mr: 10 }}>
      <Box
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          padding: 2,
          width: "100%",
          height: "80%",
          border: 2,
          borderColor: "white",
          borderRadius: 5,
          mr: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {mensajes.length === 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <h2>¡Chatea Con tus Famosos Favoritos!</h2>
          </Box>
        )}

        {mensajes.map((mensaje) => {
          if (mensaje.tipoMensaje === "pregunta") {
            return <Pregunta mensaje={mensaje} />;
          } else {
            return <Mensaje mensaje={mensaje} />;
          }
        })}
      </Box>

      <TextField
        disabled={loading}
        sx={{ width: "100%", mx: 0, mt: 1, ml: 2.5 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={sugerenciaMostrar}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
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
                    <Typography
                      variant="subtitle1"
                      sx={{ marginBottom: "10px" }}
                    >
                      Configurar parámetros
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                      Volumen
                    </Typography>
                    <Box width={200}>
                      <Slider
                        defaultValue={10}
                        aria-label="Default"
                        valueLabelDisplay="auto"
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
                <IconButton edge="end" onClick={handleOpenConfig}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <IconButton edge="end" onClick={handleSend} disabled={loading}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
}

export default Principal;
