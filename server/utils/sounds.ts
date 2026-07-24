import soundsData from '~/sounds.json'

let _sounds: typeof soundsData | null = null

export function getSounds() {
  if (!_sounds) {
    _sounds = soundsData
  }
  return _sounds
}
