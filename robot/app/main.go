package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func handlePesquisa(w http.ResponseWriter, r *http.Request) {
	// Obtenha os parâmetros da consulta
	palavraChave := r.URL.Query().Get("palavraChave")
	localidade := r.URL.Query().Get("localidade")
	frequencia := r.URL.Query().Get("frequencia")

	// Verifique se a palavra-chave foi fornecida
	if palavraChave == "" {
		http.Error(w, "Parâmetro 'palavraChave' ausente na consulta", http.StatusBadRequest)
		return
	}

	// Simular pesquisa no Google com os parâmetros adicionais
	resultados := simularPesquisaGoogle(palavraChave, localidade, frequencia)

	// Responder com os resultados simulados
	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultados))
}

func simularPesquisaGoogle(palavraChave, localidade, frequencia string) string {
	// Construa a URL de pesquisa do Google com os parâmetros adicionais
	url := fmt.Sprintf("https://www.google.com/search?q=%s&gl=%s&tbs=qdr:%s", palavraChave, localidade, frequencia)

	// Faça uma solicitação HTTP GET simulada
	resposta, err := http.Get(url)
	if err != nil {
		return fmt.Sprintf("Erro ao fazer a solicitação HTTP: %v", err)
	}
	defer resposta.Body.Close()

	// Leia o corpo da resposta
	corpo, err := ioutil.ReadAll(resposta.Body)
	if err != nil {
		return fmt.Sprintf("Erro ao ler o corpo da resposta: %v", err)
	}

	return string(corpo)
}

func main() {
	// Configurar um manipulador para a rota /pesquisa
	http.HandleFunc("/pesquisa", handlePesquisa)

	// Iniciar o servidor na porta 5050
	porta := ":5050"
	fmt.Printf("Servidor rodando em http://localhost%s\n", porta)
	http.ListenAndServe(porta, nil)
}
