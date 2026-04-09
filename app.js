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

// 极稀有物品概率阈值（百分比）
const RARE_THRESHOLD = 0.01;

const state = {
  categories: [],
  cases: [],
  selectedCategoryId: "",
  selectedCaseId: "",
  inventory: new Map() // 改用 Map 存储：key = "name_type", value = { name, type, rarity, image, totalQuantity }
};

// 动画相关状态
let isAnimating = false;
let pendingResults = []; // 等待确认的开箱结果
let pendingShowoffResults = null; // 等待炫耀弹窗确认的结果 { results, rareItems }

// 根据开箱数量获取动画延迟时间（智能速度调整）
function getAnimationDelay(count) {
  if (count <= 10) return 200;
  if (count <= 30) return 150;
  if (count <= 100) return 100;
  if (count <= 500) return 80;
  return 40; // 500以上大幅加速
}

// Promise 版本的 setTimeout
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 显示特效浮窗
function showEffectModal(caseData, totalCount) {
  if (!elements.effectModal) {
    console.error("特效浮窗元素未找到");
    return;
  }
  elements.effectCaseName.textContent = caseData.name;
  elements.effectCaseImage.src = caseData.image || "assets/cases/default.jpg";
  elements.effectCaseDesc.textContent = caseData.desc || "";
  elements.effectRemaining.textContent = totalCount;
  elements.effectTotal.textContent = totalCount;
  elements.effectItemsList.innerHTML = "";
  elements.effectModal.classList.remove("hidden");
}

// 关闭特效浮窗
function hideEffectModal() {
  elements.effectModal.classList.add("hidden");
  elements.effectCaseImage.classList.remove("shaking");
  elements.cloudEffect.classList.remove("active");
  if (elements.sparkParticles) elements.sparkParticles.classList.remove("active");
  if (elements.openRingEffect) elements.openRingEffect.classList.remove("active");
}

// 播放单次开箱动画（增强版）
function playOpenAnimation() {
  // 箱子抖动
  elements.effectCaseImage.classList.remove("shaking");
  void elements.effectCaseImage.offsetWidth;
  elements.effectCaseImage.classList.add("shaking");

  // 云朵飘出
  elements.cloudEffect.classList.remove("active");
  void elements.cloudEffect.offsetWidth;
  elements.cloudEffect.classList.add("active");

  // 火花粒子效果
  if (elements.sparkParticles) {
    elements.sparkParticles.classList.remove("active");
    void elements.sparkParticles.offsetWidth;
    elements.sparkParticles.classList.add("active");
  }

  // 光环扩散效果
  if (elements.openRingEffect) {
    elements.openRingEffect.classList.remove("active");
    void elements.openRingEffect.offsetWidth;
    elements.openRingEffect.classList.add("active");
  }

  // 动画结束后移除类名
  setTimeout(() => {
    elements.effectCaseImage.classList.remove("shaking");
    elements.cloudEffect.classList.remove("active");
    if (elements.sparkParticles) elements.sparkParticles.classList.remove("active");
    if (elements.openRingEffect) elements.openRingEffect.classList.remove("active");
  }, 350);
}

// 添加物品到实时展示列表
function addEffectItem(item) {
  const rarityClass = item.rarity || "common";
  const itemEl = document.createElement("div");
  itemEl.className = `effect-item-mini ${rarityClass}`;
  itemEl.innerHTML = `<img src="${item.image || "assets/items/default.jpg"}" alt="${item.name}">`;

  elements.effectItemsList.appendChild(itemEl);

  // 保持最多显示 20 个物品，超出则移除最旧的
  const items = elements.effectItemsList.children;
  if (items.length > 20) {
    elements.effectItemsList.removeChild(items[0]);
  }

  // 滚动到最新物品
  elements.effectItemsList.scrollTop = elements.effectItemsList.scrollHeight;
}

// 更新剩余数量
function updateRemainingCount(count) {
  elements.effectRemaining.textContent = count;
}

