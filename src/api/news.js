import requset from "@/utils/request";

/**
 * 获取新闻数据源  
 */
export const getNewsList = (data) => {
  return requset({
    url: '/get',
    Query: data
  })
}