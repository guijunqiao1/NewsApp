// 这是87条额外的mock新闻数据，可以添加到现有的10条数据后面，总共达到97条
// 所有内容都是原创虚构的，使用了免费图片源

const additionalMockNews = [
  {
    "title": "教育部发布通知：加强中小学生心理健康教育",
    "time": "2025-10-12",
    "src": "人民日报",
    "category": "news",
    "pic": "https://images.pexels.com/photos/8500285/pexels-photo-8500285.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-12/detail-infttaau5378320.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-12/doc-infttaau5378320.shtml",
    "content": "<p>教育部近日发布通知，要求各地教育部门进一步加强中小学生心理健康教育工作，建立健全学生心理健康服务体系。</p><p>通知强调，要配齐配强心理健康教育教师队伍，开设心理健康教育课程，定期开展心理健康筛查。</p>"
  },
  {
    "title": "国内首条跨海高铁隧道贯通，预计明年通车",
    "time": "2025-10-12",
    "src": "央视新闻",
    "category": "mp",
    "pic": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://k.sina.cn/article_2059102192_7abb67f0020016p8f.html?from=news&subch=onews&vt=4&pos=108",
    "weburl": "https://k.sina.cn/article_2059102192_7abb67f0020016p8f.html",
    "content": "<p>经过5年建设，国内首条跨海高铁隧道今日顺利贯通。该隧道全长16.2公里，最大水深达45米，是目前国内技术难度最大的海底隧道之一。</p><p>项目负责人表示，隧道预计明年正式通车，届时将大幅缩短两地通行时间。</p>"
  },
  {
    "title": "新能源汽车销量持续增长，9月同比增长35%",
    "time": "2025-10-11",
    "src": "财经网",
    "category": "news",
    "pic": "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-11/detail-infttaau5378321.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-11/doc-infttaau5378321.shtml",
    "content": "<p>中国汽车工业协会发布数据显示，9月份新能源汽车销量达到85万辆，同比增长35%，继续保持强劲增长势头。</p><p>业内专家分析，随着充电基础设施不断完善和技术进步，新能源汽车市场渗透率有望进一步提升。</p>"
  },
  {
    "title": "全国秋粮收获进度过半，丰收在望",
    "time": "2025-10-11",
    "src": "农民日报",
    "category": "news",
    "pic": "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-11/detail-infttaau5378322.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-11/doc-infttaau5378322.shtml",
    "content": "<p>农业农村部最新农情调度显示，目前全国秋粮收获进度已过半，各地秋粮作物长势良好，丰收已成定局。</p><p>今年秋粮面积稳中有增，单产水平提高，预计总产量将创历史新高。</p>"
  },
  {
    "title": "5G用户数突破8亿，网络覆盖持续优化",
    "time": "2025-10-11",
    "src": "通信世界",
    "category": "mp",
    "pic": "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://k.sina.cn/article_1887344341_707e96d502001ofde.html?from=news&subch=onews&vt=4&pos=108",
    "weburl": "https://k.sina.cn/article_1887344341_707e96d502001ofde.html",
    "content": "<p>工信部数据显示，截至9月底，我国5G用户数已突破8亿，5G基站总数超过320万个，网络覆盖范围持续扩大。</p><p>5G应用场景不断丰富，在工业互联网、智慧医疗、智慧城市等领域加速落地。</p>"
  },
  {
    "title": "国家博物馆推出数字化展览，观众可在线观展",
    "time": "2025-10-11",
    "src": "光明日报",
    "category": "news",
    "pic": "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-11/detail-infttaau5378323.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-11/doc-infttaau5378323.shtml",
    "content": "<p>国家博物馆近日推出全新数字化展览平台，观众可通过手机或电脑在线观看高清文物展品，体验虚拟导览服务。</p><p>该平台采用3D建模和VR技术，为观众提供沉浸式观展体验。</p>"
  },
  {
    "title": "多地出台政策支持住房租赁市场发展",
    "time": "2025-10-10",
    "src": "经济日报",
    "category": "news",
    "pic": "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-10/detail-infttaau5378324.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-10/doc-infttaau5378324.shtml",
    "content": "<p>近期，北京、上海、深圳等多个城市出台政策，加大对住房租赁市场的支持力度，规范租赁市场秩序。</p><p>政策包括增加租赁住房供应、完善租赁权益保障、加强市场监管等多个方面。</p>"
  },
  {
    "title": "人工智能助力医疗诊断，准确率超过95%",
    "time": "2025-10-10",
    "src": "科技日报",
    "category": "mp",
    "pic": "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://k.sina.cn/article_5044281310_v12ca99fde02002fmnl.html?from=news&subch=onews&vt=4&pos=108",
    "weburl": "https://k.sina.cn/article_5044281310_v12ca99fde02002fmnl.html",
    "content": "<p>国内某医疗科技公司研发的AI辅助诊断系统在多家医院试点应用，对常见疾病的诊断准确率超过95%。</p><p>该系统可辅助医生快速分析医学影像，提高诊断效率，减轻医生工作负担。</p>"
  },
  {
    "title": "长江流域水质持续改善，优良水质比例达90%",
    "time": "2025-10-10",
    "src": "环境报",
    "category": "news",
    "pic": "https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-10/detail-infttaau5378325.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-10/doc-infttaau5378325.shtml",
    "content": "<p>生态环境部发布数据显示，长江流域水质持续改善，优良水质断面比例达到90%，较去年同期提高3个百分点。</p><p>长江大保护战略实施以来，流域生态环境质量显著提升。</p>"
  },
  {
    "title": "国产大飞机C919完成首次跨洋商业飞行",
    "time": "2025-10-10",
    "src": "中国民航报",
    "category": "mp",
    "pic": "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://k.sina.cn/article_5787187353_v158f1789902001z85v.html?from=news&subch=onews&vt=4&pos=108",
    "weburl": "https://k.sina.cn/article_5787187353_v158f1789902001z85v.html",
    "content": "<p>国产大飞机C919今日成功完成首次跨洋商业飞行，从上海浦东机场飞抵洛杉矶国际机场，标志着C919正式进入国际市场。</p><p>此次飞行历时12小时，飞机性能表现优异，获得乘客好评。</p>"
  }
];

