'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with events
 */

  const User = use('App/Models/User');
  const Event = use('App/Models/Event');

class EventController {
  /**
   * Show a list of all events.
   * GET events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { latitude, longitude } = request.all()

    const events = Event.query()
      .with('images')
      .nearBy(latitude, longitude, 10)
      .fetch()
  }

  async store ({ auth, request }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      "description",
      'address',
      'date',
      'latitude',
      'longitude',
    ])

    const event = await Event.create({ ...data, user_id: id })

    return event;
  }

  /**
   * Display a single event.
   * GET events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const event = await Event.findOrFail(params)

    await event.load('images')

    return event;
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const event = await Event.findOrFail(params.id)

    const data = request.only([
      'title',
      "description",
      'address',
      'date',
      'latitude',
      'longitude',
    ])

    event.merge(data)

    await event.save()

    return event
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await event.delete()
  }
}

module.exports = EventController
