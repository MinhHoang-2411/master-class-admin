export interface PaginationParams {
  _limit: number
  _page: number
  _totalRows: number
}

export interface ListResponse<T> {
  data: T[]
  pagination?: PaginationParams
}

export interface ResponseOrigin<T> {
  data: ListResponse<T>
  status?: string
  statusText?: string
  message?: string
}

export interface ResponseAuth<T> {
  data: {
    token?: string
    user: T
  }
  status?: string
  statusText?: string
  message?: string
}

export interface ListParams {
  _limit?: number
  page?: number
  _sort?: string
  _order?: 'asc' | 'desc'

  [key: string]: any
}

export interface ErrorModel {
  response: {
    data: {
      error?: string
      message: string
      success?: boolean
    }

    [key: string]: any
  }
}
