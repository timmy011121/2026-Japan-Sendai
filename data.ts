
import { DayPlan, ItemType, FlightInfo, ChecklistItem } from './types';

export const flights: FlightInfo[] = [
  {
    date: '2026/01/13',
    number: 'IT216',
    route: 'TPE (T1) ➔ HND (T3)',
    time: '00:10 - 04:00',
    terminal: 'TPE T1 / HND T3',
    airline: '台灣虎航',
    baggage: '20KG'
  },
  {
    date: '2026/01/24',
    number: 'CI101',
    route: 'NRT (T2) ➔ TPE (T2)',
    time: '14:35 - 05:45 (+1)',
    terminal: 'NRT T2 / TPE T2',
    airline: '中華航空',
    baggage: '20KG'
  }
];

export const itineraryData: DayPlan[] = [
  {
    date: '2026/01/12',
    dayLabel: 'Day 0',
    city: '台北 ➔ 桃園機場',
    weather: { temp: '18°C', condition: '陰有雨', icon: 'fa-cloud-rain', location: '台北' },
    items: [
      { time: '19:00', title: '台北車站機場線集合', type: ItemType.Transport, isImportant: true, note: '直達車每15分一班', duration: '約36分', price: 'NT$160' },
      { time: '20:00', title: '桃園機場', type: ItemType.Transport, note: '抵達機場' },
    ],
    backupDining: []
  },
  {
    date: '2026/01/13',
    dayLabel: 'Day 1',
    city: '東京 ➔ 仙台',
    weather: { temp: '4°C', condition: '晴時多雲', icon: 'fa-cloud-sun', location: '仙台' },
    items: [
      { time: '04:00', title: '羽田空港', type: ItemType.Flight, note: '預計6點左右入境' },
      { time: '07:08', title: '京急空港線エアポート急行', type: ItemType.Transport, note: '羽田 ➔ 品川 (約21分), 品川 ➔ 東京 (約8分)', duration: '約40分', price: '¥510' },
      { time: '08:18', title: '東北新幹線「はやぶさ」', type: ItemType.Transport, isImportant: true, note: '東京站 ➔ 仙台站, 20號月台', duration: '約1小時30分', price: '¥11,210' },
      { time: '10:30', title: 'るーぷる仙台', type: ItemType.Transport, note: '觀光巴士一日券', price: '¥630' },
      { time: '10:30', title: '仙台駅', type: ItemType.Spot, note: '寄放行李' },
      { time: '11:00', title: '仙台朝市', type: ItemType.Spot, note: '新鮮海產 (08:00-17:00)' },
      { time: 'Lunch', title: '牛たん炭焼 利久 仙台駅店', type: ItemType.Food, note: '推薦: 厚切牛舌定食 (10:00-21:00)', location: '牛たん炭焼 利久 仙台駅店' },
      { time: '14:00', title: '瑞鳳殿', type: ItemType.Spot, location: '瑞鳳殿', note: '伊達政宗靈廟 (09:00-16:50)', price: '¥570' },
      { time: '15:30', title: '仙台城跡', type: ItemType.Spot, location: '仙台城跡', note: '伊達政宗騎馬像、市景', price: '¥700' },
      { time: '17:00', title: 'AER展望台', type: ItemType.Spot, location: 'AER展望台', note: '俯瞰仙台 (10:00-20:00)' },
      { time: '17:00', title: 'AER購物中心', type: ItemType.Spot, note: '購物 (10:00-21:00)' },
      { time: '19:00', title: '一番町商店街', type: ItemType.Spot, note: '返回仙台站週邊 (24h)' },
      { time: '19:00', title: '中央通商店街', type: ItemType.Spot, note: '購物 (08:00-21:00)' },
      { time: 'Dinner', title: '閣 仙台駅前店', type: ItemType.Food, note: '推薦: 生魚片、牡蠣料理 (11:30-14:30-22:30)', location: '閣 仙台駅前店' },
      { time: 'Stay', title: 'ダイワロイネットホテル 仙台西口', type: ItemType.Hotel }
    ],
    backupDining: [
      { name: '烤牛舌 善治郎', note: '牛舌定食', type: 'lunch', category: '牛舌' },
      { name: '味の牛たん 喜助', note: '牛舌套餐', type: 'lunch', category: '牛舌' },
      { name: '仙台站內壽司店', note: '壽司', type: 'lunch', category: '壽司' },
      { name: '司牛舌專賣店', note: '牛舌定食', type: 'dinner', category: '牛舌' },
      { name: '利久本店', note: '牛舌定食', type: 'dinner', category: '牛舌' },
      { name: '閣之牛舌', note: '牛舌', type: 'dinner', category: '牛舌' },
      { name: '仙台味噌拉麵', note: '味噌拉麵', type: 'dinner', category: '拉麵' },
      { name: '仙台牛角', note: '燒肉', type: 'dinner', category: '燒肉' },
      { name: '麒麟拉麵', note: '拉麵', type: 'dinner', category: '拉麵' },
      { name: '伊牛たん本舗', note: '厚切牛舌', type: 'dinner', category: '牛舌' },
      { name: 'ずんだ茶寮', note: '毛豆奶昔/麻糬', type: 'dessert', category: '甜點' },
      { name: '花月堂', note: '菠蘿麵包/毛豆奶昔', type: 'dessert', category: '甜點' },
      { name: '荻之月', note: '宮城縣特產', type: 'dessert', category: '伴手禮' },
      { name: 'ずんだ小徑', note: '毛豆甜點', type: 'dessert', category: '甜點' }
    ]
  },
  {
    date: '2026/01/14',
    dayLabel: 'Day 2',
    city: '仙台 ➔ 松島 ➔ 銀山溫泉',
    weather: { temp: '-1°C', condition: '大雪', icon: 'fa-snowflake', location: '銀山溫泉' },
    items: [
      { time: '09:00', title: 'Alamo Rent A Car', type: ItemType.Transport, isImportant: true, note: '取車 (4WD指定) (07:30-20:00)' },
      { time: '09:00', title: '開車前往松島', type: ItemType.Transport, duration: '約40分' },
      { time: '09:40', title: '松島海岸', type: ItemType.Spot, location: '松島海岸', note: '日本三景' },
      { time: '09:40', title: '松島遊覧船', type: ItemType.Spot, note: '09:00首班, 50分鐘航程', price: '¥1,500' },
      { time: '11:00', title: '瑞巌寺', type: ItemType.Spot, location: '瑞巌寺', price: '¥700', note: '國寶寺廟 (08:30-16:30)' },
      { time: '11:00', title: '五大堂', type: ItemType.Spot, note: '地標 (08:30-16:30)' },
      { time: 'Lunch', title: '松島さかな市場', type: ItemType.Food, note: '海鮮丼、烤牡蠣 (09:00-16:00)', location: '松島さかな市場' },
      { time: '14:20', title: '開車前往銀山溫泉', type: ItemType.Transport, duration: '約1小時40分' },
      { time: '16:00', title: '古勢起屋専用駐車場', type: ItemType.Transport, note: '需打電話通知旅館接駁' },
      { time: '16:30', title: '銀山温泉', type: ItemType.Spot, location: '銀山溫泉', note: '大正風情、能登屋旅館(神隱少女原型)' },
      { time: '17:00', title: '白銀の滝', type: ItemType.Spot, note: '冬季冰瀑' },
      { time: '17:00', title: '延澤銀山遺址', type: ItemType.Spot, note: '歷史礦坑' },
      { time: 'Stay', title: '古勢起屋本館', type: ItemType.Hotel }
    ],
    backupDining: [
      { name: '松島牡蠣屋', note: '牡蠣料理', type: 'lunch', category: '海鮮' },
      { name: '伊豆の華', note: '炸咖哩麵包', type: 'lunch', category: '小吃' },
      { name: '野川とうや', note: '豆腐、豆漿', type: 'dessert', category: '甜點' },
      { name: '伊豆之華', note: '蕎麥冰淇淋', type: 'dessert', category: '甜點' },
      { name: '西塚菓子舖', note: '溫泉饅頭', type: 'dessert', category: '伴手禮' }
    ]
  },
  {
    date: '2025/01/15',
    dayLabel: 'Day 3',
    city: '銀山 ➔ 山形 ➔ 上山',
    weather: { temp: '-2°C', condition: '小雪', icon: 'fa-snowflake', location: '山形' },
    items: [
      { time: '09:45', title: '開車前往德良湖', type: ItemType.Transport, duration: '約15分' },
      { time: '10:00', title: '徳良湖', type: ItemType.Spot, location: '德良湖' },
      { time: '11:00', title: '開車前往山形', type: ItemType.Transport, duration: '約45分' },
      { time: '10:00', title: '霞城公園', type: ItemType.Spot, location: '山形霞城公園', note: '冬季雪景 (05:30-22:00)' },
      { time: 'Lunch', title: 'そば処明友庵', type: ItemType.Food, note: '手打蕎麥麵 (11:00-16:00)' },
      { time: '15:30', title: '山形城跡', type: ItemType.Spot, note: '歷史遺址' },
      { time: '15:30', title: '上杉神社', type: ItemType.Spot, note: '米澤城遺址' },
      { time: '17:00', title: 'かみのやま温泉', type: ItemType.Spot, note: '上山城 夜間點燈' },
      { time: 'Dinner', title: '庄司屋 本店', type: ItemType.Food, note: '蕎麥麵定食 (11:00-20:00)' },
      { time: 'Stay', title: '山形グランドホテル', type: ItemType.Hotel }
    ],
    backupDining: [
      { name: '榮屋本店', note: '冷肉麵', type: 'lunch', category: '麵食' },
      { name: '米澤牛 登起波', note: '當地特色料理', type: 'lunch', category: '燒肉' },
      { name: '米澤牛登起波山形店', note: '米澤牛牛排', type: 'lunch', category: '燒肉' },
      { name: '山形拉麵', note: '拉麵', type: 'lunch', category: '拉麵' },
      { name: 'シベール', note: 'Rusk', type: 'dessert', category: '甜點' },
      { name: '乃し梅本舗 佐藤屋', note: '乃し梅', type: 'dessert', category: '甜點' },
      { name: '榮玉堂', note: '紅花磅蛋糕', type: 'dessert', category: '甜點' }
    ]
  },
  {
    date: '2025/01/16',
    dayLabel: 'Day 4',
    city: '上山 ➔ 藏王',
    weather: { temp: '-6°C', condition: '暴風雪', icon: 'fa-wind', location: '藏王' },
    items: [
      { time: '09:30', title: '開車前往藏王', type: ItemType.Transport, duration: '約30分' },
      { time: '10:00', title: '蔵王ロープウェイ', type: ItemType.Spot, location: '藏王纜車', note: '地藏山頂站雪怪 (08:30-17:00)', isImportant: true, price: '¥4,400' },
      { time: '12:00', title: '蔵王温泉大露天風呂', type: ItemType.Spot, note: '日本最大露天溫泉 (09:30-17:00)', price: '¥600' },
      { time: 'Lunch', title: 'きくち食堂', type: ItemType.Food, note: '成吉思汗烤肉定食 (11:00-13:40)' },
      { time: '13:30', title: '蔵王温泉スキー場', type: ItemType.Spot, note: '泡湯與滑雪 (08:30-17:00)' },
      { time: '13:30', title: '藥師神社', type: ItemType.Spot, note: '冬季雪景' },
      { time: '13:30', title: '地藏山頂站', type: ItemType.Spot, note: '散步' },
      { time: '13:30', title: '藏王高原', type: ItemType.Spot, note: '山林雪景' },
      { time: '17:00', title: '蔵王温泉街', type: ItemType.Spot, note: '散步 (06:00-22:00)' },
      { time: 'Dinner', title: '仙台炭焼 牛たん東山', type: ItemType.Food, note: '極厚牛舌定食 (11:30-23:30)' },
      { time: 'Stay', title: 'プチリゾートホテル デ・バート', type: ItemType.Hotel }
    ],
    backupDining: [
      { name: 'SANGORO 三五郎小屋', note: '溫泉咖哩飯', type: 'lunch', category: '咖哩' },
      { name: '藏王纜車站餐廳', note: '邊用餐邊賞雪', type: 'lunch', category: '景觀餐廳' },
      { name: 'Zao Boo', note: '湯料理', type: 'dinner', category: '鍋物' },
      { name: 'ZAO stand MY', note: '稻花餅', type: 'dessert', category: '和菓子' },
      { name: 'CAFE SLOW JAM', note: '蕎麥磅蛋糕', type: 'dessert', category: '咖啡' }
    ]
  },
  {
    date: '2025/01/17',
    dayLabel: 'Day 5',
    city: '藏王 ➔ 狐狸村 ➔ 仙台',
    weather: { temp: '-1°C', condition: '多雲', icon: 'fa-cloud', location: '仙台' },
    items: [
      { time: '09:00', title: '開車前往狐狸村', type: ItemType.Transport, duration: '約1小時30分' },
      { time: '10:30', title: '宮城蔵王キツネ村', type: ItemType.Spot, location: '藏王狐狸村', note: '冬季狐狸互動 (09:00-16:00)', isImportant: true, price: '¥1,000' },
      { time: '12:40', title: '開車前往金蛇水神社', type: ItemType.Transport, duration: '約50分' },
      { time: '13:30', title: '金蛇水神社', type: ItemType.Spot, note: '黑色御守 (08:30-16:00)' },
      { time: '14:10', title: '開車前往秋保大瀑布', type: ItemType.Transport, duration: '約50分' },
      { time: '15:00', title: '秋保大滝', type: ItemType.Spot, note: '冬季結冰 (07:00-18:00)' },
      { time: '17:10', title: '開車返回仙台', type: ItemType.Transport, duration: '約50分' },
      { time: '18:00', title: '仙台站還車', type: ItemType.Transport },
      { time: 'Dinner', title: 'すし波奈 仙台パルコ店', type: ItemType.Food, note: '東北壽司 (11:00-22:00)' },
      { time: 'Stay', title: 'ホテルメトロポリタン仙台イースト', type: ItemType.Hotel }
    ],
    backupDining: [
       { name: '伊牛舌本舗 本店', note: '牛舌', type: 'dinner', category: '牛舌' },
       { name: '牛たん炭焼 利久', note: '厚切牛舌定食', type: 'dinner', category: '牛舌' },
       { name: '松華堂菓子店', note: '松島特產', type: 'dessert', category: '甜點' },
       { name: '鯛きち', note: '薄皮鯛魚燒', type: 'dessert', category: '甜點' }
    ]
  },
  {
    date: '2026/01/18',
    dayLabel: 'Day 6',
    city: '仙台 ➔ 輕井澤',
    weather: { temp: '-3°C', condition: '雪', icon: 'fa-snowflake', location: '輕井澤' },
    items: [
      { time: '11:00', title: 'せんだいメディアテーク', type: ItemType.Spot, note: '建築名作 (09:00-22:00)' },
      { time: 'Lunch', title: '味の牛たん 喜助 仙台駅店', type: ItemType.Food, note: '牛舌套餐' },
      { time: '14:31', title: '東北新幹線「はやぶさ」', type: ItemType.Transport, note: '仙台站 ➔ 東京站 (13號月台)', duration: '約1小時13分', price: '¥11,410' },
      { time: '18:04', title: '北陸新幹線「はくたか」', type: ItemType.Transport, note: '東京站 ➔ 輕井澤站 (21,22號月台)', duration: '約1小時3分', price: '¥5,690' },
      { time: '18:00', title: '定禪寺通', type: ItemType.Spot, note: '冬季燈飾散步' },
      { time: '19:00', title: '大崎八幡宮', type: ItemType.Spot, note: '國寶神社' },
      { time: '18:30', title: '輕井澤站', type: ItemType.Spot, note: '周邊熟悉環境' },
      { time: 'Dinner', title: '村民食堂', type: ItemType.Food, note: '信州牛漢堡排 (11:30-21:00)' },
      { time: 'Stay', title: 'アパホテル〈軽井沢駅前〉軽井沢荘', type: ItemType.Hotel }
    ],
    backupDining: [
      { name: '仙台站內壽司店', note: '壽司', type: 'lunch', category: '壽司' },
      { name: '輕井澤當地餐廳', note: '當地料理', type: 'dinner', category: '當地料理' },
      { name: 'ずんだ小徑', note: '毛豆甜點', type: 'dessert', category: '甜點' },
      { name: 'Clinton St. Baking', note: '特色麵包與蛋糕', type: 'dessert', category: '甜點' }
    ]
  },
  {
    date: '2026/01/19',
    dayLabel: 'Day 7',
    city: '輕井澤',
    weather: { temp: '-2°C', condition: '晴朗', icon: 'fa-sun', location: '輕井澤' },
    items: [
      { time: '09:00', title: '軽井沢プリンスホテルスキー場', type: ItemType.Spot, location: '輕井澤王子大飯店滑雪場', price: '¥10,000', note: '租裝備7-9k日圓 (08:00-17:00)' },
      { time: 'Lunch', title: '滑雪場內餐廳', type: ItemType.Food, note: '建議自備零食' },
      { time: '13:00', title: '雲場池', type: ItemType.Spot, note: '冬季鏡湖雪景' },
      { time: '14:00', title: '雪地徒步活動', type: ItemType.Spot, note: '滑雪場附近' },
      { time: 'Dinner', title: '腸詰屋', type: ItemType.Food, note: '德式香腸、自家釀啤酒 (10:00-18:00)' },
      { time: 'Stay', title: '軽井沢プリンスホテル ウエスト', type: ItemType.Hotel }
    ],
    backupDining: [
       { name: '輕井澤王子飯店餐廳', note: '飯店餐飲', type: 'lunch', category: '飯店' },
       { name: '輕井澤燒肉店', note: '燒肉', type: 'dinner', category: '燒肉' },
       { name: '丸山珈琲', note: '精品咖啡', type: 'dessert', category: '咖啡' },
       { name: 'SUKE6 DINER', note: '咖啡與磅蛋糕', type: 'dessert', category: '咖啡' }
    ]
  },
  {
    date: '2026/01/20',
    dayLabel: 'Day 8',
    city: '輕井澤',
    weather: { temp: '-3°C', condition: '小雪', icon: 'fa-snowflake', location: '輕井澤' },
    items: [
      { time: '09:00', title: 'Akakura Onsen滑雪場', type: ItemType.Spot, note: '不同路線滑雪 (08:00-17:00)', price: '¥10,000' },
      { time: 'Dinner', title: '川上庵', type: ItemType.Food, note: '蕎麥麵 (11:00-15:00)' },
      { time: 'Stay', title: '軽井沢プリンスホテル ウエスト', type: ItemType.Hotel }
    ],
    backupDining: [
      { name: 'Bleston Court Yukawatan', note: '法式料理', type: 'dinner', category: '法式' }
    ]
  },
  {
    date: '2026/01/21',
    dayLabel: 'Day 9',
    city: '輕井澤 ➔ 東京淺草',
    weather: { temp: '8°C', condition: '晴朗', icon: 'fa-sun', location: '東京' },
    items: [
      { time: '09:00', title: '旧軽井沢銀座通り', type: ItemType.Spot, note: '復古購物街' },
      { time: '10:00', title: '聖パウロカトリック教会', type: ItemType.Spot, note: '安東尼雷蒙設計 (09:00-16:00)' },
      { time: '10:00', title: '旧三笠ホテル', type: ItemType.Spot, note: '舊三笠飯店 (09:00-17:00)', price: '¥400' },
      { time: '12:00', title: '軽井沢・プリンスショッピングプラザ', type: ItemType.Spot, note: 'Outlet 購物 (10:00-20:00)' },
      { time: '12:00', title: '雲場池', type: ItemType.Spot, note: '冬季鏡湖雪景' },
      { time: '12:00', title: '白絲瀑布', type: ItemType.Spot, note: '冰瀑' },
      { time: 'Lunch', title: '輕井澤法國麵包店', type: ItemType.Food, note: '可頌、三明治 (08:00-17:00)' },
      { time: '16:23', title: '北陸新幹線', type: ItemType.Transport, isImportant: true, note: '輕井澤 ➔ 東京 (1,2號月台)', duration: '約1小時5分', price: '¥6,020' },
      { time: '17:45', title: '銀座線', type: ItemType.Transport, note: '轉乘至田園町', duration: '約20分', price: '¥330' },
      { time: '18:00', title: '浅草寺', type: ItemType.Spot, location: '淺草寺', note: '夜訪' },
      { time: 'Dinner', title: '浅草今半 国際通り本店', type: ItemType.Food, note: '和牛壽喜燒 (11:30-20:30)' },
      { time: 'Stay', title: 'アパホテル〈浅草 田原町駅前〉', type: ItemType.Hotel }
    ],
    backupDining: [
      { name: '大黒家天麩羅', note: '天婦羅', type: 'dinner', category: '天婦羅' },
      { name: '浅草今半别馆', note: '壽喜燒/涮涮鍋', type: 'dinner', category: '鍋物' },
      { name: 'Mikado Coffee', note: 'Mocha軟霜淇淋', type: 'dessert', category: '甜點' },
      { name: '梅園 浅草本店', note: '栗ぜんざい', type: 'dessert', category: '甜點' },
      { name: '五代目野田巖', note: '和菓子', type: 'dessert', category: '甜點' }
    ]
  },
  {
    date: '2026/01/22',
    dayLabel: 'Day 10',
    city: '方案A: 河口湖 / 方案B: 東京市區',
    weather: { temp: '5°C', condition: '晴時多雲', icon: 'fa-cloud-sun', location: '河口湖' },
    items: [
      // Plan A Items
      { time: '07:30', title: '銀座線+JR', type: ItemType.Transport, plan: 'A', note: '淺草 ➔ 新宿' },
      { time: '08:10', title: '高速バス', type: ItemType.Transport, plan: 'A', note: '新宿 ➔ 河口湖', duration: '約2小時', price: '¥1,900' },
      { time: '10:30', title: '河口湖遊覧船', type: ItemType.Spot, plan: 'A', location: '河口湖遊覽船', price: '¥1,000', note: '09:30首班' },
      { time: '11:30', title: '富士山パノラマロープウェイ', type: ItemType.Spot, plan: 'A', location: '富士山全景纜車', price: '¥900', note: '天上山公園觀景台' },
      { time: 'Lunch', title: 'ほうとう不動 河口湖北本店', type: ItemType.Food, plan: 'A', note: '味噌燉麵 (11:00-20:00)', location: 'ほうとう不動 河口湖北本店' },
      { time: '14:00', title: '河口湖音楽と森の美術館', type: ItemType.Spot, plan: 'A', note: '歐式庭園 (10:00-17:30)' },
      { time: '14:00', title: '富士山五合目', type: ItemType.Spot, plan: 'A', note: '備案: 若天氣好 (09:00-17:00)' },
      { time: 'Dinner', title: '湖波', type: ItemType.Food, plan: 'A', note: '日式定食 (11:00-20:00)', location: '湖波' },

      // Plan B Items
      { time: '09:00', title: '浅草寺・雷門', type: ItemType.Spot, plan: 'B', location: '淺草寺', note: '仲見世' },
      { time: 'Lunch', title: '大黒家天麩羅', type: ItemType.Food, plan: 'B', location: '大黑家天婦羅', note: '天丼 (11:00-20:00)' },
      { time: '16:00', title: '東京駅', type: ItemType.Spot, plan: 'B', note: '建築、皇居外苑' },
      { time: '16:00', title: '東京車站畫廊', type: ItemType.Spot, plan: 'B', note: '(10:00-18:00)' },
      { time: '16:00', title: '日本橋', type: ItemType.Spot, plan: 'B', note: '商業區' },
      { time: '16:00', title: '六本木ヒルズ展望台', type: ItemType.Spot, plan: 'B', note: '室內觀景台 (11:00-23:00)' },
      { time: '16:00', title: '築地市場外圍', type: ItemType.Spot, plan: 'B', note: '美食街 (06:00-14:00)' },
      { time: '16:00', title: '台場', type: ItemType.Spot, plan: 'B', note: '購物' },
      { time: '16:00', title: '澀谷或新宿燈光', type: ItemType.Spot, plan: 'B', note: '夜景' },
      { time: 'Dinner', title: '一蘭 浅草店', type: ItemType.Food, plan: 'B', note: '豚骨拉麵 (09:30-22:00)' },

      // Common Items
      { time: 'Stay', title: 'アパホテル〈浅草 田原町駅前〉', type: ItemType.Hotel }
    ],
    backupDining: [
      { name: '邁泉 青山本店', note: '豚汁定食', type: 'lunch', category: '豬排' },
      { name: '東京站拉面街', note: '拉麵', type: 'lunch', category: '拉麵' },
      { name: '敘敘苑 上野站前店', note: '和牛燒肉', type: 'dinner', category: '燒肉' },
      { name: '俺的燒肉', note: '燒肉', type: 'dinner', category: '燒肉' },
      { name: '東京芝豆腐屋UKAI', note: '豆腐料理', type: 'dinner', category: '懷石料理' },
      { name: 'Harajuku Sweets Lab', note: '甜點', type: 'dessert', category: '甜點' }
    ]
  },
  {
    date: '2026/01/23',
    dayLabel: 'Day 11',
    city: '東京 ➔ 川越',
    weather: { temp: '9°C', condition: '晴朗', icon: 'fa-sun', location: '川越' },
    items: [
      { time: '08:30', title: '浅草 ➔ 川越', type: ItemType.Transport, note: '東武Line+東武東上線 (約1小時)' },
      { time: '10:00', title: '蔵造りの町並み', type: ItemType.Spot, location: '川越時之鐘', note: '江戶建築群' },
      { time: '10:30', title: '時の鐘', type: ItemType.Spot, note: '地標' },
      { time: '11:00', title: '菓子屋横丁', type: ItemType.Spot, note: '傳統糖果街' },
      { time: 'Lunch', title: '小川菊', type: ItemType.Food, note: '鰻魚飯 (11:00-19:00)' },
      { time: '13:30', title: '川越氷川神社', type: ItemType.Spot, note: '釣鯛魚籤 (08:00-16:30)' },
      { time: '14:30', title: '喜多院', type: ItemType.Spot, note: '江戶城遺構', price: '¥400' },
      { time: '15:30', title: '大正浪漫夢通', type: ItemType.Spot, note: '大正建築、咖啡館' },
      { time: '15:30', title: '成田山川越別院', type: ItemType.Spot, note: '寧靜氛圍' },
      { time: 'Dinner', title: '陶路子', type: ItemType.Food, note: '川越產季節料理' },
      { time: 'Stay', title: 'アパホテル〈浅草 田原町駅前〉', type: ItemType.Hotel }
    ],
    backupDining: [
       { name: '川越いちや(本店)', note: '鰻魚重', type: 'lunch', category: '鰻魚' },
       { name: 'Izuei Main Restaurant', note: '鰻魚飯', type: 'lunch', category: '鰻魚' },
       { name: '神谷バー', note: '電氣白蘭地', type: 'dinner', category: '酒吧' },
       { name: '浅草米久本店', note: '壽喜燒', type: 'dinner', category: '壽喜燒' },
       { name: '浅草名代らーめん 与ろゐ屋', note: '拉麵', type: 'dinner', category: '拉麵' },
       { name: '麺 みつヰ', note: '拉麵', type: 'dinner', category: '拉麵' },
       { name: '龜屋 時之鐘店', note: '亀最中', type: 'dessert', category: '甜點' },
       { name: '川越プリン', note: '手工布丁', type: 'dessert', category: '甜點' },
       { name: '菓匠 右門', note: '地瓜饅頭', type: 'dessert', category: '甜點' },
       { name: '小江戸おさつ庵', note: '炸地瓜片', type: 'dessert', category: '甜點' },
       { name: 'Kameya Main Store', note: '傳統和菓子', type: 'dessert', category: '甜點' },
       { name: '川越ん家', note: '抹茶冰淇淋', type: 'dessert', category: '甜點' }
    ]
  },
  {
    date: '2026/01/24',
    dayLabel: 'Day 12',
    city: '東京 ➔ 機場',
    weather: { temp: '10°C', condition: '晴朗', icon: 'fa-sun', location: '東京' },
    items: [
      { time: '09:00', title: '浅草寺', type: ItemType.Spot, note: '清晨氛圍' },
      { time: '09:00', title: '仲見世', type: ItemType.Spot, note: '購買伴手禮 (09:00-20:00)' },
      { time: '10:30', title: '淺草超市', type: ItemType.Spot, note: '購物 (24h)' },
      { time: '10:30', title: 'ドン・キホーテ', type: ItemType.Spot, note: '唐吉訶德' },
      { time: 'Lunch', title: '機場內用餐', type: ItemType.Food, note: '依店家安排' },
      { time: '11:30', title: '京成スカイライナー', type: ItemType.Transport, isImportant: true, note: '淺草 ➔ 成田機場', duration: '約1小時30分', price: '¥2,700' },
      { time: '14:35', title: 'CI101 飛往台北', type: ItemType.Flight },
      { time: 'Dinner', title: '飛機上用餐', type: ItemType.Food }
    ],
    backupDining: [
       { name: '人形焼', note: '伴手禮', type: 'dessert', category: '伴手禮' },
       { name: '雷おこし', note: '伴手禮', type: 'dessert', category: '伴手禮' }
    ]
  }
];

