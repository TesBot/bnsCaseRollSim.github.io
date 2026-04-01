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
  }
];