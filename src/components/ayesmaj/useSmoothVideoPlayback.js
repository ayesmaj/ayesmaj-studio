import { useEffect } from 'react';

const RETRY_DELAYS = [250, 750, 1500];

/**
 * Keeps every video in a page browser-safe while preserving each component's
 * intended playback mode. Autoplay videos are muted, played only near the
 * viewport, paused offscreen, and retried after transient browser/network
 * interruptions. User-controlled videos remain user-controlled but always loop.
 */
export default function useSmoothVideoPlayback(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const videoStates = new Map();

    const clearRetry = (state) => {
      if (!state.retryTimer) return;
      window.clearTimeout(state.retryTimer);
      state.retryTimer = null;
    };

    const tryToPlay = (video, state) => {
      if (!state.autoplay || !state.visible || document.hidden || !video.isConnected) return;

      clearRetry(state);
      video.preload = 'auto';

      const playAttempt = video.play();
      if (!playAttempt?.catch) return;

      playAttempt
        .then(() => {
          state.retryIndex = 0;
        })
        .catch((error) => {
          // A browser may still block playback before the first user gesture.
          // Leave that case for the shared pointer/keyboard retry below.
          if (error?.name === 'NotAllowedError') return;

          const delay = RETRY_DELAYS[state.retryIndex];
          if (delay === undefined) return;

          state.retryIndex += 1;
          state.retryTimer = window.setTimeout(() => tryToPlay(video, state), delay);
        });
    };

    const intersectionObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            const state = videoStates.get(video);
            if (!state) return;

            state.visible = entry.isIntersecting;
            if (entry.isIntersecting) {
              tryToPlay(video, state);
            } else if (state.autoplay && !video.paused) {
              clearRetry(state);
              video.pause();
            }
          });
        }, { rootMargin: '240px 0px', threshold: 0.01 })
      : null;

    const registerVideo = (video) => {
      if (videoStates.has(video)) return;

      // Native looping is smoother and more reliable than restarting in JS.
      video.loop = true;
      video.setAttribute('loop', '');
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      if (!video.preload || video.preload === 'none') video.preload = 'metadata';

      const autoplay = video.autoplay || video.hasAttribute('autoplay');
      if (autoplay && !video.controls) {
        // Required by Safari, Chrome, and mobile browsers for reliable autoplay.
        video.muted = true;
        video.defaultMuted = true;
        video.setAttribute('muted', '');
      }

      const state = {
        autoplay,
        visible: !intersectionObserver,
        retryIndex: 0,
        retryTimer: null,
        onReady: null,
        onStalled: null,
      };

      state.onReady = () => tryToPlay(video, state);
      state.onStalled = () => {
        state.retryIndex = 0;
        tryToPlay(video, state);
      };

      video.addEventListener('canplay', state.onReady);
      video.addEventListener('loadeddata', state.onReady);
      video.addEventListener('stalled', state.onStalled);
      videoStates.set(video, state);

      if (intersectionObserver) intersectionObserver.observe(video);
      else tryToPlay(video, state);
    };

    const unregisterVideo = (video) => {
      const state = videoStates.get(video);
      if (!state) return;

      clearRetry(state);
      intersectionObserver?.unobserve(video);
      video.removeEventListener('canplay', state.onReady);
      video.removeEventListener('loadeddata', state.onReady);
      video.removeEventListener('stalled', state.onStalled);
      videoStates.delete(video);
    };

    const registerTree = (node) => {
      if (!(node instanceof Element)) return;
      if (node.matches('video')) registerVideo(node);
      node.querySelectorAll('video').forEach(registerVideo);
    };

    const unregisterTree = (node) => {
      if (!(node instanceof Element)) return;
      if (node.matches('video')) unregisterVideo(node);
      node.querySelectorAll('video').forEach(unregisterVideo);
    };

    registerTree(root);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(registerTree);
        mutation.removedNodes.forEach(unregisterTree);
      });
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    const resumeVisibleVideos = () => {
      videoStates.forEach((state, video) => {
        state.retryIndex = 0;
        tryToPlay(video, state);
      });
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        videoStates.forEach((state, video) => {
          clearRetry(state);
          if (state.autoplay && !video.paused) video.pause();
        });
      } else {
        resumeVisibleVideos();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    document.addEventListener('pointerdown', resumeVisibleVideos, { passive: true, capture: true });
    document.addEventListener('keydown', resumeVisibleVideos, { capture: true });
    window.addEventListener('online', resumeVisibleVideos);
    window.addEventListener('pageshow', resumeVisibleVideos);

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
      videoStates.forEach((state, video) => {
        clearRetry(state);
        video.removeEventListener('canplay', state.onReady);
        video.removeEventListener('loadeddata', state.onReady);
        video.removeEventListener('stalled', state.onStalled);
      });
      videoStates.clear();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.removeEventListener('pointerdown', resumeVisibleVideos, { capture: true });
      document.removeEventListener('keydown', resumeVisibleVideos, { capture: true });
      window.removeEventListener('online', resumeVisibleVideos);
      window.removeEventListener('pageshow', resumeVisibleVideos);
    };
  }, [rootRef]);
}
