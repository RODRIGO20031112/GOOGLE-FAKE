import React, { useState } from "react";
import parse from "html-react-parser";
import axios from "axios";
import "./App.css"; // Importe seu arquivo de estilo

const tiposDeFrequencia = [
  { label: "Diário", value: "d" },
  { label: "Semanal", value: "s" },
  { label: "Mensal", value: "m" },
  { label: "Anual", value: "a" },
];

const App = () => {
  const [localidade, setLocalidade] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [palavrasChave, setPalavrasChave] = useState("");
  const [htmlString, setHtmlString] = useState("");

  const simularPesquisa = async () => {
    try {
      // Mapear o valor selecionado para a correspondente abreviação
      const frequenciaAbreviada = tiposDeFrequencia.find(
        (tipo) => tipo.label === frequencia
      )?.value;

      // Enviar parâmetros para o backend
      const response = await axios.post("http://localhost:8080/pesquisa", {
        localidade,
        frequencia: frequenciaAbreviada,
        palavrasChave: palavrasChave.split(","),
      });

      console.log("Resultados da pesquisa:", response.data[0]);
      setHtmlString(
        `${response.data[0]}` +
          " <style>body {margin: 0; max-width: auto; min-width: auto;} header {display: none;}</style>"
      );
    } catch (error) {
      console.error("Erro ao simular pesquisa:", error);
      alert("Preencha os campos...");
    }
  };

  return (
    <div className="container">
      <h1>Simulador de Pesquisa</h1>
      <label>
        Localidade (Digite o nome ou a abreviação do país. ex: BR):
        <input
          type="text"
          value={localidade}
          onChange={(e) => setLocalidade(e.target.value)}
        />
      </label>
      <label>
        Palavras-chave:
        <input
          type="text"
          value={palavrasChave}
          onChange={(e) => setPalavrasChave(e.target.value)}
        />
      </label>
      <label>
        Frequência:
        <select
          value={frequencia}
          onChange={(e) => setFrequencia(e.target.value)}
          style={{ background: "#fefefe" }}
        >
          <option value="" className="selecione-option">
            Selecione a Frequência
          </option>
          {tiposDeFrequencia.map((tipo) => (
            <option key={tipo.value} value={tipo.label}>
              {tipo.label}
            </option>
          ))}
        </select>
      </label>
      <button onClick={simularPesquisa}>Simular Pesquisa</button>
      <div className="result">{parse(htmlString)}</div>
    </div>
  );
};

export default App;
