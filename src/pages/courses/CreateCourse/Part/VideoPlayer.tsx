import {IconButton} from '@mui/material'
import ReactPlayer from 'react-player'
import CloseIcon from '@mui/icons-material/Close'
import {useEffect, useState} from 'react'

interface VideoPlayerProps {
  url: string
  onDeleteVideo: any
  index: number
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({url, onDeleteVideo, index}) => {
  const [hasWindow, setHasWindow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true)
    }
  }, [])

  return (
    <>
      {hasWindow ? (
        <div className='position-relative'>
          <ReactPlayer
            className='react-player'
            url={url || ''}
            controls={true}
            width='200px'
            height='200px'
          />
          <IconButton
            color='secondary'
            component='label'
            sx={{position: 'absolute', top: '0', left: '0'}}
            onClick={() => onDeleteVideo(url, index)}
          >
            <CloseIcon sx={{backgroundColor: '#fff', borderRadius: '50%'}} />
          </IconButton>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default VideoPlayer
