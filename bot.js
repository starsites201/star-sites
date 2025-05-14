const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const readline = require('readline');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        auth: state
    });

    sock.ev.on('creds.update', saveCreds);

    let isConnected = false;

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
            console.log('Bot conectado ao WhatsApp!');
            isConnected = true;
        } else if (connection === 'close') {
            console.log('Conexão encerrada:', lastDisconnect?.error?.message);
        }
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', async (line) => {
        if (!isConnected) {
            console.log('Aguardando conexão com o WhatsApp...');
            return;
        }

        if (line === '/teste') {
            const jid = '5547996400867@s.whatsapp.net';
            await sock.sendMessage(jid, { text: 'Oi' });
            console.log('Mensagem enviada!');
        }
    });
}

startBot();  // Agora no final, depois de declarar as variáveis e funções.
	
