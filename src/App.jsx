import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, CircularProgress, TextField } from "@mui/material";
import Mensaje from "./components/Mensaje";
import Pregunta from "./components/Pregunta";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [message, setMessage] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensajesGuardados, setMensajesGuardados] = useState([]);

  const [mensajesFavoritos, setMensajesFavoritos] = useState([]);
  const [preguntasGuardadas, setPreguntasGuardadas] = useState([]);
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
    // if (localStorage.getItem("mensajesGuardados") !== null) {
    //   setMensajesGuardados(
    //     JSON.parse(localStorage.getItem("mensajesGuardados"))
    //   );
    // } else {
    //   setMensajesGuardados([]);
    // }

    // if (localStorage.getItem("mensajesFavoritos") !== null) {
    //   setMensajesFavoritos([]);
    // }

    ejecutarCada5Segundos();
  }, []);

  function ejecutarCada5Segundos() {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * sugerencias.length);
      setSugerenciaMostrar(sugerencias[randomNumber]);
    }, 5000);
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

    console.log("Calling the OpenAI API");
    setResponse("Se está Procesando tu pregunta, espera unos segundos más...");
    setLoading(true);

    const APIBody = {
      model: "text-davinci-003",
      prompt: message,
      temperature: 0,
      max_tokens: 200,
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
          urlAvatar: localStorage.getItem("urlAvatar"),
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
        {mensajes == 0 && (
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
        {mensajes.map((mensaje) => (
          <>
            {console.log(">>>> mensaje", mensaje)}
            {mensaje.tipoMensaje == "pregunta" ? (
              <Pregunta key={mensaje.key} pregunta={mensaje.mensaje} />
            ) : (
              <Mensaje
                key={mensaje.key}
                mensaje={mensaje.mensaje}
                urlAvatar={mensaje.urlAvatar}
              />
            )}
          </>
        ))}
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
              <IconButton edge="end" onClick={callOpenAIAPI} disabled={loading}>
                {loading ? <CircularProgress size={25} /> : <SendIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default App;
