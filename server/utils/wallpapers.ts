import type { Wallpaper } from '~/types/wallpaper'
import wallpapersData from '~/wallpapers.json'

let _data: Wallpaper[] | null = null

export function getWallpapers(): Wallpaper[] {
  if (!_data) {
    _data = wallpapersData as Wallpaper[]
  }
  return _data
}
