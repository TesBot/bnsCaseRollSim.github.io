"use strict";

/**
 * 稀有度配置：用于样式映射
 */
const rarityConfig = [
  { key: "common", label: "白色", className: "text-rarity-common", borderClass: "rarity-border-common" },
  { key: "uncommon", label: "绿色", className: "text-rarity-uncommon", borderClass: "rarity-border-uncommon" },
  { key: "rare", label: "蓝色", className: "text-rarity-rare", borderClass: "rarity-border-rare" },
  { key: "epic", label: "紫色", className: "text-rarity-epic", borderClass: "rarity-border-epic" },
  {
    key: "legendary",
    label: "橙色",
    className: "text-rarity-legendary",
    borderClass: "rarity-border-legendary"
  }
];

const STORAGE_KEY = "bns_case_inventory_v1";

const state = {
  categories: [],
  cases: [],
  selectedCategoryId: "",
  selectedCaseId: "",
  inventory: loadInventory()
};

const elements = {
  categorySelect: document.getElementById("categorySelect"),
  caseSelect: document.getElementById("caseSelect"),
  caseList: document.getElementById("caseList"),
  selectedCaseDesc: document.getElementById("selectedCaseDesc"),
  openCount: document.getElementById("openCount"),
  openCountError: document.getElementById("openCountError"),
  inventoryFullError: document.getElementById("inventoryFullError"),
  openBtn: document.getElementById("openBtn"),
  clearInventoryBtn: document.getElementById("clearInventoryBtn"),
  latestResults: document.getElementById("latestResults"),
  rates: document.getElementById("rates"),
  ratesCaseName: document.getElementById("ratesCaseName"),
  inventoryList: document.getElementById("inventoryList"),
  inventoryCount: document.getElementById("inventoryCount")
};

async function init() {
  await loadCaseData();
  initSelection();
  bindEvents();
  renderAll();
}

function loadInventory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("读取库存失败，已重置。", err);
    return [];
  }
}

function saveInventory() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.inventory));
    return true;
  } catch (err) {
    console.warn("库存存储失败，可能已达到浏览器存储上限。", err);
    return false;
  }
}

function isStorageFull() {
  try {
    // 尝试写入一个测试数据来检测是否还有空间
    const testKey = "_storage_test_";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return false;
  } catch (err) {
    return true;
  }
}

async function loadCaseData() {
  try {
    const data = window.CASES_DATA || {};
    state.categories = Array.isArray(data.categories) ? data.categories : [];
    state.cases = Array.isArray(data.cases) ? data.cases : [];
  } catch (error) {
    console.error("cases-data.js 读取失败。", error);
    elements.caseList.innerHTML =
      '<p class="text-sm text-rose-300">宝箱数据读取失败，请检查 `data/cases-data.js`。</p>';
  }
}

function initSelection() {
  if (!state.categories.length || !state.cases.length) return;
  state.selectedCategoryId = state.categories[0].id;
  const firstCase = getCasesByCategory(state.selectedCategoryId)[0];
  state.selectedCaseId = firstCase ? firstCase.id : state.cases[0].id;
}

function bindEvents() {
  elements.categorySelect.addEventListener("change", () => {
    state.selectedCategoryId = elements.categorySelect.value;
    const firstCase = getCasesByCategory(state.selectedCategoryId)[0];
    state.selectedCaseId = firstCase ? firstCase.id : "";
    renderAll();
  });

  elements.caseSelect.addEventListener("change", () => {
    state.selectedCaseId = elements.caseSelect.value;
    renderAll();
  });

  elements.openCount.addEventListener("input", () => {
    elements.openCountError.classList.add("hidden");
    elements.inventoryFullError.classList.add("hidden");
  });

  elements.openBtn.addEventListener("click", handleOpenCase);
  elements.clearInventoryBtn.addEventListener("click", handleClearInventory);
}

function getSelectedCase() {
  return state.cases.find((item) => item.id === state.selectedCaseId) || null;
}

function getCasesByCategory(categoryId) {
  return state.cases.filter((box) => box.category === categoryId);
}

function renderAll() {
  renderCategorySelect();
  renderCaseSelect();
  renderCaseList();
  updateCurrentCaseInfo();
  renderRatePanel();
  renderInventory();
}

function renderCategorySelect() {
  elements.categorySelect.innerHTML = state.categories
    .map((category) => `<option value="${category.id}">${category.name}</option>`)
    .join("");
  elements.categorySelect.value = state.selectedCategoryId;
}

function renderCaseSelect() {
  const currentCases = getCasesByCategory(state.selectedCategoryId);
  elements.caseSelect.innerHTML = currentCases
    .map((box) => `<option value="${box.id}">${box.name}</option>`)
    .join("");
  if (!currentCases.find((box) => box.id === state.selectedCaseId) && currentCases.length) {
    state.selectedCaseId = currentCases[0].id;
  }
  elements.caseSelect.value = state.selectedCaseId;
}

