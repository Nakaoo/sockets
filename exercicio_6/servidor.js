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
      const total = parseFloat(dados.toString());
      const totalComGorjeta = this.calcularGorjeta(total);
      socket.write(totalComGorjeta.toString());
    });

    socket.on('end', () => {
      console.log('Cliente desconectado.');
    });
  }

  calcularGorjeta(valor) {
    return valor + (valor * 0.10); // Adiciona uma gorjeta de 10%
  }
}

// Uso
const porta = 1234;
const servidorTCP = new ServidorTCP(porta);
servidorTCP.iniciar();
