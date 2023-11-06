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
      this.solicitarPesos();
    });

    this.cliente.on('data', dados => {
      console.log(`Percentual de peso a ser eliminado: ${dados}`);
      this.cliente.end(); // Fecha a conexão graciosamente
    });

    this.cliente.on('close', () => {
      console.log('Conexão encerrada.');
    });
  }

  solicitarPesos() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Digite o peso atual (kg): ', pesoAtual => {
      rl.question('Digite o peso desejado (kg): ', pesoDesejado => {
        this.cliente.write(`${pesoAtual},${pesoDesejado}`);
        rl.close();
      });
    });
  }
}

// Uso
const host = 'localhost';
const porta = 1234;
const clienteTCP = new ClienteTCP(host, porta);
clienteTCP.conectar();
