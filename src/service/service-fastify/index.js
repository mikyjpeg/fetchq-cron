const fastify = require('fastify');
const { INIT_SERVICE, START_SERVICE } = require('@forrestjs/hooks');
const hooks = require('./hooks');

const onInitService = ({ getConfig, setContext, createHook, getContext }) => {
  const server = fastify({ logger: getConfig('fastify.logger', false) });

  const registerPlugin = (...options) => server.register(...options);
  const registerRoute = (...options) => server.route(...options);

  server.decorateRequest('getConfig', getConfig);
  server.decorateRequest('getContext', getContext);

  server.decorate('getConfig', getConfig);
  server.decorate('getContext', getContext);

  createHook.sync(hooks.FASTIFY_HACKS_BEFORE, { fastify: server });
  createHook.sync(hooks.FASTIFY_PLUGIN, { registerPlugin });
  createHook.sync(hooks.FASTIFY_ROUTE, { registerRoute });

  setContext('fastify', server);
};

const onStartService = ({ getContext, getConfig, createHook }) => {
  const server = getContext('fastify');
  createHook.sync(hooks.FASTIFY_HACKS_AFTER, { fastify: server });
  server.listen(getConfig('fastify.port', 8080));
};

module.exports = ({ registerAction, registerHook }) => {
  registerHook(hooks);
  registerAction({
    hook: INIT_SERVICE,
    name: hooks.SERVICE_NAME,
    trace: __filename,
    handler: onInitService,
  });
  registerAction({
    hook: START_SERVICE,
    name: hooks.SERVICE_NAME,
    trace: __filename,
    handler: onStartService,
  });
};