# koa-mock

koa-mock 是基于 koa 的一个 mock 服务

## 能解决什么问题

- mock 数据支持录制功能, 免去人为编写 mock 数据痛点
- 可以作为一个 proxy 代理服务

## 如何开始

**安装**

```bash
$ npm install koa-mock --save-dev
```

> 当 koa-mock 安装好后会默认触发`postinstall`脚本, 此脚本会自动在您的工程根目录下创建模板`.koamockrc.js`文件 和 `mock` 文件夹

**配置.koamockrc**

配置文件需放到您的工程根目录下,支持两种方式的命名:`.koamockrc` 或者 `.koamockrc.js`.

> 需要注意的是:
>
> 1. 两个配置文件不可并存
> 2. 修改配置文件将会自动重启服务, 无需手动重跑.

**编写 npm script**

```json
{
  "scripts": {
    "mock": "koamock start"
  }
}
```

```bash
$ npm run mock
```

**mock 数据结构**

录制的数据或者人为编写的 mock 数据都遵循一个原则: **request 的每个路径将独立建成一个文件夹,最后一级是数据文件`index.json`**.例如:

request 请求为: <http://localhost:8080/api/biz-all/search/list>

koa-mock 会将录制的数据放到

```
├── /mock/
│ ├── /api/
│ │ ├── /biz-all/
│ │ │ ├── /search/
│ │ │ │ ├── /list/
│ │ │ │ │ └── index.json
```

## .koamockrc options

**port**

指定 mock 服务的端口

**endpoint**

此配置会影响 mock 目录的机构, 例如:

还是以 request 请求<http://localhost:8080/api/biz-all/search/list>为例, 如果配置了`endpoint`为"/api/biz-all", 那么

koa-mock 会将录制的数据放到

```
├── /mock/
│ ├── /search/
│ │ ├── /list/
│ │ │ ├── index.json
```

**mode**

mode 的可能值有三种:

- mock => 直接使用本地 mock 数据
- proxy => mock 服务相当于的一个代理服务, 不会返回本地 mock 数据, 但是会进行录制
- auto => 如果本地有 mock 数据, 将表现为 `mock` 模式, 如果没有, 将表现为 `proxy` 模式

**proxyTo**

在`proxy` 和 `auto`模式下生效, 指定被代理的服务地址

**priority**

在`auto`模式下生效, 指定优先使用`mock`模式 还是 `proxyTo` 模式

## 除了将 koa-mock 安装到您的工程外,也可以单独跑工程

```bash
$ git clone http://vcs.xuebangsoft.net/frontend/koa-mock.git

$ npm install

$ npm run test
```
