const GW_URL = process.env.OC_GATEWAY_URL ?? 'http://localhost:18789'
const GW_TOKEN = process.env.OC_GATEWAY_TOKEN ?? ''

export async function gwFetch(path: string, opts?: RequestInit) {
  return fetch(`${GW_URL}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${GW_TOKEN}`,
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
  })
}

export async function getSessions() {
  const res = await gwFetch('/api/sessions')
  return res.json()
}

export async function getAgents() {
  const res = await gwFetch('/api/agents')
  return res.json()
}
