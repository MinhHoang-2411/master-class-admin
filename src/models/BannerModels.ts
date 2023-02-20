export interface IBanner {
  description: string
  images: []
  isActive: boolean
  name: string
  title: string
  _id: string
}

export interface ResponseBanner {
  data: []
  paginate: {
    limit: number
    total_page: number
    page: number
    total_record: number
  }
  status?: string
  statusText?: string
  message?: string
}