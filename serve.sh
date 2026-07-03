#!/usr/bin/env sh

set -eu

PORT="${1:-8000}"
HOST="${HOST:-127.0.0.1}"

cd "$(dirname "$0")"

if command -v python3 >/dev/null 2>&1; then
  PYTHON_BIN="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON_BIN="python"
else
  echo "Erro: Python nao encontrado. Instale Python 3 ou rode outro servidor estatico na raiz do projeto." >&2
  exit 1
fi

echo "Servindo Chronicles of Elyndrath"
echo "URL: http://${HOST}:${PORT}"
echo "Pressione Ctrl+C para parar."

exec "$PYTHON_BIN" -m http.server "$PORT" --bind "$HOST"
