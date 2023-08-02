type GenerateNginxConfigOptions = {
  domain: string;
  mainServerPort: number;
};

export default function generateNginxConfig({
  domain,
  mainServerPort,
}: GenerateNginxConfigOptions) {
  const template = `resolver 8.8.8.8;
server {
    server_name *.${domain};
    listen 80;
    listen [::]:80;
    location / {
        proxy_pass http://$host:${mainServerPort}$request_uri;
    }
}
server {
    server_name *.${domain};
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    location / {
        proxy_pass http://$host:${mainServerPort}$request_uri;
    }
}`;
  return template;
}
