import {useRef, useEffect} from 'react';
import {VideoPlayerProps} from '../../types/components';
import {INTERVAL_START_VIDEO} from '../../const';

function VideoPlayerComponent({isPlaying, src, srcPoster}: VideoPlayerProps): JSX.Element {


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

    videoRefCurrent.defaultMuted = true;
    videoRefCurrent.muted = true;


    return () => {
      if (videoRefCurrent !== null) {
        videoRefCurrent.defaultMuted = false;
        videoRefCurrent.muted = false;
      }
    };
  }, []);

  return (
    <video src={src} ref={videoRef} poster={srcPoster} width="280" height="175" />
  );
}

export default VideoPlayerComponent;
