// generic functions. mainly for filters and services.
angular.module('personal.core', [])

/**
 * generic services
 */
// user infos service
require('./core.user.service')
// user course comment
require('./core.course-comments.service')

/**
 * component specific services
 */

// my course service
require('./core.my-course.service')
// subscription service
require('./core.subscription.service')
require('./core.subStauts.filter')
// broadcast booking
require('./core.broadcast.service')
require('./core.brodcast.filter')
// favourited courses service
require('./core.favourited.service')
// browsed course service
require('./core.browsed.service')
// notes
require('./core.notes.service')
// questions
require('./core.question.service')
// receipt
require('./core.recipient.service')
// orders service
require('./core.orders.service')
require('./core.oders-status.filter') // filter for payment status, return coresponding text.
// personal messages
require('./core.messages.service')
