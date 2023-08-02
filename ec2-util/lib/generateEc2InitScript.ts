type ScriptOptions = {
  swapFileSize: string;
};

export default function generateEc2InitScript({ swapFileSize }: ScriptOptions) {
  return `#!/bin/bash
  echo "Updating system"
  sudo apt-get update -y
  
  echo "Installing codedeploy-agent"
  sudo apt-get install ruby -y
  sudo apt-get install wget -y
  mkdir /tmp/codedeploy-agent
  cd /tmp/codedeploy-agent
  wget https://aws-codedeploy-ap-south-1.s3.ap-south-1.amazonaws.com/latest/install
  sudo chmod +x ./install
  sudo ./install auto
  sudo service codedeploy-agent start
  
  echo "Adding Swap file"
  sudo fallocate -l ${swapFileSize} /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  
  echo "Installing nginx"
  sudo apt-get install nginx -y 
  sudo cp ./nginx.conf /etc/nginx/conf.d/default.conf
  sudo systemctl nginx restart`;
}