function renderCaseList() {
  elements.caseList.innerHTML = "";
  const selected = getSelectedCase();
  if (!selected) return;
  elements.caseList.innerHTML = `
    <div class="case-item active">
      <div class="case-mini-layout">
        <img class="case-mini-thumb" src="${selected.image || "assets/cases/default.jpg"}" alt="${selected.name}">
        <div>
          <div class="font-semibold">${selected.name}</div>
          <div class="mt-1 text-xs text-slate-400">${selected.desc}</div>
          <div class="mt-1 text-xs text-slate-500">分类：${getCategoryName(selected.category)}</div>
        </div>
      </div>
    </div>
  `;
}

function updateCurrentCaseInfo() {
  const selected = getSelectedCase();
  if (!selected) {
    elements.selectedCaseDesc.textContent = "未选择宝箱";
    return;
  }
  elements.selectedCaseDesc.textContent = `当前宝箱：${selected.name}（${getCategoryName(selected.category)}）- ${selected.desc}`;
}

function renderRatePanel() {
  const selected = getSelectedCase();
  if (!selected) {
    elements.ratesCaseName.textContent = "当前显示：无";
    elements.rates.innerHTML = "";
    return;
  }
  elements.ratesCaseName.textContent = `当前显示：${selected.name}`;
  const groups = getCaseGroups(selected);
  elements.rates.innerHTML = groups
    .map((group) => {
      const totalRate = group.items.reduce((sum, item) => sum + Number(item.rate || 0), 0);
      const rows = group.items
        .map((item) => {
          const rarityMeta = rarityConfig.find((r) => r.key === item.rarity);
          const quantityText = item.quantity ? ` (${item.quantity})` : "";
          return `
          <div class="rate-row">
            <span class="${rarityMeta ? rarityMeta.className : ""}">${item.name}${quantityText}</span>
            <strong>${Number(item.rate || 0).toFixed(4)}%</strong>
          </div>
        `;
        })
        .join("");
      return `
        <div class="mb-3 rounded-lg border border-slate-800 p-2">
          <div class="mb-2 text-xs text-slate-300">
            ${group.code} · ${group.name || "未命名分组"} · ${group.rule || ""} · 总概率 ${totalRate.toFixed(4)}%
          </div>
          ${rows}
        </div>
      `;
    })
    .join("");
}

function getCaseGroups(box) {
  if (Array.isArray(box.itemGroups) && box.itemGroups.length) {
    return box.itemGroups;
  }
  if (Array.isArray(box.items) && box.items.length) {
    return [
      {
        code: "DEFAULT",
        name: "默认分组",
        rule: "按概率获得其中 1 种",
        drawMode: "one",
        allowEmpty: false,
        items: box.items
      }
    ];
  }
  return [];
}

function pickItemByRate(items) {
  if (!items.length) return {};
  const total = items.reduce((sum, item) => sum + Number(item.rate || 0), 0);
  if (total <= 0) return items[Math.floor(Math.random() * items.length)];

  const roll = Math.random() * total;
  let acc = 0;
  for (const item of items) {
    acc += Number(item.rate || 0);
    if (roll <= acc) return item;
  }
  return items[items.length - 1];
}

function pickItemsFromGroup(group) {
  const mode = group.drawMode || "one";
  const items = Array.isArray(group.items) ? group.items : [];
  if (!items.length) return [];

  if (mode === "all") {
    return items.map((item) => buildReward(item, group));
  }

  const totalRate = items.reduce((sum, item) => sum + Number(item.rate || 0), 0);
  if (group.allowEmpty && totalRate < 100) {
    const emptyRate = 100 - totalRate;
    const roll = Math.random() * 100;
    if (roll < emptyRate) return [];
  }
  const winner = pickItemByRate(items);
  return winner ? [buildReward(winner, group)] : [];
}

function buildReward(item, group) {
  return {
    ...item,
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    groupCode: group.code || "",
    groupRule: group.rule || "",
    quantityText: normalizeQuantity(item.quantity),
    quantityAwarded: rollQuantity(item.quantity),
    createdAt: new Date().toLocaleString("zh-CN")
  };
}

function normalizeQuantity(quantity) {
  if (quantity === undefined || quantity === null || quantity === "") return "1";
  return String(quantity);
}

