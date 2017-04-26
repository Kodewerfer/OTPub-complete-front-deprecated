angular.module('watchEvo.core')
  .factory('playerService', [function () {
    var isPausedBefore = false
    var thePlayer = false
    // in case the player dosen't exist.
    try {
      thePlayer = window.videojs('coursePlayer')
    } catch (error) {
      // console.info('Player service reports NO PLAYER FOUND.')
    }


    var pause = function () {
      if (!thePlayer) {
        return false
      }
      isPausedBefore = thePlayer.paused()
      return thePlayer.pause()
    }

    var resume = function () {
      if (!thePlayer) {
        return false
      }
      if (!isPausedBefore) {
        thePlayer.play()
      }
    }

    var getTime = function () {
      if (!thePlayer) {
        return false
      }
      return thePlayer.currentTime()
    }

    return {
      'getTime': getTime,
      'pause': pause,
      'resume': resume
    }
  }])
