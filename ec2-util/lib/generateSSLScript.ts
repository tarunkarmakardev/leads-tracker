type GenerateSSLScriptOptions = {
  domain: string;
  email: string;
};

export default function generateSSLScript({
  domain,
  email,
}: GenerateSSLScriptOptions) {
  const template = `#!/bin/bash
echo "Enable Certbot"
sudo apt install snapd -y
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot certonly --manual \
--preferred-challenges=dns \
--server https://acme-v02.api.letsencrypt.org/directory \
--agree-tos \
--email ${email} \
--no-eff-email
-d *.${domain}`;
  return template;
}
