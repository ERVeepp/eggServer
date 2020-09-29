exports.io = {
  init: {}, // passed to engine.io
  namespace: {
    '/': {
      connectionMiddleware: [],
      packetMiddleware: [],
    },
    '/example': {
      connectionMiddleware: [],
      packetMiddleware: [],
    },
  },
  // redis: {
  //   host: '127.0.0.1',
  //   port: '6379',
  //   auth_pass: '',
  //   db: 0,
  // },
};