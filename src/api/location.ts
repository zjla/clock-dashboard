import type { BigDataCloudLocationResponse } from './types'

export async function reverseGeocode(lat: number, lon: number): Promise<BigDataCloudLocationResponse> {
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=zh`)
  
  if (!response.ok) {
    throw new Error(`Reverse geocoding API error: ${response.statusText}`)
  }
  
  const data = await response.json() as BigDataCloudLocationResponse
  return data
}

export async function getLocationByIp(): Promise<BigDataCloudLocationResponse> {
  const res = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=zh')
  
  if (!res.ok) {
    throw new Error(`IP location API error: ${res.statusText}`)
  }
  
  const data = await res.json() as BigDataCloudLocationResponse
  return data
}
