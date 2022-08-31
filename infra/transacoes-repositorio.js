const transacoes = {
    transacoes: []
  }

class TransacoesRepositorio {

    listarTransacoes() {
        return transacoes
    }

    criarTransacao(transacao) {
      console.log(transacao)
        const lista = transacoes.transacoes
        lista.push(transacao)
    }

    limparTabela() {
        const lista = transacoes.transacoes = []
        return lista
    }
}

module.exports = TransacoesRepositorio