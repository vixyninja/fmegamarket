#!/usr/bin/env bash

# This script is used to run the application

if [ "$ENV" == "production" ]; then
    echo "Running production server"
    echo "Copy resources from configs/prod/res to android/app/src/main/res"
    yes | cp -rf "configs/prod/res" android/app/src/main
    echo "Copy google-services.json from configs/prod/google-services.json to android/app/google-services.json"
    yes | cp -rf "configs/prod/google-services.json" android/app
    echo "Set up resources for production successfully"    
elif [ "$ENV" == "development" ]; then
    echo "Running development server"
    echo "Copy resources from configs/dev/res to android/app/src/main/res"
    yes | cp -rf "configs/dev/res" android/app/src/main
    echo "Copy google-services.json from configs/dev/google-services.json to android/app/google-services.json"
    yes | cp -rf "configs/dev/google-services.json" android/app
    echo "Set up resources for development successfully"
else
    echo "Environment variable ENV is not set"
fi