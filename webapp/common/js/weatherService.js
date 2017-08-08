//Constants
app.constant('WEATHER', {
    ICON_CLEAR: 1,
    ICON_PARTLY_CLOUDY: 2,
    ICON_CLOUDY: 3,
    ICON_RAIN: 4,
    ICON_SNOW: 5,
    ICON_RAINSNOW: 6,
    ICON_RAINSHOWER: 7,
    ICON_SNOWSHOWER: 8,
    ICON_FOG: 9,
    ICON_THUNDERESTORMS: 10,
    ICON_CLOUDY_AFTER_CLEAR: 11,
    ICON_THUNDERESTORMS_AFTER_MOSTLY_CLOUDY: 12,
    ICON_RAIN_AFTER_MOSTLY_CLOUDY: 13,
    ICON_SNOW_AFTER_MOSTLY_CLOUDY: 14,
    ICON_RAINSNOW_AFTER_MOSTLY_CLOUDY: 15,
    ICON_CLEAR_AFTER_CLOUDY: 16,
    ICON_CLEAR_AFTER_THUNDERESTORMS: 17,
    ICON_CLEAR_AFTER_RAIN: 18,
    ICON_CLEAR_AFTER_SNOW: 19,
    ICON_CLEAR_AFTER_RAINSNOW: 20
});

app.constant('REGIONID', {
    WEEK_GANGNEUNG: "11D20501", // 강릉
    WEEK_GANGJIN: "11F20303", // 강진
    WEEK_GANGHWA: "11B20101", // 강화
    WEEK_GEOJE: "11H20403", // 거제
    WEEK_GEOCHANG: "11H20502", // 거창
    WEEK_GYEONGJU: "11H10202", // 경주
    WEEK_JEJUUPPER: "11G00501", // 고산
    WEEK_GOHUNG: "11F20403", // 고흥
    WEEK_GWANGYANG: "11F20402", // 광양
    WEEK_GWANGJU: "11F20501", // 광주
    WEEK_GUMI: "11H10602", // 구미
    WEEK_GUNSAN: "11F10101", // 군산
    WEEK_GEUMSAN: "11C20601", // 금산
    WEEK_GIMHEA: "11H20304", // 김해
    WEEK_NAMWON: "11F10401", // 남원
    WEEK_NAMHAE: "11H20405", // 남해
    WEEK_DAEKWANRYEONG: "11D20201", // 대관령
    WEEK_DAEGU: "11H10701", // 대구
    WEEK_DAEJEON: "11C20401", // 대전
    WEEK_DONGDUCHEON: "11B20401", // 동두천
    WEEK_DONGHAE: "11D20601", // 동해
    WEEK_MOKPO: "11F20201", // 목포
    WEEK_MUNGYEONG: "11H10301", // 문경
    WEEK_MUNSAN: "11B20305", // 문산
    WEEK_MIRYANG: "11H20601", // 밀양
    WEEK_BAEKNYEONGDO: "11A00101", // 백령도
    WEEK_BORYEONG: "11C20201", // 보령
    WEEK_BOSEONG: "11F20404", // 보성
    WEEK_BOEUN: "11C10302", // 보은
    WEEK_BONGHWA: "11H10402", // 봉화
    WEEK_BUSAN: "11H20201", // 부산
    WEEK_BUAN: "11F10104", // 부안
    WEEK_BUYEO: "11C20501", // 부여
    WEEK_SANCHEON: "11H20703", // 산청
    WEEK_SANGJU: "11H10302", // 상주
    WEEK_SEOGUIPO: "11G00401", // 서귀포
    WEEK_SEOSAN: "11C20101", // 서산
    WEEK_SEOUL: "11B10101", // 서울
    WEEK_SEONGSANPO: "11G00101", // 성산포
    WEEK_SOKCHO: "11D20401", // 속초
    WEEK_SUWON: "11B20601", // 수원
    WEEK_SUNCHANG: "11F10403", // 순창
    WEEK_SUNCHEON: "11F20405", // 순천
    WEEK_ANDONG: "11H10501", // 안동
    WEEK_YANGSAN: "11H20102", // 양산
    WEEK_YANGPYEONG: "11B20503", // 양평
    WEEK_YEOSU: "11F20401", // 여수
    WEEK_YEONGDEOK: "11H10102", // 영덕
    WEEK_YEONGWOL: "11D10501", // 영월
    WEEK_YEONGJU: "11H10401", // 영주
    WEEK_YEONGCHEON: "11H10702", // 영천
    WEEK_WANDO: "11F20301", // 완도
    WEEK_ULLEUNGDO: "11E00101", // 울릉도
    WEEK_ULSAN: "11H20101", // 울산
    WEEK_ULJIN: "11H10101", // 울진
    WEEK_WONJU: "11D10401", // 원주
    WEEK_EUISEONG: "11H10502", // 의성
    WEEK_ICHEON: "11B20701", // 이천
    WEEK_INJE: "11D10201", // 인제
    WEEK_INCHEON: "11B20201", // 인천
    WEEK_IMSHIL: "11F10402", // 임실
    WEEK_JANGSU: "11F10301", // 장수
    WEEK_JANGHEUNG: "11F20304", // 장흥
    WEEK_JEONJU: "11F10201", // 전주
    WEEK_JEONGEUP: "11F10203", // 정읍
    WEEK_JEJU: "11G00201", // 제주
    WEEK_JECHEON: "11C10201", // 제천
    WEEK_JINDO: "11F20204", // 진도
    WEEK_JINJU: "11H20701", // 진주
    WEEK_CHANGWON: "11H20301", // 창원
    WEEK_CHONAN: "11C20301", // 천안
    WEEK_CHULWON: "11D10101", // 철원
    WEEK_CHEONGJU: "11C10301", // 청주
    WEEK_CHUPUNGRYEONG: "11C10401", // 추풍령
    WEEK_CHUNCHEON: "11D10301", // 춘천
    WEEK_CHUNGJU: "11C10101", // 충주
    WEEK_TAEBAEK: "11D20301", // 태백
    WEEK_TONGYEONG: "11H20401", // 통영
    WEEK_POHANG: "11H10201", // 포항
    WEEK_HAPCHEON: "11H20503", // 합천
    WEEK_HAENAM: "11F20302", // 해남
    WEEK_HONGCHEON: "11D10302", // 홍천
    WEEK_HEUKSANDO: "11F20701"		// 흑산도
});

    app.constant('REGIONID_CN', {
        WEEK_TONGZHOU_NANTONG:'CHXX0101',
        WEEK_TONGZHOU_BEIJING:'WMXX1307',
        WEEK_DONGXING:'CHXX0103',
        WEEK_CHAOYANG_BEIJING:'WMXX2972',
        WEEK_CHAOYANGSHI:'CHXX0294',
        WEEK_LINXIA:'WMXX1097',
        WEEK_BEIJING_BEIJING:'CHXX0008',
        WEEK_HAIDIAN_BEIJING:'WMXX2971',
        WEEK_SHUNYI_BEIJING:'WMXX1306',
        WEEK_HUAIROU_BEIJING:'WMXX1303',
        WEEK_CHANGPING_BEIJING:'CHXX0012',
        WEEK_YANQING_BEIJING:'WMXX1308',
        WEEK_FENGTAI_BEIJING:'CHXX0027',
        WEEK_SHIJINGSHAN_BEIJING:'WMXX2974',
        WEEK_DAXING_BEIJING:'CHXX0023',
        WEEK_FANGSHAN_BEIJING:'WMXX1302',
        WEEK_MIYUN_BEIJING:'CHXX0096',
        WEEK_MENTOUGOU_BEIJING:'WMXX1304',
        WEEK_PINGGU_BEIJING:'WMXX1305',
        WEEK_SHANGHAI:'CHXX0116',
        WEEK_MINHANG_SHANGHAI:'CHXX0093',
        WEEK_BAOSHAN_SHANGHAI:'WMXX1294',
        WEEK_QINGPU_SHANGHAI:'WMXX1300',
        WEEK_SONGJIANG_SHANGHAI:'WMXX1301',
        WEEK_XUHUI_SHANGHAI:'WMXX2973',
        WEEK_PUDONG_SHANGHAI:'WMXX1336',
        WEEK_TIANJIN:'CHXX0133',
        WEEK_BEICHEN_TIANJIN:'WMXX2929',
        WEEK_JINGHAI_TIANJIN:'CHXX0065',
        WEEK_JINNAN_TIANJIN:'WMXX2928',
        WEEK_BINHAIXINQU_TIANJIN:'CHXX0130',
        WEEK_DAGANG_TIANJIN:'WMXX2925',
        WEEK_CHONGQING:'CHXX0017',
        WEEK_YONGCHUAN_CHONGQING:'CHXX0157',
        WEEK_WANSHENG_CHONGQING:'WMXX2934',
        WEEK_YUBEI_CHONGQING:'WMXX2935',
        WEEK_BEIBEI_CHONGQING:'WMXX2933',
        WEEK_BANAN_CHONGQING:'WMXX2936',
        WEEK_WANZHOU:'WMXX1105',
        WEEK_LIANGPING:'CHXX0405',
        WEEK_DAZU:'WMXX1309',
        WEEK_HAERBIN:'CHXX0046',
        WEEK_SHUANGCHENG:'CHXX0124',
        WEEK_HULAN:'CHXX0054',
        WEEK_ACHENG:'CHXX0001',
        WEEK_BINXIAN:'WMXX1990',
        WEEK_BAYAN:'WMXX1991',
        WEEK_WUCHANG:'WMXX1987',
        WEEK_QIQIHAER:'CHXX0112',
        WEEK_GANNAN:'WMXX1997',
        WEEK_MUDANJIANG:'CHXX0278',
        WEEK_JIAMUSI:'WMXX1055',
        WEEK_SUIHUA:'WMXX1057',
        WEEK_HEIHE:'CHXX0174',
        WEEK_JIAGEDAQI:'WMXX1258',
        WEEK_YICHUN:'WMXX1054',
        WEEK_DAQING:'WMXX1051',
        WEEK_QITAIHE:'WMXX1056',
        WEEK_JIXI:'CHXX0193',
        WEEK_HEGANG:'WMXX1052',
        WEEK_SHUANGYASHAN:'WMXX1053',
        WEEK_CHANGCHUN:'CHXX0010',
        WEEK_YANJI:'CHXX0291',
        WEEK_SIPING:'CHXX0283',
        WEEK_TONGHUA:'WMXX1049',
        WEEK_BAICHENG:'WMXX1050',
        WEEK_LIAOYUAN:'WMXX1048',
        WEEK_SONGYUAN:'WMXX1272',
        WEEK_BAISHAN:'WMXX1271',
        WEEK_SHENYANG:'CHXX0119',
        WEEK_DALIAN:'CHXX0019',
        WEEK_WAFANGDIAN:'WMXX1923',
        WEEK_JINZHOU:'WMXX1922',
        WEEK_LVSHUN:'CHXX0087',
        WEEK_ANSHAN:'CHXX0004',
        WEEK_FUSHUN:'CHXX0029',
        WEEK_BENXI:'CHXX0296',
        WEEK_DANDONG:'CHXX0306',
        WEEK_YINGKOU:'CHXX0304',
        WEEK_FUXIN:'WMXX1045',
        WEEK_LIAOYANG:'CHXX0081',
        WEEK_TIELING:'CHXX0134',
        WEEK_PANJIN:'WMXX1046',
        WEEK_HULUDAO:'WMXX1047',
        WEEK_HUHEHAOTE:'CHXX0249',
        WEEK_BAOTOU:'CHXX0007',
        WEEK_WUHAI:'WMXX1114',
        WEEK_JINING:'CHXX0250',
        WEEK_TONGLIAO:'CHXX0282',
        WEEK_CHIFENG:'CHXX0286',
        WEEK_EERDUOSI:'CHXX0255',
        WEEK_HENAN:'WMXX2837',
        WEEK_LINHE:'CHXX0253',
        WEEK_XILINHAOTE:'CHXX0280',
        WEEK_WULANHAOTE:'WMXX1115',
        WEEK_AZUOQI:'WMXX1270',
        WEEK_SHIJIAZHUANG:'CHXX0122',
        WEEK_BAODING:'CHXX0308',
        WEEK_ZHANGJIAKOU:'CHXX0300',
        WEEK_CHENGDE:'CHXX0302',
        WEEK_TANGSHAN:'CHXX0131',
        WEEK_LANGFANG:'WMXX1039',
        WEEK_CANGZHOU:'WMXX1040',
        WEEK_HENGSHUI:'WMXX1041',
        WEEK_XINGTAI:'CHXX0266',
        WEEK_HANDAN:'WMXX1037',
        WEEK_QINHUANGDAO:'WMXX1038',
        WEEK_TAIYUAN:'CHXX0129',
        WEEK_DATONG:'CHXX0251',
        WEEK_YANGQUAN:'CHXX0152',
        WEEK_JINZHONG:'WMXX1268',
        WEEK_CHANGZHI:'WMXX1043',
        WEEK_JINCHENG:'WMXX1044',
        WEEK_LINFEN:'WMXX1042',
        WEEK_YUNCHENG:'CHXX0272',
        WEEK_SHUOZHOU:'WMXX1267',
        WEEK_XINZHOU:'WMXX1269',
        WEEK_LVLIANG:'CHXX0264',
        WEEK_XIAN:'CHXX0141',
        WEEK_CHANGAN:'WMXX2681',
        WEEK_LINTONG:'CHXX0082',
        WEEK_LANTIAN:'WMXX2682',
        WEEK_HUXIAN:'WMXX2684',
        WEEK_GAOLING:'WMXX2685',
        WEEK_XIANYANG:'CHXX0143',
        WEEK_YANAN:'CHXX0267',
        WEEK_YULIN:'CHXX0260',
        WEEK_WEINAN:'CHXX0137',
        WEEK_SHANGLUO:'WMXX1290',
        WEEK_ANKANG:'CHXX0394',
        WEEK_HANZHONG:'CHXX0390',
        WEEK_BAOJI:'CHXX0387',
        WEEK_TONGCHUAN:'WMXX1289',
        WEEK_JINAN:'CHXX0064',
        WEEK_CHANGQING:'WMXX1526',
        WEEK_ZHANGQIU:'CHXX0161',
        WEEK_JIYANG:'WMXX1527',
        WEEK_QINGDAO:'CHXX0110',
        WEEK_JIMO:'WMXX1326',
        WEEK_JIAOZHOU:'CHXX0061',
        WEEK_LAIXI:'WMXX1529',
        WEEK_PINGDU:'WMXX1169',
        WEEK_ZIBO:'CHXX0169',
        WEEK_DEZHOU:'WMXX1027',
        WEEK_YANTAI:'WMXX1018',
        WEEK_LAIZHOU:'WMXX1544',
        WEEK_PENGLAI:'WMXX1545',
        WEEK_ZHAOYUAN:'WMXX1546',
        WEEK_WEIFANG:'CHXX0318',
        WEEK_SHOUGUANG:'WMXX1151',
        WEEK_TAIAN:'WMXX1025',
        WEEK_LINYI:'WMXX1020',
        WEEK_HEZE:'WMXX1028',
        WEEK_BINZHOU:'WMXX1264',
        WEEK_DONGYING:'WMXX1021',
        WEEK_WEIHAI:'WMXX1024',
        WEEK_WENDENG:'WMXX1175',
        WEEK_RONGCHENG:'CHXX0314',
        WEEK_RUSHAN:'WMXX1550',
        WEEK_ZAOZHUANG:'WMXX1019',
        WEEK_RIZHAO:'CHXX0322',
        WEEK_LAIWU:'WMXX1026',
        WEEK_LIAOCHENG:'WMXX1023',
        WEEK_WULUMUQI:'CHXX0135',
        WEEK_KELAMAYI:'CHXX0200',
        WEEK_SHIHEZI:'WMXX1119',
        WEEK_CHANGJI:'CHXX0011',
        WEEK_TULUFAN:'CHXX0207',
        WEEK_KUERLE:'CHXX0209',
        WEEK_AKESU:'WMXX1117',
        WEEK_KASHI:'CHXX0074',
        WEEK_YINING:'CHXX0203',
        WEEK_TACHENG:'CHXX0198',
        WEEK_HAMI:'CHXX0219',
        WEEK_HETIAN:'CHXX0216',
        WEEK_ALETAI:'CHXX0196',
        WEEK_ATUSHI:'WMXX1118',
        WEEK_LASA:'CHXX0080',
        WEEK_RIKAZE:'CHXX0145',
        WEEK_SHANNAN:'WMXX1287',
        WEEK_LINZHI:'CHXX0356',
        WEEK_CHANGDU:'CHXX0343',
        WEEK_NAQU:'CHXX0325',
        WEEK_GAER:'CHXX0323',
        WEEK_XINING:'CHXX0236',
        WEEK_HAIDONG:'WMXX2828',
        WEEK_HAINAN:'WMXX2841',
        WEEK_GUOLUO:'WMXX2847',
        WEEK_YUSHU:'CHXX0334',
        WEEK_HAIXI:'WMXX2855',
        WEEK_HAIBEI:'WMXX2834',
        WEEK_LANZHOU:'CHXX0079',
        WEEK_DINGXI:'CHXX0024',
        WEEK_PINGLIANG:'CHXX0270',
        WEEK_QINGYANG:'CHXX0271',
        WEEK_WUWEI:'WMXX1100',
        WEEK_JINCHANG:'WMXX1099',
        WEEK_ZHANGYE:'CHXX0228',
        WEEK_JIUQUAN:'CHXX0226',
        WEEK_TIANSHUI:'CHXX0386',
        WEEK_WUDU:'CHXX0340',
        WEEK_BAIYIN:'CHXX0006',
        WEEK_JIAYUGUAN:'WMXX1098',
        WEEK_YINCHUAN:'CHXX0259',
        WEEK_SHIZUISHAN:'WMXX1101',
        WEEK_WUZHONG:'WMXX1102',
        WEEK_GUYUAN:'WMXX1103',
        WEEK_ZHONGWEI:'WMXX1104',
        WEEK_ZHENGZHOU:'CHXX0165',
        WEEK_ANYANG:'CHXX0269',
        WEEK_XINXIANG:'CHXX0148',
        WEEK_XUCHANG:'WMXX1034',
        WEEK_PINGDINGSHAN:'WMXX1031',
        WEEK_XINYANG:'CHXX0149',
        WEEK_NANYANG:'CHXX0391',
        WEEK_KAIFENG:'CHXX0072',
        WEEK_LUOYANG:'CHXX0086',
        WEEK_SHANGQIU:'WMXX1029',
        WEEK_JIAOZUO:'WMXX1032',
        WEEK_HEBI:'WMXX1033',
        WEEK_PUYANG:'WMXX1030',
        WEEK_ZHOUKOU:'WMXX1036',
        WEEK_LUOHE:'WMXX1035',
        WEEK_ZHUMADIAN:'CHXX0398',
        WEEK_SANMENXIA:'WMXX1265',
        WEEK_NANJING:'CHXX0099',
        WEEK_PUKOU:'CHXX0109',
        WEEK_WUXI:'WMXX1009',
        WEEK_JIANGYIN:'WMXX1144',
        WEEK_YIXING:'WMXX1145',
        WEEK_ZHENJIANG:'CHXX0166',
        WEEK_JURONG:'CHXX0071',
        WEEK_SUZHOU:'WMXX1007',
        WEEK_CHANGSHU:'CHXX0014',
        WEEK_ZHANGJIAGANG:'WMXX1335',
        WEEK_KUNSHAN:'WMXX1455',
        WEEK_WUJIANG:'WMXX1456',
        WEEK_TAICANG:'WMXX1457',
        WEEK_HAIMEN:'WMXX1460',
        WEEK_YANGZHOU:'WMXX1013',
        WEEK_YANCHENG:'WMXX1014',
        WEEK_XUZHOU:'CHXX0437',
        WEEK_HUAIAN:'WMXX1011',
        WEEK_LIANYUNGANG:'WMXX1012',
        WEEK_CHANGZHOU:'CHXX0015',
        WEEK_LIYANG:'CHXX0450',
        WEEK_JINTAN:'WMXX1453',
        WEEK_TAIZHOU:'WMXX1008',
        WEEK_SUQIAN:'WMXX1010',
        WEEK_WUHAN:'CHXX0138',
        WEEK_CAIDIAN:'WMXX2168',
        WEEK_HUANGPI:'CHXX0050',
        WEEK_JIANGXIA:'WMXX2169',
        WEEK_XIANGYANG:'WMXX1074',
        WEEK_EZHOU:'WMXX1274',
        WEEK_XIAOGAN:'CHXX0144',
        WEEK_HUANGGANG:'WMXX1275',
        WEEK_HUANGSHI:'CHXX0051',
        WEEK_XIANNING:'WMXX1077',
        WEEK_JINGZHOU:'CHXX0408',
        WEEK_YICHANG:'CHXX0407',
        WEEK_ENSHI:'CHXX0406',
        WEEK_SHIYAN:'WMXX1075',
        WEEK_SUIZHOU:'WMXX1078',
        WEEK_JINGMEN:'WMXX1076',
        WEEK_XIANTAO:'WMXX1124',
        WEEK_QIANJIANG:'WMXX1276',
        WEEK_HANGZHOU:'CHXX0044',
        WEEK_XIAOSHAN:'WMXX1482',
        WEEK_JIANDE:'WMXX1483',
        WEEK_YUHANG:'WMXX2950',
        WEEK_LINAN:'WMXX1485',
        WEEK_FUYANG:'WMXX1484',
        WEEK_HUZHOU:'CHXX0056',
        WEEK_JIAXING:'CHXX0062',
        WEEK_NINGBO:'WMXX1016',
        WEEK_SHAOXING:'CHXX0117',
        WEEK_WENZHOU:'CHXX0462',
        WEEK_LISHUI:'CHXX0461',
        WEEK_JINHUA:'WMXX1017',
        WEEK_YIWU:'WMXX1293',
        WEEK_QUZHOU:'CHXX0460',
        WEEK_ZHOUSHAN:'CHXX0455',
        WEEK_HEFEI:'CHXX0448',
        WEEK_BENGBU:'CHXX0444',
        WEEK_WUHU:'CHXX0449',
        WEEK_HUAINAN:'WMXX1062',
        WEEK_MAANSHAN:'WMXX1060',
        WEEK_ANQING:'CHXX0452',
        WEEK_BOZHOU:'CHXX0439',
        WEEK_HUANGSHAN:'WMXX2058',
        WEEK_CHUZHOU:'WMXX1064',
        WEEK_HUAIBEI:'WMXX1059',
        WEEK_TONGLING:'WMXX1063',
        WEEK_XUANCHENG:'WMXX1066',
        WEEK_LIUAN:'WMXX1061',
        WEEK_CHIZHOU:'WMXX1273',
        WEEK_FUZHOU:'CHXX0031',
        WEEK_XIAMEN:'CHXX0140',
        WEEK_NINGDE:'WMXX1262',
        WEEK_PUTIAN:'CHXX0045',
        WEEK_QUANZHOU:'CHXX0114',
        WEEK_ZHANGZHOU:'CHXX0162',
        WEEK_LONGYAN:'WMXX1006',
        WEEK_SANMING:'WMXX1005',
        WEEK_NANPING:'CHXX0471',
        WEEK_NANCHANG:'CHXX0097',
        WEEK_JIUJIANG:'CHXX0068',
        WEEK_SHANGRAO:'WMXX1072',
        WEEK_JIAN:'CHXX0425',
        WEEK_GANZHOU:'CHXX0436',
        WEEK_JINGDEZHEN:'CHXX0457',
        WEEK_PINGXIANG:'WMXX1067',
        WEEK_XINYU:'WMXX1069',
        WEEK_YINGTAN:'WMXX1070',
        WEEK_CHANGSHA:'CHXX0013',
        WEEK_XIANGTAN:'CHXX0142',
        WEEK_ZHUZHOU:'WMXX1079',
        WEEK_HENGYANG:'WMXX1081',
        WEEK_CHENZHOU:'CHXX0435',
        WEEK_CHANGDE:'CHXX0416',
        WEEK_YIYANG:'WMXX1126',
        WEEK_LOUDI:'WMXX1080',
        WEEK_SHAOYANG:'CHXX0422',
        WEEK_YUEYANG:'CHXX0411',
        WEEK_ZHANGJIAJIE:'WMXX1278',
        WEEK_HUAIHUA:'WMXX1082',
        WEEK_YONGZHOU:'CHXX0429',
        WEEK_JISHOU:'WMXX1153',
        WEEK_GUIYANG:'CHXX0039',
        WEEK_ZUNYI:'CHXX0419',
        WEEK_ANSHUN:'CHXX0005',
        WEEK_DUYUN:'WMXX1095',
        WEEK_KAILI:'WMXX1093',
        WEEK_TONGREN:'WMXX1091',
        WEEK_BIJIE:'CHXX0418',
        WEEK_XINGYI:'WMXX1094',
        WEEK_CHENGDU:'CHXX0016',
        WEEK_LONGQUANYI:'WMXX2361',
        WEEK_XINDU:'WMXX2362',
        WEEK_WENJIANG:'WMXX2363',
        WEEK_SHUANGLIU:'WMXX1325',
        WEEK_PIXIAN:'WMXX2369',
        WEEK_DUJIANGYAN:'WMXX2364',
        WEEK_PENGZHOU:'WMXX2365',
        WEEK_PANZHIHUA:'WMXX1085',
        WEEK_ZIGONG:'WMXX1084',
        WEEK_MIANYANG:'CHXX0351',
        WEEK_NANCHONG:'CHXX0098',
        WEEK_DAZHOU:'CHXX0400',
        WEEK_SUINING:'CHXX0127',
        WEEK_GUANGAN:'CHXX0036',
        WEEK_BAZHONG:'WMXX1089',
        WEEK_LUZHOU:'CHXX0088',
        WEEK_YIBIN:'CHXX0362',
        WEEK_ZIYANG:'WMXX1090',
        WEEK_LESHAN:'WMXX1088',
        WEEK_MEISHAN:'CHXX0091',
        WEEK_XICHANG:'CHXX0363',
        WEEK_YAAN:'CHXX0354',
        WEEK_KANGDING:'CHXX0358',
        WEEK_MAERKANG:'CHXX0348',
        WEEK_DEYANG:'WMXX1086',
        WEEK_GUANGYUAN:'WMXX1087',
        WEEK_GUANGZHOU:'CHXX0037',
        WEEK_PANYU_GUANGZHOU:'WMXX1337',
        WEEK_CONGHUA_GUANGZHOU:'WMXX1340',
        WEEK_ZENGCHENG_GUANGZHOU:'WMXX1339',
        WEEK_HUADU_GUANGZHOU:'WMXX1338',
        WEEK_SHAOGUAN_GUANGZHOU:'CHXX0482',
        WEEK_HUIZHOU:'CHXX0053',
        WEEK_MEIZHOU:'CHXX0486',
        WEEK_SHANTOU:'CHXX0493',
        WEEK_SHENZHEN:'CHXX0120',
        WEEK_ZHUHAI:'WMXX1000',
        WEEK_FOSHAN:'CHXX0028',
        WEEK_ZHAOQING:'WMXX1003',
        WEEK_JIANGMEN:'CHXX0058',
        WEEK_HEYUAN:'CHXX0492',
        WEEK_QINGYUAN:'WMXX1259',
        WEEK_YUNFU:'WMXX1261',
        WEEK_CHAOZHOU:'WMXX1001',
        WEEK_DONGGUAN:'CHXX0123',
        WEEK_ZHONGSHAN:'WMXX1002',
        WEEK_YANGJIANG:'CHXX0500',
        WEEK_JIEYANG:'WMXX1260',
        WEEK_MAOMING:'CHXX0090',
        WEEK_SHANWEI:'CHXX0496',
        WEEK_KUNMING:'CHXX0076',
        WEEK_DALI:'CHXX0371',
        WEEK_MENGZI:'CHXX0385',
        WEEK_QUJING:'WMXX1096',
        WEEK_BAOSHAN:'CHXX0370',
        WEEK_WENSHAN:'WMXX1285',
        WEEK_YUXI:'WMXX1284',
        WEEK_CHUXIONG:'CHXX0373',
        WEEK_PUER:'CHXX0381',
        WEEK_SHAOTONG:'CHXX0364',
        WEEK_LINCANG:'CHXX0378',
        WEEK_LUSHUI:'WMXX1286',
        WEEK_LIJIANG:'CHXX0365',
        WEEK_MANGSHI:'WMXX1121',
        WEEK_JINGHONG:'CHXX0380',
        WEEK_NANNING:'CHXX0100',
        WEEK_CHONGZUO:'WMXX1283',
        WEEK_LIUZHOU:'CHXX0479',
        WEEK_LAIBIN:'WMXX1282',
        WEEK_GUILIN:'CHXX0434',
        WEEK_WUZHOU:'CHXX0490',
        WEEK_HEZHOU:'WMXX1281',
        WEEK_GUIGANG:'WMXX1280',
        WEEK_BAISE:'CHXX0488',
        WEEK_QINZHOU:'CHXX0498',
        WEEK_HECHI:'CHXX0478',
        WEEK_BEIHAI:'CHXX0499',
        WEEK_FANGCHENGGANG:'WMXX1279',
        WEEK_HAIKOU:'CHXX0502',
        WEEK_SANYA:'CHXX0507',
        WEEK_XIANGGANG:'CHXX0049',
        WEEK_AOMEN:'CHXX0512',
        WEEK_TAIBEI:'TWXX0021',
        WEEK_XINZHU:'TWXX0009',
        WEEK_GAOXIONG:'TWXX0013',
        WEEK_TAINAN:'TWXX0020',
        WEEK_TAIZHONG:'TWXX0019',
        WEEK_JILINSHI:'CHXX0063',
        WEEK_HUANGDAOQU:'CHXX0060',
        WEEK_HULUNBEIER:'CHXX0175',
        WEEK_LIUPANSHUI:'WMXX1092',
        WEEK_JILONG:'TWXX0003'
    });


