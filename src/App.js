import './App.css';
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react"; 

function App() {
  
  const [texto, setTexto] = useState(""); 
  const [textoresumido, settextoresumido] = useState("");
  const [loading, setLoading] = useState(false); 

  const configuracion = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  }); 

  const openai = new OpenAIApi(configuracion);

  const HandleSubmit = (e) => {

    setLoading(true);
    e.preventDefault(); 
    openai.createCompletion({
      model: "text-davinci-003",
      prompt: generarInmediatamente(texto),
      temperature: 0.6, 
      max_tokens: 100,
    })
    .then((res) => {
      if(res.status === 200) {
        setLoading(false);
        settextoresumido(res?.data?.choices[0]?.text);
      }
    })
    .catch((err) => {
      console.log(err, "Ocurrio un Error !"); 
    });

  }; 

  function generarInmediatamente(texto) {
    return `Summarize this ${texto}. and break them into seperate lines`; 
  } 

  return (
    <div className='container'>
      <div className='row'>
      <div className='col-md-12'>
        <h1>
          Texto <span>Resumido</span>
        </h1>
        <h2>
          {" "}
          Resume tu texto y hazlo más corto.
        </h2>
      </div>
      </div>
      <div>
        <div>
          <form>
            <h3>Ingresa el Texto</h3>
            <textarea
              className='form-control'
              rows={14}
              cols={80}
              placeholder="Ingresa el texto a resumir"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </form>
        </div>
        <div>
          <button className='btn btn-primary mt-3 mb-3' type="button" onClick={HandleSubmit}>
            {loading ? "Cargando, espero por favor ..." : "Resumir"}
          </button>
        </div>
        <div>
          <h3>Texto Resumido</h3>
          <textarea
            className='form-control'
            placeholder="Texto Resumido"
            cols={80}
            rows={14}
            value={textoresumido}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
      </div>
    </div>
  );

}

export default App;
