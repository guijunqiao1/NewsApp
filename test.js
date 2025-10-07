const axios = require('axios');
const https = require('https');

// API 相关配置
const host = 'https://jisunews.market.alicloudapi.com';
const path = '/news/get';
const appcode = '5caf6b27a0614b56b40155be96f68da9';  // 替换成你自己的 AppCode
const querys = 'channel=%E5%A4%B4%E6%9D%A1&num=10&start=0';
const url = `${host}${path}?${querys}`;

// 请求头
const headers = {
  'Authorization': `APPCODE ${appcode}`,
  'Content-Type': 'application/json; charset=UTF-8',
};

axios({
  method: 'get',  // 这里使用 GET 请求，你也可以根据需求选择 POST 请求
  url: url,
  headers: headers
})
  .then(response => {
    // 处理返回的内容
    console.dir(response.data);
    console.dir(response.data.result.list);
  })
  .catch(error => {
    // 错误处理
    console.error('Error:', error);
  });