export const packingList: ChecklistItem[] = [
  // MOST IMPORTANT
  { id: '1-1', text: '護照', category: 'MOST IMPORTANT', checked: false },
  { id: '1-2', text: '國際駕照', category: 'MOST IMPORTANT', checked: false },
  { id: '1-3', text: '國際駕照譯本', category: 'MOST IMPORTANT', checked: false },
  { id: '1-4', text: '機票', category: 'MOST IMPORTANT', checked: false },
  { id: '1-5', text: '簽證', category: 'MOST IMPORTANT', checked: false },
  { id: '1-6', text: '錢包(現金/提款卡)', category: 'MOST IMPORTANT', checked: false },
  { id: '1-7', text: '手機', category: 'MOST IMPORTANT', checked: false },
  { id: '1-8', text: '鑰匙', category: 'MOST IMPORTANT', checked: false },
  { id: '1-9', text: '飯店預約單', category: 'MOST IMPORTANT', checked: false },
  { id: '1-10', text: '機票證明', category: 'MOST IMPORTANT', checked: false },
  { id: '1-11', text: '網卡 / Esim', category: 'MOST IMPORTANT', checked: false },
  { id: '1-12', text: '圍巾', category: 'MOST IMPORTANT', checked: false },

  // 衣物(留意天氣)
  { id: '2-1', text: '上衣', category: '衣物(留意天氣)', checked: false },
  { id: '2-2', text: '褲子', category: '衣物(留意天氣)', checked: false },
  { id: '2-3', text: '外套', category: '衣物(留意天氣)', checked: false },
  { id: '2-4', text: '厚外套', category: '衣物(留意天氣)', checked: false },
  { id: '2-5', text: '內衣', category: '衣物(留意天氣)', checked: false },
  { id: '2-6', text: '內褲', category: '衣物(留意天氣)', checked: false },
  { id: '2-7', text: '睡衣睡褲', category: '衣物(留意天氣)', checked: false },
  { id: '2-8', text: '襪子', category: '衣物(留意天氣)', checked: false },
  { id: '2-9', text: '鞋子', category: '衣物(留意天氣)', checked: false },
  { id: '2-10', text: '拖鞋', category: '衣物(留意天氣)', checked: false },
  { id: '2-11', text: '帽子', category: '衣物(留意天氣)', checked: false },

  // 電器
  { id: '3-1', text: '行動電源', category: '電器', checked: false },
  { id: '3-2', text: 'Type-C充電線', category: '電器', checked: false },
  { id: '3-3', text: 'Lighting充電線', category: '電器', checked: false },
  { id: '3-4', text: '手錶充電器', category: '電器', checked: false },
  { id: '3-5', text: '快充頭', category: '電器', checked: false },
  { id: '3-6', text: '耳機', category: '電器', checked: false },
  { id: '3-7', text: '萬用插頭', category: '電器', checked: false },
  { id: '3-8', text: '變壓器', category: '電器', checked: false },
  { id: '3-9', text: 'iPad', category: '電器', checked: false },
  { id: '3-10', text: '筆電', category: '電器', checked: false },

  // 盥洗用品
  { id: '4-1', text: '牙刷', category: '盥洗用品', checked: false },
  { id: '4-2', text: '牙膏', category: '盥洗用品', checked: false },
  { id: '4-3', text: '洗面乳', category: '盥洗用品', checked: false },
  { id: '4-4', text: '棉花棒', category: '盥洗用品', checked: false },
  { id: '4-5', text: '衛生棉', category: '盥洗用品', checked: false },
  { id: '4-6', text: '刮鬍刀', category: '盥洗用品', checked: false },
  { id: '4-7', text: '梳子', category: '盥洗用品', checked: false },

  // 其他
  { id: '5-1', text: '眼鏡', category: '其他', checked: false },
  { id: '5-2', text: '太陽眼鏡', category: '其他', checked: false },
  { id: '5-3', text: '眼鏡盒', category: '其他', checked: false },
  { id: '5-4', text: '水壺', category: '其他', checked: false },
  { id: '5-5', text: '筆', category: '其他', checked: false },
  { id: '5-6', text: '錶帶', category: '其他', checked: false },
  { id: '5-7', text: '手機殼', category: '其他', checked: false },
  { id: '5-8', text: '卡針', category: '其他', checked: false },
  { id: '5-9', text: '暖暖包', category: '其他', checked: false },
  { id: '5-10', text: '行李秤', category: '其他', checked: false },
  { id: '5-11', text: '雨傘', category: '其他', checked: false },

  // 滑雪用具
  { id: '6-1', text: '雪鏡', category: '滑雪用具', checked: false },
  { id: '6-2', text: '面罩', category: '滑雪用具', checked: false },
  { id: '6-3', text: '透氣內衣', category: '滑雪用具', checked: false },
  { id: '6-4', text: '羽絨外套', category: '滑雪用具', checked: false },
  { id: '6-5', text: '發熱衣', category: '滑雪用具', checked: false },
  { id: '6-6', text: '雪褲', category: '滑雪用具', checked: false },
  { id: '6-7', text: '厚襪子', category: '滑雪用具', checked: false },
  { id: '6-8', text: '手套', category: '滑雪用具', checked: false },

  // Tim的寶貝相機
  { id: '7-1', text: '相機', category: "Tim的寶貝相機", checked: false },
  { id: '7-2', text: '相機電池', category: "Tim的寶貝相機", checked: false },
  { id: '7-3', text: '鏡頭（斟酌）', category: "Tim的寶貝相機", checked: false },
  { id: '7-4', text: '記憶卡', category: "Tim的寶貝相機", checked: false },
  { id: '7-5', text: '相機充電器', category: "Tim的寶貝相機", checked: false },
  { id: '7-6', text: '小腳架', category: "Tim的寶貝相機", checked: false },
  { id: '7-7', text: '大腳架', category: "Tim的寶貝相機", checked: false },
  { id: '7-8', text: '怪手', category: "Tim的寶貝相機", checked: false },
  { id: '7-9', text: '吸盤', category: "Tim的寶貝相機", checked: false },
  { id: '7-10', text: '玻璃遮光罩', category: "Tim的寶貝相機", checked: false },
  { id: '7-11', text: 'GO ULTRA', category: "Tim的寶貝相機", checked: false },
  { id: '7-12', text: '樓上的配件', category: "Tim的寶貝相機", checked: false },
  { id: '7-13', text: '小工具', category: "Tim的寶貝相機", checked: false },

  // Anna的寶貝化妝品
  { id: '8-1', text: '防曬乳', category: "Anna的寶貝化妝品", checked: false },
  { id: '8-2', text: '護唇膏', category: "Anna的寶貝化妝品", checked: false },
  { id: '8-3', text: '化妝品', category: "Anna的寶貝化妝品", checked: false },
  { id: '8-4', text: '卸妝用品', category: "Anna的寶貝化妝品", checked: false },
  { id: '8-5', text: '乳液/護手霜', category: "Anna的寶貝化妝品", checked: false },
  { id: '8-6', text: '臉部保養品', category: "Anna的寶貝化妝品", checked: false },
  { id: '8-7', text: '隱形眼鏡', category: "Anna的寶貝化妝品", checked: false },
  { id: '8-8', text: '香水', category: "Anna的寶貝化妝品", checked: false },
  { id: '8-9', text: '飾品', category: "Anna的寶貝化妝品", checked: false },
  { id: '8-10', text: '拔毛夾', category: "Anna的寶貝化妝品", checked: false },
];
