window.CASES_DATA = {
  categories: [
    { id: "mall", name: "商城宝箱" },
    { id: "dungeon", name: "副本箱子" },
    { id: "normal", name: "其他掉落" }
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
      name: "武神极武功秘典箱",
      desc: "武神塔掉落",
      image: "assets/jiwugong/jiwugongxiang.png",
      itemGroups: [
        {
          code: "技能书",
          name: " ",
          rule: "概率获得",
          drawMode: "one",
          allowEmpty: false,
          items: [
            { id: "A1", name: "[剑士][洪门2式][手镯专用]上乘武功秘典[火龙连斩：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/jianshi.png"},
            { id: "A2", name: "[剑士][洪门3式][手镯专用]上乘武功秘典[雷龙斩：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/jianshi.png"},
            { id: "A3", name: "[拳师][洪门2式][项链专用]上乘武功秘典[暴拳：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/quanshi.png"},
            { id: "A4", name: "[拳师][洪门3式][项链专用]上乘武功秘典[猛虎掌：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/quanshi.png"},
            { id: "A5", name: "[召唤师][洪门2式][戒指专用]上乘武功秘典[大黄蜂：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/zhaohuan.png"},
            { id: "A6", name: "[召唤师][洪门3式][戒指专用]上乘武功秘典[向日葵：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/zhaohuan.png"},
            { id: "A7", name: "[气功师][洪门2式][戒指专用]上乘武功秘典[爆裂炎炮：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/qigongshi.png"},
            { id: "A8", name: "[气功师][洪门3式][戒指专用]上乘武功秘典[冰河神掌：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/qigongshi.png"},
            { id: "A9", name: "[力士][洪门1式][耳环专用]上乘武功秘典[毁灭：极迅集]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/lishi.png"},
            { id: "A10", name: "[力士][洪门3式][耳环专用]上乘武功秘典[歼灭：极] ", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/lishi.png"},
            { id: "A11", name: "[刺客][洪门1式][戒指专用]上乘武功秘典[刺心：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/cike.png"},
            { id: "A12", name: "[刺客][洪门2式][戒指专用]上乘武功秘典[雷殛：极] ", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/cike.png"},
            { id: "A13", name: "[灵剑士][洪门1式][手镯专用]上乘武功秘典[一闪：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/lingjianshi.png"},
            { id: "A14", name: "[灵剑士][洪门2式][手镯专用]上乘武功秘典[雷炎闪：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/lingjianshi.png"},
            { id: "A15", name: "[咒术师][洪门1式][戒指专用]上乘武功秘典[次元弹：极] ", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/zhoushu.png"},
            { id: "A16", name: "[咒术师][洪门2式][戒指专用]上乘武功秘典[夜叉：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/zhoushu.png"},
            { id: "A17", name: "[剑士][洪门1式][手镯专用]上乘武功秘典[夺命剑：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/jianshi.png"},
            { id: "A18", name: "[剑士][洪门2式][手镯专用]上乘武功秘典[火龙连斩：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/jianshi.png"},
            { id: "A19", name: "[剑士][洪门3式][手镯专用]上乘武功秘典[雷龙斩：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/jianshi.png"},
            { id: "A20", name: "[拳师][洪门2式][项链专用]上乘武功秘典[暴拳：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/quanshi.png"},
            { id: "A21", name: "[召唤师][洪门1式][戒指专用]上乘武功秘典[马蜂：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/zhaohuan.png"},
            { id: "A22", name: "[气功师][洪门1式][戒指专用]上乘武功秘典[炎龙啸：极速] ", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/qigongshi.png"},
            { id: "A23", name: "[力士][洪门1式][耳环专用]上乘武功秘典[毁灭：极速减] ", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/lishi.png"},
            { id: "A24", name: "[刺客][洪门3式][戒指专用]上乘武功秘典[乱刀：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/cike.png"},
            { id: "A25", name: "[灵剑士][洪门1式][手镯专用]上乘武功秘典[一闪：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/lingjianshi.png"},
            { id: "A26", name: "[灵剑士][洪门2式][手镯专用]上乘武功秘典[雷炎闪：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/lingjianshi.png"},
            { id: "A27", name: "[灵剑士][洪门3式][手镯专用]上乘武功秘典[风烟斩：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/lingjianshi.png"},
            { id: "A28", name: "[魔枪士][洪门1式][项链专用]上乘武功秘典[魔：千里一枪：极]", type: "技能书", quantity: "1", rarity: "rare", rate: (1/28)*100, image: "assets/jiwugong/moqiangshi.png"}
          ]
        }
      ]
    },
    {
      id: "dungeon_relic_02",
      category: "dungeon",
      name: "武神的试炼礼物箱",
      desc: "武神塔掉咯",
      image: "assets/wushendeshilianliwuxiang/wushendeshilianliwuxiang.png",
      itemGroups: [
        {
          code: "奖励",
          name: " ",
          rule: "确定获得",
          drawMode: "all",
          allowEmpty: false,
          items: [
            { id: "A1", name: "黯淡的天下四杰修炼之证", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 100, image: "assets/wushendeshilianliwuxiang/A1.png" },
            { id: "A2", name: "特制野猪肉饺子汤", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 100, image: "assets/wushendeshilianliwuxiang/A2.png" }
          ]
        },
        {
          code: "奖励",
          name: " ",
          rule: "概率获得",
          drawMode: "one",
          allowEmpty: false,
          items: [
            { id: "B1", name: "仙幻岛外形币", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 80, image: "assets/wushendeshilianliwuxiang/B1.png" },
            { id: "B2", name: "仙幻神功牌碎片", type: "奖励道具", quantity: "1", rarity: "epic", rate: 20, image: "assets/wushendeshilianliwuxiang/B2.png" }
          ]
        },
        {
          code: "奖励",
          name: " ",
          rule: "概率获得",
          drawMode: "one",
          allowEmpty: false,
          items: [
            { id: "C1", name: "[仙幻]冰库成长护符", type: "奖励道具", quantity: "1", rarity: "uncommon", rate: 80, image: "assets/wushendeshilianliwuxiang/C1.png" },
            { id: "C2", name: "耀眼仙幻岛图画箱", type: "奖励道具", quantity: "1", rarity: "rare", rate: 10, image: "assets/wushendeshilianliwuxiang/C2.png" },
            { id: "C3", name: "耀眼的印章箱", type: "奖励道具", quantity: "1", rarity: "rare", rate: 9, image: "assets/wushendeshilianliwuxiang/C3.png" },
            { id: "C4", name: "耀眼的特殊印章箱", type: "奖励道具", quantity: "1", rarity: "rare", rate: 0.6, image: "assets/wushendeshilianliwuxiang/C4.png" },
            { id: "C5", name: "炽热的印章箱", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.3, image: "assets/wushendeshilianliwuxiang/C5.png" },
            { id: "C6", name: "炽热的特殊印章箱", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.1, image: "assets/wushendeshilianliwuxiang/C6.png" }
          ]
        },
        {
          code: "稀有奖励",
          name: " ",
          rule: "极小概率获得",
          drawMode: "one",
          allowEmpty: true,
          items: [
            { id: "D1", name: "秦义绝", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.005, image: "assets/wushendeshilianliwuxiang/D1.png" },
            { id: "D2", name: "力王 洪玄公", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.005, image: "assets/wushendeshilianliwuxiang/D2.png" },
            { id: "D3", name: "黑风巫祝 孙蟠", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.002, image: "assets/wushendeshilianliwuxiang/D3.png" },
            { id: "D4", name: "风帝国皇帝 王婉茹", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.002, image: "assets/wushendeshilianliwuxiang/D4.png" },
            { id: "D5", name: "孽缘魔轮 烛魔王", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.001, image: "assets/wushendeshilianliwuxiang/D5.png" },
            { id: "D6", name: "黑龙教主 震天魔王", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.001, image: "assets/wushendeshilianliwuxiang/D6.png" },
            { id: "D7", name: "灿烂的印章箱", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.03, image: "assets/wushendeshilianliwuxiang/D7.png"},
            { id: "D8", name: "灿烂的组合印章箱", type: "奖励道具", quantity: "1", rarity: "legendary", rate: 0.01, image: "assets/wushendeshilianliwuxiang/D8.png" },
            { id: "D9", name: "武神极武功秘典箱", type: "奖励道具", quantity: "1", rarity: "epic", rate: 0.001, image: "assets/wushendeshilianliwuxiang/D9.png" }
          ]
        }
      ]
    },
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
  ]
};
