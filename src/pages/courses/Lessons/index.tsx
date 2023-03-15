import { FC } from 'react'
import { isMappable } from '../../../app/helpers/isMapple'
import { useAppSelector } from '../../../app/saga/hooks'
import CustomAccordion from './CustomAccordion'

interface ILesson {
  index: number
  title: {
    en: string
    vi?: string
  }
  description: {
    en: string
    vi?: string
  }
  videoUrl: string
}

const Lessons: FC = () => {
  const course = useAppSelector((state) => state.courses.dataDetail)
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer d-flex align-items-center'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Lesson Management</h3>
          </div>
        </div>
        <div className='card-body p-9 rounded'>
          {isMappable(course?.lessons) ? (
            course?.lessons?.map((lesson: ILesson, index: number) => (
              <>
                <CustomAccordion
                  title={lesson.title.en}
                  description={lesson.description.en}
                  videoUrl={lesson.videoUrl}
                  index={lesson.index}
                  key={lesson.index}
                />
              </>
            ))
          ) : (
            <div className='row  mb-7'>
              <span className='fw-bold fw-bold  text-muted'>There are no lessons</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Lessons
