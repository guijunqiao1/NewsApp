import request from "@/utils/request";
import mockNewsData from "@/data/news_mock_data.json";

const ALL_CHANNELS = ['全部', '头条']

const CHANNEL_KEYWORDS = {
  新闻: ['新闻'],
  国内: ['我国', '中国', '全国', '国产', '多地', '长江', '城市', '国家', '人民币', '高校', '快递', '住房', '公园', '秋粮'],
  国际: ['以色列', '巴基斯坦', '阿富汗', '荷兰', '万斯', '特朗普', '跨洋', '邻国'],
  政治: ['习近平', '政府', '政策', '谈判', '接管', '现代化', '峰会'],
  财经: ['财经', '经济', '贸易', '增长', '市场', '万科', '董事长', '人民币', '租赁', '产值', '业务量', '销量', '交易', 'TACO'],
  体育: ['体育', '比赛', '赛事', '球队', '冠军', '篮球', '足球', 'NBA'],
  娱乐: ['娱乐', '文化', '旅游', '博物馆', '展览', '观众', '假期'],
  军事: ['军事', '军方', '重炮', '坦克', '边境', '以色列', '巴基斯坦', '阿富汗', '哈马斯'],
  教育: ['教育', '高校', '毕业生', '就业', '学校', '学生'],
  科技: ['科技', '芯片', '5G', '人工智能', '量子', '智能', '储能', '电池', '大飞机', 'C919', '数字化', '计算', '网络'],
  NBA: ['NBA', '篮球'],
  股票: ['股票', '股', '万科', '交易', '市场', 'TACO', '董事长'],
  星座: ['星座'],
  女性: ['女性', '妇女'],
  育儿: ['育儿', '母婴', '儿童', '孩子']
}

const getSearchText = (item) => {
  return [item.title, item.src, item.category, item.content].filter(Boolean).join(' ')
}

const getFilteredNewsData = (channel) => {
  if (!channel || ALL_CHANNELS.includes(channel)) {
    return mockNewsData
  }

  if (channel === '新闻') {
    return mockNewsData.filter((item) => item.category === 'news')
  }

  const keywords = CHANNEL_KEYWORDS[channel] || [channel]
  return mockNewsData.filter((item) => {
    const text = getSearchText(item)
    return keywords.some((keyword) => text.includes(keyword))
  })
}

const getPageParams = (data = {}) => {
  return {
    page: Math.max(Number(data.start) || 1, 1),
    nums: Math.max(Number(data.nums) || 10, 1),
    channel: data.channel || '全部'
  }
}

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
export const getNewsList = (data = {}) => {
  // 模拟返回的promise
  // 封装内容对象
  
  const { page, nums, channel } = getPageParams(data)
  const filteredNewsData = getFilteredNewsData(channel)
  // 计算分页数据
  const start = (page - 1) * nums;
  const end = start + nums;
  const paginatedList = filteredNewsData.slice(start, end).map((item) => ({ ...item }));
  
  const res_obj = {
    "status": 0,
    "msg": "ok",
    "result": {
      "channel": channel,
      "num": filteredNewsData.length,
      "list": paginatedList
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
