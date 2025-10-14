/**
 * 从 itemElement 中抽离所有的 imgElement
 */
export const getImgElements = (elements) => {
  const imgElements = []
  elements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 获取所有的图片链接
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((el) => el.src)
}

/**
 * 监听图片数组加载完成 (promise)
 */
export const onComplateImgs = (imgs) => {
  // promise 集合
  const promises = []
  imgs.forEach((src, index) => {
    //为每个img的src创建相应的promise项，其中的内容为预图片处理逻辑
    promises[index] = new Promise((resolve) => {
      const newImage = new Image();//创建img加载对象
      newImage.src = src;//此处完成赋值之后立即开始资源下载操作
      newImage.onload = () => {//封装加载完毕事件的监听器
        resolve({ src, index })//处理后响应对象结果--暂时没用
      }
    })
  })
  return Promise.all(promises);//并行处理图片资源加载的promise的逻辑
}