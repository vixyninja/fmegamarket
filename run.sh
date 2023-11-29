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

txtblk='\e[0;30m' # Black - Regular
txtred='\e[0;31m' # Red
txtgrn='\e[0;32m' # Green
txtylw='\e[0;33m' # Yellow
txtblu='\e[0;34m' # Blue
txtpur='\e[0;35m' # Purple
txtcyn='\e[0;36m' # Cyan
txtwht='\e[0;37m' # White
bldblk='\e[1;30m' # Black - Bold
bldred='\e[1;31m' # Red
bldgrn='\e[1;32m' # Green
bldylw='\e[1;33m' # Yellow
bldblu='\e[1;34m' # Blue
bldpur='\e[1;35m' # Purple
bldcyn='\e[1;36m' # Cyan
bldwht='\e[1;37m' # White
unkblk='\e[4;30m' # Black - Underline
undred='\e[4;31m' # Red
undgrn='\e[4;32m' # Green
undylw='\e[4;33m' # Yellow
undblu='\e[4;34m' # Blue
undpur='\e[4;35m' # Purple
undcyn='\e[4;36m' # Cyan
undwht='\e[4;37m' # White
bakblk='\e[40m'   # Black - Background
bakred='\e[41m'   # Red
bakgrn='\e[42m'   # Green
bakylw='\e[43m'   # Yellow
bakblu='\e[44m'   # Blue
bakpur='\e[45m'   # Purple
bakcyn='\e[46m'   # Cyan
bakwht='\e[47m'   # White
txtrst='\e[0m'    # Text Reset

function colorgrid( )
{
    iter=16
    while [ $iter -lt 52 ]
    do
        second=$[$iter+36]
        third=$[$second+36]
        four=$[$third+36]
        five=$[$four+36]
        six=$[$five+36]
        seven=$[$six+36]
        if [ $seven -gt 250 ];then seven=$[$seven-251]; fi

        echo -en "\033[38;5;$(echo $iter)m█ "
        printf "%03d" $iter
        echo -en "   \033[38;5;$(echo $second)m█ "
        printf "%03d" $second
        echo -en "   \033[38;5;$(echo $third)m█ "
        printf "%03d" $third
        echo -en "   \033[38;5;$(echo $four)m█ "
        printf "%03d" $four
        echo -en "   \033[38;5;$(echo $five)m█ "
        printf "%03d" $five
        echo -en "   \033[38;5;$(echo $six)m█ "
        printf "%03d" $six
        echo -en "   \033[38;5;$(echo $seven)m█ "
        printf "%03d" $seven

        iter=$[$iter+1]
        printf '\r\n'
    done
}