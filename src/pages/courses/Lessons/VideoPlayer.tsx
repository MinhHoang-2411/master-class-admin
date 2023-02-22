import React from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  url: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({url}) => {
  return <ReactPlayer className='react-player' url={url} controls={true} width='100%' />
}

export default VideoPlayer
