const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const categoryList = document.getElementById("categoryList");
const langToggle = document.getElementById("langToggle");

const foodName = document.getElementById("foodName");
const foodWeight = document.getElementById("foodWeight");
const foodKcal = document.getElementById("foodKcal");
const foodProtein = document.getElementById("foodProtein");
const foodCarbs = document.getElementById("foodCarbs");
const foodFat = document.getElementById("foodFat");
const foodFiber = document.getElementById("foodFiber");

const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const foodList = document.getElementById("foodList");

const totalKcal = document.getElementById("totalKcal");
const totalProtein = document.getElementById("totalProtein");
const totalCarbs = document.getElementById("totalCarbs");
const totalFat = document.getElementById("totalFat");
const totalFiber = document.getElementById("totalFiber");

const DIARY_KEY = "usdaFoodDiary";
const LANG_KEY = "siteLanguage";
const MAX_SIDEBAR_ITEMS_PER_CATEGORY = 200;

let diary = JSON.parse(localStorage.getItem(DIARY_KEY)) || [];
let currentLang = localStorage.getItem(LANG_KEY) || "zh";

const i18n = {
  zh: {
    title: "食物热量计算器",
    subtitle: "底层公式：实际摄入=食物重量×每100g营养数据÷100",
    notice: "你现在接入的是本地热量数据库。支持英文搜索，也支持部分常见食物中文搜索，例如：鸡胸、鸡腿、鸡蛋、红薯、土豆、三文鱼。",
    sidebarTitle: "食物分类",
    sidebarDesc: "点击分类展开，点击食物自动填入。",
    searchLabel: "搜索食物",
    searchPlaceholder: "例如：鸡胸 / chicken breast / potato / egg",
    foodName: "食物名称",
    foodNamePlaceholder: "选择食物后自动填入",
    weight: "重量(g)",
    kcal100: "每100g热量(kcal)",
    protein100: "每100g蛋白质(g)",
    carbs100: "每100g碳水(g)",
    fat100: "每100g脂肪(g)",
    fiber100: "每100g膳食纤维(g)",
    autoFill: "自动填入",
    addFood: "添加到今日饮食",
    totalKcal: "总热量",
    protein: "蛋白质",
    carbs: "碳水",
    fat: "脂肪",
    fiber: "纤维",
    todayList: "今日饮食列表",
    clearAll: "清空全部",
    emptyList: "还没有添加食物。",
    noResult: "没有找到结果",
    noResultTip: "可以换关键词，比如鸡胸、鸡蛋、红薯、chicken、rice、potato、egg、milk。",
    delete: "删除",
    clearConfirm: "确定清空今日饮食记录吗？",
    needName: "请先选择或输入食物名称。",
    needWeight: "请输入正确的食物重量。",
    needKcal: "请输入正确的每100g热量。",
    categoryLimit: "该分类共有{count}条，为避免页面卡顿，左侧只展示前{limit}条。想找更多请用右侧搜索框。"
  },
  en: {
    title: "Food Calorie Calculator",
    subtitle: "Core formula: actual intake = food weight × nutrition per 100g ÷ 100",
    notice: "This app uses a local food database. You can search in English, and some common Chinese keywords are also supported.",
    sidebarTitle: "Food Categories",
    sidebarDesc: "Open a category and click a food to fill the form.",
    searchLabel: "Search food",
    searchPlaceholder: "e.g. chicken breast / potato / egg / salmon",
    foodName: "Food name",
    foodNamePlaceholder: "Auto-filled after selecting a food",
    weight: "Weight(g)",
    kcal100: "Calories per 100g(kcal)",
    protein100: "Protein per 100g(g)",
    carbs100: "Carbs per 100g(g)",
    fat100: "Fat per 100g(g)",
    fiber100: "Fiber per 100g(g)",
    autoFill: "Auto-filled",
    addFood: "Add to today's diary",
    totalKcal: "Calories",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    fiber: "Fiber",
    todayList: "Today's food list",
    clearAll: "Clear all",
    emptyList: "No food added yet.",
    noResult: "No result found",
    noResultTip: "Try keywords like chicken, rice, potato, egg, milk.",
    delete: "Delete",
    clearConfirm: "Clear today's food diary?",
    needName: "Please choose or enter a food name.",
    needWeight: "Please enter a valid weight.",
    needKcal: "Please enter valid calories per 100g.",
    categoryLimit: "This category has {count} items. To keep the page fast, only the first {limit} are shown here. Use search to find more."
  }
};

