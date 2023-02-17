import axiosClient from '../axiosClient'

const categoryApi = {
  getListCategory(params: any) {
    const url = 'categories?limit=20&page=1'
    return axiosClient.get(url, params)
  },
  getCategoryDetail(paramsId: string) {
    const url = `categories/${paramsId}`
    return axiosClient.get(url)
  },
  createCategory(params: any) {
    const url = `categories`
    return axiosClient.post(url, params)
  },
  updateCategory(params: any) {
    const url = `categories/${params.id}`
    return axiosClient.put(url, params)
  },
  deleteCategory(paramsId: string) {
    const url = `categories/${paramsId}`
    return axiosClient.delete(url)
  },
}

export default categoryApi