// 禁用交互
function disableInteraction() {
  isAnimating = true;
  elements.openBtn.disabled = true;
  elements.clearInventoryBtn.disabled = true;
  elements.categorySelect.disabled = true;
  elements.caseSelect.disabled = true;
  elements.openCount.disabled = true;
  elements.openBtn.classList.add("opacity-50", "cursor-not-allowed");
  elements.clearInventoryBtn.classList.add("opacity-50", "cursor-not-allowed");
}

// 启用交互
function enableInteraction() {
  isAnimating = false;
  elements.openBtn.disabled = false;
  elements.clearInventoryBtn.disabled = false;
  elements.categorySelect.disabled = false;
  elements.caseSelect.disabled = false;
  elements.openCount.disabled = false;
  elements.openBtn.classList.remove("opacity-50", "cursor-not-allowed");
  elements.clearInventoryBtn.classList.remove("opacity-50", "cursor-not-allowed");
}

// 单次开箱计算
function openSingleCase(caseData) {
  const groups = getCaseGroups(caseData);
  if (!groups.length) return [];

  const results = [];
  groups.forEach((group) => {
    const picked = pickItemsFromGroup(group).map((reward) => ({
      ...reward,
      caseName: caseData.name
    }));
    results.push(...picked);
  });
  return results;
}

// 检测极稀有物品（概率 ≤ 0.01%）
function findRareItems(results) {
  return results.filter(item => Number(item.rate || 100) <= RARE_THRESHOLD);
}

// 显示炫耀弹窗
function showShowoffModal(rareItems) {
  if (!elements.showoffModal || !rareItems?.length) return;

  elements.showoffItems.innerHTML = "";

  rareItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "showoff-item-card";
    const rateText = Number(item.rate || 0).toFixed(4);
    card.innerHTML = `
      <img class="showoff-item-image" src="${item.image || "assets/items/default.jpg"}" alt="${item.name}">
      <div class="showoff-item-name">${item.name}</div>
      <div class="showoff-item-rate">概率: ${rateText}%</div>
    `;
    elements.showoffItems.appendChild(card);
  });

  elements.showoffModal.classList.remove("hidden");
}

// 隐藏炫耀弹窗
function hideShowoffModal() {
  if (!elements.showoffModal) return;
  elements.showoffModal.classList.add("hidden");
  elements.showoffItems.innerHTML = "";
}

// 处理结果存入库存并渲染
function processResults(results) {
  addToInventory(results);
  const saved = saveInventory();

  if (!saved) {
    removeFromInventory(results);
    elements.inventoryFullError.classList.remove("hidden");
    return false;
  }

  renderLatestResults(results);
  renderInventory();

  // 按钮动画效果
  elements.openBtn.classList.add("open-pulse");
  window.setTimeout(() => elements.openBtn.classList.remove("open-pulse"), 260);

  return true;
}

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
  inventoryCount: document.getElementById("inventoryCount"),
  // 特效相关元素
  effectToggle: document.getElementById("effectToggle"),
  effectModal: document.getElementById("effectModal"),
  effectCaseName: document.getElementById("effectCaseName"),
  effectCaseImage: document.getElementById("effectCaseImage"),
  effectCaseDesc: document.getElementById("effectCaseDesc"),
  effectRemaining: document.getElementById("effectRemaining"),
  effectTotal: document.getElementById("effectTotal"),
  effectItemsList: document.getElementById("effectItemsList"),
  cloudEffect: document.getElementById("cloudEffect"),
  sparkParticles: document.getElementById("sparkParticles"),
  openRingEffect: document.getElementById("openRingEffect"),
  effectConfirmBtnContainer: document.getElementById("effectConfirmBtnContainer"),
  effectConfirmBtn: document.getElementById("effectConfirmBtn"),
  // 炫耀弹窗相关元素
  showoffModal: document.getElementById("showoffModal"),
  showoffItems: document.getElementById("showoffItems"),
  showoffConfirmBtn: document.getElementById("showoffConfirmBtn")
};

