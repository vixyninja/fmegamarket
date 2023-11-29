#!/usr/bin/env bash


COLOR_RED='\e[0;31m' # Red
COLOR_PURPLE='\e[1;35m' # Yellow
COLOR_BLUE='\e[0;34m' # Blue
COLOR_NC='\e[0m'    # Text Reset


# This script is used to run the application
if [ "$ENV" == "production" ]; then
    printf "${COLOR_BLUE}Running production server${COLOR_NC}\n"
    printf "${COLOR_BLUE}Copy resources from configs/prod/res to android/app/src/main/res${COLOR_NC}\n"
    yes | cp -rf "configs/prod/res" android/app/src/main
    printf "${COLOR_BLUE}Copy google-services.json from configs/prod/google-services.json to android/app/google-services.json${COLOR_NC}\n"
    yes | cp -rf "configs/prod/google-services.json" android/app
    printf "${COLOR_BLUE}Set up resources for production successfully${COLOR_NC}\n"
elif [ "$ENV" == "development" ]; then
    printf "${COLOR_PURPLE}Running development server${COLOR_NC}\n"
    printf "${COLOR_PURPLE}Copy resources from configs/dev/res to android/app/src/main/res${COLOR_NC}\n"
    yes | cp -rf "configs/dev/res" android/app/src/main
    printf "${COLOR_PURPLE}Copy google-services.json from configs/dev/google-services.json to android/app/google-services.json${COLOR_NC}\n"
    yes | cp -rf "configs/dev/google-services.json" android/app
    printf "${COLOR_PURPLE}Set up resources for development successfully${COLOR_NC}\n"
else
    printf "${COLOR_RED}Please set ENV to production or development${COLOR_NC}\n"
    exit 1
fi