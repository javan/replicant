#= require replicant/trigger_event

class Replicant.Session
  constructor: (@element) ->
    @navigating = false

  goToLocation: (location) ->
    @navigate =>
      @element.location = location

  goBack: ->
    @navigate =>
      @element.goBack()

  goForward: ->
    @navigate =>
      @element.goForward()

  clickSelector: (selector) ->
    @navigate =>
      clickElement(@querySelector(selector))

  # Private

  navigate: (callback) ->
    @promiseNavigation (resolve) =>
      @afterNavigateEvent(resolve)
      callback()

  promiseNavigation: (callback) ->
    if @navigating
      Promise.reject(new Error "Already navigating")
    else
      @navigating = true
      new Promise(callback)
        .then (result) =>
          @navigating = false
          result
        .catch (error) =>
          @navigating = false
          throw error

  afterNavigateEvent: (callback) ->
    @element.addEventListener "replicant-navigate", handler = (event) =>
      @element.removeEventListener("replicant-navigate", handler)
      callback(event.action)

  querySelector: (selector) ->
    @element.document?.querySelector(selector) ?
      throw new Error "No element matching selector `#{selector}'"

  clickElement = (element) ->
    Replicant.triggerEvent(element, "click")