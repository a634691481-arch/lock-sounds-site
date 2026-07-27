import type { Wallpaper } from '~/types/wallpaper'

let _data: Wallpaper[] | null = null

export function getWallpapers(): Wallpaper[] {
  if (!_data) {
    _data = JSON.parse(require('fs').readFileSync(
      require('path').resolve(process.cwd(), 'wallpapers.json'), 'utf-8'
    ))
  }
  return _data
}
