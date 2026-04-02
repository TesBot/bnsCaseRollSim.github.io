window.NORMAL_CASES = [
  {
    id: "normal_daily_01",
    category: "normal",
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
        rule: "概率获得",
        drawMode: "one",
        allowEmpty: true,
        items: [
          { id: "C1", name: "破戒僧", type: "奖励道具", quantity: "1", rarity: "epic", rate: 10, image: "assets/suxiangyang/C1.png" },
          { id: "C2", name: "狮子装", type: "奖励道具", quantity: "1", rarity: "epic", rate: 10, image: "assets/suxiangyang/C2.png" },
          { id: "C3", name: "神秘研磨剂", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 10, image: "assets/suxiangyang/C3.png" },
          { id: "C4", name: "武神极武功秘典箱", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.1, image: "assets/suxiangyang/C4.png" }
        ]
      }
    ]
  },
  {
    id: "normal_daily_02",
    category: "normal",
    name: "仙幻大鱼坊成长支援箱",
    desc: "钓鱼硬币兑换",
    image: "assets/xianhuandayufangchengzhangzhiyuanxiang/xianhuandayufangchengzhangzhiyuanxiang.png",
    itemGroups: [
      {
        code: "奖励",
        name: " ",
        rule: "确定获得",
        drawMode: "all",
        allowEmpty: false,
        items: [
          { id: "A1", name: "特制牛肉盖饭", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 100, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/A1.png" },
          { id: "A2", name: "超大型水晶兰恢复药", type: "奖励道具", quantity: "1~2", rarity: "uncommon", rate: 100, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/A2.png" }
        ]
      },
      {
        code: "奖励",
        name: " ",
        rule: "概率获得",
        drawMode: "one",
        allowEmpty: true,
        items: [
          { id: "B1", name: "宝玉粉末(5个)", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: (1/3)*100, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/B1.png" },
          { id: "B2", name: "武魂粉末(5个)", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: (1/3)*100, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/B2.png" },
          { id: "B3", name: "灵木碎片(5个)", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: (1/3)*100, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/B3.png" }
        ]
      },
      {
        code: "奖励",
        name: " ",
        rule: "概率获得",
        drawMode: "one",
        allowEmpty: true,
        items: [
          { id: "C1", name: "耀眼的真言珠箱", type: "奖励道具", quantity: "1", rarity: "rare", rate: 4.5, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/C1.png" },
          { id: "C2", name: "炽热的真言珠箱", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.5, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/C2.png" },
          { id: "C3", name: "仙幻岛图画箱", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 20, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/C3.png" },
          { id: "C4", name: "应急修理工具", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 75, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/C4.png" }
        ]
      },
      {
        code: "稀有奖励",
        name: " ",
        rule: "小概率获得",
        drawMode: "one",
        allowEmpty: true,
        items: [
          { id: "D1", name: "剑灵兜帽", type: "奖励道具", quantity: "1", rarity: "epic", rate: 1, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/D1.png" },
          { id: "D2", name: "剑灵兜帽头饰", type: "奖励道具", quantity: "1", rarity: "epic", rate: 1, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/D2.png" },
          { id: "D3", name: "灿烂的真言珠箱", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.1, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/D3.png" },
          { id: "D4", name: "风帝国皇帝 王婉茹", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.01, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/D4.png" },
          { id: "D5", name: "黑风巫祝 孙蟠", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.01, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/D5.png" },
          { id: "D6", name: "秦义绝", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.01, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/D6.png" },
          { id: "D7", name: "力王 洪玄公", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.01, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/D7.png" },
          { id: "D8", name: "[仙幻]武神塔极武功秘典箱", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.0001, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/D8.png" },
          { id: "D9", name: "[仙幻]极限挑战极武功秘典箱", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.0001, image: "assets/xianhuandayufangchengzhangzhiyuanxiang/D9.png" }
        ]
      }
    ]
  }
];