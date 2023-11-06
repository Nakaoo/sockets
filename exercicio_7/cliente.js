const net = require('net');
const readline = require('readline');

class ClienteTCP {
  constructor(host, porta) {
    this.host = host;
    this.porta = porta;
    this.cliente = new net.Socket();
  }

  async conectar() {
    this.cliente.connect(this.porta, this.host, () => {
      console.log('Conectado ao servidor.');
      this.solicitarValorProduto();
    });

    this.cliente.on('data', dados => {
      console.log(`Novo valor de venda com aumento: ${dados}`);
      this.cliente.end();
    });

    this.cliente.on('close', () => {
      console.log('Conexão encerrada.');
    });
  }

  solicitarValorProduto() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Digite o valor do produto: ', resposta => {
      this.cliente.write(resposta);
      rl.close();
    });
  }
}

// Uso
const host = 'localhost';
const porta = 1234;
const clienteTCP = new ClienteTCP(host, porta);
clienteTCP.conectar();
