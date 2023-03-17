export interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  roleName: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
  name?: string
  socialAccount?: {
    email?: string
    socialName?: string
  }
}

export interface ResponseUser {
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
