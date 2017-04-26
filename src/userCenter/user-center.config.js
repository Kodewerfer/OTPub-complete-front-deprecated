angular
  .module('userCenter')
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouter) {
      //
      $urlRouter.otherwise('/return')

      $stateProvider
        // 个人中心
        .state('personal', {
          url: '/personal',
          component: 'personalPageFrame',
          resolve: {}
        })
        // 欢迎
        .state('personal.welcome', {
          url: '/welcome',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalWelcome'
          },
          resolve: {}
        })
        // 站内信
        .state('personal.messages', {
          url: '/messages',
          views: {
            'content': 'personalMessages'
          },
          resolve: {}
        })
        // 阅读站内信
        .state('personal.read', {
          url: '/message/:msgID',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalReadMessage'
          },
          resolve: {
            'msgID': function ($transition$) {
              return $transition$.params().msgID
            }
          }
        })
        // 编辑个人资料
        .state('personal.editInfo', {
          url: '/editInfo',
          views: {
            'topBar': 'personalTopBar',
            content: 'personalEditInfo'
          }
        })
        // 技术课程
        .state('personal.myCourses', {
          url: '/courses',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalMyCourses'
          }
        })
        // 卡包管理
        .state('personal.subscription', {
          url: '/subscription',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalSubscription'
          }
        })
        // 收藏课程
        .state('personal.faviCourses', {
          url: '/favourited',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalFaviCourses'
          }
        })
        // 直播预约
        .state('personal.broadcast', {
          url: '/broadcast',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalBroadcast'
          }
        })
        // 预览课程
        .state('personal.browsed', {
          url: '/browsed',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalBrowsed'
          }
        })
        // 我的笔记
        .state('personal.notes', {
          url: '/notes',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalNotes' // at this stage, parent is alreadly personal state, no @ is needed.
          },
          resolve: {}
        })
        // 我的问答
        .state('personal.qna', {
          url: '/qna',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalQnA' // at this stage, parent is alreadly personal state, no @ is needed.
          },
          resolve: {}
        })
        // 我的简历
        .state('personal.resume', {
          url: '/resume',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalResume' // at this stage, parent is alreadly personal state, no @ is needed.
          },
          resolve: {}
        })
        // 我的发票
        .state('personal.receipt', {
          url: '/receipt',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalReceipt' // at this stage, parent is alreadly personal state, no @ is needed.
          },
          resolve: {}
        })
        // 我的订单
        .state('personal.orders', {
          url: '/orders',
          views: {
            'topBar': 'personalTopBar',
            'content': 'personalMyOrders' // at this stage, parent is alreadly personal state, no @ is needed.
          },
          resolve: {}
        })
        // 企业中心
        .state('entp', {
          url: '/entp',
          component: 'entpPageFrame'
        })
        // 欢迎页面
        .state('entp.welcome', {
          url: '/welcome',
          views: {
            'topBar': 'entpTopBar',
            'content': 'entpWelcome'
          }
        })
        // 修改企业信息
        .state('entp.editInfo', {
          url: '/editInfo',
          views: {
            'topBar': 'entpTopBar',
            'content': 'entpEditInfo'
          }
        })
        // 企业成员
        .state('entp.members', {
          url: '/members',
          views: {
            'topBar': 'entpTopBar',
            'content': 'entpMembers'
          }
        })
        // 企业课程
        .state('entp.courses', {
          url: '/courses',
          views: {
            'topBar': 'entpTopBar',
            'content': 'entpCourses'
          }
        })
        // 企业课程 - 查看详情
        .state('entp.courses.details', {
          url: '/details/:courseId',
          views: {
            'topBar': 'entpTopBar',
            'content@entp': 'entpCourses.details'
          },
          resolve: {
            courseId: function ($transition$) {
              return $transition$.params().courseId
            }
          }
        })
        // 厂商中心
        .state('provider', {
          url: '/provider',
          component: 'providerPageFrame'
        })
        // 欢迎页面
        .state('provider.welcome', {
          url: '/welcome',
          views: {
            'topBar': 'providerTopBar',
            'content': 'providerWelcome'
          }
        })
        // 厂商中心 - 修改信息
        .state('provider.editInfo', {
          url: '/editInfo',
          views: {
            'topBar': 'providerTopBar',
            'content': 'providerEditInfo'
          }
        })
        // 厂商中心 -我的课程
        .state('provider.courses', {
          url: '/courses',
          views: {
            'topBar': 'providerTopBar',
            'content': 'providerCourses'
          }
        })
        // 企业课程 - 查看详情
        .state('provider.courses.details', {
          url: '/details/:courseId',
          views: {
            'topBar': 'providerTopBar',
            'content@provider': 'providerCourses.details'
          },
          resolve: {
            courseId: function ($transition$) {
              return $transition$.params().courseId
            }
          }
        })
      //
    }
  ])
