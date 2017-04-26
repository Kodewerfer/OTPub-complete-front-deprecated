// sub-components Note section
require('./side-bar.notes.component')
// question and answer section
require('./side-bar.qna.component')

angular
  .module('watchEvo')
  .component('watchSideBar', {
    bindings: {
      courseId: '@',
      lessonId: '@',
      courseType: '@'
    },
    template: require('./watch.side-bar.temp.html'),
    controller: ['qnaService', 'noteService', 'playerService', function (qSrv, nSrv, player) {
      var that = this

      // current tab, both display text of the add button and the tab control
      this.currentTab = '笔记'
      // question datas
      this.qData = {}
      // note datas
      this.nData = {}

      // fetch note data
      var fetchNoteList = function () {
        nSrv.fetch({
          'course_id': that.courseId,
          'lesson_id': that.lessonId
        })
          .success(function (data) {
            that.nData = data.list
          })
      }

      // fetch Q n A data
      var fetchQnAList = function () {
        qSrv.fetch({
          'course_id': that.courseId,
          'lesson_id': that.lessonId
        })
          .success(function (data) {
            that.qData = data.list
          })
      }

      this.$onInit = function () {
        fetchNoteList()
        fetchQnAList()
      }

      // open the side bar by default.
      this.$postLink = function () {
        $('.fa-commenting').trigger('click')
      }

      /**
       *  adding item
       */
      this.addingItem = {
        content: '',
        isOpen: false,
        errorMsg: '',
        isSucceed: false,
        // - open the adding window
        open: function () {
          player.pause()
          this.isOpen = true
        },
        // - close the window
        close: function () {
          this.isOpen = false
          // resume video (if the video was playing before)
          player.resume()

          this.content = ''
          this.errorMsg = ''
          this.isSucceed = false
        },
        submit: function () {
          var _this = this

          // the data that is going to be sent.
          var sendData = {
            course_type: that.courseType,
            course_id: that.courseId,
            lesson_id: that.lessonId,
            play_time: player.getTime(),
            note: _this.content
          }

          // send data to server
          if (that.currentTab === '笔记') {
            // --
            sendData.note = _this.content
            // --
            nSrv.add(sendData)
              .then(function (res) {
                // success
                res = res.data
                if (res.status === 'success') {
                  _this.isSucceed = true
                  fetchNoteList()
                } else {
                  _this.errorMsg = res.msg
                }
              }, function () {
                // error
                _this.errorMsg = '发送数据失败，请稍后重试。'
              })
          }

          if (that.currentTab === '问题') {
            // --
            sendData.question = _this.content
            // --
            qSrv.add(sendData)
              .then(function (res) {
                // success
                res = res.data
                if (res.status === 'success') {
                  _this.isSucceed = true
                  fetchQnAList()
                } else {
                  _this.errorMsg = res.msg
                }
              }, function () {
                // error
                _this.errorMsg = '发送数据失败，请稍后重试。'
              })
          }
        }
      }

      /**
       *  Note -EDIT -DELETE
       */
      this.deletingNote = function (id) {
        nSrv.del(id).success(function () {
          fetchNoteList()
        })
      }

      this.editingNote = {
        target: null,
        content: '',
        isOpen: false,
        errorMsg: '',
        isSucceed: false,
        // - open editing window
        open: function (target) {
          this.isOpen = true
          // reset target
          this.target = target
          // bind text
          this.content = target.note
        },
        // - close the window
        close: function () {
          this.isOpen = false

          // purge old target infos
          this.target = null
          this.content = ''
          this.errorMsg = ''
          this.isSucceed = false
        },
        submit: function () {
          var _this = this
          // send data to server
          nSrv.edit({
            id: _this.target.id,
            note: _this.content
          }).then(function (res) {
            // success
            res = res.data
            if (res.status === 'success') {
              _this.isSucceed = true
              fetchNoteList()
            } else {
              _this.errorMsg = res.msg
            }
          }, function () {
            // error
            _this.errorMsg = '发送数据失败，请稍后重试。'
          })
        }
      }

      /**
       *  Questions -DELETE
       */

      this.deleteQuestion = function (id) {
        qSrv.del(id).success(function () {
          fetchQnAList()
        })
      }
    }]
  })
