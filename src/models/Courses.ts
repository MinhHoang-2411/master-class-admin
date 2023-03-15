export interface ICourse {
  _id: string
  authorName: string
  createdAt: string
  deletedAt: string
  name: string
  thumbnail: string
  title: string
  updatedAt: string
  categories: string[]
  videoPreview: {
    url: string
    thumbnail: string[]
    duration: number
  }
}

export interface InititalValuesCreateCourse {
  name: {
    vi: string
    en: string
  }
  title: {
    vi: string
    en: string
  }
  thumbnail: string[]
  authorName: string
  categories: string[]
  lessons: [
    {
      index: number
      title: {
        vi: string
        en: string
      }
      description: {
        vi: string
        en: string
      }
      videoUrl: string
      thumbnail: string[]
      duration: number
    }
  ]
  videoPreview: {
    url: string
    thumbnail: string[]
    duration: number
  }
  overview: {
    slogan: {
      vi: string
      en: string
    }
    description: {
      vi: string
      en: string
    }
    skills: [
      {
        imageUrl: string[]
        title: {
          vi: string
          en: string
        }
      }
    ]
  }
  webName: string
}
