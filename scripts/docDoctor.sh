#!/bin/bash

[ ! -d "node_modules" ] && echo -e "\e[92minstalling dependencies...\e[0m" && npm install markdown-spellcheck markdownlint-cli markdown-link-check write-good check-filename yaml-front-matter && npm install


echo -e "\e[92m💊  Beginning checkup...\e[0m"

echo -e "\e[92mLinting...\e[0m"
./node_modules/.bin/markdownlint content/developers/* -c scripts/doctorStuff/markdownlint-config.json

echo -e "\e[92mChecking links...\e[0m"
find content/developers -type f -name "*.md" -exec ./node_modules/.bin/markdown-link-check {} -c scripts/doctorStuff/markdownlinks-config.json -q \;

echo -e "\e[92mChecking Spelling...\e[0m"
find content/developers -type f -name "*.md" -exec ./node_modules/.bin/mdspell {} -n -r -a -x --en-us \;

echo -e "\e[92mHarshly checking Grammar...\e[0m"
# see --> https://www.npmjs.com/package/write-good#checks
find content/developers -type f -name "*.md" -exec ./node_modules/.bin/writegood {} --no-passive --no-tooWordy --no-weasel --no-adverb \;

echo -e "\e[92mChecking file names...\e[0m"
./node_modules/.bin/check-filename -p content/developers

# echo  -e "\e[92mChecking front-matter...\e[0m"
# LIST=$(find content/developers -type f -name "*.md")
#echo "seeepppepep ${LIST}"

# for line in $LIST; do
#     echo "file: $line"
#     cat $line | ./node_modules/.bin/yaml-front-matter --pretty
# done

echo -e "\e[92mDone! 🐢\e[0m"