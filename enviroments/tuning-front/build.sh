## !/usr/bin/env bash
set -e
env=$1
env=${env:-"dev"}
echo "build ${env} mode"
src=sources
cwd=$(realpath $(dirname $0))
project_root=$(git rev-parse --show-toplevel)

rm -rf "${cwd}/${src}"
echo "copy project.."
cp -R "${project_root}/tuning-front" "${cwd}/${src}"
cd "${cwd}/${src}"
rm -rf dist/
ls src/environments

echo "build project.."
npm install -g @angular/cli@11.0.1
npm install
ng build -c "${env}"

echo "copy output to firebase public.."
cp -R "${cwd}/${src}/dist/tuning-front/" "${project_root}/enviroments/firesbase/public"/
rm -rf "${cwd}/${src}"
