import axiosClient from '../axiosClient'

const coursesApi = {
  getListCourse(params: any) {
    const url = 'courses'
    return axiosClient.get(url, { params })
  },
  getCourseDetail(paramsId: string) {
    const url = `courses/${paramsId}`
    return axiosClient.get(url)
  },
  createCourse(params: any) {
    const url = `courses`
    return axiosClient.post(url, params)
  },
  updateCourse(params: any) {
    const url = `courses/${params._id}`
    return axiosClient.put(url, params)
  },
  deleteCourse(paramsId: string) {
    const url = `courses/${paramsId}`
    return axiosClient.delete(url)
  },
  uploadThumbnail(params?: any) {
    const url = `courses/uploads?uploadType=thumbnail`
    return axiosClient.post(url, params)
  },
  uploadVideo(params?: any) {
    const url = `publics/files?uploadType=video`
    return axiosClient.post(url, params)
  },
  deletePublicFile(params: any) {
    const url = `publics/files`
    return axiosClient.delete(url, {data: params})
  },
}

export default coursesApi
