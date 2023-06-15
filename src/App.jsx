import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, TextField } from "@mui/material";
import Mensaje from "./components/Mensaje";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensajesGuardados, setMensajesGuardados] = useState([]);
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
    setSugerenciaMostrar(sugerencias[0]);
    if (localStorage.getItem("mensajesGuardados") !== null) {
      setMensajesGuardados(
        JSON.parse(localStorage.getItem("mensajesGuardados"))
      );
    } else {
      setMensajesGuardados([]);
    }

    if (localStorage.getItem("mensajesFavoritos") !== null) {
      setMensajesFavoritos([]);
    }

    ejecutarCada5Segundos();
  }, []);

  function ejecutarCada5Segundos() {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * sugerencias.length);
      setSugerenciaMostrar(sugerencias[randomNumber]);
    }, 5000);
  }

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");
    setResponse("Se está Procesando tu pregunta, espera unos segundos más...");
    setLoading(true);

    const APIBody = {
      model: "text-davinci-003",
      prompt: message,
      temperature: 0,
      max_tokens: 100,
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
        const nuevoMensaje = {
          key: uuidv4(),
          mensaje: data.choices[0].text.trim(),
        };
        setMensajesGuardados([...mensajesGuardados, nuevoMensaje]);
        setLoading(false);
      });
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ width: "100%", height: "80%" }}>
        {mensajesGuardados.map((mensaje) => (
          <Mensaje key={mensaje.key} mensaje={mensaje.mensaje} />
        ))}
      </Box>
      <TextField
        sx={{ width: "100%", mx: 0 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={sugerenciaMostrar}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={callOpenAIAPI}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default App;
