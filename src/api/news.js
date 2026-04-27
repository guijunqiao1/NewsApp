import request from "@/utils/request";
import mockNewsData from "@/data/news_mock_data.json";

//全局封装id标识生成方法
function add_id(obj_item){
    obj_item.result.list.forEach((item) => {
        if(item.weburl.includes('article')){
            const step1 = item.weburl.split('_')[1];
            item['id'] = step1;
        }else if(item.weburl.includes('doc')){
      //"weburl": "https://news.sina.com.cn/w/2025-10-13/doc-inftsvuy3981809.shtml",
            const step1 = item.weburl.split('doc-')[1];
            const step2 = step1.split('.')[0];
            let start = null;
            for(let i=0;i<step2.length;i++){
                // 特判
                if(step2[i]==='0'){
                    start = i;
                    break;
                }
                if(Number(step2[i])){//发现整形
                    start = i;
                    break;
                }
            }
            const step3 = step2.slice(start);
            item['id'] = step3;
        }
    });
}


/**
 * 获取新闻数据源
 */
export const getNewsList = (data) => {
  //模拟返回的promise
  // 封装内容对象
  const res_obj = {
    "status": 0,
    "msg": "ok",
    "result": {
      "channel": "头条",
      "num": mockNewsData.length,
      "list": mockNewsData
    }
  };

  // 添加obj_id
  add_id(res_obj);

  // 模拟数据写法：
  return Promise.resolve(res_obj);//直接返回值也会被封装成这样---与外置的await相对应

  // 返回正常请求结果的写法：
  // return requset({
  //   url: `/get?channel=${data.channel}&nums=${data.nums}&start=${data.start}`,
  // })
}


/**
 * 获取搜索提示--写了逻辑，但是没有接口，就固定相应内容即可
 */
export const getHint = (q) => {
  // 返回正常请求结果的写法：
  // return request({
  //   url: '/news/hint',
  //   params: {
  //     q
  //   }
  // })

  //模拟返回的promise:
  const res_obj = {
    "success": true,
    "code": 200,
    "data": {
        "total": 10,
        "result": [
            "mac",
            "macbook pro",
            "macbook",
            "maciej kuciara",
            "mac壁纸",
            "macaron",
            "mac 壁纸",
            "macbook air",
            "macarons",
            "mac pro"
        ]
    },
    "message": "success"
  };

  return Promise.resolve(res_obj);
}


/**
 * 获取推荐主题
 */
export const getThemes = () => {
  // 返回正常请求结果的写法：
  // return request({
  //   url: '/news/themes'
  // })

  //模拟返回的promise:
  const res_obj = {
    "success": true,
    "code": 200,
    "data": {
        "themes": [
            {
                "id": "toutiao",
                "photo": "https://images.pexels.com/photos/4058223/pexels-photo-4058223.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
                "title": "头条"
            },
            {
                "id": "tiyu",
                "photo": "https://images.pexels.com/photos/1292862/pexels-photo-1292862.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
                "title": "体育"
            },
            {
                "id": "nba",
                "photo": "https://images.pexels.com/photos/1356300/pexels-photo-1356300.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
                "title": "NBA"
            },
            {
                "id": "junshi",
                "photo": "https://images.pexels.com/photos/212940/pexels-photo-212940.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
                "title": "军事"
            },
            {
                "id": "guonei",
                "photo": "https://images.pexels.com/photos/4711052/pexels-photo-4711052.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
                "title": "国内"
            },
            {
                "id": "keji",
                "photo": "https://images.pexels.com/photos/2127969/pexels-photo-2127969.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
                "title": "科技"
            },
            {
                "id": "yule",
                "photo": "https://images.pexels.com/photos/9890370/pexels-photo-9890370.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360",
                "title": "娱乐"
            }
        ]
    },
    "message": "success"
  }

  return Promise.resolve(res_obj);
}
