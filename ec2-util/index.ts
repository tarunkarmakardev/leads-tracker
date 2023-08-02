import { createFileHandler } from "./lib/files";
import config from "./config.json";
import secrets from "./secrets.json";
import generateEc2InitScript from "./lib/generateEc2InitScript";
import generateNginxConfig from "./lib/generateNginxConfig";
import generateSSLScript from "./lib/generateSSLScript";

/* 
  Required secrets file example:
  {
  "domain": " ",
  "email": " ",
  "mainServerPort": 0
  }

*/

const app = async () => {
  const nginxConf = generateNginxConfig({
    domain: secrets.domain,
    mainServerPort: secrets.mainServerPort,
  });
  const ec2Script = generateEc2InitScript({
    swapFileSize: "5G",
  });
  const sslScript = generateSSLScript({
    domain: secrets.domain,
    email: secrets.email,
  });
  const fileHandler = await createFileHandler(__dirname);
  await fileHandler.write(config.filePaths.nginxConf, nginxConf);
  await fileHandler.write(config.filePaths.ec2Script, ec2Script);
  await fileHandler.write(config.filePaths.sslScript, sslScript);
};

app();
