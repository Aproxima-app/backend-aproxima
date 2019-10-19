'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  user () {
    return this.belongsTo('App/Model/User');
  }

  images () {
    return this.hasMany('App/Models/Image');
  }
}

module.exports = Event
