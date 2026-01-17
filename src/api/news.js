import request from "@/utils/request";

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
      "num": 10,
      "list": [
          {
              "title": "首批7名以色列被扣押人员获释",
              "time": "2025-10-13",
              "src": "环球网军事",
              "category": "mp",
              "pic": "https:\/\/k.sinaimg.cn\/n\/sinakd20251013s\/280\/w708h372\/20251013\/c02b-c2ecae0c3b5fdac3532b0e844c03bc53.jpg\/w700d1q75cms.jpg",
              "url": "https:\/\/k.sina.cn\/article_2059102192_7abb67f0020016p8e.html?from=news&subch=onews&vt=4&pos=108",
              "weburl": "https:\/\/k.sina.cn\/article_2059102192_7abb67f0020016p8e.html",
              "content": "<p>据以色列媒体13日报道，巴勒斯坦伊斯兰抵抗运动（哈马斯）开始释放以方被扣押人员。<\/p><p><i><div class=\"img_wrapper\"><img w=\"708\" h=\"372\" wh=\"1.90\"\/><\/div><\/i><\/p><p>以色列第12频道报道说，7名以方被扣押人员已被转交给红十字国际委员会，目前他们状况良好。随后不久，红十字国际委员会方面宣布接收哈马斯释放的7名被扣押人员。据悉，第一批获释人员包括马坦·安格里斯特、加利·伯曼、齐夫·伯曼、阿隆·奥尔、埃坦·莫尔、盖伊·吉尔博阿-达拉尔和欧姆里·米兰。<\/p><p>巴勒斯坦媒体13日报道，哈马斯会分两批释放被扣押人员，当地时间13日早8时释放第一批，10时释放第二批。以色列则会在当地时间上午10时释放其扣押的巴勒斯坦人员。（总台记者 李享）<\/p>"
          },
          {
              "title": "明抢了？荷兰政府接管中资芯片制造商，中企强烈抗议",
              "time": "2025-10-13",
              "src": "观察者网",
              "category": "mp",
              "pic": "https:\/\/k.sinaimg.cn\/n\/sinakd20251013s\/199\/w600h399\/20251013\/00bc-048ddeed25046ad370b4bb8f73becb7a.jpg\/w700d1q75cms.jpg",
              "url": "https:\/\/k.sina.cn\/article_1887344341_707e96d502001ofgg.html?from=news&subch=onews&vt=4&pos=108",
              "weburl": "https:\/\/k.sina.cn\/article_1887344341_707e96d502001ofgg.html",
              "content": "<p cms-style=\"font-L\">【文\/观察者网 柳白】<\/p><p cms-style=\"font-L\">中国科技进步深深触动西方霸权神经，一些国家的强盗底色愈发暴露无遗。<\/p><p cms-style=\"font-L\">近期，中国半导体领军企业闻泰科技遭遇跨国监管重大挑战，旗下总部位于荷兰的核心资产安世半导体（Nexperia）因荷兰政府指令，自9月30日起资产、知识产权等调整被冻结一年。<\/p><p cms-style=\"font-L\">与此同时，安世部分外籍高管甚至请求法庭启动公司调查，并暂停母公司闻泰科技委派的CEO履行职务。荷兰方面还要求任命一名拥有决定性投票权的外籍董事，并将安世半导体的所有股份（减去一股）托管给稍后指定并公布的人员。<\/p><p cms-style=\"font-L\">赤裸裸的抢夺，已然引发轩然大波。<\/p><p cms-style=\"font-L\">英国《金融时报》直言，荷兰政府此举将加剧西方国家与中国在高端技术领域的摩擦。彭博社等媒体也警告，这一非同寻常的举动将进一步加剧中欧紧张关系。<\/p><p cms-style=\"font-L\">闻泰科技12日晚发表声明严正指出，荷兰政府以莫须有的“国家安全”为由，对安世半导体实施全球运营冻结，是基于地缘政治偏见的过度干预，闻泰科技对这种针对中资企业的歧视性待遇表示强烈抗议。<\/p><div class=\"img_wrapper\"><img w=\"600\" h=\"399\" wh=\"1.50\"\/><\/div><p cms-style=\"font-L\">安世半导体的一名员工走过该公司的洁净室。<font cms-style=\"font-L\"> 视觉中国<\/font><\/p><p cms-style=\"font-L\"><font cms-style=\"font-L strong-Bold\">“严重不合理的外部接管”<\/font><\/p><p cms-style=\"font-L\">公开资料显示，安世半导体总部位于荷兰奈梅亨，是闻泰科技核心半导体业务基础，专注分立器件与逻辑器件。其前身是恩智浦半导体的一个部门，2017年独立运营，2019年被闻泰科技全资收购，现为闻泰科技全资子公司。2024年，安世半导体收入规模约147亿元，约占闻泰科技当年总营收的六分之一。<\/p><p cms-style=\"font-L\">闻泰方面对媒体强调，荷兰经济事务部的指令，其核心理由是“保障供应链安全”。但闻泰方面认为，该指令的范围之广、限制之严，已远超常规风险管控，是对一家正常经营的企业实施了严重不合理的外部接管。<\/p><p cms-style=\"font-L\">这次对中资企业采取行动，荷兰政府也玩起了“国家安全”的老套路。<\/p><p cms-style=\"font-L\">荷兰经济事务部12日在一份声明中声称，这是荷兰政府首次启用《商品供应法》（Goods Availability Act），原因是“荷兰及欧洲本土关键技术知识与能力的连续性和安全性面临威胁”。<\/p><p cms-style=\"font-L\">声明辩称，采取此次行动的另一原因是安世“内部存在严重的治理缺陷与问题行为”“该决定旨在防范一种风险，即紧急情况下，安世半导体生产的产品（成品及半成品）可能无法供应，相关产品包括用于欧洲汽车行业和消费电子领域的芯片等。”<\/p><p cms-style=\"font-L\">声明还称，最新举措“不针对其他企业、行业或国家”“相关方可就该决定向法院提出异议”。<\/p><p cms-style=\"font-L\">荷兰《新鹿特丹商报》（NRC）引述所谓内部人士的话炒作称，“有迹象”表明安世半导体计划向中国泄露芯片技术，这将对荷兰国家和经济安全构成直接威胁。<\/p><p cms-style=\"font-L\">报道称，安世设计的芯片并不比英伟达、AMD、高通或英特尔等巨头先进，但其注重效率的业务流程能够提高良率并减少芯片缺陷，绝对是有价值的。<\/p><p cms-style=\"font-L\"><font cms-style=\"font-L strong-Bold\">“进一步加剧中欧紧张关系”<\/font><\/p><p cms-style=\"font-L\">据悉，荷兰政府于9月30日已开始采取相关行动，但直至10月12日才对外公开。<\/p><p cms-style=\"font-L\">就在荷兰政府宣布该决定的数小时前，闻泰科技已在上交所发布公告，就本次事件作出详细说明。<\/p><p cms-style=\"font-L\">公告介绍，荷兰时间9月30日，荷兰经济事务与气候政策部对安世下达部长令，要求安世及其下属所有子公司、分公司、办事处等全球30个主体对其资产、知识产权、业务及人员等不得进行任何调整，有效期为一年。<\/p><p cms-style=\"font-L\">10月1日，安世半导体控股以及安世半导体（荷兰注册主体）法定董事兼首席法务官Ruben Lichtenberg（CLO，荷兰籍）在获得其他两位高管，即首席财务官Stefan Tilger（CFO，德国籍）以及首席运营官Achim Kempe（COO，德国籍）的支持下，代表安世半导体以及安世半导体控股，向企业法庭提交了启动对公司调查与采取临时措施的紧急请求。<\/p><p cms-style=\"font-L\">荷兰时间10月6日下午，企业法庭安排开庭，并于荷兰时间10月7日下午裁决，以下主要事项作为临时紧急救济，自紧急措施的裁决生效之日（即10月7日）起至本案调查完成最终判决或者以其他方式结束：<\/p><p cms-style=\"font-L\">（1）暂停张学政在安世半导体控股的非执行董事和安世半导体的执行董事职务；<\/p><p cms-style=\"font-L\">（2）任命一位独立于安世的企业法庭指派的外籍人士担任安世半导体控股及安世半导体的非执行董事，拥有决定性投票权；同时裁定，该董事有权独立代表安世半导体控股及安世半导体；<\/p><p cms-style=\"font-L\">（3）将安世半导体的所有股份（减去一股）出于管理目的托管给稍后指定并公布的人员。<\/p><div class=\"img_wrapper\"><img w=\"741\" h=\"1014\" wh=\"0.73\"\/><\/div><p cms-style=\"font-L\">欧洲科技媒体Techzine网站形容，最新指令堪称“史无前例的紧急措施”，意味着在一年内，安世半导体只有在获得荷兰政府允许的情况下才能作出有关业务运营的关键决策。<\/p><p cms-style=\"font-L\">彭博社13日担心，这一非同寻常的举动可能会加剧中欧紧张关系。香港英文媒体《南华早报》同样警告，由于光刻机巨头阿斯麦一直被限制与中国的合作，此举将进一步加剧荷兰与中国的紧张局势，并损害中欧关系。<\/p><p cms-style=\"font-L\">10月12日，微信公众号“闻泰科技”就荷兰政府干预闻泰科技旗下安世半导体运营发表严正立场。<\/p><p cms-style=\"font-L\">声明强调，荷兰政府以莫须有的“国家安全”为由，对安世半导体实施全球运营冻结，是基于地缘政治偏见的过度干预，而非基于事实的风险评估。此举严重违背了欧盟一贯倡导的市场经济、公平竞争和国际经贸规则。闻泰科技对这种针对中资企业的歧视性待遇表示强烈抗议。<\/p><p cms-style=\"font-L\">声明指出，安世半导体个别外籍管理层试图通过法律程序强行改变安世半导体股权结构，其诉求与荷兰政府指令高度联动，本质是借政治压力剥夺股东权利、颠覆公司合法治理结构。公司对此类以“合规”为名、行夺权之实的行为予以谴责。<\/p><p cms-style=\"font-L\">2022年11月，英国政府也曾以“国家安全”为由，阻挠安世半导体收购该国芯片生产商Newport Wafer Fab。<\/p><p cms-style=\"font-L\">眼下，中美在科技领域的博弈已进入深水区。<\/p><p cms-style=\"font-L\">《金融时报》注意到，荷兰政府的行动恰好发生在美国政府相关行动之后。<\/p><p cms-style=\"font-L\">在美国施压下，荷兰政府此前已限制阿斯麦对华出口先进半导体制造设备。<\/p><p cms-style=\"font-L\">美国商务部去年12月已将闻泰科技列入“实体清单”。就在这次荷兰政府采取行动的前一天，美国政府9月29日发布出口管制穿透性规则，对被列入“实体清单”、持股超过50%的子公司追加同等出口管制。<\/p><p cms-style=\"font-L\">这一被业界称为“50%规则”的措施，标志着美国对华科技打压再次升级，以一种“连坐”制度，将管制的范围从直接列入清单的实体扩展到其持股过半的所有子公司。<\/p><p cms-style=\"font-L\">中国商务部迅速回应，指出此举性质极其恶劣，是美方泛化国家安全、滥用出口管制的又一典型例证，并明确表示中方将采取必要措施，坚决维护中国企业的合法权益。<\/p><p cms-style=\"font-L\">愈演愈烈的围堵打压，终究不过美西方优势崩塌的最后哀鸣。正如闻泰科技声明所言：暂时的寒流挡不住产业向上的力量，一时的不公压不垮坚守正义的决心，规则终将战胜偏见，相信正义终将如期而至。<\/p><p cms-style=\"font-L\"><font cms-style=\"font-L strong-Bold\">本文系观察者网独家稿件，未经授权，不得转载。<\/font><\/p>\n             \n             \n                <p style=\"font-size: .24rem;color: #888;font-weight: 400;\">发布于：上海<\/p>"
          },
          {
              "title": "成都一辆小米SU7超速失控自燃：路人施救未果，原因在调查中",
              "time": "2025-10-13",
              "src": "澎湃新闻",
              "category": "mp",
              "pic": "https:\/\/n.sinaimg.cn\/sinakd20112\/533\/w480h853\/20251013\/7b5e-acf5f796b341659f0b307d2aea56eb0c.jpg",
              "url": "https:\/\/k.sina.cn\/article_5044281310_v12ca99fde02002fmnk.html?from=news&subch=onews&vt=4&pos=108",
              "weburl": "https:\/\/k.sina.cn\/article_5044281310_v12ca99fde02002fmnk.html",
              "content": "<p>来源：澎湃新闻记者 吕新文<\/p><p cms-style=\"font-L\">2025年10月13日凌晨3时16分左右，成都天府大道仁寿视高段发生一起严重交通事故，涉事车辆为小米SU7。从现场流出的相关视频、图片以及现场目击者确认，驾驶员已不幸遇难。<\/p><p cms-style=\"font-L\">10月13日，成都市公安局交管六分局事故大队工作人员告诉澎湃新闻，他们并不清楚昨晚这起交通事故的情况，需要到该大队向办案民警咨询。小米汽车客服工作人员也表示，由于事发时间是凌晨三点，这个时段没有工作人员值班，他们未接到相关求助或报案电话。<\/p>\n            <!--单视频_s-->\n            <a class=\"art_video_box j_article_video\" href=\"JavaScript:void(0)\">\n              <figure class=\"art_video\" data-ratio=\"720-1280\" data-infos='{\"attrs\":{\"data-tid\":\"\",\"data-did\":\"nfttnsp3014232\",\"data-cid\":\"\",\"data-sid\":\"1\",\"data-vid\":\"570870374\",\"data-adtags\":\"\",\"data-vLength\":27000,\"data-advid\":\"\",\"poster\":\"https:\/\/n.sinaimg.cn\/sinakd20112\/533\/w480h853\/20251013\/7b5e-acf5f796b341659f0b307d2aea56eb0c.jpg\",\"controls\":\"controls\",\"tabindex\":\"0\",\"preload\":\"auto\",\"data-lov\":\"vod\",\"data-vpid\":\"570870374\",\"data-fcid\":\"\",\"data-livesource\":\"vms\",\"data-liveEditChannel\":\"\",\"data-vot\":\"\",\"data-lt\":\"\",\"data-vd\":27000},\"baseUrl\":\"https:\/\/f.video.weibocdn.com\/o0\/L3GYPgE4lx08s93Kq0nS01041200egC50E010.mp4?label=mp4_720p&template=720x1280.25.0&media_id=5221268275003399&tp=ClyPwxTpev3p5rBIJG7:YTkl0eM8&us=0&ori=1&bf=4&ot=v&ps=3lckmu&uid=7ZwuKJ&ab=,15568-g4,8013-g0,3601-g41&Expires=1760344190&ssig=7S22sF%2BBLo&KID=unistore,video&r=video.sina.com.cn%2Fview%2F570870374.html\"}'>\n                  <img src='http:https:\/\/n.sinaimg.cn\/sinakd20112\/533\/w480h853\/20251013\/7b5e-acf5f796b341659f0b307d2aea56eb0c.jpg' alt=\"\" class=\"img_width\"\/>\n                  <em class=\"art_video_btn cm_c_c j_video_play_btn\"><span class=\"icon_b_video\"><\/span><\/em>\n              <\/figure>\n              <h2 class=\"cm_tit art_video_tit_solo\"><\/h2>\n            <\/a>\n            <!--单视频_e--><p cms-style=\"font-L\">据现场流出的视频显示，事发前，该小米SU7不仅行驶状态异常，而且摇摆不定。有网友称，等红绿灯时曾听到车内驾驶员大声吼叫。随后车辆以极高速度行驶，一个行车记录仪视频显示，出事小米从其右侧冲出去，而另一则行车记录视频则显示车速在100km\/h至150km\/h区间。当车辆行至红绿灯路口时，疑似为躲避右转车辆向左打方向盘，随即失控，撞向绿化带并翻滚至对向车道后迅速起火，火势很快蔓延。<\/p><p cms-style=\"font-L\">现场视频显示，事故发生后，驾驶位人员被困车内，多名路过市民立即上前参与救援。有人徒手或用工具猛砸车窗，有人专程拿来灭火器，但车门始终无法打开，砸窗也未能成功。一张视频截图显示，一名参与救援的男子右手被划伤流血。<\/p><p cms-style=\"font-L\">澎湃新闻注意到，消防救援人员赶到现场灭火过程中，汽车燃烧发出啪啪声响。明火扑灭后，车辆仅剩车架，救援人员打不开车门，用锤子、电锯开门。多方位视频图像内容显示，被困驾驶员早已没有生命体征。<\/p><p cms-style=\"font-L\">10月13日，成都市公安局交管六分局事故大队工作人员告诉澎湃新闻，他们并不清楚昨晚这起交通事故的情况，需要到该大队向办案民警咨询。成都消防回应称，目前事故具体原因仍在调查中，不便接受采访。<\/p><p cms-style=\"font-L\">小米汽车客服工作人员也表示，由于事发时间是凌晨三点，这个时段没有工作人员值班，他们未接到相关求助或报案电话。<\/p>\n             \n             \n                <p style=\"font-size: .24rem;color: #888;font-weight: 400;\">发布于：上海<\/p>"
          },
          {
              "title": "新华社权威快报|4%！前三季度我国货物贸易平稳增长",
              "time": "2025-10-13",
              "src": "新华社",
              "category": "mp",
              "pic": "https:\/\/k.sinaimg.cn\/n\/sinakd20251013s\/300\/w720h380\/20251013\/846c-4384e1cba66296040f09b1e69c74a1d9.jpg\/w700d1q75cms.jpg",
              "url": "https:\/\/k.sina.cn\/article_1699432410_654b47da02001kwlg.html?from=finance&kdurlshow=1&vt=4&pos=108",
              "weburl": "https:\/\/k.sina.cn\/article_1699432410_654b47da02001kwlg.html",
              "content": "<div class=\"img_wrapper\"><img w=\"640\" h=\"1044\" wh=\"0.61\"\/><\/div><p cms-style=\"font-L\">面对严峻复杂的外部环境，我国货物贸易实现平稳增长。<\/p><p cms-style=\"font-L\">海关总署13日发布数据显示，今年前三季度，我国货物贸易进出口总值33.61万亿元，同比增长4%，比前8个月加快0.5个百分点。<\/p><p cms-style=\"font-L\">其中，出口19.95万亿元，同比增长7.1%，连续8个季度保持增长；进口13.66万亿元，同比下降0.2%。<\/p><p cms-style=\"font-L\">9月当月，进出口4.04万亿元，同比增长8%，比上月加快4.5个百分点，为今年以来月度最高增速。<\/p><p cms-style=\"font-L\">记者：邹多为、黄韬铭<\/p><p cms-style=\"font-L\">海报制作：吴彬尔<\/p><p cms-style=\"font-L\">新华社国内部出品<\/p>\n             \n             \n                <p style=\"font-size: .24rem;color: #888;font-weight: 400;\">发布于：北京<\/p>"
          },
          {
              "title": "巴基斯坦军方出动重炮和坦克轰击阿富汗边境，200余人在冲突中死亡",
              "time": "2025-10-13",
              "src": "羊城派",
              "category": "mp",
              "pic": "https:\/\/n.sinaimg.cn\/sinakd20112\/533\/w480h853\/20251013\/511e-a56cabaa73961eb49b5218d521d7c29e.jpg",
              "url": "https:\/\/k.sina.cn\/article_5787187353_v158f1789902001z85u.html?from=news&subch=onews&vt=4&pos=108",
              "weburl": "https:\/\/k.sina.cn\/article_5787187353_v158f1789902001z85u.html",
              "content": "<!--单视频_s-->\n            <a class=\"art_video_box j_article_video\" href=\"JavaScript:void(0)\">\n              <figure class=\"art_video\" data-ratio=\"608-1080\" data-infos='{\"attrs\":{\"data-tid\":\"\",\"data-did\":\"nftthks5397178\",\"data-cid\":\"\",\"data-sid\":\"1\",\"data-vid\":\"570868565\",\"data-adtags\":\"\",\"data-vLength\":8000,\"data-advid\":\"\",\"poster\":\"https:\/\/n.sinaimg.cn\/sinakd20112\/533\/w480h853\/20251013\/511e-a56cabaa73961eb49b5218d521d7c29e.jpg\",\"controls\":\"controls\",\"tabindex\":\"0\",\"preload\":\"auto\",\"data-lov\":\"vod\",\"data-vpid\":\"570868565\",\"data-fcid\":\"\",\"data-livesource\":\"vms\",\"data-liveEditChannel\":\"\",\"data-vot\":\"\",\"data-lt\":\"\",\"data-vd\":8000},\"baseUrl\":\"https:\/\/f.video.weibocdn.com\/o0\/X381z3S2lx08s913tq5q0104120037qi0E010.mp4?label=mp4_720p&template=608x1080.25.0&media_id=5221258502275109&tp=ClyPwxTpev3p5rBIJG7:YTkl0eM8&us=0&ori=1&bf=4&ot=v&ps=3lckmu&uid=7ZwuKJ&ab=,15568-g4,8013-g0,3601-g41&Expires=1760335116&ssig=uPyDRvD2gA&KID=unistore,video&r=video.sina.com.cn%2Fview%2F570868565.html\"}'>\n                  <img src='http:https:\/\/n.sinaimg.cn\/sinakd20112\/533\/w480h853\/20251013\/511e-a56cabaa73961eb49b5218d521d7c29e.jpg' alt=\"\" class=\"img_width\"\/>\n                  <em class=\"art_video_btn cm_c_c j_video_play_btn\"><span class=\"icon_b_video\"><\/span><\/em>\n              <\/figure>\n              <h2 class=\"cm_tit art_video_tit_solo\"><\/h2>\n            <\/a>\n            <!--单视频_e--><p cms-style=\"font-L\"><font cms-style=\"font-L align-Center\">10月12日，巴基斯坦军方发布视频显示，巴基斯坦与阿富汗爆发激烈边境交火期间，巴陆军出动包括牵引火炮和坦克在内的大量重型武器，连续攻击并摧毁了多个阿富汗军队的兵营及哨所。<\/font><\/p><p cms-style=\"font-L\"><font cms-style=\"font-L align-Center\">据新华社，当地时间11日深夜至12日凌晨，巴基斯坦与阿富汗在两国边境地区交火。巴方谴责“阿富汗在巴阿边境地区的挑衅行为”，要求阿方确保其领土不被用于针对巴基斯坦的恐怖活动。阿富汗方面称，将对任何侵犯阿领土的行为作出回应。<\/font><\/p><p cms-style=\"font-L\"><font cms-style=\"font-L align-Center\">另据《参考消息》援引法新社10月12日报道，巴基斯坦军方当天表示，巴方23名士兵和超过200名阿富汗塔利班成员及其战斗人员在夜间的边境冲突中死亡。<\/font><\/p><p cms-style=\"font-L\"><font cms-style=\"font-L align-Center\">军方在一份声明中表示：“精确袭击及实地突袭针对的是塔利班营地和哨所（以及）恐怖分子训练设施。”<\/font><\/p><p cms-style=\"font-L\"><font cms-style=\"font-L align-Center\">声明说，23名己方士兵被打死，29人受伤，而“超过200名塔利班成员及其附属的恐怖分子被消灭”。<\/font><\/p><p cms-style=\"font-L\"><font cms-style=\"font-L align-Center\">阿富汗政府首席发言人扎比乌拉·穆贾希德当天则表示，阿富汗部队夺取了25个巴基斯坦军方哨所，58名巴基斯坦士兵被打死，另有30人受伤。<\/font><\/p><p cms-style=\"font-L\"><font cms-style=\"font-L align-Center\">（羊城晚报•羊城派综合自参考消息、新华社）<\/font><\/p>\n             \n             \n                <p style=\"font-size: .24rem;color: #888;font-weight: 400;\">发布于：广东<\/p>"
          },
          {
              "title": "中国这两个邻国，大打出手了",
              "time": "2025-10-13",
              "src": "新浪新闻",
              "category": "news",
              "pic": "https:\/\/n.sinaimg.cn\/default\/crawl\/375\/w550h625\/20251013\/3d01-16d19e94ade5d34b73301c0602983d3f.jpg",
              "url": "https:\/\/news.sina.cn\/gj\/2025-10-13\/detail-inftsvuy3981809.d.html?vt=4&pos=108",
              "weburl": "https:\/\/news.sina.com.cn\/w\/2025-10-13\/doc-inftsvuy3981809.shtml",
              "content": "<p class=\"art_p\" cms-style=\"font-L \">来源：牛弹琴<\/p>\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"625\" src='https:\/\/k.sinaimg.cn\/n\/default\/crawl\/375\/w550h625\/20251013\/3d01-16d19e94ade5d34b73301c0602983d3f.jpg\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L strong-Bold color330\">很无奈地，中国这两个邻国，大打出手了。<\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">一个是巴基斯坦，另一个是阿富汗。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">战况很惨烈。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L strong-Bold\"><font cms-style=\"font-L\">巴基斯坦方面10月12日的通报，在边境冲突中，巴方有23名士兵阵亡，29人受伤，<\/font><font cms-style=\"font-L\">而“超过200名塔利班成员及其附属的恐怖分子被消灭”。<\/font><\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">按照媒体的报道，巴军方不再忍让和克制，巴枭龙战机穿越边境，突袭了阿富汗首都喀布尔的“恐怖分子”营地。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">看图片和视频，一些地点，爆炸猛烈，战火熊熊。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">阿富汗方面的通报，阿富汗部队也没有客气，大炮袭击巴基斯坦边境哨所，25个巴军哨所被攻占，58名巴军士兵被打死，另有30人受伤。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">这是塔利班重新夺取阿富汗全国政权后，两国间爆发的最激烈的一次冲突。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">尤其让人痛心的是，巴基斯坦与塔利班还曾有着特殊关系。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">事实上，巴基斯坦和阿富汗，一直被认为是兄弟之国，当年塔利班的崛起，就与巴基斯坦方面的扶持有重要关系。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">但国际关系的讽刺莫过于此：昨天还在哺育的雏鹰，今天却成了啄伤自己的猛禽。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">塔利班在阿富汗坐大后，与巴基斯坦龃龉不断。美军撤离阿富汗，塔利班重新掌控阿富汗后，两国更是冲突不断。<\/p>\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"362\" src='https:\/\/k.sinaimg.cn\/n\/default\/crawl\/112\/w550h362\/20251013\/e40f-6bdb1c47e419f015d02cf15ca8dac1a2.jpg\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n<p class=\"art_p\" cms-style=\"font-L\">这里，大家要仔细分辨一下，<font cms-style=\"font-L strong-Bold color330\">阿塔和巴塔。<\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">阿塔是阿富汗塔利班，巴塔是巴基斯坦塔利班。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">我们通常所说的塔利班，一般都指阿塔。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">虽然都是塔利班，但两者多少还是有区别的。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">巴塔被公认为恐怖组织，制造了巴境内很多起恐怖袭击，受害者有巴基斯坦人，也有我们中国人和其他外国人。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">阿塔则称自己是一个政治军事组织，公开表示禁止任何组织或个人利用阿富汗领土威胁其他国家，2021年美国仓皇撤军后，阿塔再次执掌阿富汗。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">但在巴基斯坦看来，巴塔之所以这么猖獗，背后就在于有阿塔的包庇。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">毕竟，现在的阿富汗，在阿塔完全控制之下，大批巴塔恐怖分子能藏身阿富汗，没有阿塔的“关照”，显然也是不可能的。<\/p>\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"306\" src='https:\/\/k.sinaimg.cn\/n\/default\/crawl\/56\/w550h306\/20251013\/9666-d6566e52633e2a2e9964e41295ec1f17.jpg\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n<p class=\"art_p\" cms-style=\"font-L\">更要看到，这次巴基斯坦和阿富汗冲突的大背景。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">巴基斯坦和沙特，刚刚签署了共同防卫条约。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">条约规定，对任何一国的攻击，就是对另一国的攻击。巴基斯坦和沙特，受以色列空袭卡塔尔刺激，事实上军事结盟了。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">印度和阿富汗则越走越近。就在巴阿爆发边境冲突的一天前，阿富汗外长穆塔基到访印度，印度和阿富汗宣布重建外交关系。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L\"><font cms-style=\"font-L color330\">以前，印度是塔利班的死敌；现在穆塔基公开表态，<\/font><\/font><font cms-style=\"font-L\"><font cms-style=\"font-L\"><font cms-style=\"font-L color330\">“阿富汗视印度为亲密朋友”。<\/font><\/font><\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">这真是地缘政治最生动的写照：昨天的死敌可以变成今天的挚友，只要利益的天平发生了倾斜。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L\">还必须看到，巴基斯坦多次指控，巴境内的一些恐怖活动，<\/font><font cms-style=\"font-L\"><font cms-style=\"font-L\">幕后策动袭击的，则是“外国敌对情报机构”。<\/font><\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">“外国敌对情报机构”，是哪一个？<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">巴基斯坦没有明说，但看看巴基斯坦的邻国，哪一个最反对巴基斯坦，你就应该懂的。<\/p>\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"634\" src='https:\/\/k.sinaimg.cn\/n\/default\/crawl\/384\/w550h634\/20251013\/b983-9b31be3b564020647b92a3ba369b39f8.jpg\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L\">我看到，一些西方媒体就分析，<\/font><font cms-style=\"font-L\">巴基斯坦对阿富汗的空袭，恰逢塔利班外长对印度的“罕见访问”，“印度是巴基斯坦的长期对手，这次旅行引起了伊斯兰堡的担忧”。<\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">印度和阿富汗的联合声明中的一些表态，更让巴基斯坦出离愤怒。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">比如，在阿富汗口中，印控克什米尔属于印度。巴基斯坦就愤怒质问阿塔，你们这是对当地人民的牺牲和情感，“缺乏应有的敏感认识”。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">还有，阿塔认为，恐怖主义是巴基斯坦内部问题。巴基斯坦指责，有足够证据，显示恐怖组织从阿领土上对巴境内发动攻击，且得到了阿境内某些势力的支持。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">过去40多年，阿富汗战争连绵，大量难民涌入巴基斯坦。当年，我还去过白沙瓦等地的难民营，巴基斯坦确实承担了巨大的民族牺牲。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">但阿富汗居然转向印度，这尤其让巴基斯坦难以接受。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L\">所以，我看到，巴外交部就明确表态，<font cms-style=\"font-L color330\">“<\/font><\/font><font cms-style=\"font-L\"><font cms-style=\"font-L color330\">巴基斯坦在40多年的时间里，慷慨地接纳了近400万阿富汗人。随着和平逐渐回归阿富汗，是时候让居住在巴境内未获授权的阿富汗人返回自己的国家了。”<\/font><\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">国际政治的现实往往如此残酷：善意的付出，未必能换来感恩的回响。甚至，是更仇视的目光。<\/p>\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"360\" h=\"270\" src='https:\/\/k.sinaimg.cn\/n\/default\/crawl\/630\/w360h270\/20251013\/0ee0-b0110e270f9595f0acc44e50eef1b1ec.jpg\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n<p class=\"art_p\" cms-style=\"font-L\">最后，怎么看？<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">还是粗浅三点吧。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L strong-Bold color330\">第一，阿富汗塔利班，确实要兑现承诺。<\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">别忘了，阿塔重新执政后，多次表态，不会支持恐怖主义，要与周边国家睦邻友好。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L\"><font cms-style=\"font-L\">阿塔还多次向中方承诺：<\/font><\/font><font cms-style=\"font-L strong-Bold\"><font cms-style=\"font-L\">决不允许任何人、任何势力利用阿领土做危害中国的事情。<\/font><\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">但我们看到，近年来，巴基斯坦境内多次恐袭，有些还特别针对我们中国人，手段让人发指，结果让人愤怒。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">如果真如巴基斯坦所言，这次袭击的主导者来自阿富汗，那阿塔就违背了自己承诺。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">这个世界，人在做，天在看。阿塔啊阿塔，确实要兑现承诺啊。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L strong-Bold color330\">第二，印度，肯定也在积极布局。<\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">不得不说，在印巴最近一轮冲突中，印度没有捞取到任何好处；但在对阿富汗外交中，印度却取得了重大突破。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">印度、巴基斯坦、塔利班，这中间的恩恩怨怨，真是让人眼花缭乱。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">地缘博弈的精髓在于：当你在一处失意时，必定会在另一处寻找突破口。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">但利益之交，就真能长久吗？<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">对巴基斯坦来说，自己当年扶持的塔利班，现在居然倒向了印度，心头的愤懑更可想而知。<\/p>\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"366\" src='https:\/\/k.sinaimg.cn\/n\/default\/crawl\/116\/w550h366\/20251013\/4594-1d3c76dc8e9cf443bcff69921d5033ea.jpg\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L strong-Bold color330\">第三，就说一个好消息吧。<\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">虽然冲突很猛烈，但双方显然都认识到，继续干下去，对双方都没有好处。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">所以，在卡塔尔、沙特等国斡旋下，阿富汗塔利班宣布，停止对巴基斯坦的攻击，但还兀自强调，“我们将坚定保卫自己的土地”。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">毕竟，在巴基斯坦和阿富汗的力量对比上，巴基斯坦是实力更强大的一方；阿富汗要发展，很多事情还需要仰仗巴基斯坦。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\"><font cms-style=\"font-L\">看社交媒体上的消息，在这次冲突中，巴基斯坦还缴获了大批美军装备——当年美军仓皇撤离阿富汗，这些武器就成了塔利班的战利品，现在又被巴基斯坦缴获了。<\/font><font cms-style=\"font-L strong-Bold\"><\/font><\/p>\n<p class=\"art_p\" cms-style=\"font-L\">历史的轮回总是充满讽刺：美国人的武器，塔利班的战利品，巴基斯坦的战利品，这出戏码比任何剧本都更富戏剧性。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">但<font cms-style=\"font-L strong-Bold color330\">兄弟之国，现在沦落到这个境地；印度还上下其手，真是让人不胜唏嘘。<\/font><\/p><p style=\"text-align:right;\" class=\"article-editor\">责任编辑：陈建瑞 SN243<\/p>\t\n<!-- content end -->"
          },
          {
              "title": "新华社快讯：习近平出席全球妇女峰会开幕式",
              "time": "2025-10-13",
              "src": "新华社",
              "category": "news",
              "pic": "https:\/\/n.sinaimg.cn\/default\/2fb77759\/20151125\/320X320.png",
              "url": "https:\/\/news.sina.cn\/2025-10-13\/detail-inftthkn8424377.d.html?vt=4&pos=108",
              "weburl": "https:\/\/news.sina.com.cn\/gov\/xlxw\/2025-10-13\/doc-inftthkn8424377.shtml",
              "content": "<p class=\"art_p\">新华社快讯：全球妇女峰会开幕式10月13日上午在北京举行。国家主席习近平出席峰会开幕式。峰会的主题是“命运与共：加速妇女全面发展新进程”。<\/p><p style=\"text-align:right;\" class=\"article-editor\">责任编辑：王树淼 SN242<\/p>\t\n<!-- content end -->"
          },
          {
              "title": "学习卡丨“推进中国式现代化，要把水资源问题考虑进去”",
              "time": "2025-10-13",
              "src": "央视新闻客户端",
              "category": "news",
              "pic": "https:\/\/n.sinaimg.cn\/news\/crawl\/635\/w550h885\/20251013\/59a8-da0dca029bf71945d6568c50fbfcafcc.png",
              "url": "https:\/\/news.sina.cn\/2025-10-13\/detail-infttaat3117557.d.html?vt=4&pos=108",
              "weburl": "https:\/\/news.sina.com.cn\/gov\/xlxw\/2025-10-13\/doc-infttaat3117557.shtml",
              "content": "<p class=\"art_p\">水是生存之本，文明之源。党的十八大以来，党中央统筹推进水灾害防治、水资源节约、水生态保护修复、水环境治理，建成了一批跨流域跨区域重大引调水工程。<\/p>\n<p class=\"art_p\">习近平总书记强调，推进中国式现代化，要把水资源问题考虑进去。如何治水节水护水？一起学习↓<\/p>\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"885\" src='https:\/\/k.sinaimg.cn\/n\/news\/crawl\/635\/w550h885\/20251013\/59a8-da0dca029bf71945d6568c50fbfcafcc.png\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"1687\" src='https:\/\/k.sinaimg.cn\/n\/news\/crawl\/637\/w550h1687\/20251013\/30f5-159f91913c2d82707360a187ef016cfd.png\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"872\" src='https:\/\/k.sinaimg.cn\/n\/news\/crawl\/622\/w550h872\/20251013\/fbf8-41f249fb3babc3b4a5fbe0efd8d6f21b.png\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"918\" src='https:\/\/k.sinaimg.cn\/n\/news\/crawl\/668\/w550h918\/20251013\/140f-07d622f4eaa228c22c8b456d23fd2dd1.png\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n\r\n\t\t\t\t\t\t\t\t\t\t<figure class=\"art_img_mini j_p_gallery\">\r\n\t\t\t\t\t\t\t\t\t\t\t<img class=\"art_img_mini_img j_fullppt_cover\"  w=\"550\" h=\"918\" src='https:\/\/k.sinaimg.cn\/n\/news\/crawl\/668\/w550h918\/20251013\/b9e7-ee6b253dbb6e09ea7eeca7009fbaede8.png\/w700d1q75cms.jpg?by=cms_fixed_width' alt=\"\" \/>\r\n\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"art_img_tit\"><\/h2>\r\n\t\t\t\t\t\t\t\t\t\t<\/figure>\r\n\t\t\t\t\t\t\t\t\t\n<p class=\"art_p\">总监制丨闫帅南<\/p>\n<div sax-type=\"proxy\" class=\"j_native_lmn251013 box\" style=\"margin:20px 0\"><\/div><p class=\"art_p\">监制丨王元<\/p>\n<p class=\"art_p\">主编丨王兴栋<\/p>\n<p class=\"art_p\">编辑&amp;制图丨马玮璐<\/p><p style=\"text-align:right;\" class=\"article-editor\">责任编辑：王树淼 SN242<\/p>\t\n<!-- content end -->"
          },
          {
              "title": "万斯称特朗普愿与中国理性谈判，TACO交易再现市场波动",
              "time": "2025-10-13",
              "src": "观察者网",
              "category": "mp",
              "pic": "https:\/\/k.sinaimg.cn\/n\/sinakd\/sni\/580\/w648h732\/20251013\/ba4a-dab7d787550a4659dfe4afc32f1622b9.jpg\/w700d1q75cms.jpg",
              "url": "https:\/\/k.sina.cn\/article_1887344341_707e96d504001ofdc.html?from=news&subch=onews&vt=4&pos=108",
              "weburl": "https:\/\/k.sina.cn\/article_1887344341_707e96d504001ofdc.html",
              "content": "<p><font>【万斯称“特朗普愿意与中国进行理性谈判”！“TACO”交易再次上演】#TACO交易再次上演# 10月12日晚间，美国副总统万斯在接受采访时，针对特朗普的最新关税威胁，释放了一些缓和的信号。<\/font><\/p><p><font>万斯在节目中表示：“特朗普愿意与中国进行理性谈判。”<\/font><\/p><p><font>此前，特朗普宣布，将自11月1日起对中国商品加征100%的关税，并限制某些美国软件的出口。<\/font><\/p><p><font>万斯表示，他周六和周日都与特朗普通话。万斯说，总统“珍视他与中方建立的友谊”，但他补充说：“我们拥有很多筹码。我的希望——我也知道总统的希望——是我们不必动用这些筹码。”<\/font><\/p><p><font>万斯说：“接下来的几周，我们会看到很多迹象。”<\/font><\/p><p><font>周日，中国商务部表示，动辄以高额关税进行威胁，不是与中方相处的正确之道。对于关税战，中方的立场是一贯的，我们不愿打，但也不怕打。中方敦促美方尽快纠正错误做法，以两国元首通话重要共识为引领，维护好来之不易的磋商成果，继续发挥中美经贸磋商机制作用，在相互尊重、平等协商基础上，通过对话解决各自关切，妥善管控分歧，维护中美经贸关系稳定、健康、可持续发展。如果美方一意孤行，中方也必将坚决采取相应措施，维护自身正当权益。<\/font><\/p><p><font>万斯的最新说法发生在周日，从加密货币市场的表现来看，市场对于这番言论持正面看法，在万斯结束采访之后，比特币大涨超2%，以太坊涨超7%。<\/font><\/p><p><font>华创证券研报称，“TACO”——“Trump Always Chickens Out ”是2025年特朗普上台以来华尔街流行的一种投资策略，即特朗普执政期间往往采取“强硬态度获得谈判筹码、最终让步达成协议”的外交行为，形成资本市场冲击回撤后反弹修复的交易模式。<\/font><\/p><p><font>广发证券最新研报称，今年4月中美关税升级已经证明，美方威胁的100%关税水平其很难承担且失去了经济学意义，此举更像是谈判前的极限施压。事实上，在今年已经过去的四轮会谈之前，都出现过双方制裁升级的局面。如果大概率是“TACO”交易，历史看短期下跌提供了买入的好时机。4月以来，全球“TACO”交易多次出现，包括特朗普威胁加关税后不断延期、威胁开除鲍威尔但又马上反复、威胁对铜加关税但又豁免精炼铜等等。事后来看，由“TACO”交易带来的下跌，往往是较好的加仓时机。<\/font><\/p><p><font>长江证券分析，与4月初相比，本轮市场对特朗普关税言论的反映可能略有减弱，当前市场经历多次特朗普“关税大棒”冲击后已有所免疫。本轮“关税威胁”更像是政治表态而非实质政策，最终或将再度上演“TACO”。（中国基金报）<\/font><\/p><p><img w=\"648\" h=\"732\" wh=\"0.89\"\/><\/p><p><img w=\"642\" h=\"711\" wh=\"0.90\"\/><\/p><!--WeiboOriginalContent[{\"text\": \"【万斯称“特朗普愿意与中国进行理性谈判”！“TACO”交易再次上演】#TACO交易再次上演# 10月12日晚间，美国副总统万斯在接受采访时，针对特朗普的最新关税威胁，释放了一些缓和的信号。\\n\\n　　万斯在节目中表示：“特朗普愿意与中国进行理性谈判。”\\n\\n　　此前，特朗普宣布，将自11月1日起对中国商品加征100%的关税，并限制某些美国软件的出口。\\n\\n　　万斯表示，他周六和周日都与特朗普通话。万斯说，总统“珍视他与中方建立的友谊”，但他补充说：“我们拥有很多筹码。我的希望——我也知道总统的希望——是我们不必动用这些筹码。”\\n\\n　　万斯说：“接下来的几周，我们会看到很多迹象。”\\n\\n　　周日，中国商务部表示，动辄以高额关税进行威胁，不是与中方相处的正确之道。对于关税战，中方的立场是一贯的，我们不愿打，但也不怕打。中方敦促美方尽快纠正错误做法，以两国元首通话重要共识为引领，维护好来之不易的磋商成果，继续发挥中美经贸磋商机制作用，在相互尊重、平等协商基础上，通过对话解决各自关切，妥善管控分歧，维护中美经贸关系稳定、健康、可持续发展。如果美方一意孤行，中方也必将坚决采取相应措施，维护自身正当权益。\\n\\n　　万斯的最新说法发生在周日，从加密货币市场的表现来看，市场对于这番言论持正面看法，在万斯结束采访之后，比特币大涨超2%，以太坊涨超7%。\\n\\n华创证券研报称，“TACO”——“Trump Always Chickens Out ”是2025年特朗普上台以来华尔街流行的一种投资策略，即特朗普执政期间往往采取“强硬态度获得谈判筹码、最终让步达成协议”的外交行为，形成资本市场冲击回撤后反弹修复的交易模式。\\n\\n　　广发证券最新研报称，今年4月中美关税升级已经证明，美方威胁的100%关税水平其很难承担且失去了经济学意义，此举更像是谈判前的极限施压。事实上，在今年已经过去的四轮会谈之前，都出现过双方制裁升级的局面。如果大概率是“TACO”交易，历史看短期下跌提供了买入的好时机。4月以来，全球“TACO”交易多次出现，包括特朗普威胁加关税后不断延期、威胁开除鲍威尔但又马上反复、威胁对铜加关税但又豁免精炼铜等等。事后来看，由“TACO”交易带来的下跌，往往是较好的加仓时机。\\n\\n　　长江证券分析，与4月初相比，本轮市场对特朗普关税言论的反映可能略有减弱，当前市场经历多次特朗普“关税大棒”冲击后已有所免疫。本轮“关税威胁”更像是政治表态而非实质政策，最终或将再度上演“TACO”。（中国基金报）\"}]WeiboOriginalContent-->\n             \n             \n                <p style=\"font-size: .24rem;color: #888;font-weight: 400;\">发布于：上海<\/p>"
          },
          {
              "title": "万科：辛杰辞去董事长职务，选举黄力平为公司董事长",
              "time": "2025-10-13",
              "src": "澎湃新闻",
              "category": "news",
              "pic": "https:\/\/n.sinaimg.cn\/default\/feedbackpics\/transform\/116\/w550h366\/20180418\/w4eZ-fzihnep5214985.png",
              "url": "https:\/\/news.sina.cn\/2025-10-13\/detail-infttaau5378318.d.html?vt=4&pos=108",
              "weburl": "https:\/\/news.sina.com.cn\/c\/2025-10-13\/doc-infttaau5378318.shtml",
              "content": "<p class=\"art_p\" cms-style=\"font-L\">10月13日，万科企业股份有限公司（000002.SZ）发布公告，董事会于2025年10月12日收到本公司董事长辛杰提交的书面辞职报告。辛杰因个人原因申请辞任本公司非执行董事及董事长职务，辞任后将不再担任本公司任何职务。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">同时，第二十届董事会第二十四次会议选举黄力平担任董事长，任期自董事会审议通过之日起至本公司第二十届董事会任期届满之日止。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">业内人士认为，新任董事长由原董事会成员担任，熟悉公司情况，有利于工作的延续和稳定。个别管理者的调整不会影响企业改革化险的进程。今年以来，在深圳市及有关部门、大股东地铁集团及金融机构等各方的大力支持下，万科改革化险稳步推进，在多重挑战下实现了队伍稳定、财务稳定和生产经营稳定。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">公告显示，黄力平于1968年出生，现任本公司董事、审计委员会委员，深圳市地铁集团有限公司（“深铁集团”）党委副书记、董事、总经理。黄先生于1991年获同济大学工学学士学位；1994年获同济大学工学硕士学位；现为教授级高级工程师。2014年8月至2018年8月，任深铁集团副总经理、党委委员；2018年8月至2021年2月，任深圳市人才安居集团有限公司党委副书记、董事、总经理；2021年2月至今，任深铁集团党委副书记、董事、总经理；2021年6月至今，任本公司董事。黄力平自愿放弃从本公司获得董事酬金。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">另据万科集团官网显示，辛杰于1966年出生，现年59岁。其于1988年获沈阳工业大学工学学士学位；2005年获香港理工大学工商管理硕士学位；现为正高级工程师、高级经济师。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">从过往从业经历看，辛杰曾先后供职于深圳圣廷苑酒店有限公司、深圳市长城投资控股股份有限公司、深圳市天健（集团）股份有限公司。任深圳市地铁集团有限公司党委书记、董事长，万科集团董事长。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">辛杰掌管万科至今未满一年。今年1月27日，万科发布系列公告，为有效化解风险，切实保护购房人、债权人、投资人的利益，董事会决定充实集团经营管理力量，利用大股东深圳市地铁集团有限公司在内的各方资源优势，推动万科稳健经营。同日公告显示，由深圳地铁集团党委书记、董事长辛杰接替郁亮担任万科第二十届董事会主席；同年4月，辛杰首次以“万科集团董事长”身份亮相公开场合；6月27日，万科召开2024年度股东大会，辛杰作为深铁及万科集团董事长与一众高管出席并主持会议。<\/p>\n<p class=\"art_p\" cms-style=\"font-L\">从公开报道来看，辛杰最近的一次公开露面是今年的8月底。8月29日，通力电梯与深铁集团、万科集团在深圳正式签署战略协议，进一步深化在商业建筑及轨道交通领域的合作，辛杰作为重要嘉宾出席签约仪式。<\/p><p style=\"text-align:right;\" class=\"article-editor\">责任编辑：陈建瑞 SN243<\/p>\t\n<!-- content end -->"
          }
        ]
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