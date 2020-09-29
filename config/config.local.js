module.exports = () => {
  const config = {};
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };
  // 对 HttpClient 的请求进行抓包调试,然后启动你的抓包工具，如 charles 或 fiddler。
  // add http_proxy to httpclient
  // http_proxy=http://127.0.0.1:8888 npm run dev
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        proxy: process.env.http_proxy,
      },
    };
  }

  return config;
}
