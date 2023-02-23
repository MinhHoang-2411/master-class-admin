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
  name: string
  title: string
  thumbnail: string[]
  authorName: string
  categories: string[]
  lessons: [
    {
      index: number
      title: string
      description: string
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
    slogan: string
    description: string
    skills: [
      {
        imageUrl: string[]
        title: string
      }
    ]
  }
}
