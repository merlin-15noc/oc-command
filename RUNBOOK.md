# OC Command — Deployment Runbook

## First deploy (on host)

1. Copy env file:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set at least:
   - `OC_GATEWAY_TOKEN`
   - `GHCR_TOKEN` (PAT with `read:packages`)

2. Start from GHCR image:
   ```bash
   docker compose -f compose.yml --env-file .env pull
   docker compose -f compose.yml --env-file .env up -d
   ```

3. Point DNS: `oc.lancer.is` → same IP as `mc.lancer.is`

4. Visit `https://oc.lancer.is` and sign in with gateway token.

## Update (manual force rollout)

Use this when you need immediate deploy without waiting for watchtower:

```bash
docker pull ghcr.io/merlin-15noc/oc-command:latest
docker compose -f compose.yml --env-file .env up -d --force-recreate --no-deps app
```

## Auto-deploy path

- GitHub Action pushes `ghcr.io/merlin-15noc/oc-command:latest`
- Watchtower checks every 60s and updates containers with label `com.centurylinklabs.watchtower.enable=true`

## Verify runtime image

```bash
docker inspect oc-command --format 'Image={{.Config.Image}} Started={{.State.StartedAt}}'
```

## Logs

```bash
docker logs oc-command -f --tail=100
docker logs oc-command-watchtower -f --tail=100
```

## Stop

```bash
docker compose -f compose.yml down
```
