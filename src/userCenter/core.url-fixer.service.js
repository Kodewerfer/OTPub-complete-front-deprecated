// shared url prefix
angular
  .module('userCenter.core')
  .factory('urlFixer', function () {
    var prefix = ''
    var subFix = ''
    if (window.location.hostname === 'localhost') {
      prefix = '/fake-data/'
    } else {
      // prefix = 'http://192.168.40.50'
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
