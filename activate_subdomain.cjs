const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  'sed -i "s/server_name proyectoxg2.site www.proyectoxg2.site;/server_name proyectoxg2.site www.proyectoxg2.site tienda1.proyectoxg2.site;/g" /root/thalix-web/default.conf',
  'sed -i "s/VIRTUAL_HOST: proyectoxg2.site,www.proyectoxg2.site/VIRTUAL_HOST: proyectoxg2.site,www.proyectoxg2.site,tienda1.proyectoxg2.site/g" /root/thalix-web/docker-compose.yml',
  'sed -i "s/LETSENCRYPT_HOST: proyectoxg2.site,www.proyectoxg2.site/LETSENCRYPT_HOST: proyectoxg2.site,www.proyectoxg2.site,tienda1.proyectoxg2.site/g" /root/thalix-web/docker-compose.yml',
  'cat /root/thalix-web/docker-compose.yml',
  'cd /root/thalix-web && docker compose up -d',
  'sleep 5',
  'docker exec nginx-proxy-companion /app/force_renew 2>/dev/null || true',
  'sleep 5',
  'echo "--- CURL TEST TIENDA1 HTTP ---"',
  'curl -sI http://127.0.0.1 -H "Host: tienda1.proyectoxg2.site" | head -n 10',
  'echo "--- CURL TEST TIENDA1 HTTPS ---"',
  'curl -sI -k https://127.0.0.1 -H "Host: tienda1.proyectoxg2.site" | head -n 10'
].join('\n');

conn.on('ready', () => {
  conn.exec(commands, (err, stream) => {
    if (err) throw err;
    let output = '';
    stream.on('close', () => {
      console.log('\n=== TIENDA1 SUBDOMAIN DEPLOYED ===');
      console.log(output);
      conn.end();
    }).on('data', (d) => output += d).stderr.on('data', (d) => output += 'STDERR: ' + d);
  });
}).connect({
  host: '169.58.242.97',
  port: 22,
  username: 'root',
  password: 'rootsteven',
  readyTimeout: 20000
});
