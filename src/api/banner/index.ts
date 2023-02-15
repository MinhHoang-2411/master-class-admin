import axiosClient from '../axiosClient'

const bannerApi = {
  getListBanner(params: any) {
    const url = 'banners?limit=20&page=1'
    return axiosClient.get(url, params)
  },
  getBannerDetail(paramsId: string) {
    const url = `banners/${paramsId}`
    return axiosClient.get(url)
  },
  createBanner(params: any) {
    const url = 'banners'
    return axiosClient.post(url, params)
  },
  updateBanner(params: any) {
    const url = `banners/${params._id}`
    return axiosClient.put(url, params)
  },
  uploadImage(params: any) {
    const url = 'banners/uploads'
    return axiosClient.post(url, params)
  },
  deleteImage(params: any) {
    const url = `banners/${params.id}/images`
    return axiosClient.delete(url, params)
  },
  deleteBanner(paramsId: string) {
    const url = `banners/${paramsId}`
    return axiosClient.delete(url)
  },
}

export default bannerApi
