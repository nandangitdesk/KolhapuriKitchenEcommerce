import React from 'react'
import ReactPlayer from 'react-player/youtube'

const Player = () => {
  return (
    <div className="player-wrapper mt-10 w-full px-4 sm:px-6 md:px-2">
      <div className="aspect-w-16 aspect-h-9 md:h-screen lg:h-screen">
        <ReactPlayer
          className="react-player"
          url="https://www.youtube.com/watch?v=XOkcmgpGr_s"
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
    </div>
  )
}

export default Player