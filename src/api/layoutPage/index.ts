import axiosClient from '../axiosClient'

const layoutPageApi = {
  getListLayoutPage(params: any) {
    const url = 'layouts'
    return axiosClient.get(url, {params})
  },
  getLayoutPageDetail(paramsId: string) {
    const url = `layouts/${paramsId}`
    return axiosClient.get(url)
  },
  createLayoutPage(params: any) {
    const url = 'layouts'
    return axiosClient.post(url, params)
  },
  updateLayoutPage(params: any) {
    const url = `layouts/${params._id}`
    return axiosClient.put(url, params)
  },
  deleteLayoutPage(paramsId: string) {
    const url = `layouts/${paramsId}`
    return axiosClient.delete(url)
  },
}

export default layoutPageApi
