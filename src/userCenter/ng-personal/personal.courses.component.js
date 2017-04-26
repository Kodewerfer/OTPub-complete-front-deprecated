angular
  .module('userCenter.personal')
  .component('personalMyCourses', {
    template: require('./personal.courses.temp.html'),
    controller: ['personalCourseService', 'personalCourseComment', '$timeout', function (courseSrv, commentSrv, $timeout) {
      var that = this
      this.$onInit = function () {
        that.fetchData()
      }

      // the list datas
      this.courseList = []
      this.courseListPaged = [] // paged list
      // get the paged datas. execute by the paging component.
      this.dataSlicer = function (start, ends) {
        that.courseListPaged = that.courseList.slice(start, ends)
      }

      // switches for the pop outs.
      this.showErrorWindow = false
      this.showDataTable = false
      this.showNoData = false
      this.ajaxErrorMesg = ''

      // comment window
      this.commentWindow = {
        isOpen: false,
        commentTarget: null,
        commentContents: '',
        isErrorOccured: false,
        isCommentEmpty: false,
        isCommentComplete: false,
        starScore: false,
        closeWindow: function () {
          this.isOpen = false
          this.isErrorOccured = false
          this.isErrorOccured = false
        },
        addComment: function (param) {
          this.commentTarget = param
          this.isOpen = true
        },
        sendComment: function () {
          var commentWindow = this
          if (!commentWindow.commentContents.length) {
            commentWindow.isCommentEmpty = true
            return
          }
          commentWindow.isCommentEmpty = false
          // TODO: SEDN COMMENT TO SERVER
          // reset the commentDatas
          commentSrv.sendComment({
            'courseid': commentWindow.commentTarget,
            'content': commentWindow.commentContents,
            'score': commentWindow.starScore
          }).then(function () {
            that.fetchData()
            commentWindow.isErrorOccured = false
            commentWindow.isCommentComplete = true
            // success
            $timeout(function () {
              commentWindow.isOpen = false
              commentWindow.commentTarget = null
              commentWindow.commentContents = ''
              commentWindow.isCommentComplete = false
            }, 2000)
          }, function () {
            // error
            commentWindow.isErrorOccured = true
          })
        }
      }

      var ajaxSuccess = function (res) {
        res = res.data

        if (!res.data || !res.data.length) {
          that.showNoData = true
          return
        }
        that.courseList = res.data
        //
        that.showDataTable = true
        that.showTopFilters = true
      }

      var ajaxError = function (errorRes) {
        that.showErrorWindow = true
        that.showDataTable = false
        that.ajaxErrorMesg = errorRes
      }

      this.fetchData = function () {
        this.showDataTable = false
        courseSrv.getCourseList().then(ajaxSuccess, ajaxError)
      }
    }]
  })