const chineseAliasRules = [
  { zh: ["鸡胸", "鸡胸肉"], en: ["chicken breast"], display: "鸡胸肉" },
  { zh: ["鸡腿", "鸡腿肉"], en: ["chicken thigh", "chicken leg"], display: "鸡腿肉" },
  { zh: ["鸡肉"], en: ["chicken"], display: "鸡肉" },
  { zh: ["鸡蛋", "蛋"], en: ["egg"], display: "鸡蛋" },
  { zh: ["米饭", "白米饭", "饭"], en: ["rice"], display: "米饭" },
  { zh: ["糙米"], en: ["brown rice"], display: "糙米" },
  { zh: ["红薯", "地瓜"], en: ["sweet potato"], display: "红薯" },
  { zh: ["土豆", "马铃薯"], en: ["potato"], display: "土豆" },
  { zh: ["玉米"], en: ["corn"], display: "玉米" },
  { zh: ["燕麦"], en: ["oat"], display: "燕麦" },
  { zh: ["三文鱼"], en: ["salmon"], display: "三文鱼" },
  { zh: ["金枪鱼"], en: ["tuna"], display: "金枪鱼" },
  { zh: ["鳕鱼"], en: ["cod"], display: "鳕鱼" },
  { zh: ["牛肉"], en: ["beef"], display: "牛肉" },
  { zh: ["猪肉"], en: ["pork"], display: "猪肉" },
  { zh: ["牛奶"], en: ["milk"], display: "牛奶" },
  { zh: ["酸奶"], en: ["yogurt", "yoghurt"], display: "酸奶" },
  { zh: ["蓝莓"], en: ["blueberry"], display: "蓝莓" },
  { zh: ["香蕉"], en: ["banana"], display: "香蕉" },
  { zh: ["苹果"], en: ["apple"], display: "苹果" },
  { zh: ["西兰花"], en: ["broccoli"], display: "西兰花" },
  { zh: ["番茄", "西红柿"], en: ["tomato"], display: "番茄" },
  { zh: ["黄瓜"], en: ["cucumber"], display: "黄瓜" },
  { zh: ["彩椒", "甜椒"], en: ["bell pepper", "pepper"], display: "彩椒" },
  { zh: ["橄榄油"], en: ["olive oil"], display: "橄榄油" },
  { zh: ["花生"], en: ["peanut"], display: "花生" },
  { zh: ["核桃"], en: ["walnut"], display: "核桃" }
];

const categoryTranslation = {
  "Foundation": "基础食物",
  "SR Legacy": "历史标准食物",
  "Survey": "调查食物",
  "Branded": "品牌食品",
  "Unknown": "未分类",
  "protein": "蛋白质类",
  "carb": "主食类",
  "fruit": "水果类",
  "vegetable": "蔬菜类",
  "fat": "脂肪类"
};

function t(key) {
  return i18n[currentLang][key] || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = t(key);
  });

  langToggle.textContent = currentLang === "zh" ? "English" : "中文";

  renderCategoryList();
  renderDiary();

  if (searchInput.value.trim()) {
    renderSearchResults(searchInput.value);
  }
}

function round1(num) {
  if (!Number.isFinite(num)) return 0;
  return Math.round(num * 10) / 10;
}

