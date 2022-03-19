import {useRef, useEffect} from 'react';

const INTERVAL_START_VIDEO = 1000;

type videoPlayerProps = {
  isPlaying: boolean;
  src: string;
  muted: boolean;
  srcPoster: string;
}

function VideoPlayerComponent({isPlaying, src, muted, srcPoster}: videoPlayerProps): JSX.Element {


  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoRefCurrent = videoRef.current;
    const timeout = setTimeout(() => {
      if (videoRefCurrent && isPlaying) {
        videoRefCurrent.play();
      }
    }, INTERVAL_START_VIDEO);

    return () => {
      if (videoRefCurrent && isPlaying) {
        videoRefCurrent.src = src;
      }

      clearTimeout(timeout);
    };
  }, [isPlaying, src]);

  useEffect(() => {
    const videoRefCurrent = videoRef.current;

    if (videoRefCurrent === null) {
      return;
    }

    if (muted) {
      videoRefCurrent.defaultMuted = true;
      videoRefCurrent.muted = true;
    }

    return () => {
      if (videoRefCurrent !== null) {
        videoRefCurrent.defaultMuted = false;
        videoRefCurrent.muted = false;
      }
    };
  }, [muted]);

  return (
    <video src={src} ref={videoRef} poster={srcPoster} width="280" height="175" />
  );
}

export default VideoPlayerComponent;
