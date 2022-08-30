const {Pool} = require('pg')
const pool = new Pool()

class SqlTransacoesRepositorio {

    listarTransacoes() {
        pool.query
        return transacoes
    }

    criarTransacao(transacao) {
      console.log(transacao)
        const lista = transacoes.transacoes
        lista.push(transacao)
    }
}

module.exports = SqlTransacoesRepositorio