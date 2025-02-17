#!/bin/sh

if [ "$NODE_ENV" = "test" ]; then
  echo "Test environment detected, skipping setup-db."
else
  if [ ! -f /data/setup_done ]; then
    echo "Running setup-db..."
    npm run build
    npm run setup-db
    touch /data/setup_done
  else
    echo "Setup already done, skipping setup-db."
  fi
fi

exec "$@"