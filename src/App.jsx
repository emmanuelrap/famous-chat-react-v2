import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const API_KEY = "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"; // secure -> environment variable

function App() {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState(""); // "Negative" or "Positive"

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");

    // For 0-10
    // What is the sentiment of this tweet with a value between 0 and 10 (10 being its very positive)? 

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": "What is the sentiment of this tweet? " + tweet,
      "temperature": 0,
      "max_tokens": 60,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    }

    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setSentiment(data.choices[0].text.trim()); // Positive or negative
    });
  }

  console.log(tweet);
  return (
    <div className="App">
      <div>
        <textarea
          onChange={(e) => setTweet(e.target.value)}
          placeholder='Paste your tweet here!'
          cols={50}
          rows={10}
        />
      </div>
      <div>
        <button onClick={callOpenAIAPI}>Get The Tweet Sentiment From OpenAI API</button>
        {sentiment !== "" ?
          <h3>This Tweet Is: {sentiment}</h3>  
          :
          null
        }
      </div>
    </div>
  )
}

export default App
