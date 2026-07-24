export interface Sound {
  id: string
  name: string
  category: string
  tags: string[]
  size: string
  duration: string
  plays: number
  downloads: number
  shares: number
  date: string
  file: string
}

export interface Category {
  name: string
  count: number
}

export interface SoundsResponse {
  items: Sound[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type SortType = 'latest' | 'plays' | 'downloads'