app.constant('AIRCON_SETTING_REGION', [
    "WEBMOB_common_region_korea_01",
    "WEBMOB_common_region_korea_02",
    "WEBMOB_common_region_korea_03",
    "WEBMOB_common_region_korea_04",
    "WEBMOB_common_region_korea_05",
    "WEBMOB_common_region_korea_06",
    "WEBMOB_common_region_korea_07",
    "WEBMOB_common_region_korea_08",
    "WEBMOB_common_region_korea_09",
    "WEBMOB_common_region_korea_10",
    "WEBMOB_common_region_korea_11",
    "WEBMOB_common_region_korea_12",
    "WEBMOB_common_region_korea_13",
    "WEBMOB_common_region_korea_14",
    "WEBMOB_common_region_korea_15",
    "WEBMOB_common_region_korea_16",
    "WEBMOB_common_region_korea_17",
    "WEBMOB_common_region_korea_18",
    "WEBMOB_common_region_korea_19",
    "WEBMOB_common_region_korea_21",
    "WEBMOB_common_region_korea_22",
    "WEBMOB_common_region_korea_23",
    "WEBMOB_common_region_korea_25",
    "WEBMOB_common_region_korea_26",
    "WEBMOB_common_region_korea_27",
    "WEBMOB_common_region_korea_28",
    "WEBMOB_common_region_korea_29",
    "WEBMOB_common_region_korea_30",
    "WEBMOB_common_region_korea_31",
    "WEBMOB_common_region_korea_32",
    "WEBMOB_common_region_korea_33",
    "WEBMOB_common_region_korea_34",
    "WEBMOB_common_region_korea_35",
    "WEBMOB_common_region_korea_36",
    "WEBMOB_common_region_korea_37",
    "WEBMOB_common_region_korea_38",
    "WEBMOB_common_region_korea_39",
    "WEBMOB_common_region_korea_41",
    "WEBMOB_common_region_korea_42",
    "WEBMOB_common_region_korea_43",
    "WEBMOB_common_region_korea_44",
    "WEBMOB_common_region_korea_45",
    "WEBMOB_common_region_korea_46",
    "WEBMOB_common_region_korea_47",
    "WEBMOB_common_region_korea_48",
    "WEBMOB_common_region_korea_49",
    "WEBMOB_common_region_korea_50",
    "WEBMOB_common_region_korea_51",
    "WEBMOB_common_region_korea_52",
    "WEBMOB_common_region_korea_53",
    "WEBMOB_common_region_korea_54",
    "WEBMOB_common_region_korea_55",
    "WEBMOB_common_region_korea_56",
    "WEBMOB_common_region_korea_57",
    "WEBMOB_common_region_korea_58",
    "WEBMOB_common_region_korea_59",
    "WEBMOB_common_region_korea_60",
    "WEBMOB_common_region_korea_61",
    "WEBMOB_common_region_korea_62",
    "WEBMOB_common_region_korea_63",
    "WEBMOB_common_region_korea_64",
    "WEBMOB_common_region_korea_65",
    "WEBMOB_common_region_korea_66",
    "WEBMOB_common_region_korea_67",
    "WEBMOB_common_region_korea_68",
    "WEBMOB_common_region_korea_69",
    "WEBMOB_common_region_korea_70",
    "WEBMOB_common_region_korea_71",
    "WEBMOB_common_region_korea_73",
    "WEBMOB_common_region_korea_74",
    "WEBMOB_common_region_korea_75",
    "WEBMOB_common_region_korea_76",
    "WEBMOB_common_region_korea_77",
    "WEBMOB_common_region_korea_78",
    "WEBMOB_common_region_korea_79",
    "WEBMOB_common_region_korea_80",
    "WEBMOB_common_region_korea_81",
    "WEBMOB_common_region_korea_82",
    "WEBMOB_common_region_korea_83"
]);

