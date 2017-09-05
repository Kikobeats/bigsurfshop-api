'use strict'

const createStream = require('./req-stream')

function createClient (opts) {
  const client = createStream(opts)

  client.sails = {
    used: client.bind(client, {path: 'windsurf/windsurf-used-gear/used-windsurfing-sails'})
  }

  client.boards = {
    used: client.bind(client, {path: 'windsurf/windsurf-used-gear/boards-windsurf-used-gear'})
  }

  client.masts = {
    used: client.bind(client, {path: 'windsurf/windsurf-used-gear/used-windsurfing-masts'})
  }

  client.booms = {
    used: client.bind(client, {path: 'windsurf/windsurf-used-gear/used-windsurfing-booms'})
  }

  client.fins = {
    used: client.bind(client, {path: 'windsurf/windsurf-used-gear/used-windsurfing-fins'})
  }

  return client
}

module.exports = createClient
