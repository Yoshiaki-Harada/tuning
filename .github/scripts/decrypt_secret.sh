#!/bin/sh

# Decrypt the file
mkdir $GITHUB_WORKSPACE/secrets
# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
--output $GITHUB_WORKSPACE/secrets/serviceAccount.json serviceAccount.json.gpg
cd $GITHUB_WORKSPACE/secrets
ls

