// 分类配置
window.CASES_DATA = {
  categories: [
    { id: "mall", name: "商城宝箱" },
    { id: "dungeon", name: "副本箱子" },
    { id: "normal", name: "其他掉落" }
  ],
  cases: [
    ...(window.MALL_CASES || []),
    ...(window.DUNGEON_CASES || []),
    ...(window.NORMAL_CASES || [])
  ]
};