function rollQuantity(quantity) {
  const raw = normalizeQuantity(quantity);
  if (/^\d+$/.test(raw)) return Number(raw);
  const rangeMatch = raw.match(/^(\d+)\s*~\s*(\d+)$/);
  if (!rangeMatch) return raw;
  const min = Number(rangeMatch[1]);
  const max = Number(rangeMatch[2]);
  if (max < min) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCategoryName(categoryId) {
  const category = state.categories.find((item) => item.id === categoryId);
  return category ? category.name : categoryId;
}

function handleOpenCase() {
  const selected = getSelectedCase();
  if (!selected) return;
  const count = Number(elements.openCount.value);

  // 验证输入是否超过最大值
  if (count > 1000) {
    elements.openCountError.classList.remove("hidden");
    return;
  }

  // 验证存储是否已满
  if (isStorageFull()) {
    elements.inventoryFullError.classList.remove("hidden");
    return;
  }

  const openTimes = Number.isFinite(count) && count > 0 ? Math.min(1000, count) : 1;
  const groups = getCaseGroups(selected);
  if (!groups.length) return;

  const results = [];
  for (let i = 0; i < openTimes; i += 1) {
    groups.forEach((group) => {
      const picked = pickItemsFromGroup(group).map((reward) => ({
        ...reward,
        caseName: selected.name
      }));
      results.push(...picked);
    });
  }

  state.inventory = [...results, ...state.inventory];
  const saved = saveInventory();

  // 如果保存失败，提示用户
  if (!saved) {
    elements.inventoryFullError.classList.remove("hidden");
    state.inventory = state.inventory.slice(results.length); // 回滚
    return;
  }

  renderLatestResults(results);
  renderInventory();
  elements.openBtn.classList.add("open-pulse");
  window.setTimeout(() => elements.openBtn.classList.remove("open-pulse"), 260);
}

function renderLatestResults(results) {
  elements.latestResults.innerHTML = "";
  if (!results.length) return;

  // 合并相同物品（仅按名称+类型分组，不同分组的同名物品也合并）
  const mergedMap = new Map();
  results.forEach((item) => {
    const key = `${item.name}_${item.type || ""}`;
    if (mergedMap.has(key)) {
      const existing = mergedMap.get(key);
      existing.count += 1;
      existing.totalQuantity += item.quantityAwarded ?? 1;
    } else {
      mergedMap.set(key, {
        ...item,
        count: 1,
        totalQuantity: item.quantityAwarded ?? 1
      });
    }
  });

  const mergedItems = Array.from(mergedMap.values());
  mergedItems.forEach((item) => {
    const card = createItemCard(item, true);
    elements.latestResults.appendChild(card);
  });
}

function renderInventory() {
  elements.inventoryList.innerHTML = "";

  if (!state.inventory.length) {
    elements.inventoryCount.className = "text-sm text-slate-400";
    elements.inventoryCount.textContent = "总计 0 种，0 件";
    elements.inventoryList.innerHTML =
      '<p class="text-sm text-slate-400">库存为空，快去开箱试试手气吧。</p>';
    return;
  }

  // 合并相同物品（仅按名称+类型分组，不同分组的同名物品也合并）
  const mergedMap = new Map();
  state.inventory.forEach((item) => {
    const key = `${item.name}_${item.type || ""}`;
    if (mergedMap.has(key)) {
      const existing = mergedMap.get(key);
      existing.count += 1;
      existing.totalQuantity += item.quantityAwarded ?? 1;
    } else {
      mergedMap.set(key, {
        ...item,
        count: 1,
        totalQuantity: item.quantityAwarded ?? 1
      });
    }
  });

  const mergedItems = Array.from(mergedMap.values());

  elements.inventoryCount.className = "text-sm text-slate-400";
  elements.inventoryCount.textContent = `总计 ${mergedItems.length} 种，${state.inventory.length} 件`;

  mergedItems.slice(0, 120).forEach((item) => {
    const card = createItemCard(item, true, true);
    elements.inventoryList.appendChild(card);
  });
}

function createItemCard(item, showCount = false, isInventory = false) {
  const rarityMeta = rarityConfig.find((rarity) => rarity.key === item.rarity);
  const card = document.createElement("article");
  card.className = isInventory ? "item-card-mini" : "item-card";

  if (isInventory) {
    // 库存物品：图标下方显示总数量（加粗高亮），名字完整显示
    card.innerHTML = `
      <img class="item-thumb-mini ${rarityMeta ? rarityMeta.borderClass : ""}" src="${item.image || "assets/items/default.jpg"}" alt="${item.name}">
      <div class="mt-1 text-sm font-bold ${rarityMeta ? rarityMeta.className : ""}">x${item.totalQuantity}</div>
      <h4 class="mt-1 text-xs font-semibold ${rarityMeta ? rarityMeta.className : ""}">${item.name}</h4>
    `;
  } else {
    // 开箱结果：右上角显示数量徽章
    let quantityDisplay = "";
    if (showCount && item.count > 1) {
      quantityDisplay = `<span class="item-count-badge">x${item.count}</span>`;
      card.classList.add("item-card-merged");
    }
    card.innerHTML = `
      ${quantityDisplay}
      <div class="text-xs text-slate-400">${item.caseName || "未知宝箱"}</div>
      <img class="item-thumb ${rarityMeta ? rarityMeta.borderClass : ""}" src="${item.image || "assets/items/default.jpg"}" alt="${item.name}">
      <h4 class="mt-2 font-semibold ${rarityMeta ? rarityMeta.className : ""}">${item.name}</h4>
      <div class="mt-1 text-xs text-slate-400">${item.type || "未知类型"} · x${showCount ? item.totalQuantity : (item.quantityAwarded ?? item.quantityText ?? 1)}</div>
      <div class="mt-1 text-xs text-slate-500">${item.groupCode ? `${item.groupCode}组` : ""} ${item.groupRule || ""}</div>
      <div class="mt-1 text-xs text-slate-500">${item.createdAt || ""}</div>
    `;
  }
  return card;
}

function handleClearInventory() {
  state.inventory = [];
  saveInventory();
  elements.inventoryFullError.classList.add("hidden");
  renderLatestResults([]);
  renderInventory();
}

init();
