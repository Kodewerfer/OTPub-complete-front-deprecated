// shared url prefix
angular
  .module('watchEvo.core')
  .factory('urlFixer', function () {
    var prefix = ''
    var subFix = ''
    if (window.location.hostname === 'localhost') {
      prefix = '/fake-data/'
    } else {
      prefix = ''
    }
    if (window.location.hostname === 'localhost') {
      subFix = '.json'
    } else {
      subFix = ''
    }
    return {
      pre: prefix,
      sub: subFix
    }
  })
