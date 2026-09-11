const IP = '192.168.68.168';
const PORT = '9001';

const topicoTemp = 'aulas/hagma/temperatura';
const topicoUmidade = 'aulas/hagma/umidade';
const topicoGas = 'aulas/hagma/qualidade_ar';

const clientID = 'WebDash_' + Math.random().toString(16).substr(2, 8);
const client = new Paho.MQTT.Client(IP, Number(PORT), clientID);

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({ onSuccess: onConnect, onFailure: onFailure });

function onConnect() {
    const statusDiv = document.getElementById('status');
    statusDiv.innerText = 'Conectado';
    statusDiv.classList.add('connected');

    client.subscribe(topicoTemp);
    client.subscribe(topicoUmidade);
    client.subscribe(topicoGas);
}

function onFailure(responseObject) {
    resetStatus('Desconectado');
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        resetStatus('Desconectado');
    }
}

function resetStatus(mensagem) {
    const statusDiv = document.getElementById('status');
    statusDiv.innerText = mensagem;
    statusDiv.classList.remove('connected');

    document.getElementById('temp').textContent = '--';
    document.getElementById('umi').textContent = '--';
    document.getElementById('gas').textContent = '--';
}

function onMessageArrived(message) {
    const topic = message.destinationName;
    const payload = message.payloadString;

    if (topic === topicoTemp) {
        document.getElementById('temp').textContent = payload;
    }
    if (topic === topicoUmidade) {
        document.getElementById('umi').textContent = payload;
    }
    if (topic === topicoGas) {
        document.getElementById('gas').textContent = payload;
    }
}
