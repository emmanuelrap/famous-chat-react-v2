import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  CircularProgress,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
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

  const [mensajesFavoritos, setMensajesFavoritos] = useState([]);

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

  const [sugerenciaMostrar, setSugerenciaMostrar] = useState("");

  useEffect(() => {
    ejecutarCada5Segundos();
  }, []);

  async function ejecutarCada5Segundos() {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * sugerencias.length);
      setSugerenciaMostrar(sugerencias[randomNumber]);
    }, 5000);
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
        "Quiero que me contestes como si tú fueras" +
        famosoSel.nombre +
        "Esta es mi pregunta:" +
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

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          padding: 2,
          width: "100%",
          height: "80%",
          border: 2, // Grosor del borde en píxeles
          BorderColor: "white", // Color del borde
          borderRadius: 5,
          m: 0,

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
            <h2>¡ Chatea Con tus Famosos Favoritos ! </h2>
          </Box>
        )}

        {mensajes.map((mensaje) => {
          if (mensaje.tipoMensaje == "pregunta")
            return <Pregunta mensaje={mensaje} />;
          else return <Mensaje mensaje={mensaje} />;
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
              <FormControlLabel
                control={<Switch onChange={handleChangeTypeResp} />}
                label={<StyledLabel>{tipoResp}</StyledLabel>}
              />
              <IconButton
                edge="end"
                onClick={callOpenAIAPI}
                disabled={loading}
                sx={{ mr: 2 }}
              >
                {loading ? <CircularProgress size={25} /> : <SendIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default Principal;