async function init() {
  // 检查关键元素是否获取成功
  console.log("初始化开始...");
  console.log("openBtn:", elements.openBtn);
  console.log("effectToggle:", elements.effectToggle);
  console.log("effectModal:", elements.effectModal);

  if (!elements.openBtn) {
    console.error("开箱按钮未找到！");
    return;
  }

  loadInventory();
  await loadCaseData();
  initSelection();
  bindEvents();
  renderAll();
  console.log("初始化完成");
}

function loadInventory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // 兼容旧数据格式（数组），转换为 Map
      parsed.forEach((item) => {
        const key = `${item.name}_${item.type || ""}`;
        if (state.inventory.has(key)) {
          const existing = state.inventory.get(key);
          existing.totalQuantity += item.quantityAwarded ?? item.totalQuantity ?? 1;
        } else {
          state.inventory.set(key, {
            name: item.name,
            type: item.type || "",
            rarity: item.rarity,
            image: item.image,
            totalQuantity: item.quantityAwarded ?? item.totalQuantity ?? 1
          });
        }
      });
    } else if (typeof parsed === "object") {
      // 新格式（对象），直接转换为 Map
      Object.entries(parsed).forEach(([key, value]) => {
        state.inventory.set(key, value);
      });
    }
  } catch (err) {
    console.warn("读取库存失败，已重置。", err);
    state.inventory = new Map();
  }
}

