import type { HAEntityState, HAServiceCallParams } from './types'

export interface HomeAssistantConfig {
  url: string
  token: string
}

export async function fetchEntityState(config: HomeAssistantConfig, entityId: string): Promise<HAEntityState> {
  const response = await fetch(`${config.url}/api/states/${entityId}`, {
    headers: { Authorization: `Bearer ${config.token}` },
  })

  if (!response.ok) {
    throw new Error(`Home Assistant API error: ${response.statusText}`)
  }

  const state = await response.json() as HAEntityState
  return state
}

export async function callService(
  config: HomeAssistantConfig,
  domain: string,
  service: string,
  serviceData: HAServiceCallParams,
): Promise<void> {
  const response = await fetch(`${config.url}/api/services/${domain}/${service}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serviceData),
  })

  if (!response.ok) {
    throw new Error(`Home Assistant service call error: ${response.statusText}`)
  }
}
