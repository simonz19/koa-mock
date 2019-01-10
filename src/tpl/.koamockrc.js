module.exports = {
    port: 8081,
    endpoint: "/api",
    mode: "mock", //mock,proxy,auto
    proxyTo: '', // worked on proxy and auto mode
    priority: '' // worked on auto mode only, value which defines to be firstTry can be mock or proxy
  };
  