function saveInventory() {
  try {
    // 转换为普通对象存储，更紧凑
    const obj = {};
    state.inventory.forEach((value, key) => {
      obj[key] = value;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    return true;
  } catch (err) {
    console.warn("库存存储失败，可能已达到浏览器存储上限。", err);
    return false;
  }
}

function isStorageFull() {
  try {
    const testKey = "_storage_test_";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return false;
  } catch (err) {
    return true;
  }
}

function getInventoryTotalCount() {
  let total = 0;
  state.inventory.forEach((item) => {
    total += item.totalQuantity;
  });
  return total;
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
  elements.effectConfirmBtn.addEventListener("click", handleEffectConfirm);
  elements.showoffConfirmBtn.addEventListener("click", handleShowoffConfirm);
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
  // 渲染完成后同步左侧箱子列表与右侧概率面板的高度
  syncCaseListHeight();
}

/**
 * 同步箱子列表高度与右侧概率面板高度
 * 让三个区域底部对齐，箱子可以显示更多
 */
function syncCaseListHeight() {
  // 获取三个区域的父容器
  const gridContainer = document.querySelector('section.grid');
  if (!gridContainer) return;

  // 获取三个 card-panel
  const panels = gridContainer.querySelectorAll('.card-panel');
  if (panels.length < 3) return;

  const leftPanel = panels[0];   // 左侧箱子选择
  const rightPanel = panels[2];  // 右侧概率说明

  // 先让内容自然渲染，获取右侧面板内容高度
  // 使用 requestAnimationFrame 确保 DOM 已更新
  requestAnimationFrame(() => {
    // 获取右侧面板的整体高度
    const rightPanelHeight = rightPanel.offsetHeight;

    // 计算左侧面板可用高度：右侧面板高度 - 左侧标题和下拉框的高度
    const leftHeader = leftPanel.querySelector('h2');
    const leftSelects = leftPanel.querySelector('.space-y-3');

    // 左侧固定部分高度：标题 + 下拉框区域 + margin
    const fixedHeight = (leftHeader?.offsetHeight || 0) +
                        (leftSelects?.offsetHeight || 0) +
                        24; // margin 和 padding 的估算值

    // 计算箱子列表可用高度
    const availableHeight = rightPanelHeight - fixedHeight;

    // 设置最小高度为 300px（约显示4个箱子），最大不超过可用高度
    // 如果可用高度较大，可以显示更多箱子
    const minHeight = 300;
    const maxHeight = Math.max(minHeight, availableHeight);

    elements.caseList.style.maxHeight = `${maxHeight}px`;
  });
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
  const currentCases = getCasesByCategory(state.selectedCategoryId);
  if (!currentCases.length) return;

  const maxDisplay = 10;
  const displayCases = currentCases.slice(0, maxDisplay);
  const hasMore = currentCases.length > maxDisplay;

  displayCases.forEach((box) => {
    const isActive = box.id === state.selectedCaseId;
    const item = document.createElement("div");
    item.className = `case-item ${isActive ? "active" : ""}`;
    item.dataset.caseId = box.id;
    item.innerHTML = `
      <div class="case-mini-layout">
        <img class="case-mini-thumb" src="${box.image || "assets/cases/default.jpg"}" alt="${box.name}">
        <div>
          <div class="font-semibold">${box.name}</div>
          <div class="mt-1 text-xs text-slate-400">${box.desc}</div>
        </div>
      </div>
    `;
    item.addEventListener("click", () => {
      state.selectedCaseId = box.id;
      renderAll();
    });
    elements.caseList.appendChild(item);
  });

  if (hasMore) {
    const hint = document.createElement("div");
    hint.className = "mt-2 text-xs text-slate-500 text-center";
    hint.textContent = `当前分类共 ${currentCases.length} 个箱子，下拉框可查看更多`;
    elements.caseList.appendChild(hint);
  }
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

async function handleOpenCase() {
  // 如果正在动画中，不允许再次点击
  if (isAnimating) return;

  const selected = getSelectedCase();
  if (!selected) {
    console.warn("未选择箱子");
    return;
  }
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

  // 检查是否开启特效
  const effectEnabled = elements.effectToggle && elements.effectToggle.checked;

  console.log("开箱触发，特效开关:", effectEnabled, "开箱数量:", openTimes);

  try {
    if (effectEnabled) {
      // 带动画的开箱流程
      await runEffectOpening(selected, openTimes);
    } else {
      // 原有即时开箱逻辑
      runInstantOpening(selected, openTimes);
    }
  } catch (err) {
    console.error("开箱出错:", err);
    hideEffectModal();
    enableInteraction();
  }
}

// 带动画的开箱流程
async function runEffectOpening(caseData, count) {
  const delay = getAnimationDelay(count);
  const results = [];

  // 隐藏确定按钮
  elements.effectConfirmBtnContainer.classList.add("hidden");

  showEffectModal(caseData, count);
  disableInteraction();

  for (let i = count; i > 0; i--) {
    // 计算单次开箱结果
    const singleResult = openSingleCase(caseData);
    results.push(...singleResult);

    // 更新 UI
    updateRemainingCount(i - 1);
    singleResult.forEach(item => addEffectItem(item));

    // 播放动画
    playOpenAnimation();

    // 等待动画完成
    await sleep(delay);
  }

  // 存储待确认的结果
  pendingResults = results;

  // 显示确定按钮
  elements.effectConfirmBtnContainer.classList.remove("hidden");
}

// 处理确定按钮点击
function handleEffectConfirm() {
  if (pendingResults.length === 0) return;

  const results = pendingResults;
  pendingResults = [];

  // 关闭浮窗
  hideEffectModal();

  // 检测是否有极稀有物品
  const rareItems = findRareItems(results);

  if (rareItems.length > 0) {
    // 存储结果，等待炫耀弹窗确认后再处理
    pendingShowoffResults = { results, rareItems };
    showShowoffModal(rareItems);
    // 不恢复交互，等待炫耀弹窗确认
  } else {
    // 直接处理结果
    processResults(results);
    enableInteraction();
  }
}

// 处理炫耀弹窗确认
function handleShowoffConfirm() {
  if (!pendingShowoffResults) return;

  const { results } = pendingShowoffResults;
  pendingShowoffResults = null;

  hideShowoffModal();

  // 处理结果
  processResults(results);
  enableInteraction();
}

// 即时开箱流程（原有逻辑）
function runInstantOpening(caseData, count) {
  const groups = getCaseGroups(caseData);
  if (!groups.length) return;

  const results = [];
  for (let i = 0; i < count; i += 1) {
    groups.forEach((group) => {
      const picked = pickItemsFromGroup(group).map((reward) => ({
        ...reward,
        caseName: caseData.name
      }));
      results.push(...picked);
    });
  }

  // 检测是否有极稀有物品
  const rareItems = findRareItems(results);

  if (rareItems.length > 0) {
    // 存储结果，显示炫耀弹窗
    pendingShowoffResults = { results, rareItems };
    disableInteraction();
    showShowoffModal(rareItems);
    return; // 等待确认后再存入库存
  }

  // 原有流程：直接存入库存
  addToInventory(results);
  const saved = saveInventory();

  if (!saved) {
    elements.inventoryFullError.classList.remove("hidden");
    removeFromInventory(results);
    return;
  }

  renderLatestResults(results);
  renderInventory();
  elements.openBtn.classList.add("open-pulse");
  window.setTimeout(() => elements.openBtn.classList.remove("open-pulse"), 260);
}

// 添加结果到库存
function addToInventory(results) {
  results.forEach((item) => {
    const key = `${item.name}_${item.type || ""}`;
    const quantity = item.quantityAwarded ?? 1;
    if (state.inventory.has(key)) {
      state.inventory.get(key).totalQuantity += quantity;
    } else {
      state.inventory.set(key, {
        name: item.name,
        type: item.type || "",
        rarity: item.rarity,
        image: item.image,
        totalQuantity: quantity
      });
    }
  });
}

// 从库存移除（用于保存失败时回滚）
function removeFromInventory(results) {
  results.forEach((item) => {
    const key = `${item.name}_${item.type || ""}`;
    const quantity = item.quantityAwarded ?? 1;
    if (state.inventory.has(key)) {
      const existing = state.inventory.get(key);
      existing.totalQuantity -= quantity;
      if (existing.totalQuantity <= 0) {
        state.inventory.delete(key);
      }
    }
  });
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

  if (!state.inventory.size) {
    elements.inventoryCount.className = "text-sm text-slate-400";
    elements.inventoryCount.textContent = "总计 0 种，0 件";
    elements.inventoryList.innerHTML =
      '<p class="text-sm text-slate-400">库存为空，快去开箱试试手气吧。</p>';
    return;
  }

  const items = Array.from(state.inventory.values());
  const totalCount = getInventoryTotalCount();

  elements.inventoryCount.className = "text-sm text-slate-400";
  elements.inventoryCount.textContent = `总计 ${items.length} 种，${totalCount} 件`;

  items.slice(0, 120).forEach((item) => {
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
    const displayQuantity = showCount ? item.totalQuantity : (item.quantityAwarded ?? item.quantityText ?? 1);
    if (showCount && displayQuantity > 1) {
      quantityDisplay = `<span class="item-count-badge">x${displayQuantity}</span>`;
      card.classList.add("item-card-merged");
    }
    card.innerHTML = `
      ${quantityDisplay}
      <div class="text-xs text-slate-400">${item.caseName || "未知宝箱"}</div>
      <img class="item-thumb ${rarityMeta ? rarityMeta.borderClass : ""}" src="${item.image || "assets/items/default.jpg"}" alt="${item.name}">
      <h4 class="mt-2 font-semibold ${rarityMeta ? rarityMeta.className : ""}">${item.name}</h4>
      <div class="mt-1 text-xs text-slate-400">${item.type || "未知类型"} · x${displayQuantity}</div>
      <div class="mt-1 text-xs text-slate-500">${item.groupCode ? `${item.groupCode}组` : ""} ${item.groupRule || ""}</div>
      <div class="mt-1 text-xs text-slate-500">${item.createdAt || ""}</div>
    `;
  }
  return card;
}

function handleClearInventory() {
  state.inventory = new Map();
  saveInventory();
  elements.inventoryFullError.classList.add("hidden");
  renderLatestResults([]);
  renderInventory();
}

init();
