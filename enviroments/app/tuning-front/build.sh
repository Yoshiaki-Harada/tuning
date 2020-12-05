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

echo "build project.."
npm install -g @angular/cli@11.0.1
npm install
npm audit fix
ng build -c "${env}"

echo "copy output.."
cp -R "${cwd}/${src}/dist/tuning-front/" "${cwd}/public"
rm -rf "${cwd}/${src}"
