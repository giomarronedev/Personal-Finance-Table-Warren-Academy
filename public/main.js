function formatarValor(valor) {
  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

function adicionarDespesa() {
  const descricaoDespesa = window.prompt("Qual a descricao de sua despesa?");
  const valorDespesa = window.prompt("Qual o valor de sua despesa?");

  if (valorDespesa.indexOf(",") > 0) {
    alert(
      "Você deve digitar números com o símbolo decimal ponto, e não vírgula"
    );
    return;
  }

  if (isNaN(valorDespesa)) {
    alert("Você deve digitar um número no campo valor!");
    return;
  }

  const valor = Number(valorDespesa);

  const despesa = {
    descricao: descricaoDespesa,
    valor: valor,
    categoria: "Despesa",
  };

  enviaDados(despesa);
  getTransacoes();
}

function adicionarReceita() {
  const descricaoReceita = window.prompt("Qual a descricao de sua receita?");
  const valorReceita = window.prompt("Qual o valor de sua receita?");

  if (valorReceita.indexOf(",") > 0) {
    alert(
      "Você deve digitar números com o símbolo decimal ponto, e não vírgula"
    );
    return;
  }

  if (isNaN(valorReceita)) {
    alert("Você deve digitar um número no campo valor!");
    return;
  }

  const valor = Number(valorReceita);

  const receita = {
    descricao: descricaoReceita,
    valor: valor,
    categoria: "Receita",
  };

  enviaDados(receita);
  getTransacoes();
}

async function removeDados() {

  const url = "/transacoes";

  const requisicao = {
    method: "DELETE"
  };

  await fetch(url, requisicao)

  getTransacoes()
}


function setSaldo(saldo) {
  document.getElementById("saldo").innerHTML = `Saldo: ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(saldo)}`;
}

function adicionaTransacoes(transacoes) {
  let tabela = "";

  transacoes.reverse().forEach((transacao) => {
    let colunaDescricao = `<td class="coluna-descricao">${transacao.descricao}</td>`;
    let colunaCategoria = ` <td class="coluna-categoria">${transacao.categoria}</td>`;
    let colunaValor = `<td class="coluna-valor">${Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(transacao.valor)}</td>`;
    let linha = `<tr>${colunaDescricao}${colunaCategoria}${colunaValor}</tr>`;
    tabela += linha;
  });
  document.getElementById("lista-transacoes-conteudo").innerHTML = tabela;
}


// Aqui estamos criando os eventos de clique nos botões
document
  .getElementById("botao-despesa")
  .addEventListener("click", adicionarDespesa);
document
  .getElementById("botao-receita")
  .addEventListener("click", adicionarReceita);
document
  .getElementById("botao-limpar")
  .addEventListener("click", removeDados);

async function getTransacoes() {
  const url = "/transacoes";

  const resposta = await fetch(url);
  const financas = await resposta.json();

  setSaldo(financas.saldo);
  adicionaTransacoes(financas.transacoes);
  console.log(financas);
}

async function enviaDados(transacao) {
  const url = "/transacoes";

  const requisicao = {
    method: "POST",
    body: JSON.stringify(transacao),
    headers: {
      "content-type": "application/json",
    },
  };
  await fetch(url, requisicao);
  
}

getTransacoes();
