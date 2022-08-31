/*
    * * * * * * * *
   DESAFIO PLANILHA DE GASTOS:

    Nesse exercício vamos integrar com dados da API ao invés de trabalhar
    com um objeto local.
    
    1. Primeiramente é necessário criar uma função que chama um GET na seguinte
    API: https://run.mocky.io/v3/ba2007f7-04ea-465b-985e-b16c11e8061d
    
    O resultado será usado para preencher o saldo e transacoes na tela.
    Use as funções criadas no exercício anterior para preencher os dados na tela,
    a única diferença é que agora a fonte dos dados é uma API e não o objeto
    local.
    
    2. Nas funções de clique da receita e despesa, não precisaremos mais atribuir
    valores ao objeto local. Agora precisaremos integrar com uma API para enviar 
    os dados digitados pelo usuário. Então integre com a seguinte API: 
    https://run.mocky.io/v3/c50981e7-1c9b-471c-9128-3adf362cf36f
    Envie nessa API um POST com os dados digitados pelo usuário em um objeto
    no formato: { descricao: '', valor: 0 }
    Toda a validação de número continua valendo.
    
    3. Depois de enviar os dados digitados pelo cliente para a API é necessário
    buscar novamente os dados para exibir na tela. Deve-se chamar a função de
    busca de dados ao final da função de clique dos botões de despesa e receita.
    
    * * * * * * * *
*/
/*
const financas = {
  saldo: 10,
  transacoes: [
    {
      descricao: 'Salgado na faculdade',
      categoria: 'Despesa',
      valor: 5.5
    },
    {
      descricao: 'Livro Clean Code',
      categoria: 'Despesa',
      valor: 50
    },
    {
      descricao: 'Grana do estágio',
      categoria: 'Receita',
      valor: 80
    },
    {
      descricao: 'Capinha pro celular',
      categoria: 'Despesa',
      valor: 15
    },
  ]
};
*/
/*
    !!BÔNUS!!
    Essa função recebe como parâmetro um número e o retorna formatado
    como moeda, assim a informação fica mais legível na tela ;)
*/
function formatarValor(valor) {
  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

/*function exibirFinancas() {
  console.log('Saldo: ', formatarValor(financas.saldo));
  financas.transacoes.forEach((transacao, i) => {
    console.log('');
    
    console.log('Transacao ', i + 1, ':');
    console.log('[', transacao.categoria, ']', transacao.descricao);
    console.log(formatarValor(transacao.valor));
  });
}*/

// exibirFinancas();

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

  // financas.transacoes.push(despesa);
  // financas.saldo = financas.saldo - valor;

  // setSaldo();
  // adicionaTransacoes();
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

  // financas.transacoes.push(receita);
  // financas.saldo = financas.saldo + valor;
  // setSaldo();
  // adicionaTransacoes();
  enviaDados(receita);
  getTransacoes();
}

// adicionarDespesa();
// adicionarReceita();

// exibirFinancas();

function setSaldo(saldo) {
  document.getElementById("saldo").innerHTML = `Saldo: R$ ${saldo}`;
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