function safeValue(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function calculateByWeight(weight, valuePer100g) {
  return weight * valuePer100g / 100;
}

function saveDiary() {
  localStorage.setItem(DIARY_KEY, JSON.stringify(diary));
}

function getSearchTerms(keyword) {
  const text = keyword.trim().toLowerCase();
  const terms = [text];

  chineseAliasRules.forEach(rule => {
    const matchedChinese = rule.zh.some(word => text.includes(word.toLowerCase()));
    if (matchedChinese) {
      rule.en.forEach(enWord => terms.push(enWord.toLowerCase()));
    }
  });

  return [...new Set(terms)].filter(Boolean);
}

function getChineseDisplayName(foodName) {
  const name = String(foodName || "").toLowerCase();

  for (const rule of chineseAliasRules) {
    const matchedEnglish = rule.en.some(word => name.includes(word.toLowerCase()));
    if (matchedEnglish) {
      return rule.display;
    }
  }

  return "";
}

function getDisplayFoodName(food) {
  const originalName = food.name || "";
  const chineseName = getChineseDisplayName(originalName);

  if (currentLang === "zh" && chineseName) {
    return `${chineseName}｜${originalName}`;
  }

  return originalName;
}

function getDisplayCategory(category) {
  if (currentLang === "zh") {
    return categoryTranslation[category] || category || "未分类";
  }

  return category || "Unknown";
}

function fillFoodForm(food) {
  foodName.value = getDisplayFoodName(food);
  foodKcal.value = safeValue(food.kcal);
  foodProtein.value = safeValue(food.protein);
  foodCarbs.value = safeValue(food.carbs);
  foodFat.value = safeValue(food.fat);
  foodFiber.value = safeValue(food.fiber);

  searchResults.style.display = "none";
  searchInput.value = getDisplayFoodName(food);
}

function renderSearchResults(keyword) {
  const terms = getSearchTerms(keyword);

  if (terms.length === 0) {
    searchResults.style.display = "none";
    searchResults.innerHTML = "";
    return;
  }

  const results = defaultFoodDatabase
    .filter(food => {
      const name = String(food.name || "").toLowerCase();
      const category = String(food.category || "").toLowerCase();

      return terms.some(term => {
        return name.includes(term) || category.includes(term);
      });
    })
    .slice(0, 20);

  searchResults.innerHTML = "";

  if (results.length === 0) {
    searchResults.style.display = "block";
    searchResults.innerHTML = `
      <div class="search-item">
        <strong>${t("noResult")}</strong>
        <span>${t("noResultTip")}</span>
      </div>
    `;
    return;
  }

  searchResults.style.display = "block";

  results.forEach(food => {
    const div = document.createElement("div");
    div.className = "search-item";

    div.innerHTML = `
      <strong>${getDisplayFoodName(food)}</strong>
      <span>
        ${getDisplayCategory(food.category)}｜
        ${round1(food.kcal)}kcal/100g｜
        ${t("protein")}${round1(food.protein)}g｜
        ${t("carbs")}${round1(food.carbs)}g｜
        ${t("fat")}${round1(food.fat)}g｜
        ${t("fiber")}${round1(food.fiber)}g
      </span>
    `;

    div.addEventListener("click", () => {
      fillFoodForm(food);
    });

    searchResults.appendChild(div);
  });
}

function groupFoodsByCategory() {
  const groups = new Map();

  defaultFoodDatabase.forEach(food => {
    const category = food.category || "Unknown";

    if (!groups.has(category)) {
      groups.set(category, []);
    }

    groups.get(category).push(food);
  });

  return Array.from(groups.entries())
    .sort((a, b) => getDisplayCategory(a[0]).localeCompare(getDisplayCategory(b[0])));
}

function renderCategoryList() {
  const groups = groupFoodsByCategory();

  categoryList.innerHTML = "";

  groups.forEach(([category, foods]) => {
    const details = document.createElement("details");
    details.className = "category-group";

    const summary = document.createElement("summary");
    summary.innerHTML = `
      <span>${getDisplayCategory(category)}</span>
      <span class="category-count">${foods.length}</span>
    `;

    const foodsContainer = document.createElement("div");
    foodsContainer.className = "category-foods";
    foodsContainer.dataset.rendered = "false";

    details.appendChild(summary);
    details.appendChild(foodsContainer);

    details.addEventListener("toggle", () => {
      if (details.open && foodsContainer.dataset.rendered === "false") {
        renderFoodsInsideCategory(foodsContainer, foods);
        foodsContainer.dataset.rendered = "true";
      }
    });

    categoryList.appendChild(details);
  });
}

function renderFoodsInsideCategory(container, foods) {
  container.innerHTML = "";

  const visibleFoods = foods.slice(0, MAX_SIDEBAR_ITEMS_PER_CATEGORY);

  visibleFoods.forEach(food => {
    const div = document.createElement("div");
    div.className = "sidebar-food";

    div.innerHTML = `
      <div class="sidebar-food-name">${getDisplayFoodName(food)}</div>
      <div class="sidebar-food-info">
        ${round1(food.kcal)}kcal/100g｜
        P${round1(food.protein)} C${round1(food.carbs)} F${round1(food.fat)}
      </div>
    `;

    div.addEventListener("click", () => {
      fillFoodForm(food);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    container.appendChild(div);
  });

  if (foods.length > MAX_SIDEBAR_ITEMS_PER_CATEGORY) {
    const note = document.createElement("div");
    note.className = "sidebar-note";
    note.textContent = t("categoryLimit")
      .replace("{count}", foods.length)
      .replace("{limit}", MAX_SIDEBAR_ITEMS_PER_CATEGORY);
    container.appendChild(note);
  }
}

function renderDiary() {
  foodList.innerHTML = "";

  if (diary.length === 0) {
    foodList.innerHTML = `<p class="empty">${t("emptyList")}</p>`;

    totalKcal.textContent = "0";
    totalProtein.textContent = "0";
    totalCarbs.textContent = "0";
    totalFat.textContent = "0";
    totalFiber.textContent = "0";
    return;
  }

  let sumKcal = 0;
  let sumProtein = 0;
  let sumCarbs = 0;
  let sumFat = 0;
  let sumFiber = 0;

  diary.forEach((item, index) => {
    sumKcal += item.totalKcal;
    sumProtein += item.totalProtein;
    sumCarbs += item.totalCarbs;
    sumFat += item.totalFat;
    sumFiber += item.totalFiber;

    const div = document.createElement("div");
    div.className = "food-item";

    div.innerHTML = `
      <div class="food-name">${item.name}</div>
      <div class="food-info">${item.weight}g</div>
      <div class="food-info">${round1(item.totalKcal)}kcal</div>
      <div class="food-info">${t("protein")}${round1(item.totalProtein)}g</div>
      <div class="food-info">${t("carbs")}${round1(item.totalCarbs)}g</div>
      <div class="food-info">${t("fat")}${round1(item.totalFat)}g</div>
      <div class="food-info">${t("fiber")}${round1(item.totalFiber)}g</div>
      <button class="delete-btn" data-index="${index}">${t("delete")}</button>
    `;

    foodList.appendChild(div);
  });

  totalKcal.textContent = round1(sumKcal);
  totalProtein.textContent = round1(sumProtein);
  totalCarbs.textContent = round1(sumCarbs);
  totalFat.textContent = round1(sumFat);
  totalFiber.textContent = round1(sumFiber);

  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      diary.splice(index, 1);
      saveDiary();
      renderDiary();
    });
  });
}

