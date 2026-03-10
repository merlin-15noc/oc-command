# OC Command — Deployment Runbook

## First deploy (on host)

1. Copy env file:
   cp .env.example .env
   # Edit .env: set OC_GATEWAY_TOKEN, WORKSPACE_PATH

2. Build and start:
   docker compose -f compose.yml --env-file .env up -d --build

3. Point DNS: oc.lancer.is → same IP as mc.lancer.is

4. Visit https://oc.lancer.is — enter gateway token to sign in.

## Update

docker compose -f compose.yml --env-file .env up -d --build app

## Logs

docker logs oc-command -f --tail=100

## Stop

docker compose -f compose.yml down
