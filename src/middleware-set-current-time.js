import videojs from 'video.js';

// since VHS handles HLS and DASH (and in the future, more types), use * to capture all
videojs.use('*', (player) => {
  return {
    setSource: (srcObj, next) => {
      // pass null as the first argument to indicate that the source is not rejected
      next(null, srcObj);
    },

    // VHS needs to know when seeks happen. For external seeks (generated at the player
    // level), this middleware will capture the action. For internal seeks (generated at
    // the tech level), we use a wrapped function so that we can handle it on our own
    // (specified elsewhere).
    setCurrentTime: (time) => {
      if (player.vhs && player.currentSrc() === player.vhs.source_.src) {
        player.vhs.setCurrentTime(time);
      }

      return time;
    }
  };
});