searchInput.addEventListener("input", () => {
  renderSearchResults(searchInput.value);
});

addBtn.addEventListener("click", () => {
  const name = foodName.value.trim();
  const weight = Number(foodWeight.value);

  const kcal = safeValue(foodKcal.value);
  const protein = safeValue(foodProtein.value);
  const carbs = safeValue(foodCarbs.value);
  const fat = safeValue(foodFat.value);
  const fiber = safeValue(foodFiber.value);

  if (!name) {
    alert(t("needName"));
    return;
  }

  if (!weight || weight <= 0) {
    alert(t("needWeight"));
    return;
  }

  if (!kcal || kcal <= 0) {
    alert(t("needKcal"));
    return;
  }

  const item = {
    name,
    weight,
    kcalPer100g: kcal,
    proteinPer100g: protein,
    carbsPer100g: carbs,
    fatPer100g: fat,
    fiberPer100g: fiber,

    totalKcal: calculateByWeight(weight, kcal),
    totalProtein: calculateByWeight(weight, protein),
    totalCarbs: calculateByWeight(weight, carbs),
    totalFat: calculateByWeight(weight, fat),
    totalFiber: calculateByWeight(weight, fiber)
  };

  diary.push(item);
  saveDiary();
  renderDiary();

  searchInput.value = "";
  foodName.value = "";
  foodWeight.value = "";
  foodKcal.value = "";
  foodProtein.value = "";
  foodCarbs.value = "";
  foodFat.value = "";
  foodFiber.value = "";
});