app.constant('AIRCON_SETTING_REGION_CHINA', [
    "WEBMOB_common_region_china_CHXX0101",
    "WEBMOB_common_region_china_WMXX1307",
    "WEBMOB_common_region_china_CHXX0103",
    "WEBMOB_common_region_china_WMXX2972",
    "WEBMOB_common_region_china_CHXX0294",
    "WEBMOB_common_region_china_WMXX1097",
    "WEBMOB_common_region_china_CHXX0008",
    "WEBMOB_common_region_china_WMXX2971",
    "WEBMOB_common_region_china_WMXX1306",
    "WEBMOB_common_region_china_WMXX1303",
    "WEBMOB_common_region_china_CHXX0012",
    "WEBMOB_common_region_china_WMXX1308",
    "WEBMOB_common_region_china_CHXX0027",
    "WEBMOB_common_region_china_WMXX2974",
    "WEBMOB_common_region_china_CHXX0023",
    "WEBMOB_common_region_china_WMXX1302",
    "WEBMOB_common_region_china_CHXX0096",
    "WEBMOB_common_region_china_WMXX1304",
    "WEBMOB_common_region_china_WMXX1305",
    "WEBMOB_common_region_china_CHXX0116",
    "WEBMOB_common_region_china_CHXX0093",
    "WEBMOB_common_region_china_WMXX1294",
    "WEBMOB_common_region_china_WMXX1300",
    "WEBMOB_common_region_china_WMXX1301",
    "WEBMOB_common_region_china_WMXX2973",
    "WEBMOB_common_region_china_WMXX1336",
    "WEBMOB_common_region_china_CHXX0133",
    "WEBMOB_common_region_china_WMXX2929",
    "WEBMOB_common_region_china_CHXX0065",
    "WEBMOB_common_region_china_WMXX2928",
    "WEBMOB_common_region_china_CHXX0130",
    "WEBMOB_common_region_china_WMXX2925",
    "WEBMOB_common_region_china_CHXX0017",
    "WEBMOB_common_region_china_CHXX0157",
    "WEBMOB_common_region_china_WMXX2934",
    "WEBMOB_common_region_china_WMXX2935",
    "WEBMOB_common_region_china_WMXX2933",
    "WEBMOB_common_region_china_WMXX2936",
    "WEBMOB_common_region_china_WMXX1105",
    "WEBMOB_common_region_china_CHXX0405",
    "WEBMOB_common_region_china_WMXX1309",
    "WEBMOB_common_region_china_CHXX0046",
    "WEBMOB_common_region_china_CHXX0124",
    "WEBMOB_common_region_china_CHXX0054",
    "WEBMOB_common_region_china_CHXX0001",
    "WEBMOB_common_region_china_WMXX1990",
    "WEBMOB_common_region_china_WMXX1991",
    "WEBMOB_common_region_china_WMXX1987",
    "WEBMOB_common_region_china_CHXX0112",
    "WEBMOB_common_region_china_WMXX1997",
    "WEBMOB_common_region_china_CHXX0278",
    "WEBMOB_common_region_china_WMXX1055",
    "WEBMOB_common_region_china_WMXX1057",
    "WEBMOB_common_region_china_CHXX0174",
    "WEBMOB_common_region_china_WMXX1258",
    "WEBMOB_common_region_china_WMXX1054",
    "WEBMOB_common_region_china_WMXX1051",
    "WEBMOB_common_region_china_WMXX1056",
    "WEBMOB_common_region_china_CHXX0193",
    "WEBMOB_common_region_china_WMXX1052",
    "WEBMOB_common_region_china_WMXX1053",
    "WEBMOB_common_region_china_CHXX0010",
    "WEBMOB_common_region_china_CHXX0291",
    "WEBMOB_common_region_china_CHXX0283",
    "WEBMOB_common_region_china_WMXX1049",
    "WEBMOB_common_region_china_WMXX1050",
    "WEBMOB_common_region_china_WMXX1048",
    "WEBMOB_common_region_china_WMXX1272",
    "WEBMOB_common_region_china_WMXX1271",
    "WEBMOB_common_region_china_CHXX0119",
    "WEBMOB_common_region_china_CHXX0019",
    "WEBMOB_common_region_china_WMXX1923",
    "WEBMOB_common_region_china_WMXX1922",
    "WEBMOB_common_region_china_CHXX0087",
    "WEBMOB_common_region_china_CHXX0004",
    "WEBMOB_common_region_china_CHXX0029",
    "WEBMOB_common_region_china_CHXX0296",
    "WEBMOB_common_region_china_CHXX0306",
    "WEBMOB_common_region_china_CHXX0304",
    "WEBMOB_common_region_china_WMXX1045",
    "WEBMOB_common_region_china_CHXX0081",
    "WEBMOB_common_region_china_CHXX0134",
    "WEBMOB_common_region_china_WMXX1046",
    "WEBMOB_common_region_china_WMXX1047",
    "WEBMOB_common_region_china_CHXX0249",
    "WEBMOB_common_region_china_CHXX0007",
    "WEBMOB_common_region_china_WMXX1114",
    "WEBMOB_common_region_china_CHXX0250",
    "WEBMOB_common_region_china_CHXX0282",
    "WEBMOB_common_region_china_CHXX0286",
    "WEBMOB_common_region_china_CHXX0255",
    "WEBMOB_common_region_china_WMXX2837",
    "WEBMOB_common_region_china_CHXX0253",
    "WEBMOB_common_region_china_CHXX0280",
    "WEBMOB_common_region_china_WMXX1115",
    "WEBMOB_common_region_china_WMXX1270",
    "WEBMOB_common_region_china_CHXX0122",
    "WEBMOB_common_region_china_CHXX0308",
    "WEBMOB_common_region_china_CHXX0300",
    "WEBMOB_common_region_china_CHXX0302",
    "WEBMOB_common_region_china_CHXX0131",
    "WEBMOB_common_region_china_WMXX1039",
    "WEBMOB_common_region_china_WMXX1040",
    "WEBMOB_common_region_china_WMXX1041",
    "WEBMOB_common_region_china_CHXX0266",
    "WEBMOB_common_region_china_WMXX1037",
    "WEBMOB_common_region_china_WMXX1038",
    "WEBMOB_common_region_china_CHXX0129",
    "WEBMOB_common_region_china_CHXX0251",
    "WEBMOB_common_region_china_CHXX0152",
    "WEBMOB_common_region_china_WMXX1268",
    "WEBMOB_common_region_china_WMXX1043",
    "WEBMOB_common_region_china_WMXX1044",
    "WEBMOB_common_region_china_WMXX1042",
    "WEBMOB_common_region_china_CHXX0272",
    "WEBMOB_common_region_china_WMXX1267",
    "WEBMOB_common_region_china_WMXX1269",
    "WEBMOB_common_region_china_CHXX0264",
    "WEBMOB_common_region_china_CHXX0141",
    "WEBMOB_common_region_china_WMXX2681",
    "WEBMOB_common_region_china_CHXX0082",
    "WEBMOB_common_region_china_WMXX2682",
    "WEBMOB_common_region_china_WMXX2684",
    "WEBMOB_common_region_china_WMXX2685",
    "WEBMOB_common_region_china_CHXX0143",
    "WEBMOB_common_region_china_CHXX0267",
    "WEBMOB_common_region_china_CHXX0260",
    "WEBMOB_common_region_china_CHXX0137",
    "WEBMOB_common_region_china_WMXX1290",
    "WEBMOB_common_region_china_CHXX0394",
    "WEBMOB_common_region_china_CHXX0390",
    "WEBMOB_common_region_china_CHXX0387",
    "WEBMOB_common_region_china_WMXX1289",
    "WEBMOB_common_region_china_CHXX0064",
    "WEBMOB_common_region_china_WMXX1526",
    "WEBMOB_common_region_china_CHXX0161",
    "WEBMOB_common_region_china_WMXX1527",
    "WEBMOB_common_region_china_CHXX0110",
    "WEBMOB_common_region_china_WMXX1326",
    "WEBMOB_common_region_china_CHXX0061",
    "WEBMOB_common_region_china_WMXX1529",
    "WEBMOB_common_region_china_WMXX1169",
    "WEBMOB_common_region_china_CHXX0169",
    "WEBMOB_common_region_china_WMXX1027",
    "WEBMOB_common_region_china_WMXX1018",
    "WEBMOB_common_region_china_WMXX1544",
    "WEBMOB_common_region_china_WMXX1545",
    "WEBMOB_common_region_china_WMXX1546",
    "WEBMOB_common_region_china_CHXX0318",
    "WEBMOB_common_region_china_WMXX1151",
    "WEBMOB_common_region_china_WMXX1025",
    "WEBMOB_common_region_china_WMXX1020",
    "WEBMOB_common_region_china_WMXX1028",
    "WEBMOB_common_region_china_WMXX1264",
    "WEBMOB_common_region_china_WMXX1021",
    "WEBMOB_common_region_china_WMXX1024",
    "WEBMOB_common_region_china_WMXX1175",
    "WEBMOB_common_region_china_CHXX0314",
    "WEBMOB_common_region_china_WMXX1550",
    "WEBMOB_common_region_china_WMXX1019",
    "WEBMOB_common_region_china_CHXX0322",
    "WEBMOB_common_region_china_WMXX1026",
    "WEBMOB_common_region_china_WMXX1023",
    "WEBMOB_common_region_china_CHXX0135",
    "WEBMOB_common_region_china_CHXX0200",
    "WEBMOB_common_region_china_WMXX1119",
    "WEBMOB_common_region_china_CHXX0011",
    "WEBMOB_common_region_china_CHXX0207",
    "WEBMOB_common_region_china_CHXX0209",
    "WEBMOB_common_region_china_WMXX1117",
    "WEBMOB_common_region_china_CHXX0074",
    "WEBMOB_common_region_china_CHXX0203",
    "WEBMOB_common_region_china_CHXX0198",
    "WEBMOB_common_region_china_CHXX0219",
    "WEBMOB_common_region_china_CHXX0216",
    "WEBMOB_common_region_china_CHXX0196",
    "WEBMOB_common_region_china_WMXX1118",
    "WEBMOB_common_region_china_CHXX0080",
    "WEBMOB_common_region_china_CHXX0145",
    "WEBMOB_common_region_china_WMXX1287",
    "WEBMOB_common_region_china_CHXX0356",
    "WEBMOB_common_region_china_CHXX0343",
    "WEBMOB_common_region_china_CHXX0325",
    "WEBMOB_common_region_china_CHXX0323",
    "WEBMOB_common_region_china_CHXX0236",
    "WEBMOB_common_region_china_WMXX2828",
    "WEBMOB_common_region_china_WMXX2841",
    "WEBMOB_common_region_china_WMXX2847",
    "WEBMOB_common_region_china_CHXX0334",
    "WEBMOB_common_region_china_WMXX2855",
    "WEBMOB_common_region_china_WMXX2834",
    "WEBMOB_common_region_china_CHXX0079",
    "WEBMOB_common_region_china_CHXX0024",
    "WEBMOB_common_region_china_CHXX0270",
    "WEBMOB_common_region_china_CHXX0271",
    "WEBMOB_common_region_china_WMXX1100",
    "WEBMOB_common_region_china_WMXX1099",
    "WEBMOB_common_region_china_CHXX0228",
    "WEBMOB_common_region_china_CHXX0226",
    "WEBMOB_common_region_china_CHXX0386",
    "WEBMOB_common_region_china_CHXX0340",
    "WEBMOB_common_region_china_CHXX0006",
    "WEBMOB_common_region_china_WMXX1098",
    "WEBMOB_common_region_china_CHXX0259",
    "WEBMOB_common_region_china_WMXX1101",
    "WEBMOB_common_region_china_WMXX1102",
    "WEBMOB_common_region_china_WMXX1103",
    "WEBMOB_common_region_china_WMXX1104",
    "WEBMOB_common_region_china_CHXX0165",
    "WEBMOB_common_region_china_CHXX0269",
    "WEBMOB_common_region_china_CHXX0148",
    "WEBMOB_common_region_china_WMXX1034",
    "WEBMOB_common_region_china_WMXX1031",
    "WEBMOB_common_region_china_CHXX0149",
    "WEBMOB_common_region_china_CHXX0391",
    "WEBMOB_common_region_china_CHXX0072",
    "WEBMOB_common_region_china_CHXX0086",
    "WEBMOB_common_region_china_WMXX1029",
    "WEBMOB_common_region_china_WMXX1032",
    "WEBMOB_common_region_china_WMXX1033",
    "WEBMOB_common_region_china_WMXX1030",
    "WEBMOB_common_region_china_WMXX1036",
    "WEBMOB_common_region_china_WMXX1035",
    "WEBMOB_common_region_china_CHXX0398",
    "WEBMOB_common_region_china_WMXX1265",
    "WEBMOB_common_region_china_CHXX0099",
    "WEBMOB_common_region_china_CHXX0109",
    "WEBMOB_common_region_china_WMXX1009",
    "WEBMOB_common_region_china_WMXX1144",
    "WEBMOB_common_region_china_WMXX1145",
    "WEBMOB_common_region_china_CHXX0166",
    "WEBMOB_common_region_china_CHXX0071",
    "WEBMOB_common_region_china_WMXX1007",
    "WEBMOB_common_region_china_CHXX0014",
    "WEBMOB_common_region_china_WMXX1335",
    "WEBMOB_common_region_china_WMXX1455",
    "WEBMOB_common_region_china_WMXX1456",
    "WEBMOB_common_region_china_WMXX1457",
    "WEBMOB_common_region_china_WMXX1460",
    "WEBMOB_common_region_china_WMXX1013",
    "WEBMOB_common_region_china_WMXX1014",
    "WEBMOB_common_region_china_CHXX0437",
    "WEBMOB_common_region_china_WMXX1011",
    "WEBMOB_common_region_china_WMXX1012",
    "WEBMOB_common_region_china_CHXX0015",
    "WEBMOB_common_region_china_CHXX0450",
    "WEBMOB_common_region_china_WMXX1453",
    "WEBMOB_common_region_china_WMXX1008",
    "WEBMOB_common_region_china_WMXX1010",
    "WEBMOB_common_region_china_CHXX0138",
    "WEBMOB_common_region_china_WMXX2168",
    "WEBMOB_common_region_china_CHXX0050",
    "WEBMOB_common_region_china_WMXX2169",
    "WEBMOB_common_region_china_WMXX1074",
    "WEBMOB_common_region_china_WMXX1274",
    "WEBMOB_common_region_china_CHXX0144",
    "WEBMOB_common_region_china_WMXX1275",
    "WEBMOB_common_region_china_CHXX0051",
    "WEBMOB_common_region_china_WMXX1077",
    "WEBMOB_common_region_china_CHXX0408",
    "WEBMOB_common_region_china_CHXX0407",
    "WEBMOB_common_region_china_CHXX0406",
    "WEBMOB_common_region_china_WMXX1075",
    "WEBMOB_common_region_china_WMXX1078",
    "WEBMOB_common_region_china_WMXX1076",
    "WEBMOB_common_region_china_WMXX1124",
    "WEBMOB_common_region_china_WMXX1276",
    "WEBMOB_common_region_china_CHXX0044",
    "WEBMOB_common_region_china_WMXX1482",
    "WEBMOB_common_region_china_WMXX1483",
    "WEBMOB_common_region_china_WMXX2950",
    "WEBMOB_common_region_china_WMXX1485",
    "WEBMOB_common_region_china_WMXX1484",
    "WEBMOB_common_region_china_CHXX0056",
    "WEBMOB_common_region_china_CHXX0062",
    "WEBMOB_common_region_china_WMXX1016",
    "WEBMOB_common_region_china_CHXX0117",
    "WEBMOB_common_region_china_CHXX0462",
    "WEBMOB_common_region_china_CHXX0461",
    "WEBMOB_common_region_china_WMXX1017",
    "WEBMOB_common_region_china_WMXX1293",
    "WEBMOB_common_region_china_CHXX0460",
    "WEBMOB_common_region_china_CHXX0455",
    "WEBMOB_common_region_china_CHXX0448",
    "WEBMOB_common_region_china_CHXX0444",
    "WEBMOB_common_region_china_CHXX0449",
    "WEBMOB_common_region_china_WMXX1062",
    "WEBMOB_common_region_china_WMXX1060",
    "WEBMOB_common_region_china_CHXX0452",
    "WEBMOB_common_region_china_CHXX0439",
    "WEBMOB_common_region_china_WMXX2058",
    "WEBMOB_common_region_china_WMXX1064",
    "WEBMOB_common_region_china_WMXX1059",
    "WEBMOB_common_region_china_WMXX1063",
    "WEBMOB_common_region_china_WMXX1066",
    "WEBMOB_common_region_china_WMXX1061",
    "WEBMOB_common_region_china_WMXX1273",
    "WEBMOB_common_region_china_CHXX0031",
    "WEBMOB_common_region_china_CHXX0140",
    "WEBMOB_common_region_china_WMXX1262",
    "WEBMOB_common_region_china_CHXX0045",
    "WEBMOB_common_region_china_CHXX0114",
    "WEBMOB_common_region_china_CHXX0162",
    "WEBMOB_common_region_china_WMXX1006",
    "WEBMOB_common_region_china_WMXX1005",
    "WEBMOB_common_region_china_CHXX0471",
    "WEBMOB_common_region_china_CHXX0097",
    "WEBMOB_common_region_china_CHXX0068",
    "WEBMOB_common_region_china_WMXX1072",
    "WEBMOB_common_region_china_CHXX0425",
    "WEBMOB_common_region_china_CHXX0436",
    "WEBMOB_common_region_china_CHXX0457",
    "WEBMOB_common_region_china_WMXX1067",
    "WEBMOB_common_region_china_WMXX1069",
    "WEBMOB_common_region_china_WMXX1070",
    "WEBMOB_common_region_china_CHXX0013",
    "WEBMOB_common_region_china_CHXX0142",
    "WEBMOB_common_region_china_WMXX1079",
    "WEBMOB_common_region_china_WMXX1081",
    "WEBMOB_common_region_china_CHXX0435",
    "WEBMOB_common_region_china_CHXX0416",
    "WEBMOB_common_region_china_WMXX1126",
    "WEBMOB_common_region_china_WMXX1080",
    "WEBMOB_common_region_china_CHXX0422",
    "WEBMOB_common_region_china_CHXX0411",
    "WEBMOB_common_region_china_WMXX1278",
    "WEBMOB_common_region_china_WMXX1082",
    "WEBMOB_common_region_china_CHXX0429",
    "WEBMOB_common_region_china_WMXX1153",
    "WEBMOB_common_region_china_CHXX0039",
    "WEBMOB_common_region_china_CHXX0419",
    "WEBMOB_common_region_china_CHXX0005",
    "WEBMOB_common_region_china_WMXX1095",
    "WEBMOB_common_region_china_WMXX1093",
    "WEBMOB_common_region_china_WMXX1091",
    "WEBMOB_common_region_china_CHXX0418",
    "WEBMOB_common_region_china_WMXX1094",
    "WEBMOB_common_region_china_CHXX0016",
    "WEBMOB_common_region_china_WMXX2361",
    "WEBMOB_common_region_china_WMXX2362",
    "WEBMOB_common_region_china_WMXX2363",
    "WEBMOB_common_region_china_WMXX1325",
    "WEBMOB_common_region_china_WMXX2369",
    "WEBMOB_common_region_china_WMXX2364",
    "WEBMOB_common_region_china_WMXX2365",
    "WEBMOB_common_region_china_WMXX1085",
    "WEBMOB_common_region_china_WMXX1084",
    "WEBMOB_common_region_china_CHXX0351",
    "WEBMOB_common_region_china_CHXX0098",
    "WEBMOB_common_region_china_CHXX0400",
    "WEBMOB_common_region_china_CHXX0127",
    "WEBMOB_common_region_china_CHXX0036",
    "WEBMOB_common_region_china_WMXX1089",
    "WEBMOB_common_region_china_CHXX0088",
    "WEBMOB_common_region_china_CHXX0362",
    "WEBMOB_common_region_china_WMXX1090",
    "WEBMOB_common_region_china_WMXX1088",
    "WEBMOB_common_region_china_CHXX0091",
    "WEBMOB_common_region_china_CHXX0363",
    "WEBMOB_common_region_china_CHXX0354",
    "WEBMOB_common_region_china_CHXX0358",
    "WEBMOB_common_region_china_CHXX0348",
    "WEBMOB_common_region_china_WMXX1086",
    "WEBMOB_common_region_china_WMXX1087",
    "WEBMOB_common_region_china_CHXX0037",
    "WEBMOB_common_region_china_WMXX1337",
    "WEBMOB_common_region_china_WMXX1340",
    "WEBMOB_common_region_china_WMXX1339",
    "WEBMOB_common_region_china_WMXX1338",
    "WEBMOB_common_region_china_CHXX0482",
    "WEBMOB_common_region_china_CHXX0053",
    "WEBMOB_common_region_china_CHXX0486",
    "WEBMOB_common_region_china_CHXX0493",
    "WEBMOB_common_region_china_CHXX0120",
    "WEBMOB_common_region_china_WMXX1000",
    "WEBMOB_common_region_china_CHXX0028",
    "WEBMOB_common_region_china_WMXX1003",
    "WEBMOB_common_region_china_CHXX0058",
    "WEBMOB_common_region_china_CHXX0492",
    "WEBMOB_common_region_china_WMXX1259",
    "WEBMOB_common_region_china_WMXX1261",
    "WEBMOB_common_region_china_WMXX1001",
    "WEBMOB_common_region_china_CHXX0123",
    "WEBMOB_common_region_china_WMXX1002",
    "WEBMOB_common_region_china_CHXX0500",
    "WEBMOB_common_region_china_WMXX1260",
    "WEBMOB_common_region_china_CHXX0090",
    "WEBMOB_common_region_china_CHXX0496",
    "WEBMOB_common_region_china_CHXX0076",
    "WEBMOB_common_region_china_CHXX0371",
    "WEBMOB_common_region_china_CHXX0385",
    "WEBMOB_common_region_china_WMXX1096",
    "WEBMOB_common_region_china_CHXX0370",
    "WEBMOB_common_region_china_WMXX1285",
    "WEBMOB_common_region_china_WMXX1284",
    "WEBMOB_common_region_china_CHXX0373",
    "WEBMOB_common_region_china_CHXX0381",
    "WEBMOB_common_region_china_CHXX0364",
    "WEBMOB_common_region_china_CHXX0378",
    "WEBMOB_common_region_china_WMXX1286",
    "WEBMOB_common_region_china_CHXX0365",
    "WEBMOB_common_region_china_WMXX1121",
    "WEBMOB_common_region_china_CHXX0380",
    "WEBMOB_common_region_china_CHXX0100",
    "WEBMOB_common_region_china_WMXX1283",
    "WEBMOB_common_region_china_CHXX0479",
    "WEBMOB_common_region_china_WMXX1282",
    "WEBMOB_common_region_china_CHXX0434",
    "WEBMOB_common_region_china_CHXX0490",
    "WEBMOB_common_region_china_WMXX1281",
    "WEBMOB_common_region_china_WMXX1280",
    "WEBMOB_common_region_china_CHXX0488",
    "WEBMOB_common_region_china_CHXX0498",
    "WEBMOB_common_region_china_CHXX0478",
    "WEBMOB_common_region_china_CHXX0499",
    "WEBMOB_common_region_china_WMXX1279",
    "WEBMOB_common_region_china_CHXX0502",
    "WEBMOB_common_region_china_CHXX0507",
    "WEBMOB_common_region_china_CHXX0049",
    "WEBMOB_common_region_china_CHXX0512",
    "WEBMOB_common_region_china_TWXX0021",
    "WEBMOB_common_region_china_TWXX0009",
    "WEBMOB_common_region_china_TWXX0013",
    "WEBMOB_common_region_china_TWXX0020",
    "WEBMOB_common_region_china_TWXX0019",
    "WEBMOB_common_region_china_CHXX0063",
    "WEBMOB_common_region_china_CHXX0060",
    "WEBMOB_common_region_china_CHXX0175",
    "WEBMOB_common_region_china_WMXX1092",
    "WEBMOB_common_region_china_TWXX0003"
]);