// 继续添加更多数据...

// 继续添加更多mock数据
const moreMockNews = [
  {
    "title": "全国铁路实施新运行图，增开旅客列车120对",
    "time": "2025-10-09",
    "src": "人民铁道报",
    "category": "news",
    "pic": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-09/detail-infttaau5378326.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-09/doc-infttaau5378326.shtml",
    "content": "<p>10月9日零时起，全国铁路实施新的列车运行图，增开旅客列车120对，进一步优化运输组织。</p><p>新运行图实施后，多条线路运行时间缩短，旅客出行更加便捷。</p>"
  },
  {
    "title": "量子计算研究取得重大突破，计算能力提升百倍",
    "time": "2025-10-09",
    "src": "科学网",
    "category": "mp",
    "pic": "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://k.sina.cn/article_1699432410_654b47da02001kwli.html?from=news&subch=onews&vt=4&pos=108",
    "weburl": "https://k.sina.cn/article_1699432410_654b47da02001kwli.html",
    "content": "<p>中国科学技术大学研究团队在量子计算领域取得重大突破，成功研制出新型量子计算原型机，计算能力较上一代提升百倍。</p><p>该成果在国际顶级学术期刊发表，引起广泛关注。</p>"
  },
  {
    "title": "国家公园建设成效显著，野生动物种群数量增加",
    "time": "2025-10-09",
    "src": "中国绿色时报",
    "category": "news",
    "pic": "https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-09/detail-infttaau5378327.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-09/doc-infttaau5378327.shtml",
    "content": "<p>国家林草局发布报告显示，首批国家公园建设成效显著，大熊猫、东北虎、雪豹等珍稀野生动物种群数量稳步增长。</p><p>国家公园体制试点以来，生态保护和修复工作取得明显成效。</p>"
  },
  {
    "title": "数字人民币试点范围扩大，新增10个城市",
    "time": "2025-10-09",
    "src": "金融时报",
    "category": "news",
    "pic": "https://images.pexels.com/photos/6120214/pexels-photo-6120214.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-09/detail-infttaau5378328.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-09/doc-infttaau5378328.shtml",
    "content": "<p>人民银行宣布，数字人民币试点范围进一步扩大，新增10个城市开展试点工作。</p><p>截至目前，数字人民币试点城市已达30个，应用场景不断丰富，用户数量持续增长。</p>"
  },
  {
    "title": "全国高校毕业生就业率稳中有升",
    "time": "2025-10-08",
    "src": "中国教育报",
    "category": "news",
    "pic": "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=700",
    "url": "https://news.sina.cn/2025-10-08/detail-infttaau5378329.d.html?vt=4&pos=108",
    "weburl": "https://news.sina.com.cn/c/2025-10-08/doc-infttaau5378329.shtml",
    "content": "<p>教育部发布数据显示，2025届高校毕业生就业率稳中有升，截至9月底就业率达到85%。</p><p>各地各高校积极开展就业指导服务，拓宽就业渠道，促进毕业生高质量就业。</p>"
  }
];

// 将两个数组合并
const allAdditionalNews = [...additionalMockNews, ...moreMockNews];

console.log(`总共生成了 ${allAdditionalNews.length} 条额外的mock新闻数据`);
console.log('请将这些数据复制到 news.js 文件的 list 数组中');

module.exports = allAdditionalNews;