clearBtn.addEventListener("click", () => {
  const ok = confirm(t("clearConfirm"));
  if (!ok) return;

  diary = [];
  saveDiary();
  renderDiary();
});

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "zh" ? "en" : "zh";
  localStorage.setItem(LANG_KEY, currentLang);
  applyLanguage();
});

document.addEventListener("click", event => {
  if (!event.target.closest(".form-section")) {
    searchResults.style.display = "none";
  }
});

// ===============================
// 简化中文常用食物库：解决USDA结果太复杂的问题
// ===============================

const simpleFoodDatabase = [
    {
      name: "鸡蛋",
      enName: "Egg",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 143,
      protein: 12.6,
      carbs: 1.1,
      fat: 9.5,
      fiber: 0,
      aliases: ["鸡蛋", "蛋", "水煮蛋", "煎蛋"],
      englishKeywords: ["egg", "whole egg"]
    },
    {
      name: "鸡胸肉",
      enName: "Chicken breast",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 120,
      protein: 23,
      carbs: 0,
      fat: 2,
      fiber: 0,
      aliases: ["鸡胸", "鸡胸肉"],
      englishKeywords: ["chicken breast"]
    },
    {
      name: "去皮鸡腿肉",
      enName: "Chicken thigh without skin",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 150,
      protein: 18,
      carbs: 0,
      fat: 8,
      fiber: 0,
      aliases: ["鸡腿", "鸡腿肉", "去皮鸡腿"],
      englishKeywords: ["chicken thigh", "chicken leg"]
    },
    {
      name: "带皮鸡腿肉",
      enName: "Chicken thigh with skin",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 220,
      protein: 17,
      carbs: 0,
      fat: 16,
      fiber: 0,
      aliases: ["带皮鸡腿", "带皮鸡腿肉"],
      englishKeywords: ["chicken thigh skin"]
    },
    {
      name: "瘦牛肉",
      enName: "Lean beef",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 160,
      protein: 20,
      carbs: 0,
      fat: 8,
      fiber: 0,
      aliases: ["牛肉", "瘦牛肉"],
      englishKeywords: ["beef", "lean beef"]
    },
    {
      name: "猪瘦肉",
      enName: "Lean pork",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 150,
      protein: 20,
      carbs: 0,
      fat: 7,
      fiber: 0,
      aliases: ["猪肉", "瘦猪肉"],
      englishKeywords: ["pork", "lean pork"]
    },
    {
      name: "三文鱼",
      enName: "Salmon",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 200,
      protein: 20,
      carbs: 0,
      fat: 13,
      fiber: 0,
      aliases: ["三文鱼", "鲑鱼"],
      englishKeywords: ["salmon"]
    },
    {
      name: "鳕鱼",
      enName: "Cod",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 90,
      protein: 20,
      carbs: 0,
      fat: 1,
      fiber: 0,
      aliases: ["鳕鱼"],
      englishKeywords: ["cod"]
    },
    {
      name: "水浸金枪鱼",
      enName: "Tuna in water",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 110,
      protein: 25,
      carbs: 0,
      fat: 1,
      fiber: 0,
      aliases: ["金枪鱼", "水浸金枪鱼"],
      englishKeywords: ["tuna"]
    },
    {
      name: "虾仁",
      enName: "Shrimp",
      category: "蛋白质类",
      categoryEn: "Protein",
      kcal: 100,
      protein: 20,
      carbs: 1,
      fat: 1,
      fiber: 0,
      aliases: ["虾", "虾仁"],
      englishKeywords: ["shrimp"]
    },
  
    {
      name: "熟白米饭",
      enName: "Cooked white rice",
      category: "主食类",
      categoryEn: "Carbs",
      kcal: 116,
      protein: 2.6,
      carbs: 25.9,
      fat: 0.3,
      fiber: 0.3,
      aliases: ["米饭", "白米饭", "熟米饭", "饭"],
      englishKeywords: ["rice", "white rice", "cooked rice"]
    },
    {
      name: "紫米杂粮饭",
      enName: "Mixed grain rice",
      category: "主食类",
      categoryEn: "Carbs",
      kcal: 120,
      protein: 3,
      carbs: 25,
      fat: 0.8,
      fiber: 1.5,
      aliases: ["紫米饭", "杂粮饭", "紫米杂粮饭"],
      englishKeywords: ["mixed grain rice", "black rice"]
    },
    {
      name: "土豆",
      enName: "Potato",
      category: "主食类",
      categoryEn: "Carbs",
      kcal: 80,
      protein: 2,
      carbs: 17,
      fat: 0.1,
      fiber: 2.2,
      aliases: ["土豆", "马铃薯"],
      englishKeywords: ["potato"]
    },
    {
      name: "红薯",
      enName: "Sweet potato",
      category: "主食类",
      categoryEn: "Carbs",
      kcal: 90,
      protein: 1.5,
      carbs: 21,
      fat: 0.2,
      fiber: 3,
      aliases: ["红薯", "地瓜", "番薯"],
      englishKeywords: ["sweet potato"]
    },
    {
      name: "玉米",
      enName: "Corn",
      category: "主食类",
      categoryEn: "Carbs",
      kcal: 110,
      protein: 3.4,
      carbs: 23,
      fat: 1.2,
      fiber: 2.7,
      aliases: ["玉米"],
      englishKeywords: ["corn"]
    },
    {
      name: "燕麦",
      enName: "Oats",
      category: "主食类",
      categoryEn: "Carbs",
      kcal: 370,
      protein: 13,
      carbs: 60,
      fat: 7,
      fiber: 10,
      aliases: ["燕麦", "燕麦片"],
      englishKeywords: ["oat", "oats", "oatmeal"]
    },
    {
      name: "全麦吐司",
      enName: "Whole wheat toast",
      category: "主食类",
      categoryEn: "Carbs",
      kcal: 250,
      protein: 9,
      carbs: 43,
      fat: 4,
      fiber: 6,
      aliases: ["全麦吐司", "全麦面包", "吐司"],
      englishKeywords: ["whole wheat bread", "toast"]
    },
  
    {
      name: "纯牛奶",
      enName: "Whole milk",
      category: "奶制品",
      categoryEn: "Dairy",
      kcal: 65,
      protein: 3.3,
      carbs: 5,
      fat: 3.5,
      fiber: 0,
      aliases: ["牛奶", "纯牛奶", "全脂牛奶"],
      englishKeywords: ["milk", "whole milk"]
    },
    {
      name: "无糖酸奶",
      enName: "Plain yogurt",
      category: "奶制品",
      categoryEn: "Dairy",
      kcal: 65,
      protein: 3.5,
      carbs: 5,
      fat: 3.5,
      fiber: 0,
      aliases: ["酸奶", "无糖酸奶", "原味酸奶"],
      englishKeywords: ["yogurt", "plain yogurt"]
    },
    {
      name: "全脂奶粉",
      enName: "Whole milk powder",
      category: "奶制品",
      categoryEn: "Dairy",
      kcal: 500,
      protein: 25,
      carbs: 38,
      fat: 27,
      fiber: 0,
      aliases: ["奶粉", "全脂奶粉"],
      englishKeywords: ["milk powder", "whole milk powder"]
    },
    {
      name: "酵母蛋白粉80%",
      enName: "Yeast protein powder 80%",
      category: "补剂",
      categoryEn: "Supplement",
      kcal: 390,
      protein: 80,
      carbs: 6,
      fat: 3,
      fiber: 0,
      aliases: ["酵母蛋白", "酵母蛋白粉", "蛋白粉"],
      englishKeywords: ["yeast protein", "protein powder"]
    },
  
    {
      name: "苹果",
      enName: "Apple",
      category: "水果类",
      categoryEn: "Fruit",
      kcal: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      fiber: 2.4,
      aliases: ["苹果"],
      englishKeywords: ["apple"]
    },
    {
      name: "香蕉",
      enName: "Banana",
      category: "水果类",
      categoryEn: "Fruit",
      kcal: 89,
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      fiber: 2.6,
      aliases: ["香蕉"],
      englishKeywords: ["banana"]
    },
    {
      name: "蓝莓",
      enName: "Blueberry",
      category: "水果类",
      categoryEn: "Fruit",
      kcal: 57,
      protein: 0.7,
      carbs: 14.5,
      fat: 0.3,
      fiber: 2.4,
      aliases: ["蓝莓"],
      englishKeywords: ["blueberry"]
    },
    {
      name: "草莓",
      enName: "Strawberry",
      category: "水果类",
      categoryEn: "Fruit",
      kcal: 32,
      protein: 0.7,
      carbs: 7.7,
      fat: 0.3,
      fiber: 2,
      aliases: ["草莓"],
      englishKeywords: ["strawberry"]
    },
  
    {
      name: "彩椒",
      enName: "Bell pepper",
      category: "蔬菜类",
      categoryEn: "Vegetable",
      kcal: 30,
      protein: 1,
      carbs: 6,
      fat: 0.2,
      fiber: 2,
      aliases: ["彩椒", "甜椒"],
      englishKeywords: ["bell pepper", "pepper"]
    },
    {
      name: "黄瓜",
      enName: "Cucumber",
      category: "蔬菜类",
      categoryEn: "Vegetable",
      kcal: 16,
      protein: 0.7,
      carbs: 3.6,
      fat: 0.1,
      fiber: 0.5,
      aliases: ["黄瓜"],
      englishKeywords: ["cucumber"]
    },
    {
      name: "生菜",
      enName: "Lettuce",
      category: "蔬菜类",
      categoryEn: "Vegetable",
      kcal: 15,
      protein: 1.4,
      carbs: 2.9,
      fat: 0.2,
      fiber: 1.3,
      aliases: ["生菜"],
      englishKeywords: ["lettuce"]
    },
    {
      name: "西兰花",
      enName: "Broccoli",
      category: "蔬菜类",
      categoryEn: "Vegetable",
      kcal: 34,
      protein: 2.8,
      carbs: 6.6,
      fat: 0.4,
      fiber: 2.6,
      aliases: ["西兰花"],
      englishKeywords: ["broccoli"]
    },
    {
      name: "番茄",
      enName: "Tomato",
      category: "蔬菜类",
      categoryEn: "Vegetable",
      kcal: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      fiber: 1.2,
      aliases: ["番茄", "西红柿"],
      englishKeywords: ["tomato"]
    },
  
    {
      name: "橄榄油",
      enName: "Olive oil",
      category: "油脂类",
      categoryEn: "Fat",
      kcal: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      fiber: 0,
      aliases: ["橄榄油"],
      englishKeywords: ["olive oil"]
    },
    {
      name: "奇亚籽",
      enName: "Chia seeds",
      category: "坚果种子",
      categoryEn: "Nuts and seeds",
      kcal: 486,
      protein: 16.5,
      carbs: 42,
      fat: 31,
      fiber: 34,
      aliases: ["奇亚籽"],
      englishKeywords: ["chia", "chia seeds"]
    },
    {
      name: "亚麻籽粉",
      enName: "Ground flaxseed",
      category: "坚果种子",
      categoryEn: "Nuts and seeds",
      kcal: 534,
      protein: 18,
      carbs: 29,
      fat: 42,
      fiber: 27,
      aliases: ["亚麻籽", "亚麻籽粉"],
      englishKeywords: ["flaxseed", "ground flaxseed"]
    }
  ];
  
  function isChineseText(text) {
    return /[\u4e00-\u9fff]/.test(text);
  }
  
  function foodMatchesSimple(food, keyword) {
    const text = keyword.trim().toLowerCase();
    if (!text) return false;
  
    const aliasMatch = food.aliases.some(alias => alias.toLowerCase().includes(text) || text.includes(alias.toLowerCase()));
    const enMatch = food.englishKeywords.some(word => word.toLowerCase().includes(text) || text.includes(word.toLowerCase()));
    const nameMatch = food.name.toLowerCase().includes(text) || food.enName.toLowerCase().includes(text);
  
    return aliasMatch || enMatch || nameMatch;
  }
  
  function searchSimpleFoods(keyword) {
    return simpleFoodDatabase.filter(food => foodMatchesSimple(food, keyword));
  }
  
  function searchUsdaFoods(keyword) {
    const text = keyword.trim().toLowerCase();
  
    const badWords = [
      "babyfood",
      "infant",
      "junior",
      "strained",
      "toddler"
    ];
  
    return defaultFoodDatabase
      .filter(food => {
        const name = String(food.name || "").toLowerCase();
        const category = String(food.category || "").toLowerCase();
  
        const bad = badWords.some(word => name.includes(word));
        if (bad) return false;
  
        return name.includes(text) || category.includes(text);
      })
      .slice(0, 20);
  }
  
  function getDisplayFoodName(food) {
    if (food.enName) {
      return currentLang === "zh" ? food.name : food.enName;
    }
  
    return food.name || "";
  }
  
  function getDisplayCategory(category) {
    return category || (currentLang === "zh" ? "未分类" : "Unknown");
  }
  
  function fillFoodForm(food) {
    foodName.value = getDisplayFoodName(food);
    foodKcal.value = safeValue(food.kcal);
    foodProtein.value = safeValue(food.protein);
    foodCarbs.value = safeValue(food.carbs);
    foodFat.value = safeValue(food.fat);
    foodFiber.value = safeValue(food.fiber);
  
    searchResults.style.display = "none";
    searchInput.value = getDisplayFoodName(food);
  }
  
  function renderSearchResults(keyword) {
    const text = keyword.trim();
  
    if (!text) {
      searchResults.style.display = "none";
      searchResults.innerHTML = "";
      return;
    }
  
    let results = searchSimpleFoods(text);
  
    if (results.length === 0 && !isChineseText(text)) {
      results = searchUsdaFoods(text);
    }
  
    searchResults.innerHTML = "";
  
    if (results.length === 0) {
      searchResults.style.display = "block";
      searchResults.innerHTML = `
        <div class="search-item">
          <strong>${t("noResult")}</strong>
          <span>${t("noResultTip")}</span>
        </div>
      `;
      return;
    }
  
    searchResults.style.display = "block";
  
    results.slice(0, 20).forEach(food => {
      const div = document.createElement("div");
      div.className = "search-item";
  
      const displayName = getDisplayFoodName(food);
      const category = currentLang === "zh"
        ? food.category || "未分类"
        : food.categoryEn || food.category || "Unknown";
  
      div.innerHTML = `
        <strong>${displayName}</strong>
        <span>
          ${category}｜
          ${round1(food.kcal)}kcal/100g｜
          ${t("protein")}${round1(food.protein)}g｜
          ${t("carbs")}${round1(food.carbs)}g｜
          ${t("fat")}${round1(food.fat)}g｜
          ${t("fiber")}${round1(food.fiber)}g
        </span>
      `;
  
      div.addEventListener("click", () => {
        fillFoodForm(food);
      });
  
      searchResults.appendChild(div);
    });
  }
  
  function groupFoodsByCategory() {
    const groups = new Map();
  
    simpleFoodDatabase.forEach(food => {
      const category = currentLang === "zh" ? food.category : food.categoryEn;
  
      if (!groups.has(category)) {
        groups.set(category, []);
      }
  
      groups.get(category).push(food);
    });
  
    return Array.from(groups.entries());
  }
  
  function renderCategoryList() {
    const groups = groupFoodsByCategory();
  
    categoryList.innerHTML = "";
  
    groups.forEach(([category, foods]) => {
      const details = document.createElement("details");
      details.className = "category-group";
  
      const summary = document.createElement("summary");
      summary.innerHTML = `
        <span>${category}</span>
        <span class="category-count">${foods.length}</span>
      `;
  
      const foodsContainer = document.createElement("div");
      foodsContainer.className = "category-foods";
  
      details.appendChild(summary);
      details.appendChild(foodsContainer);
  
      renderFoodsInsideCategory(foodsContainer, foods);
  
      categoryList.appendChild(details);
    });
  }
  
  function renderFoodsInsideCategory(container, foods) {
    container.innerHTML = "";
  
    foods.forEach(food => {
      const div = document.createElement("div");
      div.className = "sidebar-food";
  
      div.innerHTML = `
        <div class="sidebar-food-name">${getDisplayFoodName(food)}</div>
        <div class="sidebar-food-info">
          ${round1(food.kcal)}kcal/100g｜
          P${round1(food.protein)} C${round1(food.carbs)} F${round1(food.fat)}
        </div>
      `;
  
      div.addEventListener("click", () => {
        fillFoodForm(food);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  
      container.appendChild(div);
    });
  }
  applyLanguage();