app.service('WeatherService', function ($http, WEATHER, REGIONID, REGIONID_CN, AIRCON_SETTING_REGION) {
    this.BACKGROUND_COLORS = [0xe4e4e4, 0xe4e4e4, 0x4b7997, 0x4b7997];
    this.WEATHER_ICON_RESOURCES = ['ac_weather_d_sun', 'ac_weather_d_cloud_rain_snow', 'ac_weather_d_cloud_snow', 'ac_weather_d_sun_cloud', 'ac_weather_d_cloud_rain'];

    this.setRegionCodeCN = function (regionId) {
        var regionCode = '';
        regionId = regionId.trim();
        console.log("regionId CN " + regionId);
        
        if (regionId === REGIONID_CN.WEEK_TONGZHOU_BEIJING || regionId === 'TONGZHOU(NANTONG)' || regionId === '通州(南通)') {
            regionCode = 'CHXX0101';
        }
        else if (regionId === REGIONID_CN.WEEK_TONGZHOU_BEIJING || regionId === 'TONGZHOU(BEIJING)' || regionId === '通州(北京)') {
            regionCode = 'WMXX1307';
        }
        else if (regionId === REGIONID_CN.WEEK_DONGXING || regionId === 'DONGXING' || regionId === '东兴') {
            regionCode = 'CHXX0103';
        }
        else if (regionId === REGIONID_CN.WEEK_CHAOYANG_BEIJING || regionId === 'CHAOYANG(BEIJING)' || regionId === '朝阳(北京') {
            regionCode = 'WMXX2972';
        }
        else if (regionId === REGIONID_CN.WEEK_CHAOYANGSHI || regionId === 'CHAOYANGSHI' || regionId === '朝阳(辽宁朝阳市)') {
            regionCode = 'CHXX0294';
        }
        else if (regionId === REGIONID_CN.WEEK_LINXIA || regionId === 'LINXIA' || regionId === '临夏') {
            regionCode = 'WMXX1097';
        }
        else if (regionId === REGIONID_CN.WEEK_BEIJING_BEIJING || regionId === 'BEIJING(BEIJING)' || regionId === '北京(北京)') {
            regionCode = 'CHXX0008';
        }
        else if (regionId === REGIONID_CN.WEEK_HAIDIAN_BEIJING || regionId === 'HAIDIAN(BEIJING)' || regionId === '海淀(北京)') {
            regionCode = 'WMXX2971';
        }
        else if (regionId === REGIONID_CN.WEEK_SHUNYI_BEIJING || regionId === 'SHUNYI(BEIJING)' || regionId === '顺义(北京)') {
            regionCode = 'WMXX1306';
        }
        else if (regionId === REGIONID_CN.WEEK_HUAIROU_BEIJING || regionId === 'HUAIROU(BEIJING)' || regionId === '怀柔(北京)') {
            regionCode = 'WMXX1303';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGPING_BEIJING || regionId === 'CHANGPING(BEIJING)' || regionId === '昌平(北京)') {
            regionCode = 'CHXX0012';
        }
        else if (regionId === REGIONID_CN.WEEK_YANQING_BEIJING || regionId === 'YANQING(BEIJING)' || regionId === '延庆(北京)') {
            regionCode = 'WMXX1308';
        }
        else if (regionId === REGIONID_CN.WEEK_FENGTAI_BEIJING || regionId === 'FENGTAI(BEIJING)' || regionId === '丰台(北京)') {
            regionCode = 'CHXX0027';
        }
        else if (regionId === REGIONID_CN.WEEK_SHIJINGSHAN_BEIJING || regionId === 'SHIJINGSHAN(BEIJING)' || regionId === '石景山(北京)') {
            regionCode = 'WMXX2974';
        }
        else if (regionId === REGIONID_CN.WEEK_DAXING_BEIJING || regionId === 'DAXING(BEIJING)' || regionId === '大兴(北京)') {
            regionCode = 'CHXX0023';
        }
        else if (regionId === REGIONID_CN.WEEK_FANGSHAN_BEIJING || regionId === 'FANGSHAN(BEIJING)' || regionId === '房山(北京)') {
            regionCode = 'WMXX1302';
        }
        else if (regionId === REGIONID_CN.WEEK_MIYUN_BEIJING || regionId === 'MIYUN(BEIJING)' || regionId === '密云(北京)') {
            regionCode = 'CHXX0096';
        }
        else if (regionId === REGIONID_CN.WEEK_MENTOUGOU_BEIJING || regionId === 'MENTOUGOU(BEIJING)' || regionId === '门头沟(北京)') {
            regionCode = 'WMXX1304';
        }
        else if (regionId === REGIONID_CN.WEEK_PINGGU_BEIJING || regionId === 'PINGGU(BEIJING)' || regionId === '平谷(北京)') {
            regionCode = 'WMXX1305';
        }
        else if (regionId === REGIONID_CN.WEEK_SHANGHAI || regionId === 'SHANGHAI' || regionId === '上海') {
            regionCode = 'CHXX0116';
        }
        else if (regionId === REGIONID_CN.WEEK_MINHANG_SHANGHAI || regionId === 'MINHANG(SHANGHAI)' || regionId === '闵行') {
            regionCode = 'CHXX0093';
        }
        else if (regionId === REGIONID_CN.WEEK_BAOSHAN_SHANGHAI || regionId === 'BAOSHAN(SHANGHAI)' || regionId === '宝山') {
            regionCode = 'WMXX1294';
        }
        else if (regionId === REGIONID_CN.WEEK_QINGPU_SHANGHAI || regionId === 'QINGPU(SHANGHAI)' || regionId === '青浦') {
            regionCode = 'WMXX1300';
        }
        else if (regionId === REGIONID_CN.WEEK_SONGJIANG_SHANGHAI || regionId === 'SONGJIANG(SHANGHAI)' || regionId === '松江') {
            regionCode = 'WMXX1301';
        }
        else if (regionId === REGIONID_CN.WEEK_XUHUI_SHANGHAI || regionId === 'XUHUI(SHANGHAI)' || regionId === '徐汇') {
            regionCode = 'WMXX2973';
        }
        else if (regionId === REGIONID_CN.WEEK_PUDONG_SHANGHAI || regionId === 'PUDONG(SHANGHAI)' || regionId === '浦东') {
            regionCode = 'WMXX1336';
        }
        else if (regionId === REGIONID_CN.WEEK_TIANJIN || regionId === 'TIANJIN' || regionId === '天津') {
            regionCode = 'CHXX0133';
        }
        else if (regionId === REGIONID_CN.WEEK_BEICHEN_TIANJIN || regionId === 'BEICHEN(TIANJIN）' || regionId === '北辰') {
            regionCode = 'WMXX2929';
        }
        else if (regionId === REGIONID_CN.WEEK_JINGHAI_TIANJIN || regionId === 'JINGHAI(TIANJIN）' || regionId === '静海') {
            regionCode = 'CHXX0065';
        }
        else if (regionId === REGIONID_CN.WEEK_JINNAN_TIANJIN || regionId === 'JINNAN(TIANJIN）' || regionId === '津南') {
            regionCode = 'WMXX2928';
        }
        else if (regionId === REGIONID_CN.WEEK_BINHAIXINQU_TIANJIN || regionId === 'BINHAIXINQU(TIANJIN）' || regionId === '滨海新区') {
            regionCode = 'CHXX0130';
        }
        else if (regionId === REGIONID_CN.WEEK_DAGANG_TIANJIN || regionId === 'DAGANG(TIANJIN）' || regionId === '大港') {
            regionCode = 'WMXX2925';
        }
        else if (regionId === REGIONID_CN.WEEK_CHONGQING || regionId === 'CHONGQING' || regionId === '重庆') {
            regionCode = 'CHXX0017';
        }
        else if (regionId === REGIONID_CN.WEEK_YONGCHUAN_CHONGQING || regionId === 'YONGCHUAN(CHONGQING)' || regionId === '永川') {
            regionCode = 'CHXX0157';
        }
        else if (regionId === REGIONID_CN.WEEK_WANSHENG_CHONGQING || regionId === 'WANSHENG(CHONGQING)' || regionId === '万盛') {
            regionCode = 'WMXX2934';
        }
        else if (regionId === REGIONID_CN.WEEK_YUBEI_CHONGQING || regionId === 'YUBEI(CHONGQING)' || regionId === '渝北') {
            regionCode = 'WMXX2935';
        }
        else if (regionId === REGIONID_CN.WEEK_BEIBEI_CHONGQING || regionId === 'BEIBEI(CHONGQING)' || regionId === '北碚') {
            regionCode = 'WMXX2933';
        }
        else if (regionId === REGIONID_CN.WEEK_BANAN_CHONGQING || regionId === 'BANAN(CHONGQING)' || regionId === '巴南') {
            regionCode = 'WMXX2936';
        }
        else if (regionId === REGIONID_CN.WEEK_WANZHOU || regionId === 'WANZHOU' || regionId === '万州') {
            regionCode = 'WMXX1105';
        }
        else if (regionId === REGIONID_CN.WEEK_LIANGPING || regionId === 'LIANGPING' || regionId === '梁平') {
            regionCode = 'CHXX0405';
        }
        else if (regionId === REGIONID_CN.WEEK_DAZU || regionId === 'DAZU' || regionId === '大足') {
            regionCode = 'WMXX1309';
        }
        else if (regionId === REGIONID_CN.WEEK_HAERBIN || regionId === 'HAERBIN' || regionId === '哈尔滨') {
            regionCode = 'CHXX0046';
        }
        else if (regionId === REGIONID_CN.WEEK_SHUANGCHENG || regionId === 'SHUANGCHENG' || regionId === '双城') {
            regionCode = 'CHXX0124';
        }
        else if (regionId === REGIONID_CN.WEEK_HULAN || regionId === 'HULAN' || regionId === '呼兰') {
            regionCode = 'CHXX0054';
        }
        else if (regionId === REGIONID_CN.WEEK_ACHENG || regionId === 'ACHENG' || regionId === '阿城') {
            regionCode = 'CHXX0001';
        }
        else if (regionId === REGIONID_CN.WEEK_BINXIAN || regionId === 'BINXIAN' || regionId === '宾县') {
            regionCode = 'WMXX1990';
        }
        else if (regionId === REGIONID_CN.WEEK_BAYAN || regionId === 'BAYAN' || regionId === '巴彦') {
            regionCode = 'WMXX1991';
        }
        else if (regionId === REGIONID_CN.WEEK_WUCHANG || regionId === 'WUCHANG' || regionId === '五常') {
            regionCode = 'WMXX1987';
        }
        else if (regionId === REGIONID_CN.WEEK_QIQIHAER || regionId === 'QIQIHAER' || regionId === '齐齐哈尔') {
            regionCode = 'CHXX0112';
        }
        else if (regionId === REGIONID_CN.WEEK_GANNAN || regionId === 'GANNAN' || regionId === '甘南') {
            regionCode = 'WMXX1997';
        }
        else if (regionId === REGIONID_CN.WEEK_MUDANJIANG || regionId === 'MUDANJIANG' || regionId === '牡丹江') {
            regionCode = 'CHXX0278';
        }
        else if (regionId === REGIONID_CN.WEEK_JIAMUSI || regionId === 'JIAMUSI' || regionId === '佳木斯') {
            regionCode = 'WMXX1055';
        }
        else if (regionId === REGIONID_CN.WEEK_SUIHUA || regionId === 'SUIHUA' || regionId === '绥化') {
            regionCode = 'WMXX1057';
        }
        else if (regionId === REGIONID_CN.WEEK_HEIHE || regionId === 'HEIHE' || regionId === '黑河') {
            regionCode = 'CHXX0174';
        }
        else if (regionId === REGIONID_CN.WEEK_JIAGEDAQI || regionId === 'JIAGEDAQI' || regionId === '加格达奇') {
            regionCode = 'WMXX1258';
        }
        else if (regionId === REGIONID_CN.WEEK_YICHUN || regionId === 'YICHUN' || regionId === '伊春') {
            regionCode = 'WMXX1054';
        }
        else if (regionId === REGIONID_CN.WEEK_DAQING || regionId === 'DAQING' || regionId === '大庆') {
            regionCode = 'WMXX1051';
        }
        else if (regionId === REGIONID_CN.WEEK_QITAIHE || regionId === 'QITAIHE' || regionId === '七台河') {
            regionCode = 'WMXX1056';
        }
        else if (regionId === REGIONID_CN.WEEK_JIXI || regionId === 'JIXI' || regionId === '鸡西') {
            regionCode = 'CHXX0193';
        }
        else if (regionId === REGIONID_CN.WEEK_HEGANG || regionId === 'HEGANG' || regionId === '鹤岗') {
            regionCode = 'WMXX1052';
        }
        else if (regionId === REGIONID_CN.WEEK_SHUANGYASHAN || regionId === 'SHUANGYASHAN' || regionId === '双鸭山') {
            regionCode = 'WMXX1053';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGCHUN || regionId === 'CHANGCHUN' || regionId === '长春') {
            regionCode = 'CHXX0010';
        }
        else if (regionId === REGIONID_CN.WEEK_YANJI || regionId === 'YANJI' || regionId === '延吉') {
            regionCode = 'CHXX0291';
        }
        else if (regionId === REGIONID_CN.WEEK_SIPING || regionId === 'SIPING' || regionId === '四平') {
            regionCode = 'CHXX0283';
        }
        else if (regionId === REGIONID_CN.WEEK_TONGHUA || regionId === 'TONGHUA' || regionId === '通化') {
            regionCode = 'WMXX1049';
        }
        else if (regionId === REGIONID_CN.WEEK_BAICHENG || regionId === 'BAICHENG' || regionId === '白城') {
            regionCode = 'WMXX1050';
        }
        else if (regionId === REGIONID_CN.WEEK_LIAOYUAN || regionId === 'LIAOYUAN' || regionId === '辽源') {
            regionCode = 'WMXX1048';
        }
        else if (regionId === REGIONID_CN.WEEK_SONGYUAN || regionId === 'SONGYUAN' || regionId === '松原') {
            regionCode = 'WMXX1272';
        }
        else if (regionId === REGIONID_CN.WEEK_BAISHAN || regionId === 'BAISHAN' || regionId === '白山') {
            regionCode = 'WMXX1271';
        }
        else if (regionId === REGIONID_CN.WEEK_SHENYANG || regionId === 'SHENYANG' || regionId === '沈阳') {
            regionCode = 'CHXX0119';
        }
        else if (regionId === REGIONID_CN.WEEK_DALIAN || regionId === 'DALIAN' || regionId === '大连') {
            regionCode = 'CHXX0019';
        }
        else if (regionId === REGIONID_CN.WEEK_WAFANGDIAN || regionId === 'WAFANGDIAN' || regionId === '瓦房店') {
            regionCode = 'WMXX1923';
        }
        else if (regionId === REGIONID_CN.WEEK_JINZHOU || regionId === 'JINZHOU' || regionId === '金州') {
            regionCode = 'WMXX1922';
        }
        else if (regionId === REGIONID_CN.WEEK_LVSHUN || regionId === 'LVSHUN' || regionId === '旅顺') {
            regionCode = 'CHXX0087';
        }
        else if (regionId === REGIONID_CN.WEEK_ANSHAN || regionId === 'ANSHAN' || regionId === '鞍山') {
            regionCode = 'CHXX0004';
        }
        else if (regionId === REGIONID_CN.WEEK_FUSHUN || regionId === 'FUSHUN' || regionId === '抚顺') {
            regionCode = 'CHXX0029';
        }
        else if (regionId === REGIONID_CN.WEEK_BENXI || regionId === 'BENXI' || regionId === '本溪') {
            regionCode = 'CHXX0296';
        }
        else if (regionId === REGIONID_CN.WEEK_DANDONG || regionId === 'DANDONG' || regionId === '丹东') {
            regionCode = 'CHXX0306';
        }
        else if (regionId === REGIONID_CN.WEEK_JINZHOU || regionId === 'JINZHOU' || regionId === '锦州') {
            regionCode = 'CHXX0067';
        }
        else if (regionId === REGIONID_CN.WEEK_YINGKOU || regionId === 'YINGKOU' || regionId === '营口') {
            regionCode = 'CHXX0304';
        }
        else if (regionId === REGIONID_CN.WEEK_FUXIN || regionId === 'FUXIN' || regionId === '阜新') {
            regionCode = 'WMXX1045';
        }
        else if (regionId === REGIONID_CN.WEEK_LIAOYANG || regionId === 'LIAOYANG' || regionId === '辽阳') {
            regionCode = 'CHXX0081';
        }
        else if (regionId === REGIONID_CN.WEEK_TIELING || regionId === 'TIELING' || regionId === '铁岭') {
            regionCode = 'CHXX0134';
        }
        else if (regionId === REGIONID_CN.WEEK_PANJIN || regionId === 'PANJIN' || regionId === '盘锦') {
            regionCode = 'WMXX1046';
        }
        else if (regionId === REGIONID_CN.WEEK_HULUDAO || regionId === 'HULUDAO' || regionId === '葫芦岛') {
            regionCode = 'WMXX1047';
        }
        else if (regionId === REGIONID_CN.WEEK_HUHEHAOTE || regionId === 'HUHEHAOTE' || regionId === '呼和浩特') {
            regionCode = 'CHXX0249';
        }
        else if (regionId === REGIONID_CN.WEEK_BAOTOU || regionId === 'BAOTOU' || regionId === '包头') {
            regionCode = 'CHXX0007';
        }
        else if (regionId === REGIONID_CN.WEEK_WUHAI || regionId === 'WUHAI' || regionId === '乌海') {
            regionCode = 'WMXX1114';
        }
        else if (regionId === REGIONID_CN.WEEK_JINING || regionId === 'JINING' || regionId === '集宁') {
            regionCode = 'CHXX0250';
        }
        else if (regionId === REGIONID_CN.WEEK_TONGLIAO || regionId === 'TONGLIAO' || regionId === '通辽') {
            regionCode = 'CHXX0282';
        }
        else if (regionId === REGIONID_CN.WEEK_CHIFENG || regionId === 'CHIFENG' || regionId === '赤峰') {
            regionCode = 'CHXX0286';
        }
        else if (regionId === REGIONID_CN.WEEK_EERDUOSI || regionId === 'EERDUOSI' || regionId === '鄂尔多斯') {
            regionCode = 'CHXX0255';
        }
        else if (regionId === REGIONID_CN.WEEK_HENAN || regionId === 'HENAN' || regionId === '河南') {
            regionCode = 'WMXX2837';
        }
        else if (regionId === REGIONID_CN.WEEK_LINHE || regionId === 'LINHE' || regionId === '临河') {
            regionCode = 'CHXX0253';
        }
        else if (regionId === REGIONID_CN.WEEK_XILINHAOTE || regionId === 'XILINHAOTE' || regionId === '锡林浩特') {
            regionCode = 'CHXX0280';
        }
        else if (regionId === REGIONID_CN.WEEK_WULANHAOTE || regionId === 'WULANHAOTE' || regionId === '乌兰浩特') {
            regionCode = 'WMXX1115';
        }
        else if (regionId === REGIONID_CN.WEEK_AZUOQI || regionId === 'AZUOQI' || regionId === '阿左旗') {
            regionCode = 'WMXX1270';
        }
        else if (regionId === REGIONID_CN.WEEK_SHIJIAZHUANG || regionId === 'SHIJIAZHUANG' || regionId === '石家庄') {
            regionCode = 'CHXX0122';
        }
        else if (regionId === REGIONID_CN.WEEK_BAODING || regionId === 'BAODING' || regionId === '保定') {
            regionCode = 'CHXX0308';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHANGJIAKOU || regionId === 'ZHANGJIAKOU' || regionId === '张家口') {
            regionCode = 'CHXX0300';
        }
        else if (regionId === REGIONID_CN.WEEK_CHENGDE || regionId === 'CHENGDE' || regionId === '承德') {
            regionCode = 'CHXX0302';
        }
        else if (regionId === REGIONID_CN.WEEK_TANGSHAN || regionId === 'TANGSHAN' || regionId === '唐山') {
            regionCode = 'CHXX0131';
        }
        else if (regionId === REGIONID_CN.WEEK_LANGFANG || regionId === 'LANGFANG' || regionId === '廊坊') {
            regionCode = 'WMXX1039';
        }
        else if (regionId === REGIONID_CN.WEEK_CANGZHOU || regionId === 'CANGZHOU' || regionId === '沧州') {
            regionCode = 'WMXX1040';
        }
        else if (regionId === REGIONID_CN.WEEK_HENGSHUI || regionId === 'HENGSHUI' || regionId === '衡水') {
            regionCode = 'WMXX1041';
        }
        else if (regionId === REGIONID_CN.WEEK_XINGTAI || regionId === 'XINGTAI' || regionId === '邢台') {
            regionCode = 'CHXX0266';
        }
        else if (regionId === REGIONID_CN.WEEK_HANDAN || regionId === 'HANDAN' || regionId === '邯郸') {
            regionCode = 'WMXX1037';
        }
        else if (regionId === REGIONID_CN.WEEK_QINHUANGDAO || regionId === 'QINHUANGDAO' || regionId === '秦皇岛') {
            regionCode = 'WMXX1038';
        }
        else if (regionId === REGIONID_CN.WEEK_TAIYUAN || regionId === 'TAIYUAN' || regionId === '太原') {
            regionCode = 'CHXX0129';
        }
        else if (regionId === REGIONID_CN.WEEK_DATONG || regionId === 'DATONG' || regionId === '大同') {
            regionCode = 'CHXX0251';
        }
        else if (regionId === REGIONID_CN.WEEK_YANGQUAN || regionId === 'YANGQUAN' || regionId === '阳泉') {
            regionCode = 'CHXX0152';
        }
        else if (regionId === REGIONID_CN.WEEK_JINZHONG || regionId === 'JINZHONG' || regionId === '晋中') {
            regionCode = 'WMXX1268';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGZHI || regionId === 'CHANGZHI' || regionId === '长治') {
            regionCode = 'WMXX1043';
        }
        else if (regionId === REGIONID_CN.WEEK_JINCHENG || regionId === 'JINCHENG' || regionId === '晋城') {
            regionCode = 'WMXX1044';
        }
        else if (regionId === REGIONID_CN.WEEK_LINFEN || regionId === 'LINFEN' || regionId === '临汾') {
            regionCode = 'WMXX1042';
        }
        else if (regionId === REGIONID_CN.WEEK_YUNCHENG || regionId === 'YUNCHENG' || regionId === '运城') {
            regionCode = 'CHXX0272';
        }
        else if (regionId === REGIONID_CN.WEEK_SHUOZHOU || regionId === 'SHUOZHOU' || regionId === '朔州') {
            regionCode = 'WMXX1267';
        }
        else if (regionId === REGIONID_CN.WEEK_XINZHOU || regionId === 'XINZHOU' || regionId === '忻州') {
            regionCode = 'WMXX1269';
        }
        else if (regionId === REGIONID_CN.WEEK_LVLIANG || regionId === 'LVLIANG' || regionId === '吕梁') {
            regionCode = 'CHXX0264';
        }
        else if (regionId === REGIONID_CN.WEEK_XIAN || regionId === 'XIAN' || regionId === '西安') {
            regionCode = 'CHXX0141';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGAN || regionId === 'CHANGAN' || regionId === '长安') {
            regionCode = 'WMXX2681';
        }
        else if (regionId === REGIONID_CN.WEEK_LINTONG || regionId === 'LINTONG' || regionId === '临潼') {
            regionCode = 'CHXX0082';
        }
        else if (regionId === REGIONID_CN.WEEK_LANTIAN || regionId === 'LANTIAN' || regionId === '蓝田') {
            regionCode = 'WMXX2682';
        }
        else if (regionId === REGIONID_CN.WEEK_HUXIAN || regionId === 'HUXIAN' || regionId === '户县') {
            regionCode = 'WMXX2684';
        }
        else if (regionId === REGIONID_CN.WEEK_GAOLING || regionId === 'GAOLING' || regionId === '高陵') {
            regionCode = 'WMXX2685';
        }
        else if (regionId === REGIONID_CN.WEEK_XIANYANG || regionId === 'XIANYANG' || regionId === '咸阳') {
            regionCode = 'CHXX0143';
        }
        else if (regionId === REGIONID_CN.WEEK_YANAN || regionId === 'YANAN' || regionId === '延安') {
            regionCode = 'CHXX0267';
        }
        else if (regionId === REGIONID_CN.WEEK_YULIN || regionId === 'YULIN' || regionId === '榆林') {
            regionCode = 'CHXX0260';
        }
        else if (regionId === REGIONID_CN.WEEK_WEINAN || regionId === 'WEINAN' || regionId === '渭南') {
            regionCode = 'CHXX0137';
        }
        else if (regionId === REGIONID_CN.WEEK_SHANGLUO || regionId === 'SHANGLUO' || regionId === '商洛') {
            regionCode = 'WMXX1290';
        }
        else if (regionId === REGIONID_CN.WEEK_ANKANG || regionId === 'ANKANG' || regionId === '安康') {
            regionCode = 'CHXX0394';
        }
        else if (regionId === REGIONID_CN.WEEK_HANZHONG || regionId === 'HANZHONG' || regionId === '汉中') {
            regionCode = 'CHXX0390';
        }
        else if (regionId === REGIONID_CN.WEEK_BAOJI || regionId === 'BAOJI' || regionId === '宝鸡') {
            regionCode = 'CHXX0387';
        }
        else if (regionId === REGIONID_CN.WEEK_TONGCHUAN || regionId === 'TONGCHUAN' || regionId === '铜川') {
            regionCode = 'WMXX1289';
        }
        else if (regionId === REGIONID_CN.WEEK_JINAN || regionId === 'JINAN' || regionId === '济南') {
            regionCode = 'CHXX0064';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGQING || regionId === 'CHANGQING' || regionId === '长清') {
            regionCode = 'WMXX1526';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHANGQIU || regionId === 'ZHANGQIU' || regionId === '章丘') {
            regionCode = 'CHXX0161';
        }
        else if (regionId === REGIONID_CN.WEEK_JIYANG || regionId === 'JIYANG' || regionId === '济阳') {
            regionCode = 'WMXX1527';
        }
        else if (regionId === REGIONID_CN.WEEK_QINGDAO || regionId === 'QINGDAO' || regionId === '青岛') {
            regionCode = 'CHXX0110';
        }
        else if (regionId === REGIONID_CN.WEEK_JIMO || regionId === 'JIMO' || regionId === '即墨') {
            regionCode = 'WMXX1326';
        }
        else if (regionId === REGIONID_CN.WEEK_JIAOZHOU || regionId === 'JIAOZHOU' || regionId === '胶州') {
            regionCode = 'CHXX0061';
        }
        else if (regionId === REGIONID_CN.WEEK_LAIXI || regionId === 'LAIXI' || regionId === '莱西') {
            regionCode = 'WMXX1529';
        }
        else if (regionId === REGIONID_CN.WEEK_PINGDU || regionId === 'PINGDU' || regionId === '平度') {
            regionCode = 'WMXX1169';
        }
        else if (regionId === REGIONID_CN.WEEK_ZIBO || regionId === 'ZIBO' || regionId === '淄博') {
            regionCode = 'CHXX0169';
        }
        else if (regionId === REGIONID_CN.WEEK_DEZHOU || regionId === 'DEZHOU' || regionId === '德州') {
            regionCode = 'WMXX1027';
        }
        else if (regionId === REGIONID_CN.WEEK_YANTAI || regionId === 'YANTAI' || regionId === '烟台') {
            regionCode = 'WMXX1018';
        }
        else if (regionId === REGIONID_CN.WEEK_LAIZHOU || regionId === 'LAIZHOU' || regionId === '莱州') {
            regionCode = 'WMXX1544';
        }
        else if (regionId === REGIONID_CN.WEEK_PENGLAI || regionId === 'PENGLAI' || regionId === '蓬莱') {
            regionCode = 'WMXX1545';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHAOYUAN || regionId === 'ZHAOYUAN' || regionId === '招远') {
            regionCode = 'WMXX1546';
        }
        else if (regionId === REGIONID_CN.WEEK_WEIFANG || regionId === 'WEIFANG' || regionId === '潍坊') {
            regionCode = 'CHXX0318';
        }
        else if (regionId === REGIONID_CN.WEEK_SHOUGUANG || regionId === 'SHOUGUANG' || regionId === '寿光') {
            regionCode = 'WMXX1151';
        }
        else if (regionId === REGIONID_CN.WEEK_JINING || regionId === 'JINING' || regionId === '济宁') {
            regionCode = 'WMXX1022';
        }
        else if (regionId === REGIONID_CN.WEEK_TAIAN || regionId === 'TAIAN' || regionId === '泰安') {
            regionCode = 'WMXX1025';
        }
        else if (regionId === REGIONID_CN.WEEK_LINYI || regionId === 'LINYI' || regionId === '临沂') {
            regionCode = 'WMXX1020';
        }
        else if (regionId === REGIONID_CN.WEEK_HEZE || regionId === 'HEZE' || regionId === '菏泽') {
            regionCode = 'WMXX1028';
        }
        else if (regionId === REGIONID_CN.WEEK_BINZHOU || regionId === 'BINZHOU' || regionId === '滨州') {
            regionCode = 'WMXX1264';
        }
        else if (regionId === REGIONID_CN.WEEK_DONGYING || regionId === 'DONGYING' || regionId === '东营') {
            regionCode = 'WMXX1021';
        }
        else if (regionId === REGIONID_CN.WEEK_WEIHAI || regionId === 'WEIHAI' || regionId === '威海') {
            regionCode = 'WMXX1024';
        }
        else if (regionId === REGIONID_CN.WEEK_WENDENG || regionId === 'WENDENG' || regionId === '文登') {
            regionCode = 'WMXX1175';
        }
        else if (regionId === REGIONID_CN.WEEK_RONGCHENG || regionId === 'RONGCHENG' || regionId === '荣成') {
            regionCode = 'CHXX0314';
        }
        else if (regionId === REGIONID_CN.WEEK_RUSHAN || regionId === 'RUSHAN' || regionId === '乳山') {
            regionCode = 'WMXX1550';
        }
        else if (regionId === REGIONID_CN.WEEK_ZAOZHUANG || regionId === 'ZAOZHUANG' || regionId === '枣庄') {
            regionCode = 'WMXX1019';
        }
        else if (regionId === REGIONID_CN.WEEK_RIZHAO || regionId === 'RIZHAO' || regionId === '日照') {
            regionCode = 'CHXX0322';
        }
        else if (regionId === REGIONID_CN.WEEK_LAIWU || regionId === 'LAIWU' || regionId === '莱芜') {
            regionCode = 'WMXX1026';
        }
        else if (regionId === REGIONID_CN.WEEK_LIAOCHENG || regionId === 'LIAOCHENG' || regionId === '聊城') {
            regionCode = 'WMXX1023';
        }
        else if (regionId === REGIONID_CN.WEEK_WULUMUQI || regionId === 'WULUMUQI' || regionId === '乌鲁木齐') {
            regionCode = 'CHXX0135';
        }
        else if (regionId === REGIONID_CN.WEEK_KELAMAYI || regionId === 'KELAMAYI' || regionId === '克拉玛依') {
            regionCode = 'CHXX0200';
        }
        else if (regionId === REGIONID_CN.WEEK_SHIHEZI || regionId === 'SHIHEZI' || regionId === '石河子') {
            regionCode = 'WMXX1119';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGJI || regionId === 'CHANGJI' || regionId === '昌吉') {
            regionCode = 'CHXX0011';
        }
        else if (regionId === REGIONID_CN.WEEK_TULUFAN || regionId === 'TULUFAN' || regionId === '吐鲁番') {
            regionCode = 'CHXX0207';
        }
        else if (regionId === REGIONID_CN.WEEK_KUERLE || regionId === 'KUERLE' || regionId === '库尔勒') {
            regionCode = 'CHXX0209';
        }
        else if (regionId === REGIONID_CN.WEEK_AKESU || regionId === 'AKESU' || regionId === '阿克苏') {
            regionCode = 'WMXX1117';
        }
        else if (regionId === REGIONID_CN.WEEK_KASHI || regionId === 'KASHI' || regionId === '喀什') {
            regionCode = 'CHXX0074';
        }
        else if (regionId === REGIONID_CN.WEEK_YINING || regionId === 'YINING' || regionId === '伊宁') {
            regionCode = 'CHXX0203';
        }
        else if (regionId === REGIONID_CN.WEEK_TACHENG || regionId === 'TACHENG' || regionId === '塔城') {
            regionCode = 'CHXX0198';
        }
        else if (regionId === REGIONID_CN.WEEK_HAMI || regionId === 'HAMI' || regionId === '哈密') {
            regionCode = 'CHXX0219';
        }
        else if (regionId === REGIONID_CN.WEEK_HETIAN || regionId === 'HETIAN' || regionId === '和田') {
            regionCode = 'CHXX0216';
        }
        else if (regionId === REGIONID_CN.WEEK_ALETAI || regionId === 'ALETAI' || regionId === '阿勒泰') {
            regionCode = 'CHXX0196';
        }
        else if (regionId === REGIONID_CN.WEEK_ATUSHI || regionId === 'ATUSHI' || regionId === '阿图什') {
            regionCode = 'WMXX1118';
        }
        else if (regionId === REGIONID_CN.WEEK_LASA || regionId === 'LASA' || regionId === '拉萨') {
            regionCode = 'CHXX0080';
        }
        else if (regionId === REGIONID_CN.WEEK_RIKAZE || regionId === 'RIKAZE' || regionId === '日喀则') {
            regionCode = 'CHXX0145';
        }
        else if (regionId === REGIONID_CN.WEEK_SHANNAN || regionId === 'SHANNAN' || regionId === '山南') {
            regionCode = 'WMXX1287';
        }
        else if (regionId === REGIONID_CN.WEEK_LINZHI || regionId === 'LINZHI' || regionId === '林芝') {
            regionCode = 'CHXX0356';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGDU || regionId === 'CHANGDU' || regionId === '昌都') {
            regionCode = 'CHXX0343';
        }
        else if (regionId === REGIONID_CN.WEEK_NAQU || regionId === 'NAQU' || regionId === '那曲') {
            regionCode = 'CHXX0325';
        }
        else if (regionId === REGIONID_CN.WEEK_GAER || regionId === 'GAER' || regionId === '噶尔') {
            regionCode = 'CHXX0323';
        }
        else if (regionId === REGIONID_CN.WEEK_XINING || regionId === 'XINING' || regionId === '西宁') {
            regionCode = 'CHXX0236';
        }
        else if (regionId === REGIONID_CN.WEEK_HAIDONG || regionId === 'HAIDONG' || regionId === '海东') {
            regionCode = 'WMXX2828';
        }
        else if (regionId === REGIONID_CN.WEEK_HAINAN || regionId === 'HAINAN' || regionId === '海南') {
            regionCode = 'WMXX2841';
        }
        else if (regionId === REGIONID_CN.WEEK_GUOLUO || regionId === 'GUOLUO' || regionId === '果洛') {
            regionCode = 'WMXX2847';
        }
        else if (regionId === REGIONID_CN.WEEK_YUSHU || regionId === 'YUSHU' || regionId === '玉树') {
            regionCode = 'CHXX0334';
        }
        else if (regionId === REGIONID_CN.WEEK_HAIXI || regionId === 'HAIXI' || regionId === '海西') {
            regionCode = 'WMXX2855';
        }
        else if (regionId === REGIONID_CN.WEEK_HAIBEI || regionId === 'HAIBEI' || regionId === '海北') {
            regionCode = 'WMXX2834';
        }
        else if (regionId === REGIONID_CN.WEEK_LANZHOU || regionId === 'LANZHOU' || regionId === '兰州') {
            regionCode = 'CHXX0079';
        }
        else if (regionId === REGIONID_CN.WEEK_DINGXI || regionId === 'DINGXI' || regionId === '定西') {
            regionCode = 'CHXX0024';
        }
        else if (regionId === REGIONID_CN.WEEK_PINGLIANG || regionId === 'PINGLIANG' || regionId === '平凉') {
            regionCode = 'CHXX0270';
        }
        else if (regionId === REGIONID_CN.WEEK_QINGYANG || regionId === 'QINGYANG' || regionId === '庆阳') {
            regionCode = 'CHXX0271';
        }
        else if (regionId === REGIONID_CN.WEEK_WUWEI || regionId === 'WUWEI' || regionId === '武威') {
            regionCode = 'WMXX1100';
        }
        else if (regionId === REGIONID_CN.WEEK_JINCHANG || regionId === 'JINCHANG' || regionId === '金昌') {
            regionCode = 'WMXX1099';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHANGYE || regionId === 'ZHANGYE' || regionId === '张掖') {
            regionCode = 'CHXX0228';
        }
        else if (regionId === REGIONID_CN.WEEK_JIUQUAN || regionId === 'JIUQUAN' || regionId === '酒泉') {
            regionCode = 'CHXX0226';
        }
        else if (regionId === REGIONID_CN.WEEK_TIANSHUI || regionId === 'TIANSHUI' || regionId === '天水') {
            regionCode = 'CHXX0386';
        }
        else if (regionId === REGIONID_CN.WEEK_WUDU || regionId === 'WUDU' || regionId === '武都') {
            regionCode = 'CHXX0340';
        }
        else if (regionId === REGIONID_CN.WEEK_BAIYIN || regionId === 'BAIYIN' || regionId === '白银') {
            regionCode = 'CHXX0006';
        }
        else if (regionId === REGIONID_CN.WEEK_JIAYUGUAN || regionId === 'JIAYUGUAN' || regionId === '嘉峪关') {
            regionCode = 'WMXX1098';
        }
        else if (regionId === REGIONID_CN.WEEK_YINCHUAN || regionId === 'YINCHUAN' || regionId === '银川') {
            regionCode = 'CHXX0259';
        }
        else if (regionId === REGIONID_CN.WEEK_SHIZUISHAN || regionId === 'SHIZUISHAN' || regionId === '石嘴山') {
            regionCode = 'WMXX1101';
        }
        else if (regionId === REGIONID_CN.WEEK_WUZHONG || regionId === 'WUZHONG' || regionId === '吴忠') {
            regionCode = 'WMXX1102';
        }
        else if (regionId === REGIONID_CN.WEEK_GUYUAN || regionId === 'GUYUAN' || regionId === '固原') {
            regionCode = 'WMXX1103';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHONGWEI || regionId === 'ZHONGWEI' || regionId === '中卫') {
            regionCode = 'WMXX1104';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHENGZHOU || regionId === 'ZHENGZHOU' || regionId === '郑州') {
            regionCode = 'CHXX0165';
        }
        else if (regionId === REGIONID_CN.WEEK_ANYANG || regionId === 'ANYANG' || regionId === '安阳') {
            regionCode = 'CHXX0269';
        }
        else if (regionId === REGIONID_CN.WEEK_XINXIANG || regionId === 'XINXIANG' || regionId === '新乡') {
            regionCode = 'CHXX0148';
        }
        else if (regionId === REGIONID_CN.WEEK_XUCHANG || regionId === 'XUCHANG' || regionId === '许昌') {
            regionCode = 'WMXX1034';
        }
        else if (regionId === REGIONID_CN.WEEK_PINGDINGSHAN || regionId === 'PINGDINGSHAN' || regionId === '平顶山') {
            regionCode = 'WMXX1031';
        }
        else if (regionId === REGIONID_CN.WEEK_XINYANG || regionId === 'XINYANG' || regionId === '信阳') {
            regionCode = 'CHXX0149';
        }
        else if (regionId === REGIONID_CN.WEEK_NANYANG || regionId === 'NANYANG' || regionId === '南阳') {
            regionCode = 'CHXX0391';
        }
        else if (regionId === REGIONID_CN.WEEK_KAIFENG || regionId === 'KAIFENG' || regionId === '开封') {
            regionCode = 'CHXX0072';
        }
        else if (regionId === REGIONID_CN.WEEK_LUOYANG || regionId === 'LUOYANG' || regionId === '洛阳') {
            regionCode = 'CHXX0086';
        }
        else if (regionId === REGIONID_CN.WEEK_SHANGQIU || regionId === 'SHANGQIU' || regionId === '商丘') {
            regionCode = 'WMXX1029';
        }
        else if (regionId === REGIONID_CN.WEEK_JIAOZUO || regionId === 'JIAOZUO' || regionId === '焦作') {
            regionCode = 'WMXX1032';
        }
        else if (regionId === REGIONID_CN.WEEK_HEBI || regionId === 'HEBI' || regionId === '鹤壁') {
            regionCode = 'WMXX1033';
        }
        else if (regionId === REGIONID_CN.WEEK_PUYANG || regionId === 'PUYANG' || regionId === '濮阳') {
            regionCode = 'WMXX1030';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHOUKOU || regionId === 'ZHOUKOU' || regionId === '周口') {
            regionCode = 'WMXX1036';
        }
        else if (regionId === REGIONID_CN.WEEK_LUOHE || regionId === 'LUOHE' || regionId === '漯河') {
            regionCode = 'WMXX1035';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHUMADIAN || regionId === 'ZHUMADIAN' || regionId === '驻马店') {
            regionCode = 'CHXX0398';
        }
        else if (regionId === REGIONID_CN.WEEK_SANMENXIA || regionId === 'SANMENXIA' || regionId === '三门峡') {
            regionCode = 'WMXX1265';
        }
        else if (regionId === REGIONID_CN.WEEK_NANJING || regionId === 'NANJING' || regionId === '南京') {
            regionCode = 'CHXX0099';
        }
        else if (regionId === REGIONID_CN.WEEK_PUKOU || regionId === 'PUKOU' || regionId === '浦口') {
            regionCode = 'CHXX0109';
        }
        else if (regionId === REGIONID_CN.WEEK_WUXI || regionId === 'WUXI' || regionId === '无锡') {
            regionCode = 'WMXX1009';
        }
        else if (regionId === REGIONID_CN.WEEK_JIANGYIN || regionId === 'JIANGYIN' || regionId === '江阴') {
            regionCode = 'WMXX1144';
        }
        else if (regionId === REGIONID_CN.WEEK_YIXING || regionId === 'YIXING' || regionId === '宜兴') {
            regionCode = 'WMXX1145';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHENJIANG || regionId === 'ZHENJIANG' || regionId === '镇江') {
            regionCode = 'CHXX0166';
        }
        else if (regionId === REGIONID_CN.WEEK_JURONG || regionId === 'JURONG' || regionId === '句容') {
            regionCode = 'CHXX0071';
        }
        else if (regionId === REGIONID_CN.WEEK_SUZHOU || regionId === 'SUZHOU' || regionId === '苏州') {
            regionCode = 'WMXX1007';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGSHU || regionId === 'CHANGSHU' || regionId === '常熟') {
            regionCode = 'CHXX0014';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHANGJIAGANG || regionId === 'ZHANGJIAGANG' || regionId === '张家港') {
            regionCode = 'WMXX1335';
        }
        else if (regionId === REGIONID_CN.WEEK_KUNSHAN || regionId === 'KUNSHAN' || regionId === '昆山') {
            regionCode = 'WMXX1455';
        }
        else if (regionId === REGIONID_CN.WEEK_WUJIANG || regionId === 'WUJIANG' || regionId === '吴江') {
            regionCode = 'WMXX1456';
        }
        else if (regionId === REGIONID_CN.WEEK_TAICANG || regionId === 'TAICANG' || regionId === '太仓') {
            regionCode = 'WMXX1457';
        }
        else if (regionId === REGIONID_CN.WEEK_HAIMEN || regionId === 'HAIMEN' || regionId === '海门') {
            regionCode = 'WMXX1460';
        }
        else if (regionId === REGIONID_CN.WEEK_YANGZHOU || regionId === 'YANGZHOU' || regionId === '扬州') {
            regionCode = 'WMXX1013';
        }
        else if (regionId === REGIONID_CN.WEEK_YANCHENG || regionId === 'YANCHENG' || regionId === '盐城') {
            regionCode = 'WMXX1014';
        }
        else if (regionId === REGIONID_CN.WEEK_XUZHOU || regionId === 'XUZHOU' || regionId === '徐州') {
            regionCode = 'CHXX0437';
        }
        else if (regionId === REGIONID_CN.WEEK_HUAIAN || regionId === 'HUAIAN' || regionId === '淮安') {
            regionCode = 'WMXX1011';
        }
        else if (regionId === REGIONID_CN.WEEK_LIANYUNGANG || regionId === 'LIANYUNGANG' || regionId === '连云港') {
            regionCode = 'WMXX1012';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGZHOU || regionId === 'CHANGZHOU' || regionId === '常州') {
            regionCode = 'CHXX0015';
        }
        else if (regionId === REGIONID_CN.WEEK_LIYANG || regionId === 'LIYANG' || regionId === '溧阳') {
            regionCode = 'CHXX0450';
        }
        else if (regionId === REGIONID_CN.WEEK_JINTAN || regionId === 'JINTAN' || regionId === '金坛') {
            regionCode = 'WMXX1453';
        }
        else if (regionId === REGIONID_CN.WEEK_TAIZHOU || regionId === 'TAIZHOU' || regionId === '泰州') {
            regionCode = 'WMXX1008';
        }
        else if (regionId === REGIONID_CN.WEEK_SUQIAN || regionId === 'SUQIAN' || regionId === '宿迁') {
            regionCode = 'WMXX1010';
        }
        else if (regionId === REGIONID_CN.WEEK_WUHAN || regionId === 'WUHAN' || regionId === '武汉') {
            regionCode = 'CHXX0138';
        }
        else if (regionId === REGIONID_CN.WEEK_CAIDIAN || regionId === 'CAIDIAN' || regionId === '蔡甸') {
            regionCode = 'WMXX2168';
        }
        else if (regionId === REGIONID_CN.WEEK_HUANGPI || regionId === 'HUANGPI' || regionId === '黄陂') {
            regionCode = 'CHXX0050';
        }
        else if (regionId === REGIONID_CN.WEEK_JIANGXIA || regionId === 'JIANGXIA' || regionId === '江夏') {
            regionCode = 'WMXX2169';
        }
        else if (regionId === REGIONID_CN.WEEK_XIANGYANG || regionId === 'XIANGYANG' || regionId === '襄阳') {
            regionCode = 'WMXX1074';
        }
        else if (regionId === REGIONID_CN.WEEK_EZHOU || regionId === 'EZHOU' || regionId === '鄂州') {
            regionCode = 'WMXX1274';
        }
        else if (regionId === REGIONID_CN.WEEK_XIAOGAN || regionId === 'XIAOGAN' || regionId === '孝感') {
            regionCode = 'CHXX0144';
        }
        else if (regionId === REGIONID_CN.WEEK_HUANGGANG || regionId === 'HUANGGANG' || regionId === '黄冈') {
            regionCode = 'WMXX1275';
        }
        else if (regionId === REGIONID_CN.WEEK_HUANGSHI || regionId === 'HUANGSHI' || regionId === '黄石') {
            regionCode = 'CHXX0051';
        }
        else if (regionId === REGIONID_CN.WEEK_XIANNING || regionId === 'XIANNING' || regionId === '咸宁') {
            regionCode = 'WMXX1077';
        }
        else if (regionId === REGIONID_CN.WEEK_JINGZHOU || regionId === 'JINGZHOU' || regionId === '荆州') {
            regionCode = 'CHXX0408';
        }
        else if (regionId === REGIONID_CN.WEEK_YICHANG || regionId === 'YICHANG' || regionId === '宜昌') {
            regionCode = 'CHXX0407';
        }
        else if (regionId === REGIONID_CN.WEEK_ENSHI || regionId === 'ENSHI' || regionId === '恩施') {
            regionCode = 'CHXX0406';
        }
        else if (regionId === REGIONID_CN.WEEK_SHIYAN || regionId === 'SHIYAN' || regionId === '十堰') {
            regionCode = 'WMXX1075';
        }
        else if (regionId === REGIONID_CN.WEEK_SUIZHOU || regionId === 'SUIZHOU' || regionId === '随州') {
            regionCode = 'WMXX1078';
        }
        else if (regionId === REGIONID_CN.WEEK_JINGMEN || regionId === 'JINGMEN' || regionId === '荆门') {
            regionCode = 'WMXX1076';
        }
        else if (regionId === REGIONID_CN.WEEK_XIANTAO || regionId === 'XIANTAO' || regionId === '仙桃') {
            regionCode = 'WMXX1124';
        }
        else if (regionId === REGIONID_CN.WEEK_QIANJIANG || regionId === 'QIANJIANG' || regionId === '潜江') {
            regionCode = 'WMXX1276';
        }
        else if (regionId === REGIONID_CN.WEEK_HANGZHOU || regionId === 'HANGZHOU' || regionId === '杭州') {
            regionCode = 'CHXX0044';
        }
        else if (regionId === REGIONID_CN.WEEK_XIAOSHAN || regionId === 'XIAOSHAN' || regionId === '萧山') {
            regionCode = 'WMXX1482';
        }
        else if (regionId === REGIONID_CN.WEEK_JIANDE || regionId === 'JIANDE' || regionId === '建德') {
            regionCode = 'WMXX1483';
        }
        else if (regionId === REGIONID_CN.WEEK_YUHANG || regionId === 'YUHANG' || regionId === '余杭') {
            regionCode = 'WMXX2950';
        }
        else if (regionId === REGIONID_CN.WEEK_LINAN || regionId === 'LINAN' || regionId === '临安') {
            regionCode = 'WMXX1485';
        }
        else if (regionId === REGIONID_CN.WEEK_FUYANG || regionId === 'FUYANG' || regionId === '富阳') {
            regionCode = 'WMXX1484';
        }
        else if (regionId === REGIONID_CN.WEEK_HUZHOU || regionId === 'HUZHOU' || regionId === '湖州') {
            regionCode = 'CHXX0056';
        }
        else if (regionId === REGIONID_CN.WEEK_JIAXING || regionId === 'JIAXING' || regionId === '嘉兴') {
            regionCode = 'CHXX0062';
        }
        else if (regionId === REGIONID_CN.WEEK_NINGBO || regionId === 'NINGBO' || regionId === '宁波') {
            regionCode = 'WMXX1016';
        }
        else if (regionId === REGIONID_CN.WEEK_SHAOXING || regionId === 'SHAOXING' || regionId === '绍兴') {
            regionCode = 'CHXX0117';
        }
        else if (regionId === REGIONID_CN.WEEK_TAIZHOU || regionId === 'TAIZHOU' || regionId === '台州') {
            regionCode = 'WMXX1263';
        }
        else if (regionId === REGIONID_CN.WEEK_WENZHOU || regionId === 'WENZHOU' || regionId === '温州') {
            regionCode = 'CHXX0462';
        }
        else if (regionId === REGIONID_CN.WEEK_LISHUI || regionId === 'LISHUI' || regionId === '丽水') {
            regionCode = 'CHXX0461';
        }
        else if (regionId === REGIONID_CN.WEEK_JINHUA || regionId === 'JINHUA' || regionId === '金华') {
            regionCode = 'WMXX1017';
        }
        else if (regionId === REGIONID_CN.WEEK_YIWU || regionId === 'YIWU' || regionId === '义乌') {
            regionCode = 'WMXX1293';
        }
        else if (regionId === REGIONID_CN.WEEK_QUZHOU || regionId === 'QUZHOU' || regionId === '衢州') {
            regionCode = 'CHXX0460';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHOUSHAN || regionId === 'ZHOUSHAN' || regionId === '舟山') {
            regionCode = 'CHXX0455';
        }
        else if (regionId === REGIONID_CN.WEEK_HEFEI || regionId === 'HEFEI' || regionId === '合肥') {
            regionCode = 'CHXX0448';
        }
        else if (regionId === REGIONID_CN.WEEK_BENGBU || regionId === 'BENGBU' || regionId === '蚌埠') {
            regionCode = 'CHXX0444';
        }
        else if (regionId === REGIONID_CN.WEEK_WUHU || regionId === 'WUHU' || regionId === '芜湖') {
            regionCode = 'CHXX0449';
        }
        else if (regionId === REGIONID_CN.WEEK_HUAINAN || regionId === 'HUAINAN' || regionId === '淮南') {
            regionCode = 'WMXX1062';
        }
        else if (regionId === REGIONID_CN.WEEK_MAANSHAN || regionId === 'MAANSHAN' || regionId === '马鞍山') {
            regionCode = 'WMXX1060';
        }
        else if (regionId === REGIONID_CN.WEEK_ANQING || regionId === 'ANQING' || regionId === '安庆') {
            regionCode = 'CHXX0452';
        }
        else if (regionId === REGIONID_CN.WEEK_SUZHOU || regionId === 'SUZHOU' || regionId === '宿州') {
            regionCode = 'WMXX1058';
        }
        else if (regionId === REGIONID_CN.WEEK_FUYANG || regionId === 'FUYANG' || regionId === '阜阳') {
            regionCode = 'CHXX0442';
        }
        else if (regionId === REGIONID_CN.WEEK_BOZHOU || regionId === 'BOZHOU' || regionId === '亳州') {
            regionCode = 'CHXX0439';
        }
        else if (regionId === REGIONID_CN.WEEK_HUANGSHAN || regionId === 'HUANGSHAN' || regionId === '黄山') {
            regionCode = 'WMXX2058';
        }
        else if (regionId === REGIONID_CN.WEEK_CHUZHOU || regionId === 'CHUZHOU' || regionId === '滁州') {
            regionCode = 'WMXX1064';
        }
        else if (regionId === REGIONID_CN.WEEK_HUAIBEI || regionId === 'HUAIBEI' || regionId === '淮北') {
            regionCode = 'WMXX1059';
        }
        else if (regionId === REGIONID_CN.WEEK_TONGLING || regionId === 'TONGLING' || regionId === '铜陵') {
            regionCode = 'WMXX1063';
        }
        else if (regionId === REGIONID_CN.WEEK_XUANCHENG || regionId === 'XUANCHENG' || regionId === '宣城') {
            regionCode = 'WMXX1066';
        }
        else if (regionId === REGIONID_CN.WEEK_LIUAN || regionId === 'LIUAN' || regionId === '六安') {
            regionCode = 'WMXX1061';
        }
        else if (regionId === REGIONID_CN.WEEK_CHIZHOU || regionId === 'CHIZHOU' || regionId === '池州') {
            regionCode = 'WMXX1273';
        }
        else if (regionId === REGIONID_CN.WEEK_FUZHOU || regionId === 'FUZHOU' || regionId === '福州') {
            regionCode = 'CHXX0031';
        }
        else if (regionId === REGIONID_CN.WEEK_XIAMEN || regionId === 'XIAMEN' || regionId === '厦门') {
            regionCode = 'CHXX0140';
        }
        else if (regionId === REGIONID_CN.WEEK_NINGDE || regionId === 'NINGDE' || regionId === '宁德') {
            regionCode = 'WMXX1262';
        }
        else if (regionId === REGIONID_CN.WEEK_PUTIAN || regionId === 'PUTIAN' || regionId === '莆田') {
            regionCode = 'CHXX0045';
        }
        else if (regionId === REGIONID_CN.WEEK_QUANZHOU || regionId === 'QUANZHOU' || regionId === '泉州') {
            regionCode = 'CHXX0114';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHANGZHOU || regionId === 'ZHANGZHOU' || regionId === '漳州') {
            regionCode = 'CHXX0162';
        }
        else if (regionId === REGIONID_CN.WEEK_LONGYAN || regionId === 'LONGYAN' || regionId === '龙岩') {
            regionCode = 'WMXX1006';
        }
        else if (regionId === REGIONID_CN.WEEK_SANMING || regionId === 'SANMING' || regionId === '三明') {
            regionCode = 'WMXX1005';
        }
        else if (regionId === REGIONID_CN.WEEK_NANPING || regionId === 'NANPING' || regionId === '南平') {
            regionCode = 'CHXX0471';
        }
        else if (regionId === REGIONID_CN.WEEK_NANCHANG || regionId === 'NANCHANG' || regionId === '南昌') {
            regionCode = 'CHXX0097';
        }
        else if (regionId === REGIONID_CN.WEEK_JIUJIANG || regionId === 'JIUJIANG' || regionId === '九江') {
            regionCode = 'CHXX0068';
        }
        else if (regionId === REGIONID_CN.WEEK_SHANGRAO || regionId === 'SHANGRAO' || regionId === '上饶') {
            regionCode = 'WMXX1072';
        }
        else if (regionId === REGIONID_CN.WEEK_FUZHOU || regionId === 'FUZHOU' || regionId === '抚州') {
            regionCode = 'WMXX1071';
        }
        else if (regionId === REGIONID_CN.WEEK_YICHUN || regionId === 'YICHUN' || regionId === '宜春') {
            regionCode = 'WMXX1068';
        }
        else if (regionId === REGIONID_CN.WEEK_JIAN || regionId === 'JIAN' || regionId === '吉安') {
            regionCode = 'CHXX0425';
        }
        else if (regionId === REGIONID_CN.WEEK_GANZHOU || regionId === 'GANZHOU' || regionId === '赣州') {
            regionCode = 'CHXX0436';
        }
        else if (regionId === REGIONID_CN.WEEK_JINGDEZHEN || regionId === 'JINGDEZHEN' || regionId === '景德镇') {
            regionCode = 'CHXX0457';
        }
        else if (regionId === REGIONID_CN.WEEK_PINGXIANG || regionId === 'PINGXIANG' || regionId === '萍乡') {
            regionCode = 'WMXX1067';
        }
        else if (regionId === REGIONID_CN.WEEK_XINYU || regionId === 'XINYU' || regionId === '新余') {
            regionCode = 'WMXX1069';
        }
        else if (regionId === REGIONID_CN.WEEK_YINGTAN || regionId === 'YINGTAN' || regionId === '鹰潭') {
            regionCode = 'WMXX1070';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGSHA || regionId === 'CHANGSHA' || regionId === '长沙') {
            regionCode = 'CHXX0013';
        }
        else if (regionId === REGIONID_CN.WEEK_XIANGTAN || regionId === 'XIANGTAN' || regionId === '湘潭') {
            regionCode = 'CHXX0142';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHUZHOU || regionId === 'ZHUZHOU' || regionId === '株洲') {
            regionCode = 'WMXX1079';
        }
        else if (regionId === REGIONID_CN.WEEK_HENGYANG || regionId === 'HENGYANG' || regionId === '衡阳') {
            regionCode = 'WMXX1081';
        }
        else if (regionId === REGIONID_CN.WEEK_CHENZHOU || regionId === 'CHENZHOU' || regionId === '郴州') {
            regionCode = 'CHXX0435';
        }
        else if (regionId === REGIONID_CN.WEEK_CHANGDE || regionId === 'CHANGDE' || regionId === '常德') {
            regionCode = 'CHXX0416';
        }
        else if (regionId === REGIONID_CN.WEEK_YIYANG || regionId === 'YIYANG' || regionId === '益阳') {
            regionCode = 'WMXX1126';
        }
        else if (regionId === REGIONID_CN.WEEK_LOUDI || regionId === 'LOUDI' || regionId === '娄底') {
            regionCode = 'WMXX1080';
        }
        else if (regionId === REGIONID_CN.WEEK_SHAOYANG || regionId === 'SHAOYANG' || regionId === '邵阳') {
            regionCode = 'CHXX0422';
        }
        else if (regionId === REGIONID_CN.WEEK_YUEYANG || regionId === 'YUEYANG' || regionId === '岳阳') {
            regionCode = 'CHXX0411';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHANGJIAJIE || regionId === 'ZHANGJIAJIE' || regionId === '张家界') {
            regionCode = 'WMXX1278';
        }
        else if (regionId === REGIONID_CN.WEEK_HUAIHUA || regionId === 'HUAIHUA' || regionId === '怀化') {
            regionCode = 'WMXX1082';
        }
        else if (regionId === REGIONID_CN.WEEK_YONGZHOU || regionId === 'YONGZHOU' || regionId === '永州') {
            regionCode = 'CHXX0429';
        }
        else if (regionId === REGIONID_CN.WEEK_JISHOU || regionId === 'JISHOU' || regionId === '吉首') {
            regionCode = 'WMXX1153';
        }
        else if (regionId === REGIONID_CN.WEEK_GUIYANG || regionId === 'GUIYANG' || regionId === '贵阳') {
            regionCode = 'CHXX0039';
        }
        else if (regionId === REGIONID_CN.WEEK_ZUNYI || regionId === 'ZUNYI' || regionId === '遵义') {
            regionCode = 'CHXX0419';
        }
        else if (regionId === REGIONID_CN.WEEK_ANSHUN || regionId === 'ANSHUN' || regionId === '安顺') {
            regionCode = 'CHXX0005';
        }
        else if (regionId === REGIONID_CN.WEEK_DUYUN || regionId === 'DUYUN' || regionId === '都匀') {
            regionCode = 'WMXX1095';
        }
        else if (regionId === REGIONID_CN.WEEK_KAILI || regionId === 'KAILI' || regionId === '凯里') {
            regionCode = 'WMXX1093';
        }
        else if (regionId === REGIONID_CN.WEEK_TONGREN || regionId === 'TONGREN' || regionId === '铜仁') {
            regionCode = 'WMXX1091';
        }
        else if (regionId === REGIONID_CN.WEEK_BIJIE || regionId === 'BIJIE' || regionId === '毕节') {
            regionCode = 'CHXX0418';
        }
        else if (regionId === REGIONID_CN.WEEK_XINGYI || regionId === 'XINGYI' || regionId === '兴义') {
            regionCode = 'WMXX1094';
        }
        else if (regionId === REGIONID_CN.WEEK_CHENGDU || regionId === 'CHENGDU' || regionId === '成都') {
            regionCode = 'CHXX0016';
        }
        else if (regionId === REGIONID_CN.WEEK_LONGQUANYI || regionId === 'LONGQUANYI' || regionId === '龙泉驿') {
            regionCode = 'WMXX2361';
        }
        else if (regionId === REGIONID_CN.WEEK_XINDU || regionId === 'XINDU' || regionId === '新都') {
            regionCode = 'WMXX2362';
        }
        else if (regionId === REGIONID_CN.WEEK_WENJIANG || regionId === 'WENJIANG' || regionId === '温江') {
            regionCode = 'WMXX2363';
        }
        else if (regionId === REGIONID_CN.WEEK_SHUANGLIU || regionId === 'SHUANGLIU' || regionId === '双流') {
            regionCode = 'WMXX1325';
        }
        else if (regionId === REGIONID_CN.WEEK_PIXIAN || regionId === 'PIXIAN' || regionId === '郫县') {
            regionCode = 'WMXX2369';
        }
        else if (regionId === REGIONID_CN.WEEK_DUJIANGYAN || regionId === 'DUJIANGYAN' || regionId === '都江堰') {
            regionCode = 'WMXX2364';
        }
        else if (regionId === REGIONID_CN.WEEK_PENGZHOU || regionId === 'PENGZHOU' || regionId === '彭州') {
            regionCode = 'WMXX2365';
        }
        else if (regionId === REGIONID_CN.WEEK_PANZHIHUA || regionId === 'PANZHIHUA' || regionId === '攀枝花') {
            regionCode = 'WMXX1085';
        }
        else if (regionId === REGIONID_CN.WEEK_ZIGONG || regionId === 'ZIGONG' || regionId === '自贡') {
            regionCode = 'WMXX1084';
        }
        else if (regionId === REGIONID_CN.WEEK_MIANYANG || regionId === 'MIANYANG' || regionId === '绵阳') {
            regionCode = 'CHXX0351';
        }
        else if (regionId === REGIONID_CN.WEEK_NANCHONG || regionId === 'NANCHONG' || regionId === '南充') {
            regionCode = 'CHXX0098';
        }
        else if (regionId === REGIONID_CN.WEEK_DAZHOU || regionId === 'DAZHOU' || regionId === '达州') {
            regionCode = 'CHXX0400';
        }
        else if (regionId === REGIONID_CN.WEEK_SUINING || regionId === 'SUINING' || regionId === '遂宁') {
            regionCode = 'CHXX0127';
        }
        else if (regionId === REGIONID_CN.WEEK_GUANGAN || regionId === 'GUANGAN' || regionId === '广安') {
            regionCode = 'CHXX0036';
        }
        else if (regionId === REGIONID_CN.WEEK_BAZHONG || regionId === 'BAZHONG' || regionId === '巴中') {
            regionCode = 'WMXX1089';
        }
        else if (regionId === REGIONID_CN.WEEK_LUZHOU || regionId === 'LUZHOU' || regionId === '泸州') {
            regionCode = 'CHXX0088';
        }
        else if (regionId === REGIONID_CN.WEEK_YIBIN || regionId === 'YIBIN' || regionId === '宜宾') {
            regionCode = 'CHXX0362';
        }
        else if (regionId === REGIONID_CN.WEEK_ZIYANG || regionId === 'ZIYANG' || regionId === '资阳') {
            regionCode = 'WMXX1090';
        }
        else if (regionId === REGIONID_CN.WEEK_LESHAN || regionId === 'LESHAN' || regionId === '乐山') {
            regionCode = 'WMXX1088';
        }
        else if (regionId === REGIONID_CN.WEEK_MEISHAN || regionId === 'MEISHAN' || regionId === '眉山') {
            regionCode = 'CHXX0091';
        }
        else if (regionId === REGIONID_CN.WEEK_XICHANG || regionId === 'XICHANG' || regionId === '西昌') {
            regionCode = 'CHXX0363';
        }
        else if (regionId === REGIONID_CN.WEEK_YAAN || regionId === 'YAAN' || regionId === '雅安') {
            regionCode = 'CHXX0354';
        }
        else if (regionId === REGIONID_CN.WEEK_KANGDING || regionId === 'KANGDING' || regionId === '康定') {
            regionCode = 'CHXX0358';
        }
        else if (regionId === REGIONID_CN.WEEK_MAERKANG || regionId === 'MAERKANG' || regionId === '马尔康') {
            regionCode = 'CHXX0348';
        }
        else if (regionId === REGIONID_CN.WEEK_DEYANG || regionId === 'DEYANG' || regionId === '德阳') {
            regionCode = 'WMXX1086';
        }
        else if (regionId === REGIONID_CN.WEEK_GUANGYUAN || regionId === 'GUANGYUAN' || regionId === '广元') {
            regionCode = 'WMXX1087';
        }
        else if (regionId === REGIONID_CN.WEEK_GUANGZHOU || regionId === 'GUANGZHOU' || regionId === '广州') {
            regionCode = 'CHXX0037';
        }
        else if (regionId === REGIONID_CN.WEEK_PANYU_GUANGZHOU || regionId === 'PANYU（GUANGZHOU）' || regionId === '番禺') {
            regionCode = 'WMXX1337';
        }
        else if (regionId === REGIONID_CN.WEEK_CONGHUA_GUANGZHOU || regionId === 'CONGHUA（GUANGZHOU）' || regionId === '从化') {
            regionCode = 'WMXX1340';
        }
        else if (regionId === REGIONID_CN.WEEK_ZENGCHENG_GUANGZHOU || regionId === 'ZENGCHENG（GUANGZHOU）' || regionId === '增城') {
            regionCode = 'WMXX1339';
        }
        else if (regionId === REGIONID_CN.WEEK_HUADU_GUANGZHOU || regionId === 'HUADU（GUANGZHOU）' || regionId === '花都') {
            regionCode = 'WMXX1338';
        }
        else if (regionId === REGIONID_CN.WEEK_SHAOGUAN_GUANGZHOU || regionId === 'SHAOGUAN（GUANGZHOU）' || regionId === '韶关') {
            regionCode = 'CHXX0482';
        }
        else if (regionId === REGIONID_CN.WEEK_HUIZHOU || regionId === 'HUIZHOU' || regionId === '惠州') {
            regionCode = 'CHXX0053';
        }
        else if (regionId === REGIONID_CN.WEEK_MEIZHOU || regionId === 'MEIZHOU' || regionId === '梅州') {
            regionCode = 'CHXX0486';
        }
        else if (regionId === REGIONID_CN.WEEK_SHANTOU || regionId === 'SHANTOU' || regionId === '汕头') {
            regionCode = 'CHXX0493';
        }
        else if (regionId === REGIONID_CN.WEEK_SHENZHEN || regionId === 'SHENZHEN' || regionId === '深圳') {
            regionCode = 'CHXX0120';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHUHAI || regionId === 'ZHUHAI' || regionId === '珠海') {
            regionCode = 'WMXX1000';
        }
        else if (regionId === REGIONID_CN.WEEK_FOSHAN || regionId === 'FOSHAN' || regionId === '佛山') {
            regionCode = 'CHXX0028';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHAOQING || regionId === 'ZHAOQING' || regionId === '肇庆') {
            regionCode = 'WMXX1003';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHENJIANG || regionId === 'ZHENJIANG' || regionId === '湛江') {
            regionCode = 'CHXX0163';
        }
        else if (regionId === REGIONID_CN.WEEK_JIANGMEN || regionId === 'JIANGMEN' || regionId === '江门') {
            regionCode = 'CHXX0058';
        }
        else if (regionId === REGIONID_CN.WEEK_HEYUAN || regionId === 'HEYUAN' || regionId === '河源') {
            regionCode = 'CHXX0492';
        }
        else if (regionId === REGIONID_CN.WEEK_QINGYUAN || regionId === 'QINGYUAN' || regionId === '清远') {
            regionCode = 'WMXX1259';
        }
        else if (regionId === REGIONID_CN.WEEK_YUNFU || regionId === 'YUNFU' || regionId === '云浮') {
            regionCode = 'WMXX1261';
        }
        else if (regionId === REGIONID_CN.WEEK_CHAOZHOU || regionId === 'CHAOZHOU' || regionId === '潮州') {
            regionCode = 'WMXX1001';
        }
        else if (regionId === REGIONID_CN.WEEK_DONGGUAN || regionId === 'DONGGUAN' || regionId === '东莞') {
            regionCode = 'CHXX0123';
        }
        else if (regionId === REGIONID_CN.WEEK_ZHONGSHAN || regionId === 'ZHONGSHAN' || regionId === '中山') {
            regionCode = 'WMXX1002';
        }
        else if (regionId === REGIONID_CN.WEEK_YANGJIANG || regionId === 'YANGJIANG' || regionId === '阳江') {
            regionCode = 'CHXX0500';
        }
        else if (regionId === REGIONID_CN.WEEK_JIEYANG || regionId === 'JIEYANG' || regionId === '揭阳') {
            regionCode = 'WMXX1260';
        }
        else if (regionId === REGIONID_CN.WEEK_MAOMING || regionId === 'MAOMING' || regionId === '茂名') {
            regionCode = 'CHXX0090';
        }
        else if (regionId === REGIONID_CN.WEEK_SHANWEI || regionId === 'SHANWEI' || regionId === '汕尾') {
            regionCode = 'CHXX0496';
        }
        else if (regionId === REGIONID_CN.WEEK_KUNMING || regionId === 'KUNMING' || regionId === '昆明') {
            regionCode = 'CHXX0076';
        }
        else if (regionId === REGIONID_CN.WEEK_DALI || regionId === 'DALI' || regionId === '大理') {
            regionCode = 'CHXX0371';
        }
        else if (regionId === REGIONID_CN.WEEK_MENGZI || regionId === 'MENGZI' || regionId === '蒙自') {
            regionCode = 'CHXX0385';
        }
        else if (regionId === REGIONID_CN.WEEK_QUJING || regionId === 'QUJING' || regionId === '曲靖') {
            regionCode = 'WMXX1096';
        }
        else if (regionId === REGIONID_CN.WEEK_BAOSHAN || regionId === 'BAOSHAN' || regionId === '保山') {
            regionCode = 'CHXX0370';
        }
        else if (regionId === REGIONID_CN.WEEK_WENSHAN || regionId === 'WENSHAN' || regionId === '文山') {
            regionCode = 'WMXX1285';
        }
        else if (regionId === REGIONID_CN.WEEK_YUXI || regionId === 'YUXI' || regionId === '玉溪') {
            regionCode = 'WMXX1284';
        }
        else if (regionId === REGIONID_CN.WEEK_CHUXIONG || regionId === 'CHUXIONG' || regionId === '楚雄') {
            regionCode = 'CHXX0373';
        }
        else if (regionId === REGIONID_CN.WEEK_PUER || regionId === 'PUER' || regionId === '普洱') {
            regionCode = 'CHXX0381';
        }
        else if (regionId === REGIONID_CN.WEEK_SHAOTONG || regionId === 'SHAOTONG' || regionId === '昭通') {
            regionCode = 'CHXX0364';
        }
        else if (regionId === REGIONID_CN.WEEK_LINCANG || regionId === 'LINCANG' || regionId === '临沧') {
            regionCode = 'CHXX0378';
        }
        else if (regionId === REGIONID_CN.WEEK_LUSHUI || regionId === 'LUSHUI' || regionId === '泸水') {
            regionCode = 'WMXX1286';
        }
        else if (regionId === REGIONID_CN.WEEK_LIJIANG || regionId === 'LIJIANG' || regionId === '丽江') {
            regionCode = 'CHXX0365';
        }
        else if (regionId === REGIONID_CN.WEEK_MANGSHI || regionId === 'MANGSHI' || regionId === '芒市') {
            regionCode = 'WMXX1121';
        }
        else if (regionId === REGIONID_CN.WEEK_JINGHONG || regionId === 'JINGHONG' || regionId === '景洪') {
            regionCode = 'CHXX0380';
        }
        else if (regionId === REGIONID_CN.WEEK_NANNING || regionId === 'NANNING' || regionId === '南宁') {
            regionCode = 'CHXX0100';
        }
        else if (regionId === REGIONID_CN.WEEK_CHONGZUO || regionId === 'CHONGZUO' || regionId === '崇左') {
            regionCode = 'WMXX1283';
        }
        else if (regionId === REGIONID_CN.WEEK_LIUZHOU || regionId === 'LIUZHOU' || regionId === '柳州') {
            regionCode = 'CHXX0479';
        }
        else if (regionId === REGIONID_CN.WEEK_LAIBIN || regionId === 'LAIBIN' || regionId === '来宾') {
            regionCode = 'WMXX1282';
        }
        else if (regionId === REGIONID_CN.WEEK_GUILIN || regionId === 'GUILIN' || regionId === '桂林') {
            regionCode = 'CHXX0434';
        }
        else if (regionId === REGIONID_CN.WEEK_WUZHOU || regionId === 'WUZHOU' || regionId === '梧州') {
            regionCode = 'CHXX0490';
        }
        else if (regionId === REGIONID_CN.WEEK_HEZHOU || regionId === 'HEZHOU' || regionId === '贺州') {
            regionCode = 'WMXX1281';
        }
        else if (regionId === REGIONID_CN.WEEK_GUIGANG || regionId === 'GUIGANG' || regionId === '贵港') {
            regionCode = 'WMXX1280';
        }
        else if (regionId === REGIONID_CN.WEEK_YULIN || regionId === 'YULIN' || regionId === '玉林') {
            regionCode = 'WMXX1083';
        }
        else if (regionId === REGIONID_CN.WEEK_BAISE || regionId === 'BAISE' || regionId === '百色') {
            regionCode = 'CHXX0488';
        }
        else if (regionId === REGIONID_CN.WEEK_QINZHOU || regionId === 'QINZHOU' || regionId === '钦州') {
            regionCode = 'CHXX0498';
        }
        else if (regionId === REGIONID_CN.WEEK_HECHI || regionId === 'HECHI' || regionId === '河池') {
            regionCode = 'CHXX0478';
        }
        else if (regionId === REGIONID_CN.WEEK_BEIHAI || regionId === 'BEIHAI' || regionId === '北海') {
            regionCode = 'CHXX0499';
        }
        else if (regionId === REGIONID_CN.WEEK_FANGCHENGGANG || regionId === 'FANGCHENGGANG' || regionId === '防城港') {
            regionCode = 'WMXX1279';
        }
        else if (regionId === REGIONID_CN.WEEK_HAIKOU || regionId === 'HAIKOU' || regionId === '海口') {
            regionCode = 'CHXX0502';
        }
        else if (regionId === REGIONID_CN.WEEK_SANYA || regionId === 'SANYA' || regionId === '三亚') {
            regionCode = 'CHXX0507';
        }
        else if (regionId === REGIONID_CN.WEEK_XIANGGANG || regionId === 'XIANGGANG' || regionId === '香港') {
            regionCode = 'CHXX0049';
        }
        else if (regionId === REGIONID_CN.WEEK_AOMEN || regionId === 'AOMEN' || regionId === '澳门') {
            regionCode = 'CHXX0512';
        }
        else if (regionId === REGIONID_CN.WEEK_TAIBEI || regionId === 'TAIBEI' || regionId === '台北') {
            regionCode = 'TWXX0021';
        }
        else if (regionId === REGIONID_CN.WEEK_XINZHU || regionId === 'XINZHU' || regionId === '新竹') {
            regionCode = 'TWXX0009';
        }
        else if (regionId === REGIONID_CN.WEEK_GAOXIONG || regionId === 'GAOXIONG' || regionId === '高雄') {
            regionCode = 'TWXX0013';
        }
        else if (regionId === REGIONID_CN.WEEK_TAINAN || regionId === 'TAINAN' || regionId === '台南') {
            regionCode = 'TWXX0020';
        }
        else if (regionId === REGIONID_CN.WEEK_TAIZHONG || regionId === 'TAIZHONG' || regionId === '台中') {
            regionCode = 'TWXX0019';
        }
        else if (regionId === REGIONID_CN.WEEK_JILINSHI || regionId === 'JILINSHI' || regionId === '吉林市') {
            regionCode = 'CHXX0063';
        }
        else if (regionId === REGIONID_CN.WEEK_HUANGDAOQU || regionId === 'HUANGDAOQU' || regionId === '黄岛区') {
            regionCode = 'CHXX0060';
        }
        else if (regionId === REGIONID_CN.WEEK_HULUNBEIER || regionId === 'HULUNBEIER' || regionId === '呼伦贝尔') {
            regionCode = 'CHXX0175';
        }
        else if (regionId === REGIONID_CN.WEEK_LIUPANSHUI || regionId === 'LIUPANSHUI' || regionId === '六盘水') {
            regionCode = 'WMXX1092';
        }
        else if (regionId === REGIONID_CN.WEEK_JILONG || regionId === 'JILONG' || regionId === '基隆') {
            regionCode = 'TWXX0003';
        }
        
        return regionCode;
    };
	
    this.setRegionCode = function (regionId) {
        var regionName = "";
        regionId = regionId.trim();

        if (regionId === REGIONID.WEEK_GANGNEUNG || regionId === "강릉" || regionId.toUpperCase() === "GANGNEUNG") {
            regionName = "105";
        } else if (regionId === REGIONID.WEEK_GANGJIN || regionId === "강진" || regionId.toUpperCase() === "GANGJIN") {
            regionName = "259";
        } else if (regionId === REGIONID.WEEK_GANGHWA || regionId === "강화" || regionId.toUpperCase() === "GANGHWA") {
            regionName = "201";
        } else if (regionId === REGIONID.WEEK_GEOJE || regionId === "거제" || regionId.toUpperCase() === "GEOJE") {
            regionName = "294";
        } else if (regionId === REGIONID.WEEK_GEOCHANG || regionId === "거창" || regionId.toUpperCase() === "GEOCHANG") {
            regionName = "284";
        } else if (regionId === REGIONID.WEEK_GYEONGJU || regionId === "경주" || regionId.toUpperCase() === "GYEONGJU") {
            regionName = "283";
        } else if (regionId === REGIONID.WEEK_JEJUUPPER || regionId === "고산" || regionId.toUpperCase() === "GOSAN") {
            regionName = "185";
        } else if (regionId === REGIONID.WEEK_GOHUNG || regionId === "고흥" || regionId.toUpperCase() === "GOHEUNG") {
            regionName = "262";
        } else if (regionId === REGIONID.WEEK_GWANGYANG || regionId === "광양" || regionId.toUpperCase() === "GWANGYANG") {
            regionName = "266";
        } else if (regionId === REGIONID.WEEK_GWANGJU || regionId === "광주" || regionId.toUpperCase() === "GWANGJU") {
            regionName = "156";
        } else if (regionId === REGIONID.WEEK_GUMI || regionId === "구미" || regionId.toUpperCase() === "GUMI") {
            regionName = "279";
        } else if (regionId === REGIONID.WEEK_GUNSAN || regionId === "군산" || regionId.toUpperCase() === "GUNSAN") {
            regionName = "140";
        } else if (regionId === REGIONID.WEEK_GEUMSAN || regionId === "금산" || regionId.toUpperCase() === "GEUMSAN") {
            regionName = "238";
        } else if (regionId === REGIONID.WEEK_GIMHEA || regionId === "김해" || regionId.toUpperCase() === "GIMHAE") {
            regionName = "253";
        } else if (regionId === REGIONID.WEEK_NAMWON || regionId === "남원" || regionId.toUpperCase() === "NAMWAN") {
            regionName = "247";
        } else if (regionId === REGIONID.WEEK_NAMHAE || regionId === "남해" || regionId.toUpperCase() === "NAMHAE") {
            regionName = "295";
        } else if (regionId === REGIONID.WEEK_DAEKWANRYEONG || regionId === "대관령" || regionId.toUpperCase() === "DAEGWANRYEONG") {
            regionName = "100";
        } else if (regionId === REGIONID.WEEK_DAEGU || regionId === "대구" || regionId.toUpperCase() === "DAEGU") {
            regionName = "143";
        } else if (regionId === REGIONID.WEEK_DAEJEON || regionId === "대전" || regionId.toUpperCase() === "DAEJEON") {
            regionName = "133";
        } else if (regionId === REGIONID.WEEK_DONGDUCHEON || regionId === "동두천" || regionId.toUpperCase() === "DONGDUCHEON") {
            regionName = "98";
        } else if (regionId === REGIONID.WEEK_DONGHAE || regionId === "동해" || regionId.toUpperCase() === "DONGHAE") {
            regionName = "106";
        } else if (regionId === REGIONID.WEEK_MOKPO || regionId === "목포" || regionId.toUpperCase() === "MOKPO") {
            regionName = "165";
        } else if (regionId === REGIONID.WEEK_MUNGYEONG || regionId === "문경" || regionId.toUpperCase() === "MUNGYEONG") {
            regionName = "273";
        } else if (regionId === REGIONID.WEEK_MUNSAN || regionId === "문산" || regionId.toUpperCase() === "MUNSAN") {
            regionName = "99";
        } else if (regionId === REGIONID.WEEK_MIRYANG || regionId === "밀양" || regionId.toUpperCase() === "MIRYANG") {
            regionName = "288";
        } else if (regionId === REGIONID.WEEK_BAEKNYEONGDO || regionId === "백령도" || regionId.toUpperCase() === "BAENGNYEONGDO") {
            regionName = "102";
        } else if (regionId === REGIONID.WEEK_BORYEONG || regionId === "보령" || regionId.toUpperCase() === "BORYEONG") {
            regionName = "235";
        } else if (regionId === REGIONID.WEEK_BOSEONG || regionId === "보성" || regionId.toUpperCase() === "BOSEONG") {
            regionName = "258";
        } else if (regionId === REGIONID.WEEK_BOEUN || regionId === "보은" || regionId.toUpperCase() === "BOEUN") {
            regionName = "226";
        } else if (regionId === REGIONID.WEEK_BONGHWA || regionId === "봉화" || regionId.toUpperCase() === "BONGHWA") {
            regionName = "271";
        } else if (regionId === REGIONID.WEEK_BUSAN || regionId === "부산" || regionId.toUpperCase() === "BUSAN") {
            regionName = "159";
        } else if (regionId === REGIONID.WEEK_BUAN || regionId === "부안" || regionId.toUpperCase() === "BUAN") {
            regionName = "243";
        } else if (regionId === REGIONID.WEEK_BUYEO || regionId === "부여" || regionId.toUpperCase() === "BUYEO") {
            regionName = "236";
        } else if (regionId === REGIONID.WEEK_SANCHEON || regionId === "산청" || regionId.toUpperCase() === "SANCHEONG") {
            regionName = "289";
        } else if (regionId === REGIONID.WEEK_SANGJU || regionId === "상주" || regionId.toUpperCase() === "SANGJU") {
            regionName = "137";
        } else if (regionId === REGIONID.WEEK_SEOGUIPO || regionId === "서귀포" || regionId.toUpperCase() === "SEOGWIPO") {
            regionName = "189";
        } else if (regionId === REGIONID.WEEK_SEOSAN || regionId === "서산" || regionId.toUpperCase() === "SEOSAN") {
            regionName = "129";
        } else if (regionId === REGIONID.WEEK_SEOUL || regionId === "서울" || regionId.toUpperCase() === "SEOUL") {
            regionName = "108";
        } else if (regionId === REGIONID.WEEK_SEONGSANPO || regionId === "성산포" || regionId.toUpperCase() === "SUNGSANPO") {
            regionName = "188";
        } else if (regionId === REGIONID.WEEK_SOKCHO || regionId === "속초" || regionId.toUpperCase() === "SOKCHO") {
            regionName = "90";
        } else if (regionId === REGIONID.WEEK_SUWON || regionId === "수원" || regionId.toUpperCase() === "SUWON") {
            regionName = "119";
        } else if (regionId === REGIONID.WEEK_SUNCHANG || regionId === "순창" || regionId.toUpperCase() === "SUNCHANG") {
            regionName = "254";
        } else if (regionId === REGIONID.WEEK_SUNCHEON || regionId === "순천" || regionId.toUpperCase() === "SUNCHEON") {
            regionName = "256";
        } else if (regionId === REGIONID.WEEK_ANDONG || regionId === "안동" || regionId.toUpperCase() === "ANDONG") {
            regionName = "136";
        } else if (regionId === REGIONID.WEEK_YANGSAN || regionId === "양산" || regionId.toUpperCase() === "YANGSAN") {
            regionName = "257";
        } else if (regionId === REGIONID.WEEK_YANGPYEONG || regionId === "양평" || regionId.toUpperCase() === "YANGPYEONG") {
            regionName = "202";
        } else if (regionId === REGIONID.WEEK_YEOSU || regionId === "여수" || regionId.toUpperCase() === "YEOSU") {
            regionName = "168";
        } else if (regionId === REGIONID.WEEK_YEONGDEOK || regionId === "영덕" || regionId.toUpperCase() === "YEONGDEOK") {
            regionName = "277";
        } else if (regionId === REGIONID.WEEK_YEONGWOL || regionId === "영월" || regionId.toUpperCase() === "YEONGWOL") {
            regionName = "121";
        } else if (regionId === REGIONID.WEEK_YEONGJU || regionId === "영주" || regionId.toUpperCase() === "YEONGJU") {
            regionName = "272";
        } else if (regionId === REGIONID.WEEK_YEONGCHEON || regionId === "영천" || regionId.toUpperCase() === "YEONGCHEON") {
            regionName = "281";
        } else if (regionId === REGIONID.WEEK_WANDO || regionId === "완도" || regionId.toUpperCase() === "WANDO") {
            regionName = "170";
        } else if (regionId === REGIONID.WEEK_ULLEUNGDO || regionId === "울릉도" || regionId.toUpperCase() === "ULLEUNGDO") {
            regionName = "115";
        } else if (regionId === REGIONID.WEEK_ULSAN || regionId === "울산" || regionId.toUpperCase() === "ULSAN") {
            regionName = "152";
        } else if (regionId === REGIONID.WEEK_ULJIN || regionId === "울진" || regionId.toUpperCase() === "ULJIN") {
            regionName = "130";
        } else if (regionId === REGIONID.WEEK_WONJU || regionId === "원주" || regionId.toUpperCase() === "WONJU") {
            regionName = "114";
        } else if (regionId === REGIONID.WEEK_EUISEONG || regionId === "의성" || regionId.toUpperCase() === "UISEONG") {
            regionName = "278";
        } else if (regionId === REGIONID.WEEK_ICHEON || regionId === "이천" || regionId.toUpperCase() === "ICHEON") {
            regionName = "203";
        } else if (regionId === REGIONID.WEEK_INJE || regionId === "인제" || regionId.toUpperCase() === "INJE") {
            regionName = "211";
        } else if (regionId === REGIONID.WEEK_INCHEON || regionId === "인천" || regionId.toUpperCase() === "INCHEON") {
            regionName = "112";
        } else if (regionId === REGIONID.WEEK_IMSHIL || regionId === "임실" || regionId.toUpperCase() === "IMSI") {
            regionName = "244";
        } else if (regionId === REGIONID.WEEK_JANGSU || regionId === "장수" || regionId.toUpperCase() === "JANGSU") {
            regionName = "248";
        } else if (regionId === REGIONID.WEEK_JANGHEUNG || regionId === "장흥" || regionId.toUpperCase() === "JANGHEUNG") {
            regionName = "260";
        } else if (regionId === REGIONID.WEEK_JEONJU || regionId === "전주" || regionId.toUpperCase() === "JEONJU") {
            regionName = "146";
        } else if (regionId === REGIONID.WEEK_JEONGEUP || regionId === "정읍" || regionId.toUpperCase() === "JEONGEUP") {
            regionName = "245";
        } else if (regionId === REGIONID.WEEK_JEJU || regionId === "제주" || regionId.toUpperCase() === "JEJU") {
            regionName = "184";
        } else if (regionId === REGIONID.WEEK_JECHEON || regionId === "제천" || regionId.toUpperCase() === "JECHEON") {
            regionName = "221";
        } else if (regionId === REGIONID.WEEK_JINDO || regionId === "진도" || regionId.toUpperCase() === "JINDO") {
            regionName = "175";
        } else if (regionId === REGIONID.WEEK_JINJU || regionId === "진주" || regionId.toUpperCase() === "JINJU") {
            regionName = "192";
        } else if (regionId === REGIONID.WEEK_CHANGWON || regionId === "창원" || regionId.toUpperCase() === "CHANGWON") {
            regionName = "155";
        } else if (regionId === REGIONID.WEEK_CHONAN || regionId === "천안" || regionId.toUpperCase() === "CHEONAN") {
            regionName = "232";
        } else if (regionId === REGIONID.WEEK_CHULWON || regionId === "철원" || regionId.toUpperCase() === "CHEOLWON") {
            regionName = "95";
        } else if (regionId === REGIONID.WEEK_CHEONGJU || regionId === "청주" || regionId.toUpperCase() === "CHEONGJU") {
            regionName = "131";
        } else if (regionId === REGIONID.WEEK_CHUPUNGRYEONG || regionId === "추풍령" || regionId.toUpperCase() === "CHUPUNGNYEONG") {
            regionName = "135";
        } else if (regionId === REGIONID.WEEK_CHUNCHEON || regionId === "춘천" || regionId.toUpperCase() === "CHUNCHEON") {
            regionName = "101";
        } else if (regionId === REGIONID.WEEK_CHUNGJU || regionId === "충주" || regionId.toUpperCase() === "CHUNGJU") {
            regionName = "127";
        } else if (regionId === REGIONID.WEEK_TAEBAEK || regionId === "태백" || regionId.toUpperCase() === "TAEBAEK") {
            regionName = "216";
        } else if (regionId === REGIONID.WEEK_TONGYEONG || regionId === "통영" || regionId.toUpperCase() === "TONGYEONG") {
            regionName = "162";
        } else if (regionId === REGIONID.WEEK_POHANG || regionId === "포항" || regionId.toUpperCase() === "POHANG") {
            regionName = "138";
        } else if (regionId === REGIONID.WEEK_HAPCHEON || regionId === "합천" || regionId.toUpperCase() === "HAPCHEON") {
            regionName = "285";
        } else if (regionId === REGIONID.WEEK_HAENAM || regionId === "해남" || regionId.toUpperCase() === "HAENAM") {
            regionName = "261";
        } else if (regionId === REGIONID.WEEK_HONGCHEON || regionId === "홍천" || regionId.toUpperCase() === "HONGCHEON") {
            regionName = "212";
        } else if (regionId === REGIONID.WEEK_HEUKSANDO || regionId === "흑산도" || regionId.toUpperCase() === "HEUKSANDO") {
            regionName = "169";
        }
        else{
            ;//SOnar Issue
        }
        return regionName;
    };

    this.setWarnCode = function (regionId) {
        var warnCode = "";

        if (regionId === REGIONID.WEEK_GANGNEUNG || regionId === "강릉" || regionId.toUpperCase() === "GANGNEUNG") {
            warnCode = "L1020100";
        } else if (regionId === REGIONID.WEEK_GANGJIN || regionId === "강진" || regionId.toUpperCase() === "GANGJIN") {
            warnCode = "L1051400";
        } else if (regionId === REGIONID.WEEK_GANGHWA || regionId === "강화" || regionId.toUpperCase() === "GANGHWA") {
            warnCode = "L1010900";
        } else if (regionId === REGIONID.WEEK_GEOJE || regionId === "거제" || regionId.toUpperCase() === "GEOJE") {
            warnCode = "L1082200";
        } else if (regionId === REGIONID.WEEK_GEOCHANG || regionId === "거창" || regionId.toUpperCase() === "GEOCHANG") {
            warnCode = "L1081800";
        } else if (regionId === REGIONID.WEEK_GYEONGJU || regionId === "경주" || regionId.toUpperCase() === "GYEONGJU") {
            warnCode = "L1072500";
        } else if (regionId === REGIONID.WEEK_JEJUUPPER || regionId === "고산" || regionId.toUpperCase() === "GOSAN") {
            warnCode = "L1090600";
        } else if (regionId === REGIONID.WEEK_GOHUNG || regionId === "고흥" || regionId.toUpperCase() === "GOHEUNG") {
            warnCode = "L1050800";
        } else if (regionId === REGIONID.WEEK_GWANGYANG || regionId === "광양" || regionId.toUpperCase() === "GWANGYANG") {
            warnCode = "L1051100";
        } else if (regionId === REGIONID.WEEK_GWANGJU || regionId === "광주" || regionId.toUpperCase() === "GWANGJU") {
            warnCode = "L1050100";
        } else if (regionId === REGIONID.WEEK_GUMI || regionId === "구미" || regionId.toUpperCase() === "GUMI") {
            warnCode = "L1070300";
        } else if (regionId === REGIONID.WEEK_GUNSAN || regionId === "군산" || regionId.toUpperCase() === "GUNSAN") {
            warnCode = "L1060300";
        } else if (regionId === REGIONID.WEEK_GEUMSAN || regionId === "금산" || regionId.toUpperCase() === "GEUMSAN") {
            warnCode = "L1030600";
        } else if (regionId === REGIONID.WEEK_GIMHEA || regionId === "김해" || regionId.toUpperCase() === "GIMHAE") {
            warnCode = "L1080900";
        } else if (regionId === REGIONID.WEEK_NAMWON || regionId === "남원" || regionId.toUpperCase() === "NAMWAN") {
            warnCode = "L1061400";
        } else if (regionId === REGIONID.WEEK_NAMHAE || regionId === "남해" || regionId.toUpperCase() === "NAMHAE") {
            warnCode = "L1082400";
        } else if (regionId === REGIONID.WEEK_DAEKWANRYEONG || regionId === "대관령" || regionId.toUpperCase() === "DAEGWANRYEONG") {
            warnCode = "L1020900";
        } else if (regionId === REGIONID.WEEK_DAEGU || regionId === "대구" || regionId.toUpperCase() === "DAEGU") {
            warnCode = "L1070100";
        } else if (regionId === REGIONID.WEEK_DAEJEON || regionId === "대전" || regionId.toUpperCase() === "DAEJEON") {
            warnCode = "L1030100";
        } else if (regionId === REGIONID.WEEK_DONGDUCHEON || regionId === "동두천" || regionId.toUpperCase() === "DONGDUCHEON") {
            warnCode = "L1011100";
        } else if (regionId === REGIONID.WEEK_DONGHAE || regionId === "동해" || regionId.toUpperCase() === "DONGHAE") {
            warnCode = "L1020200";
        } else if (regionId === REGIONID.WEEK_MOKPO || regionId === "목포" || regionId.toUpperCase() === "MOKPO") {
            warnCode = "L1052100";
        } else if (regionId === REGIONID.WEEK_MUNGYEONG || regionId === "문경" || regionId.toUpperCase() === "MUNGYEONG") {
            warnCode = "L1071300";
        } else if (regionId === REGIONID.WEEK_MUNSAN || regionId === "문산" || regionId.toUpperCase() === "MUNSAN") {
            warnCode = "L1011800";
        } else if (regionId === REGIONID.WEEK_MIRYANG || regionId === "밀양" || regionId.toUpperCase() === "MIRYANG") {
            warnCode = "L1081000";
        } else if (regionId === REGIONID.WEEK_BAEKNYEONGDO || regionId === "백령도" || regionId.toUpperCase() === "BAENGNYEONGDO") {
            warnCode = "L1010800";
        } else if (regionId === REGIONID.WEEK_BORYEONG || regionId === "보령" || regionId.toUpperCase() === "BORYEONG") {
            warnCode = "L1031400";
        } else if (regionId === REGIONID.WEEK_BOSEONG || regionId === "보성" || regionId.toUpperCase() === "BOSEONG") {
            warnCode = "L1050900";
        } else if (regionId === REGIONID.WEEK_BOEUN || regionId === "보은" || regionId.toUpperCase() === "BOEUN") {
            warnCode = "L1040300";
        } else if (regionId === REGIONID.WEEK_BONGHWA || regionId === "봉화" || regionId.toUpperCase() === "BONGHWA") {
            warnCode = "L1072000";
        } else if (regionId === REGIONID.WEEK_BUSAN || regionId === "부산" || regionId.toUpperCase() === "BUSAN") {
            warnCode = "L1080100";
        } else if (regionId === REGIONID.WEEK_BUAN || regionId === "부안" || regionId.toUpperCase() === "BUAN") {
            warnCode = "L1060200";
        } else if (regionId === REGIONID.WEEK_BUYEO || regionId === "부여" || regionId.toUpperCase() === "BUYEO") {
            warnCode = "L1030800";
        } else if (regionId === REGIONID.WEEK_SANCHEON || regionId === "산청" || regionId.toUpperCase() === "SANCHEONG") {
            warnCode = "L1081600";
        } else if (regionId === REGIONID.WEEK_SANGJU || regionId === "상주" || regionId.toUpperCase() === "SANGJU") {
            warnCode = "L1071200";
        } else if (regionId === REGIONID.WEEK_SEOGUIPO || regionId === "서귀포" || regionId.toUpperCase() === "SEOGWIPO") {
            warnCode = "L1090900";
        } else if (regionId === REGIONID.WEEK_SEOSAN || regionId === "서산" || regionId.toUpperCase() === "SEOSAN") {
            warnCode = "L1031300";
        } else if (regionId === REGIONID.WEEK_SEOUL || regionId === "서울" || regionId.toUpperCase() === "SEOUL") {
            warnCode = "L1010100";
        } else if (regionId === REGIONID.WEEK_SEONGSANPO || regionId === "성산포" || regionId.toUpperCase() === "SUNGSANPO") {
            warnCode = "L1090800";
        } else if (regionId === REGIONID.WEEK_SOKCHO || regionId === "속초" || regionId.toUpperCase() === "SOKCHO") {
            warnCode = "L1020500";
        } else if (regionId === REGIONID.WEEK_SUWON || regionId === "수원" || regionId.toUpperCase() === "SUWON") {
            warnCode = "L1011900";
        } else if (regionId === REGIONID.WEEK_SUNCHANG || regionId === "순창" || regionId.toUpperCase() === "SUNCHANG") {
            warnCode = "L1061000";
        } else if (regionId === REGIONID.WEEK_SUNCHEON || regionId === "순천" || regionId.toUpperCase() === "SUNCHEON") {
            warnCode = "L1051200";
        } else if (regionId === REGIONID.WEEK_ANDONG || regionId === "안동" || regionId.toUpperCase() === "ANDONG") {
            warnCode = "L1071500";
        } else if (regionId === REGIONID.WEEK_YANGSAN || regionId === "양산" || regionId.toUpperCase() === "YANGSAN") {
            warnCode = "L1080500";
        } else if (regionId === REGIONID.WEEK_YANGPYEONG || regionId === "양평" || regionId.toUpperCase() === "YANGPYEONG") {
            warnCode = "L1013500";
        } else if (regionId === REGIONID.WEEK_YEOSU || regionId === "여수" || regionId.toUpperCase() === "YEOSU") {
            warnCode = "L1051000";
        } else if (regionId === REGIONID.WEEK_YEONGDEOK || regionId === "영덕" || regionId.toUpperCase() === "YEONGDEOK") {
            warnCode = "L1072200";
        } else if (regionId === REGIONID.WEEK_YEONGWOL || regionId === "영월" || regionId.toUpperCase() === "YEONGWOL") {
            warnCode = "L1020800";
        } else if (regionId === REGIONID.WEEK_YEONGJU || regionId === "영주" || regionId.toUpperCase() === "YEONGJU") {
            warnCode = "L1071600";
        } else if (regionId === REGIONID.WEEK_YEONGCHEON || regionId === "영천" || regionId.toUpperCase() === "YEONGCHEON") {
            warnCode = "L1070400";
        } else if (regionId === REGIONID.WEEK_WANDO || regionId === "완도" || regionId.toUpperCase() === "WANDO") {
            warnCode = "L1051600";
        } else if (regionId === REGIONID.WEEK_ULLEUNGDO || regionId === "울릉도" || regionId.toUpperCase() === "ULLEUNGDO") {
            warnCode = "L1072100";
        } else if (regionId === REGIONID.WEEK_ULSAN || regionId === "울산" || regionId.toUpperCase() === "ULSAN") {
            warnCode = "L1080300";
        } else if (regionId === REGIONID.WEEK_ULJIN || regionId === "울진" || regionId.toUpperCase() === "ULJIN") {
            warnCode = "L1072300";
        } else if (regionId === REGIONID.WEEK_WONJU || regionId === "원주" || regionId.toUpperCase() === "WONJU") {
            warnCode = "L1021200";
        } else if (regionId === REGIONID.WEEK_EUISEONG || regionId === "의성" || regionId.toUpperCase() === "UISEONG") {
            warnCode = "L1071700";
        } else if (regionId === REGIONID.WEEK_ICHEON || regionId === "이천" || regionId.toUpperCase() === "ICHEON") {
            warnCode = "L1013000";
        } else if (regionId === REGIONID.WEEK_INJE || regionId === "인제" || regionId.toUpperCase() === "INJE") {
            warnCode = "L1021800";
        } else if (regionId === REGIONID.WEEK_INCHEON || regionId === "인천" || regionId.toUpperCase() === "INCHEON") {
            warnCode = "L1010800";
        } else if (regionId === REGIONID.WEEK_IMSHIL || regionId === "임실" || regionId.toUpperCase() === "IMSI") {
            warnCode = "L1060900";
        } else if (regionId === REGIONID.WEEK_JANGSU || regionId === "장수" || regionId.toUpperCase() === "JANGSU") {
            warnCode = "L1060800";
        } else if (regionId === REGIONID.WEEK_JANGHEUNG || regionId === "장흥" || regionId.toUpperCase() === "JANGHEUNG") {
            warnCode = "L1051300";
        } else if (regionId === REGIONID.WEEK_JEONJU || regionId === "전주" || regionId.toUpperCase() === "JEONJU") {
            warnCode = "L1061300";
        } else if (regionId === REGIONID.WEEK_JEONGEUP || regionId === "정읍" || regionId.toUpperCase() === "JEONGEUP") {
            warnCode = "L1061200";
        } else if (regionId === REGIONID.WEEK_JEJU || regionId === "제주" || regionId.toUpperCase() === "JEJU") {
            warnCode = "L1090700";
        } else if (regionId === REGIONID.WEEK_JECHEON || regionId === "제천" || regionId.toUpperCase() === "JECHEON") {
            warnCode = "L1040900";
        } else if (regionId === REGIONID.WEEK_JINDO || regionId === "진도" || regionId.toUpperCase() === "JINDO") {
            warnCode = "L1052300";
        } else if (regionId === REGIONID.WEEK_JINJU || regionId === "진주" || regionId.toUpperCase() === "JINJU") {
            warnCode = "L1081400";
        } else if (regionId === REGIONID.WEEK_CHANGWON || regionId === "창원" || regionId.toUpperCase() === "CHANGWON") {
            warnCode = "L1080600";
        } else if (regionId === REGIONID.WEEK_CHONAN || regionId === "천안" || regionId.toUpperCase() === "CHEONAN") {
            warnCode = "L1030200";
        } else if (regionId === REGIONID.WEEK_CHULWON || regionId === "철원" || regionId.toUpperCase() === "CHEOLWON") {
            warnCode = "L1021300";
        } else if (regionId === REGIONID.WEEK_CHEONGJU || regionId === "청주" || regionId.toUpperCase() === "CHEONGJU") {
            warnCode = "L1040100";
        } else if (regionId === REGIONID.WEEK_CHUPUNGRYEONG || regionId === "추풍령" || regionId.toUpperCase() === "CHUPUNGNYEONG") {
            warnCode = "L1040700";
        } else if (regionId === REGIONID.WEEK_CHUNCHEON || regionId === "춘천" || regionId.toUpperCase() === "CHUNCHEON") {
            warnCode = "L1021600";
        } else if (regionId === REGIONID.WEEK_CHUNGJU || regionId === "충주" || regionId.toUpperCase() === "CHUNGJU") {
            warnCode = "L1040800";
        } else if (regionId === REGIONID.WEEK_TAEBAEK || regionId === "태백" || regionId.toUpperCase() === "TAEBAEK") {
            warnCode = "L1020300";
        } else if (regionId === REGIONID.WEEK_TONGYEONG || regionId === "통영" || regionId.toUpperCase() === "TONGYEONG") {
            warnCode = "L1082000";
        } else if (regionId === REGIONID.WEEK_POHANG || regionId === "포항" || regionId.toUpperCase() === "POHANG") {
            warnCode = "L1072400";
        } else if (regionId === REGIONID.WEEK_HAPCHEON || regionId === "합천" || regionId.toUpperCase() === "HAPCHEON") {
            warnCode = "L1081900";
        } else if (regionId === REGIONID.WEEK_HAENAM || regionId === "해남" || regionId.toUpperCase() === "HAENAM") {
            warnCode = "L1051500";
        } else if (regionId === REGIONID.WEEK_HONGCHEON || regionId === "홍천" || regionId.toUpperCase() === "HONGCHEON") {
            warnCode = "L1021500";
        } else if (regionId === REGIONID.WEEK_HEUKSANDO || regionId === "흑산도" || regionId.toUpperCase() === "HEUKSANDO") {
            warnCode = "L1052400";
        }
        else{
            ;//SOnar Issue
        }
        return warnCode;
    };
    
    this.getCurrentData = function (weatherData, $scope, regCode) {
        $scope.RegionCode = this.setRegionCode(regCode.trim());
        var weatherArr = {};
        var wRecords = weatherData.current.RECORD;
        for (var w = 0; w < wRecords.length; w++) {
            if ($scope.RegionCode === wRecords[w].region) {
                weatherArr.time = wRecords[w].time;
                weatherArr.region = wRecords[w].region;
                weatherArr.condition = wRecords[w].condition;
                weatherArr.temperature = wRecords[w].temperature;
                weatherArr.degree = wRecords[w].degree;
                weatherArr.humidity = wRecords[w].humidity;
                weatherArr.direction = wRecords[w].direction;
                weatherArr.velocity = wRecords[w].velocity;

                var reCondition = parseInt(wRecords[w].condition,10);

                switch (reCondition) {
                    case WEATHER.ICON_CLEAR :
                    case WEATHER.ICON_CLOUDY_AFTER_CLEAR :
                        reCondition = 1;
                        break;

                    case WEATHER.ICON_RAINSNOW :
                    case WEATHER.ICON_CLEAR_AFTER_RAINSNOW :
                        reCondition = 2;
                        break;

                    case WEATHER.ICON_SNOW :
                    case WEATHER.ICON_SNOWSHOWER :
                    case WEATHER.ICON_CLEAR_AFTER_SNOW :
                        reCondition = 3;
                        break;

                    case WEATHER.ICON_CLOUDY :
                    case WEATHER.ICON_FOG :
                    case WEATHER.ICON_PARTLY_CLOUDY :
                    case WEATHER.ICON_RAIN_AFTER_MOSTLY_CLOUDY :
                    case WEATHER.ICON_SNOW_AFTER_MOSTLY_CLOUDY :
                    case WEATHER.ICON_RAINSNOW_AFTER_MOSTLY_CLOUDY :
                    case WEATHER.ICON_THUNDERESTORMS_AFTER_MOSTLY_CLOUDY :
                    case WEATHER.ICON_CLEAR_AFTER_CLOUDY :
                        reCondition = 4;
                        break;

                    case WEATHER.ICON_RAIN :
                    case WEATHER.ICON_RAINSHOWER :
                    case WEATHER.ICON_THUNDERESTORMS :
                    case WEATHER.ICON_CLEAR_AFTER_THUNDERESTORMS :
                    case WEATHER.ICON_CLEAR_AFTER_RAIN :
                        reCondition = 5;
                        break;
                    default:
                        break;
                }
                weatherArr.reCondition = reCondition;
                break;
            }
        }
        return weatherArr;
    };

    this.getWeekData = function (weatherData, $scope, regCode) {
        $scope.RegionCode = this.setRegionCode(regCode.trim());
        var currentWeatherIndex = -1;
        var weatherArrWeekly = [];
        var wRecords = weatherData["forecast"]["RECORD"];
        for (var w = 0; w < wRecords.length; w++) {
            var region = this.setRegionCode(wRecords[w].region);
            if ($scope.RegionCode === region) {
                if (currentWeatherIndex < 6) {
                    currentWeatherIndex++;
                    weatherArrWeekly[currentWeatherIndex] = {region : region, date : wRecords[w].date, condition : wRecords[w].condition, maxtemp : wRecords[w].maxtemp, mintemp : wRecords[w].mintemp, amrainrate : (wRecords[w].amrainrate.trim() || -1), pmrainrate : (wRecords[w].pmrainrate.trim() || -1)}; 
                    var reCondition = parseInt(wRecords[w].condition,10);
                    var weatherComment = "";
                    switch (reCondition) {
                        case WEATHER.ICON_CLEAR :
                        case WEATHER.ICON_CLOUDY_AFTER_CLEAR :
                            weatherComment = "맑음";
                            reCondition = 1;
                            break;

                        case WEATHER.ICON_RAINSNOW :
                        case WEATHER.ICON_CLEAR_AFTER_RAINSNOW :
                        case WEATHER.ICON_RAINSNOW_AFTER_MOSTLY_CLOUDY :
                            weatherComment = "눈비";
                            reCondition = 2;
                            break;

                        case WEATHER.ICON_SNOW :
                        case WEATHER.ICON_SNOWSHOWER :
                        case WEATHER.ICON_CLEAR_AFTER_SNOW :
                        case WEATHER.ICON_SNOW_AFTER_MOSTLY_CLOUDY :
                            weatherComment = "눈";
                            reCondition = 3;
                            break;

                        case WEATHER.ICON_CLOUDY :
                        case WEATHER.ICON_FOG :
                        case WEATHER.ICON_PARTLY_CLOUDY :
                        case WEATHER.ICON_CLEAR_AFTER_CLOUDY :
                            weatherComment = "흐림";
                            reCondition = 4;
                            break;

                        case WEATHER.ICON_RAIN :
                        case WEATHER.ICON_RAINSHOWER :
                        case WEATHER.ICON_THUNDERESTORMS :
                        case WEATHER.ICON_CLEAR_AFTER_THUNDERESTORMS :
                        case WEATHER.ICON_CLEAR_AFTER_RAIN :
                        case WEATHER.ICON_RAIN_AFTER_MOSTLY_CLOUDY :
                        case WEATHER.ICON_THUNDERESTORMS_AFTER_MOSTLY_CLOUDY :
                            weatherComment = "비";
                            reCondition = 5;
                            break;
                        default:
                            break;
                    }
                    weatherArrWeekly[currentWeatherIndex].reCondition = reCondition;
                    weatherArrWeekly[currentWeatherIndex].condition = weatherComment;
                }
            }
        }
//        weatherArrWeekly = JSON.parse('[{"amrainrate": 90, "condition": "?", "date": "2015-07-24", "maxtemp": 26, "mintemp": 3, "pmrainrate": 70, "reCondition": 5, "region": 119},{"amrainrate": 80, "condition": "?", "date": "2015-07-25", "maxtemp": 28, "mintemp": 24, "pmrainrate": 20, "reCondition": 5, "region": 119},{"amrainrate": -1, "condition": "??", "date": "2015-07-26", "maxtemp": 31, "mintemp": 4, "pmrainrate": -1, "reCondition": 4, "region": 119},{"amrainrate": -1, "condition": "?", "date": "2015-07-27", "maxtemp": 29, "mintemp": 5, "pmrainrate": -1, "reCondition": 5, "region": 119},{"amrainrate": -1, "condition": "?", "date": "2015-07-28", "maxtemp": 29, "mintemp": 6, "pmrainrate": -1, "reCondition": 5, "region": 119},{"amrainrate": -1, "condition": "??", "date": "2015-07-29", "maxtemp": 29, "mintemp": 7, "pmrainrate": -1, "reCondition": 4, "region": 119},{"amrainrate": -1, "condition": "??", "date": "2015-07-30", "maxtemp": 29, "mintemp": 8, "pmrainrate": -1, "reCondition": 4, "region": 119}]');
        return weatherArrWeekly;
    };
});