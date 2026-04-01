window.CASES_DATA = {
  categories: [
    { id: "mall", name: "商城宝箱" },
    { id: "dungeon", name: "副本掉落" },
    { id: "normal", name: "一般箱子" }
  ],
  cases: [
    {
      id: "mall_weapon_01",
      category: "mall",
      name: "神兽朋克箱",
      desc: "梦想终会燃尽...",
      image: "assets/shenshoupengkexiang/shenshoupengkexiang.png",
      itemGroups: [
        {
          code: "奖励",
          name: " ",
          rule: "确定获得",
          drawMode: "all",
          allowEmpty: false,
          items: [
            { id: "A1", name: "神兽在星空的一瞬", type: "奖励道具", quantity: "2~4", rarity: "epic", rate: 100, image: "assets/shenshoupengkexiang/A1.png" }
          ]
        },
        {
          code: "奖励",
          name: " ",
          rule: "确定获得",
          drawMode: "all",
          allowEmpty: false,
          items: [
            { id: "B1", name: "青空的破碎幻梦", type: "奖励道具", quantity: "1", rarity: "epic", rate: 100, image: "assets/shenshoupengkexiang/A2.png" }
          ]
        },
        {
          code: "奖励",
          name: " ",
          rule: "可获得其中一种",
          drawMode: "one",
          allowEmpty: false,
          items: [
            { id: "C1", name: "圣君堂高级复活符", type: "奖励道具", quantity: "1", rarity: "epic", rate: 1.5, image: "assets/shenshoupengkexiang/C1.png" },
            { id: "C2", name: "圣君堂高级重生符", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.5, image: "assets/shenshoupengkexiang/C2.png" },
            { id: "C3", name: "应急修理工具", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 15, image: "assets/shenshoupengkexiang/C3.png" },
            { id: "C4", name: "仙幻吉祥", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 3, image: "assets/shenshoupengkexiang/C4.png" },
            { id: "C5", name: "仙幻烧酒", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 3, image: "assets/shenshoupengkexiang/C5.png" },
            { id: "C6", name: "仙幻觉醒妙药", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 3, image: "assets/shenshoupengkexiang/C6.png" },
            { id: "C7", name: "仙幻包子", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 3, image: "assets/shenshoupengkexiang/C7.png" },
            { id: "C8", name: "仙幻不屈妙药", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 3, image: "assets/shenshoupengkexiang/C8.png" },
            { id: "C9", name: "五色线", type: "奖励道具", quantity: "1", rarity: "epic", rate: 3, image: "assets/shenshoupengkexiang/C9.png" },
            { id: "C10", name: "神石最大获得数量限制扩展券 (100)", type: "奖励道具", quantity: "1", rarity: "epic", rate: 65, image: "assets/shenshoupengkexiang/C10.png" }
          ]
        },
        {
          code: "奖励",
          name: " ",
          rule: "概率获得其中1种",
          drawMode: "one",
          allowEmpty: true,
          items: [
            { id: "D1", name: "神石最大获得数量限制扩展券 (100)", type: "奖励道具", quantity: "50", rarity: "epic", rate: 1, image: "assets/shenshoupengkexiang/D1.png" },
            { id: "D2", name: "神石最大获得数量限制扩展券 (100)", type: "奖励道具", quantity: "20", rarity: "epic", rate: 2.5, image: "assets/shenshoupengkexiang/D2.png" },
            { id: "D3", name: "神石最大获得数量限制扩展券 (100)", type: "奖励道具", quantity: "15", rarity: "epic", rate: 5.5, image: "assets/shenshoupengkexiang/D3.png" },
            { id: "D4", name: "神石最大获得数量限制扩展券 (100)", type: "奖励道具", quantity: "10", rarity: "epic", rate: 10, image: "assets/shenshoupengkexiang/D4.png" },
            { id: "D5", name: "神石最大获得数量限制扩展券 (100)", type: "奖励道具", quantity: "5", rarity: "epic", rate: 20, image: "assets/shenshoupengkexiang/D5.png" },
            { id: "D6", name: "神石最大获得数量限制扩展券 (100)", type: "奖励道具", quantity: "2", rarity: "epic", rate: 30.5, image: "assets/shenshoupengkexiang/D6.png" },
            { id: "D7", name: "神石最大获得数量限制扩展券 (10000)", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.1, image: "assets/shenshoupengkexiang/D7.png" },
            { id: "D8", name: "神石最大获得数量限制扩展券 (10000)", type: "奖励道具", quantity: "5", rarity: "epic", rate: 0.05, image: "assets/shenshoupengkexiang/D8.png" },
            { id: "D9", name: "仙幻岛外形币", type: "奖励道具", quantity: "1~20", rarity: "uncommon", rate: 15, image: "assets/shenshoupengkexiang/D9.png" },
            { id: "D10", name: "冰冻的燃烬的朋克服装箱", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.01, image: "assets/shenshoupengkexiang/D10.png" },
            { id: "D11", name: "冰冻的灼焰幻影武器箱", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.03, image: "assets/shenshoupengkexiang/D11.png" },
            { id: "D12", name: "赛博朋克", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.01, image: "assets/shenshoupengkexiang/D12.png" },
            { id: "D13", name: "赛博朋克脸饰", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.03, image: "assets/shenshoupengkexiang/D13.png" },
            { id: "D14", name: "赛博朋克服饰", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.03, image: "assets/shenshoupengkexiang/D14.png" },
            { id: "D15", name: "冰冻的朋克无极幻影武器箱", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.01, image: "assets/shenshoupengkexiang/D15.png" },
            { id: "D16", name: "龙吟仙境吉运福签", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.01, image: "assets/shenshoupengkexiang/D16.png" },
            { id: "D17", name: "龙吟玉", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.02, image: "assets/shenshoupengkexiang/D17.png" },
            { id: "D18", name: "龙吟玉", type: "奖励道具", quantity: "15", rarity: "epic", rate: 0.0002, image: "assets/shenshoupengkexiang/D18.png" },
            { id: "D19", name: "神兽宝物箱", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.05, image: "assets/shenshoupengkexiang/D19.png" }
          ]
        }
      ]
    },
    {
      id: "dungeon_relic_01",
      category: "dungeon",
      name: "苏向阳战利品",
      desc: "武神塔20层",
      image: "assets/suxiangyang/suxiangyang.png",
      itemGroups: [
        {
          code: "奖励",
          name: " ",
          rule: "确定获得",
          drawMode: "all",
          allowEmpty: false,
          items: [
            { id: "A1", name: "[仙幻]武神塔专票", type: "奖励道具", quantity: "1", rarity: "rare", rate: 100, image: "assets/suxiangyang/A1.png" },
            { id: "A2", name: "[仙幻]武神塔成长护符", type: "奖励道具", quantity: "1", rarity: "epic", rate: 100, image: "assets/suxiangyang/A2.png" },
            { id: "A3", name: "仙幻英雄证明", type: "奖励道具", quantity: "1", rarity: "epic", rate: 100, image: "assets/suxiangyang/A3.png" },
            { id: "A4", name: "[仙幻]武神塔修炼之证", type: "奖励道具", quantity: "20", rarity: "rare", rate: 100, image: "assets/suxiangyang/A4.png" },
            { id: "A5", name: "稀有元素", type: "奖励道具", quantity: "2", rarity: "rare", rate: 100, image: "assets/suxiangyang/A5.png" },
            { id: "A6", name: "英雄制作委托书", type: "奖励道具", quantity: "3", rarity: "epic", rate: 100, image: "assets/suxiangyang/A6.png" },
            { id: "A7", name: "武神的试炼礼物箱", type: "奖励道具", quantity: "3", rarity: "epic", rate: 100, image: "assets/suxiangyang/A7.png" }
          ]
        },
        {
          code: "奖励",
          name: " ",
          rule: "概率获得",
          drawMode: "one",
          allowEmpty: true,
          items: [
            { id: "B1", name: "传说制作委托书", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 30, image: "assets/suxiangyang/B1.png" }
          ]
        },
        {
          code: "稀有奖励",
          name: " ",
          rule: "小概率获得",
          drawMode: "one",
          allowEmpty: true,
          items: [
            { id: "C1", name: "破戒僧", type: "奖励道具", quantity: "1", rarity: "epic", rate: 10, image: "assets/suxiangyang/C1.png" },
            { id: "C2", name: "狮子装", type: "奖励道具", quantity: "1", rarity: "epic", rate: 10, image: "assets/suxiangyang/C2.png" },
            { id: "C3", name: "神秘研磨剂", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 10, image: "assets/suxiangyang/C3.png" },
            { id: "C4", name: "武神极武功秘典箱", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.1, image: "assets/suxiangyang/C4.png" }
          ]
        },
      ]
    },
    {
      id: "normal_daily_01",
      category: "normal",
      name: "暂无数据",
      desc: "暂无数据",
      image: "assets/cases/normal_daily_01.jpg",
      items: [
        { id: "nd1", name: "暂无数据", type: "暂无数据", rarity: "common", rate: 40.0, image: "assets/items/nd1.jpg" },
        { id: "nd2", name: "暂无数据", type: "暂无数据", rarity: "uncommon", rate: 25.0, image: "assets/items/nd2.jpg" },
        { id: "nd3", name: "暂无数据", type: "暂无数据", rarity: "rare", rate: 17.0, image: "assets/items/nd3.jpg" },
        { id: "nd4", name: "暂无数据", type: "暂无数据", rarity: "epic", rate: 12.0, image: "assets/items/nd4.jpg" },
        { id: "nd5", name: "暂无数据", type: "暂无数据", rarity: "legendary", rate: 6.0, image: "assets/items/nd5.jpg" }
      ]
    }
  ]
};
