# koa-mock

koa-mock is a mock service based on koa.

## how to get start

```bash
npm install koa-mock --save-dev
```

### .koamockrc

configure `.koamockrc` or `.koamockrc.js` in your root project path, the change of these two files will fire an event to mock service and the serivce will restart immediately. it's important to keep in mind that only one of them should be existed.

### npm script

file a npm scritp in your package.json file like: `"mock": "koamock start"`, then open a shell and type `npm run mock` to start your mock service.

### mock datas construction

here is the regulation, each level except `endpoint` of your api path should be a folder below `mock` dir, and a `index.json` file which is for mock data should be in the folder of last level , for example:

'http://localhost:8080/api/biz-all/search/list'

if **"/api/biz-all"** is setup to `endpoint` then mock construction should be as follows:

```bash
├── /mock/
│ ├── /search/
│ │ ├── list
│ │ │    └── index.json
```

## .koamockrc options

### port

define mock service port.

### endpoint

a fixed part of api path such as "/api/biz-all".

### mode -todo

mock,proxy,auto

### proxyTo - todo

## todo

- setup `proxyTo` to record mock data automatically.