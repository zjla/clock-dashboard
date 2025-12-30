import type { WeatherApiResponse } from './types'

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherApiResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,rain,wind_speed_10m,is_day,apparent_temperature,showers,relative_humidity_2m,precipitation,weather_code&hourly=precipitation_probability,uv_index,temperature_2m&timezone=auto&forecast_days=1`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`)
  }

  const data = await response.json() as WeatherApiResponse
  const currentHour = new Date().getHours()
  data.current_hour_index = currentHour

  return data
}
