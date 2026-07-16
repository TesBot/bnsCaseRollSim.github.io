// 分类配置
window.CASES_DATA = {
  categories: [
    { id: "mall", name: "商城宝箱" },
    { id: "mall_expired", name: "商城宝箱-已过期" },
    { id: "dungeon", name: "副本箱子" },
    { id: "dungeon_expired", name: "副本箱子-已过期" },
    { id: "normal", name: "其他掉落" },
    { id: "normal_expired", name: "其他掉落-已过期" }
  ],
  cases: [
    ...(window.MALL_CASES || []),
    ...(window.DUNGEON_CASES || []),
    ...(window.NORMAL_CASES || [])
  ]
};