#!/bin/bash
echo "Updating system"
sudo apt-get update

echo "Installing codedeploy-agent"
sudo apt-get install ruby
sudo apt-get install wget
mkdir /tmp/codedeploy-agent
cd /tmp/codedeploy-agent
wget https://aws-codedeploy-ap-south-1.s3.ap-south-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent start
