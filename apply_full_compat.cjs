const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  'cat << "EOF" > /root/proxy/custom_ssl.conf',
  'ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;',
  'ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA";',
  'ssl_prefer_server_ciphers on;',
  'EOF',
  'docker cp /root/proxy/custom_ssl.conf nginx-proxy:/etc/nginx/conf.d/custom_ssl.conf',
  'docker exec nginx-proxy nginx -t',
  'docker exec nginx-proxy nginx -s reload'
].join('\n');

conn.on('ready', () => {
  conn.exec(commands, (err, stream) => {
    if (err) throw err;
    let output = '';
    stream.on('close', () => {
      console.log('\n=== RESULT ===');
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
