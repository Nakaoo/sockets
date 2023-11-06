const net = require('net');

class ServidorTCP {
  constructor(porta) {
    this.porta = porta;
    this.servidor = net.createServer(this.tratarConexao.bind(this));
  }

  iniciar() {
    this.servidor.listen(this.porta, () => {
      console.log(`Servidor ouvindo na porta ${this.porta}`);
    });
  }

  tratarConexao(socket) {
    console.log('Cliente conectado.');

    socket.on('data', (dados) => {
      const valorProduto = parseFloat(dados.toString());
      const novoValorVenda = this.calcularNovoValor(valorProduto);
      socket.write(novoValorVenda.toString());
    });

    socket.on('end', () => {
      console.log('Cliente desconectado.');
    });
  }

  calcularNovoValor(valor) {
    return valor + (valor * 0.25); // Aumenta o valor em 25%
  }
}

// Uso
const porta = 1234;
const servidorTCP = new ServidorTCP(porta);
servidorTCP.iniciar();
