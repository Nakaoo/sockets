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
      const [pesoAtual, pesoDesejado] = dados.toString().split(',').map(Number);
      const percentualPerda = this.calcularPercentualPerda(pesoAtual, pesoDesejado);
      socket.write(`${percentualPerda.toFixed(2)}%`);
    });

    socket.on('end', () => {
      console.log('Cliente desconectado.');
    });
  }

  calcularPercentualPerda(pesoAtual, pesoDesejado) {
    if (pesoAtual <= pesoDesejado) {
      return 0; // Não é necessário perder peso
    }
    const diferenca = pesoAtual - pesoDesejado;
    return (diferenca / pesoAtual) * 100; // Calcula o percentual de perda de peso
  }
}

// Uso
const porta = 1234;
const servidorTCP = new ServidorTCP(porta);
servidorTCP.iniciar();
