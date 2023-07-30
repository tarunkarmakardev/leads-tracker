#!/bin/bash
echo "Strting Docker Compose"
sudo aws s3 cp s3://personal-ec2-deployment-envs-s3/backend/.env /app/backend/
sudo aws s3 cp s3://personal-ec2-deployment-envs-s3/client/.env /app/client/