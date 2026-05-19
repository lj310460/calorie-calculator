const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const categoryList = null;
const langToggle = null;

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
// Day3个人计划计算器
const profileGender = document.getElementById("profileGender");
const profileAge = document.getElementById("profileAge");
const profileHeight = document.getElementById("profileHeight");
const profileWeight = document.getElementById("profileWeight");
const profileTargetWeight = document.getElementById("profileTargetWeight");
const profileTargetDays = document.getElementById("profileTargetDays");
const profileGoal = document.getElementById("profileGoal");
const profileTraining = document.getElementById("profileTraining");
const profileBodyPart = document.getElementById("profileBodyPart");
const profileDays = document.getElementById("profileDays");
const generatePlanBtn = document.getElementById("generatePlanBtn");
const planResult = document.getElementById("planResult");

const PROFILE_KEY = "userProfile";
const PLAN_KEY = "userNutritionPlan";

let currentPlan = JSON.parse(localStorage.getItem(PLAN_KEY)) || null;
const DIARY_KEY = "usdaFoodDiary";
const LANG_KEY = "siteLanguage";

let diary = JSON.parse(localStorage.getItem(DIARY_KEY)) || [];
let currentLang = "zh";

const i18n = {
  zh: {
    title: "食物热量计算器",
    subtitle: "底层公式：实际摄入=食物重量×每100g营养数据÷100",
    notice: "当前使用完整本地食物数据库。支持中文搜索和英文搜索。常见食物会显示中文名，复杂食物保留英文原名。",
    sidebarTitle: "食物分类",
    sidebarDesc: "点击分类展开，点击食物自动填入。",
    searchLabel: "搜索食物",
    searchPlaceholder: "例如：鸡蛋/鸡胸/红薯/芒果/chicken/egg/mango",
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
    noResultTip: "可以换关键词，比如鸡蛋、鸡胸、红薯、芒果、chicken、egg、mango。",
    delete: "删除",
    clearConfirm: "确定清空今日饮食记录吗？",
    needName: "请先选择或输入食物名称。",
    needWeight: "请输入正确的食物重量。",
    needKcal: "请输入正确的每100g热量。"
  },
  en: {
    title: "Food Calorie Calculator",
    subtitle: "Core formula: actual intake = food weight × nutrition per100g ÷100",
    notice: "This app uses the full local food database. English and partial Chinese search are supported.",
    sidebarTitle: "Food Categories",
    sidebarDesc: "Open a category and click a food to fill the form.",
    searchLabel: "Search food",
    searchPlaceholder: "e.g. egg/chicken breast/sweet potato/mango",
    foodName: "Food name",
    foodNamePlaceholder: "Auto-filled after selecting a food",
    weight: "Weight(g)",
    kcal100: "Calories per100g(kcal)",
    protein100: "Protein per100g(g)",
    carbs100: "Carbs per100g(g)",
    fat100: "Fat per100g(g)",
    fiber100: "Fiber per100g(g)",
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
    noResultTip: "Try keywords like chicken, egg, rice, mango, potato.",
    delete: "Delete",
    clearConfirm: "Clear today's food diary?",
    needName: "Please choose or enter a food name.",
    needWeight: "Please enter a valid weight.",
    needKcal: "Please enter valid calories per100g."
  }
};

const chineseSearchMap = {
  "鸡蛋": ["egg", "whole egg"],
  "蛋": ["egg"],
  "蛋黄": ["egg yolk"],
  "蛋白": ["egg white"],
  "鸡胸": ["chicken breast"],
  "鸡胸肉": ["chicken breast"],
  "鸡腿": ["chicken thigh", "chicken leg"],
  "鸡腿肉": ["chicken thigh", "chicken leg"],
  "鸡肉": ["chicken"],
  "牛肉": ["beef"],
  "猪肉": ["pork"],
  "羊肉": ["lamb", "mutton"],
  "三文鱼": ["salmon"],
  "鳕鱼": ["cod"],
  "金枪鱼": ["tuna"],
  "虾": ["shrimp"],
  "虾仁": ["shrimp"],
  "米饭": ["rice"],
  "白米饭": ["white rice", "cooked rice"],
  "糙米": ["brown rice"],
  "燕麦": ["oat", "oats", "oatmeal"],
  "面包": ["bread"],
  "全麦面包": ["whole wheat bread"],
  "土豆": ["potato"],
  "马铃薯": ["potato"],
  "红薯": ["sweet potato"],
  "番薯": ["sweet potato"],
  "玉米": ["corn"],
  "苹果": ["apple"],
  "香蕉": ["banana"],
  "蓝莓": ["blueberry"],
  "草莓": ["strawberry"],
  "猕猴桃": ["kiwi", "kiwifruit", "kiwi fruit"],
  "奇异果": ["kiwi", "kiwifruit", "kiwi fruit"],
  "芒果": ["mango"],
  "橙子": ["orange"],
  "橙": ["orange"],
  "葡萄": ["grape", "grapes"],
  "梨": ["pear"],
  "火龙果": ["dragon fruit", "pitaya"],
  "菠萝": ["pineapple"],
  "西瓜": ["watermelon"],
  "桃子": ["peach"],
  "樱桃": ["cherry"],
  "车厘子": ["cherry"],
  "牛油果": ["avocado"],
  "番茄": ["tomato"],
  "西红柿": ["tomato"],
  "黄瓜": ["cucumber"],
  "西兰花": ["broccoli"],
  "生菜": ["lettuce"],
  "菠菜": ["spinach"],
  "彩椒": ["bell pepper", "pepper"],
  "胡萝卜": ["carrot"],
  "牛奶": ["milk"],
  "全脂牛奶": ["whole milk"],
  "酸奶": ["yogurt", "yoghurt"],
  "奶酪": ["cheese"],
  "橄榄油": ["olive oil"],
  "花生": ["peanut"],
  "核桃": ["walnut"],
  "杏仁": ["almond"],
  "奇亚籽": ["chia"],
  "亚麻籽": ["flaxseed"],
  "芝麻": ["sesame"]
};

const chineseNameRules = [
  { zh: "鸡蛋", words: ["whole egg", "egg, whole", "egg"] },
  { zh: "蛋黄", words: ["egg yolk"] },
  { zh: "蛋白", words: ["egg white"] },
  { zh: "鸡胸肉", words: ["chicken breast"] },
  { zh: "鸡腿肉", words: ["chicken thigh", "chicken leg"] },
  { zh: "鸡肉", words: ["chicken"] },
  { zh: "牛肉", words: ["beef"] },
  { zh: "猪肉", words: ["pork"] },
  { zh: "羊肉", words: ["lamb", "mutton"] },
  { zh: "三文鱼", words: ["salmon"] },
  { zh: "鳕鱼", words: ["cod"] },
  { zh: "金枪鱼", words: ["tuna"] },
  { zh: "虾", words: ["shrimp"] },
  { zh: "米饭", words: ["rice"] },
  { zh: "糙米", words: ["brown rice"] },
  { zh: "燕麦", words: ["oat", "oatmeal"] },
  { zh: "面包", words: ["bread"] },
  { zh: "土豆", words: ["potato"] },
  { zh: "红薯", words: ["sweet potato"] },
  { zh: "玉米", words: ["corn"] },
  { zh: "苹果", words: ["apple"] },
  { zh: "香蕉", words: ["banana"] },
  { zh: "蓝莓", words: ["blueberry"] },
  { zh: "草莓", words: ["strawberry"] },
  { zh: "猕猴桃", words: ["kiwi", "kiwifruit"] },
  { zh: "芒果", words: ["mango"] },
  { zh: "橙子", words: ["orange"] },
  { zh: "葡萄", words: ["grape"] },
  { zh: "梨", words: ["pear"] },
  { zh: "菠萝", words: ["pineapple"] },
  { zh: "西瓜", words: ["watermelon"] },
  { zh: "桃子", words: ["peach"] },
  { zh: "樱桃", words: ["cherry"] },
  { zh: "牛油果", words: ["avocado"] },
  { zh: "番茄", words: ["tomato"] },
  { zh: "黄瓜", words: ["cucumber"] },
  { zh: "西兰花", words: ["broccoli"] },
  { zh: "生菜", words: ["lettuce"] },
  { zh: "菠菜", words: ["spinach"] },
  { zh: "彩椒", words: ["bell pepper"] },
  { zh: "胡萝卜", words: ["carrot"] },
  { zh: "牛奶", words: ["milk"] },
  { zh: "酸奶", words: ["yogurt", "yoghurt"] },
  { zh: "奶酪", words: ["cheese"] },
  { zh: "橄榄油", words: ["olive oil"] },
  { zh: "花生", words: ["peanut"] },
  { zh: "核桃", words: ["walnut"] },
  { zh: "杏仁", words: ["almond"] },
  { zh: "奇亚籽", words: ["chia"] },
  { zh: "亚麻籽", words: ["flaxseed"] }
];

function t(key) {
  return i18n[currentLang][key] || key;
}

function applyLanguage() {
  currentLang = "zh";

  document.documentElement.lang = "zh-CN";

  renderDiary();

  if (searchInput.value.trim()) {
    renderSearchResults(searchInput.value);
  }
}

function round1(num) {
  const number = Number(num);
  if (!Number.isFinite(number)) return 0;
  return Math.round(number * 10) / 10;
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
// ===============================
// Day3个人计划计算逻辑
// ===============================

function getGoalName(goal) {
  const map = {
    gain: "增肌",
    cut: "减脂",
    maintain: "保持现状",
    longevity: "养生抗衰"
  };
  return map[goal] || "保持现状";
}

function getTrainingName(training) {
  const map = {
    strength: "力量训练",
    bodybuilding: "健美训练",
    functional: "功能性训练"
  };
  return map[training] || "力量训练";
}
function getBodyPartName(bodyPart) {
  const map = {
    chest: "胸",
    legs: "腿",
    core: "核心",
    back: "背",
    arms: "手臂"
  };

  return map[bodyPart] || "胸";
}
function calculateBMR(gender, weight, height, age) {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }

  return 10 * weight + 6.25 * height - 5 * age - 161;
}

function getActivityFactor(days) {
  const d = Number(days);

  if (d <= 2) return 1.35;
  if (d === 3) return 1.45;
  if (d === 4) return 1.55;
  if (d === 5) return 1.65;
  return 1.75;
}

function getTargetCalories(tdee, goal) {
  if (goal === "gain") return tdee + 250;
  if (goal === "cut") return tdee - 350;
  if (goal === "longevity") return tdee - 100;
  return tdee;
}

function getProteinTarget(weight, goal, training) {
  let multiplier = 1.6;

  if (goal === "gain") multiplier = 1.8;
  if (goal === "cut") multiplier = 2.0;
  if (goal === "maintain") multiplier = 1.6;
  if (goal === "longevity") multiplier = 1.4;

  if (training === "bodybuilding") multiplier += 0.1;
  if (training === "strength") multiplier += 0.05;

  return weight * multiplier;
}

function getFatTarget(weight, goal, gender) {
  let multiplier = 0.85;

  if (goal === "gain") multiplier = 0.9;
  if (goal === "cut") multiplier = 0.8;
  if (goal === "longevity") multiplier = 0.9;

  let fat = weight * multiplier;

  if (gender === "female") {
    fat = Math.max(fat, 40);
  } else {
    fat = Math.max(fat, 45);
  }

  return fat;
}

function getFiberTarget(calories) {
  const fiber = calories / 1000 * 14;

  if (fiber < 25) return 25;
  if (fiber > 40) return 40;

  return fiber;
}

function calculateNutritionPlan(profile) {
  const {
    gender,
    age,
    height,
    weight,
    targetWeight,
    targetDays,
    goal,
    training,
    days
  } = profile;

  const bmr = calculateBMR(gender, weight, height, age);
  const activityFactor = getActivityFactor(days);
  const tdee = bmr * activityFactor;

  const weightChange = targetWeight - weight;
  const totalEnergyChange = weightChange * 7700;
  const rawDailyAdjustment = totalEnergyChange / targetDays;

  let safeDailyAdjustment = rawDailyAdjustment;
  let paceWarning = "";
  let paceLevel = "正常";

  const weeklyChange = weightChange / targetDays * 7;

  if (weightChange < 0) {
    const dailyDeficit = Math.abs(rawDailyAdjustment);

    if (dailyDeficit > 700) {
      safeDailyAdjustment = -700;
      paceLevel = "过快";
      paceWarning = "你的减脂目标偏激进。为了保护肌肉、训练状态和代谢，系统已把每日热量缺口限制在约700kcal以内。建议延长达标天数。";
    } else if (dailyDeficit > 500) {
      paceLevel = "偏快";
      paceWarning = "你的减脂速度偏快。可以执行，但要注意蛋白质、睡眠、力量训练和饥饿感管理。";
    } else {
      paceLevel = "健康";
      paceWarning = "你的减脂速度较健康，适合长期执行。";
    }
  }

  if (weightChange > 0) {
    const dailySurplus = rawDailyAdjustment;

    if (dailySurplus > 500) {
      safeDailyAdjustment = 500;
      paceLevel = "过快";
      paceWarning = "你的增重/增肌速度偏快，容易增加过多脂肪。系统已把每日热量盈余限制在约500kcal以内。";
    } else if (dailySurplus > 300) {
      paceLevel = "偏快";
      paceWarning = "你的增肌速度偏快，适合训练强度较高的人。注意观察腰围和体脂变化。";
    } else {
      paceLevel = "健康";
      paceWarning = "你的增肌速度较稳，比较适合提高肌肉量并控制脂肪增长。";
    }
  }

  if (weightChange === 0) {
    safeDailyAdjustment = 0;
    paceLevel = "维持";
    paceWarning = "你的目标体重和当前体重一致，系统会按保持现状/体态优化来安排。";
  }

  let targetCalories = tdee + safeDailyAdjustment;

  if (targetCalories < bmr * 1.1) {
    targetCalories = bmr * 1.1;
    paceWarning += " 当前目标热量不能长期低于基础代谢太多，系统已自动提高到更安全范围。";
  }

  const protein = getProteinTarget(weight, goal, training);
  const fat = getFatTarget(weight, goal, gender);
  const fiber = getFiberTarget(targetCalories);

  let carbs = (targetCalories - protein * 4 - fat * 9) / 4;

  if (carbs < 80) {
    carbs = 80;
  }

  const estimatedDaysWithSafeCalories = Math.abs(weightChange) > 0
    ? Math.ceil(Math.abs(totalEnergyChange / safeDailyAdjustment))
    : 0;

  return {
    ...profile,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calories: Math.round(targetCalories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
    fiber: Math.round(fiber),
    weightChange: round1(weightChange),
    weeklyChange: round1(weeklyChange),
    rawDailyAdjustment: Math.round(rawDailyAdjustment),
    safeDailyAdjustment: Math.round(safeDailyAdjustment),
    paceLevel,
    paceWarning,
    estimatedDaysWithSafeCalories
  };
}

function getDiaryTotals() {
  return diary.reduce(
    (sum, item) => {
      sum.kcal += Number(item.totalKcal) || 0;
      sum.protein += Number(item.totalProtein) || 0;
      sum.carbs += Number(item.totalCarbs) || 0;
      sum.fat += Number(item.totalFat) || 0;
      sum.fiber += Number(item.totalFiber) || 0;
      return sum;
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
}

function getMealPlan(plan) {
  const goalName = getGoalName(plan.goal);

  const direction = plan.weightChange < 0
    ? "减重/减脂"
    : plan.weightChange > 0
      ? "增重/增肌"
      : "维持体重";

  const adjustmentText = plan.safeDailyAdjustment > 0
    ? `每天大约增加${Math.abs(plan.safeDailyAdjustment)}kcal热量盈余`
    : plan.safeDailyAdjustment < 0
      ? `每天大约制造${Math.abs(plan.safeDailyAdjustment)}kcal热量缺口`
      : "每天热量基本维持在总消耗附近";

  const targetSummary = `你当前体重${plan.weight}kg，目标体重${plan.targetWeight}kg，希望${plan.targetDays}天达标，目标方向是${direction}。系统估算你需要${adjustmentText}。当前目标强度为「${plan.paceLevel}」。${plan.paceWarning}`;

  if (plan.goal === "gain") {
    return [
      targetSummary,
      `总原则：你的当前目标是${goalName}。增肌不是简单多吃，而是在可控热量盈余下提高训练质量、保证蛋白质、安排足够碳水，并通过体重和腰围判断是否长得太快。`,
      `每日目标热量约${plan.calories}kcal。这个热量已经根据你的目标体重和达标天数调整过。如果你两周体重完全不涨，可以每天再增加100–150kcal；如果腰围涨太快，则减少100kcal左右。`,
      `蛋白质目标约${plan.protein}g。建议分成3–5餐摄入，每餐至少25–40g优质蛋白。优先选择鸡胸肉、去皮鸡腿肉、牛肉、鱼类、鸡蛋、无糖酸奶、乳清蛋白或酵母蛋白粉。`,
      `碳水目标约${plan.carbs}g。增肌期碳水非常重要，它决定训练状态和肌糖原储备。训练前后优先安排米饭、土豆、红薯、燕麦、面条、全麦面包等。`,
      `脂肪目标约${plan.fat}g。脂肪不要过低，优先来自鸡蛋黄、三文鱼、橄榄油、坚果、牛油果。不要大量依靠油炸食品和甜点来凑热量。`,
      `纤维目标约${plan.fiber}g。增肌也不能只吃肉和米饭，每天建议蔬菜400–600g，水果1–2份，帮助消化、肠道和长期健康。`,
      `早餐建议：鸡蛋2个+燕麦或全麦面包+牛奶/酸奶+水果。这个组合能提供蛋白质、碳水、脂肪和微量营养。`,
      `午餐建议：鸡胸肉/牛肉/鱼类150–220g+米饭/土豆/红薯一份+蔬菜300g左右。午餐可以作为一天的主要能量餐。`,
      `训练前1–2小时：吃一份易消化碳水，例如香蕉、米饭、面包、土豆，避免空腹硬练。训练前不要吃太多高脂食物。`,
      `训练后2小时内：补充蛋白质和碳水，例如鸡腿肉+米饭，或酸奶+燕麦，帮助恢复和糖原补充。`,
      `晚餐建议：优质蛋白+蔬菜+适量主食。增肌期晚上不是完全不能吃碳水，关键是总热量和消化舒适度。`,
      `生活管家建议：每周固定时间称体重3次取平均值，同时记录腰围和训练重量。只看单日体重没有意义。`
    ];
  }

  if (plan.goal === "cut") {
    return [
      targetSummary,
      `总原则：你的当前目标是${goalName}。减脂最重要的是温和热量缺口、高蛋白、力量训练和长期可持续，而不是极端节食。`,
      `每日目标热量约${plan.calories}kcal。这个热量已经根据你的目标体重和达标天数计算过。如果系统提示偏快或过快，优先延长达标天数，而不是继续压低热量。`,
      `蛋白质目标约${plan.protein}g。减脂期蛋白质必须优先吃够，它可以保护肌肉、提高饱腹感，让身材更紧实。`,
      `碳水目标约${plan.carbs}g。不要完全不吃碳水。训练日建议把碳水安排在早餐、午餐和训练前后，晚餐根据当天剩余碳水灵活安排。`,
      `脂肪目标约${plan.fat}g。油脂要控制，但不能完全归零。少吃油炸、奶茶、甜点、坚果过量和重油外卖。`,
      `纤维目标约${plan.fiber}g。每天蔬菜建议400–600g，水果1–2份。纤维能增强饱腹感，也能改善肠道状态。`,
      `早餐建议：鸡蛋/无糖酸奶/蛋白粉+少量燕麦或水果。避免高糖面包、奶茶、油条、炸物。`,
      `午餐建议：鸡胸肉/鱼/牛肉/虾仁+大量蔬菜+一份主食。主食不需要完全去掉，只要控制分量。`,
      `晚餐建议：蛋白质+蔬菜为主，主食根据当天剩余碳水决定。如果白天碳水不足，晚餐可以适量加红薯、土豆或米饭。`,
      `加餐建议：优先无糖酸奶、鸡蛋、水果、蛋白粉。坚果可以吃，但要称量，10–15g就够了。`,
      `监测方法：每周下降0.3%–0.7%体重比较健康。如果连续两周体重平均值不变，再减少100–150kcal或增加日常步数。`,
      `重点提醒：不要只看体重，还要看腰围、镜子里的线条、训练力量、睡眠和饥饿感。`
    ];
  }

  if (plan.goal === "longevity") {
    return [
      targetSummary,
      `总原则：你的当前目标是${goalName}。重点不是极限瘦或极限增肌，而是长期稳定、抗炎、控糖、保肌肉和提高身体功能。`,
      `每日目标热量约${plan.calories}kcal。养生抗衰不适合长期大幅热量缺口，应该追求体重稳定、血糖稳定和身体状态稳定。`,
      `蛋白质目标约${plan.protein}g。足够蛋白质有助于维持肌肉量、免疫力、皮肤质量和代谢水平。年龄越大，越不能长期蛋白质不足。`,
      `碳水目标约${plan.carbs}g。优先选择低加工碳水，例如燕麦、土豆、红薯、糙米、杂粮饭、豆类和水果。`,
      `脂肪目标约${plan.fat}g。优先橄榄油、深海鱼、坚果、牛油果、鸡蛋黄，减少反式脂肪和反复油炸食品。`,
      `纤维目标约${plan.fiber}g。建议每天深色蔬菜+菌菇+豆类+水果，形成稳定的肠道营养环境。`,
      `早餐建议：鸡蛋/酸奶+燕麦+蓝莓/猕猴桃/苹果。重点是高蛋白、高纤维、低血糖波动。`,
      `午餐建议：鱼类/鸡肉/豆腐+杂粮主食+深色蔬菜。每周安排2–3次深海鱼。`,
      `晚餐建议：清淡高蛋白+大量蔬菜，主食适量，避免过晚大量进食。`,
      `每周建议：豆类2–4次，鱼类2–3次，坚果少量，彩色蔬菜每天都有。`,
      `生活管家建议：睡眠、压力、日照、步数和力量训练同样重要。抗衰不是靠某一种食物，而是靠长期系统稳定。`
    ];
  }

  return [
    targetSummary,
    `总原则：你的当前目标是${goalName}。重点是让热量接近每日消耗，让体重、围度、精神状态和训练表现保持稳定。`,
    `每日目标热量约${plan.calories}kcal。体重如果长期上升，说明热量略高；如果长期下降，说明热量略低。`,
    `蛋白质目标约${plan.protein}g。建议每餐都有蛋白质来源，不要集中到一餐里。`,
    `碳水目标约${plan.carbs}g。主要用于维持训练表现、大脑状态和日常活力。`,
    `脂肪目标约${plan.fat}g。保证激素、皮肤、饱腹感和脂溶性维生素吸收。`,
    `纤维目标约${plan.fiber}g。建议每天蔬菜400–600g，水果1–2份。`,
    `早餐建议：蛋白质+慢碳水+水果，例如鸡蛋+燕麦+牛奶。`,
    `午餐建议：肉蛋鱼+主食+蔬菜，是一天最稳定的营养核心。`,
    `晚餐建议：优质蛋白+蔬菜+适量碳水，避免重油和过量零食。`,
    `维持期最重要的是建立可持续饮食，不需要每天完美，但一周平均要稳定。`
  ];
}

function getTrainingPlan(plan) {
  const bodyPartName = getBodyPartName(plan.bodyPart);

  const targetIntro = `你的体重目标是从${plan.weight}kg到${plan.targetWeight}kg，周期为${plan.targetDays}天。本次训练重点部位是「${bodyPartName}」。训练安排会结合你的目标、训练类型和目标肌群来设计：减脂期重点保肌肉，增肌期重点提高训练容量，维持或抗衰期重点保持力量、关节功能和身体活力。`;

  const plans = {
    strength: {
      chest: [
        targetIntro,
        "训练定位：力量训练里的胸部训练，不只是练胸肌围度，更要提升卧推、俯卧撑、上肢推力和肩胛稳定。",
        "主项1：杠铃卧推或哑铃卧推，4–5组×3–6次，组间休息2–4分钟。重点是肩胛后缩下沉、推起路径稳定。",
        "主项2：上斜哑铃卧推，3–4组×5–8次，强化上胸和肩前束协同。",
        "辅助1：双杠臂屈伸或俯卧撑，3组×6–10次。动作不要塌腰，胸部发力优先。",
        "辅助2：坐姿推胸或器械推胸，3组×8–10次，用来补充训练容量。",
        "小肌群细分：上胸、胸大肌中部、下胸、前三角肌、肱三头肌、肩胛稳定肌群。",
        "核心配合：平板支撑3组，每组30–60秒，保证卧推动作中的躯干稳定。",
        "进阶规则：当卧推能稳定完成目标次数且动作不变形，下次增加2.5kg或增加1次重复。"
      ],
      legs: [
        targetIntro,
        "训练定位：力量训练里的腿部重点是下肢力量、髋膝踝稳定和深蹲/硬拉表现。",
        "主项1：深蹲，4–5组×3–6次，组间休息2–4分钟。重点是核心收紧、膝盖方向稳定、深度一致。",
        "主项2：罗马尼亚硬拉，3–4组×4–8次，强化臀大肌、腘绳肌和髋伸能力。",
        "辅助1：腿举，3组×6–10次，增加股四头肌训练量。",
        "辅助2：保加利亚分腿蹲，3组×6–8次/侧，强化单腿稳定。",
        "小肌群细分：股四头肌、臀大肌、腘绳肌、内收肌、臀中肌、小腿、踝稳定肌群。",
        "核心配合：死虫或Pallof Press，3组，帮助深蹲时躯干抗伸展和抗旋转。",
        "安全提醒：腿部力量训练不要每次都极限冲重量，动作质量优先。"
      ],
      core: [
        targetIntro,
        "训练定位：力量训练里的核心不是单纯卷腹，而是提升躯干稳定、抗伸展、抗旋转和力量传导。",
        "主项1：负重平板支撑，4组×30–60秒，保持骨盆中立，不要塌腰。",
        "主项2：Pallof Press，3–4组×8–12次/侧，训练抗旋转能力。",
        "主项3：悬垂举腿或反向卷腹，3组×6–12次，强化下腹和骨盆控制。",
        "辅助1：农夫走，4组×20–40米，提升核心抗侧屈能力。",
        "辅助2：Dead Bug，3组×8–12次/侧，训练深层核心控制。",
        "小肌群细分：腹横肌、腹直肌、腹内外斜肌、竖脊肌、骨盆稳定肌群、膈肌呼吸控制。",
        "训练重点：动作慢、稳、可控，核心训练不是越快越好。",
        "进阶规则：先增加控制时间，再增加负重或动作难度。"
      ],
      back: [
        targetIntro,
        "训练定位：力量训练里的背部重点是拉力、脊柱稳定、肩胛控制和硬拉/划船能力。",
        "主项1：引体向上或高位下拉，4组×4–8次，重点是背阔肌发力，不要耸肩。",
        "主项2：杠铃划船或哑铃划船，4组×5–8次，保持躯干稳定。",
        "主项3：硬拉或罗马尼亚硬拉，3组×3–6次，训练后链力量。",
        "辅助1：坐姿划船，3组×8–10次，强化中背厚度。",
        "辅助2：面拉，3组×12–15次，保护肩关节和后束。",
        "小肌群细分：背阔肌、斜方肌中下束、菱形肌、后束三角肌、竖脊肌、肩袖肌群。",
        "动作重点：拉的时候先沉肩，再拉肘，避免全部用手臂硬拽。",
        "进阶规则：当划船重量增加时，身体角度不能乱，腰背不能代偿。"
      ],
      arms: [
        targetIntro,
        "训练定位：力量训练里的手臂训练重点是提升推拉动作中的肱三头肌、肱二头肌和前臂力量。",
        "主项1：窄距卧推，4组×4–6次，强化肱三头肌和推力。",
        "主项2：反手引体或反手下拉，4组×4–8次，强化肱二头肌和背部协同。",
        "辅助1：杠铃弯举，3组×6–10次。",
        "辅助2：绳索下压或臂屈伸，3组×8–12次。",
        "辅助3：锤式弯举，3组×8–12次，强化肱肌和前臂。",
        "小肌群细分：肱二头肌长头、肱二头肌短头、肱肌、肱三头肌长头、外侧头、内侧头、前臂屈伸肌群。",
        "训练重点：手臂训练不要靠甩，肘关节位置要稳定。",
        "进阶规则：优先增加动作控制和顶峰收缩，再增加重量。"
      ]
    },

    bodybuilding: {
      chest: [
        targetIntro,
        "训练定位：健美胸部训练重点是胸型、上胸饱满度、胸中缝控制和整体泵感。",
        "动作1：上斜哑铃卧推，4组×8–12次，重点刺激上胸。",
        "动作2：平板哑铃卧推或器械推胸，4组×8–12次，强化胸大肌整体厚度。",
        "动作3：夹胸或绳索飞鸟，3–4组×12–15次，控制离心，感受胸肌拉伸。",
        "动作4：双杠臂屈伸或下斜推胸，3组×8–12次，强化下胸。",
        "小肌群细分：上胸、胸中部、下胸、胸肌内侧控制、前三角、肱三头辅助。",
        "训练技巧：不要只追重量，胸部训练要关注肩胛固定、胸肌拉伸和收缩。",
        "强度建议：最后一个飞鸟动作可以接近力竭，但推类动作不要动作变形。",
        "增肌配合：训练后优先补充蛋白质和碳水。"
      ],
      legs: [
        targetIntro,
        "训练定位：健美腿部训练重点是股四头肌围度、臀腿线条、腘绳肌厚度和小腿完整度。",
        "动作1：腿举或深蹲，4组×8–12次，主打股四头肌和整体腿部容量。",
        "动作2：罗马尼亚硬拉，4组×8–12次，强化腘绳肌和臀部。",
        "动作3：腿屈伸，3–4组×12–15次，孤立股四头肌。",
        "动作4：腿弯举，3–4组×12–15次，孤立腘绳肌。",
        "动作5：臀桥或臀推，3–4组×8–12次，强化臀大肌。",
        "动作6：站姿或坐姿提踵，4组×12–20次，训练小腿。",
        "小肌群细分：股四头肌外侧头、内侧头、股直肌、腘绳肌、臀大肌、臀中肌、小腿腓肠肌和比目鱼肌。",
        "训练技巧：腿部训练容量大，动作间休息要足够，不要为了赶时间牺牲动作质量。"
      ],
      core: [
        targetIntro,
        "训练定位：健美核心训练重点是腰腹线条、腹肌控制、腹横肌收紧和体态稳定。",
        "动作1：绳索卷腹，4组×10–15次，重点感受腹直肌收缩。",
        "动作2：悬垂举腿或仰卧举腿，3–4组×8–12次，强化下腹控制。",
        "动作3：俄罗斯转体或绳索伐木，3组×12次/侧，训练腹斜肌。",
        "动作4：平板支撑，3组×45–60秒，训练整体稳定。",
        "小肌群细分：上腹、下腹、腹外斜肌、腹内斜肌、腹横肌、髋屈肌控制。",
        "训练技巧：腹部训练不要只是追求次数，要避免腰椎代偿。",
        "减脂提醒：腹肌显现主要靠体脂下降，训练负责厚度和控制。"
      ],
      back: [
        targetIntro,
        "训练定位：健美背部训练重点是背阔肌宽度、中背厚度、下背稳定和后束肩部线条。",
        "动作1：高位下拉或引体向上，4组×8–12次，主打背阔肌宽度。",
        "动作2：坐姿划船，4组×8–12次，强化中背厚度。",
        "动作3：单臂哑铃划船，3–4组×10–12次/侧，修正左右差异。",
        "动作4：直臂下拉，3组×12–15次，强化背阔肌收缩。",
        "动作5：面拉或反向飞鸟，3组×12–15次，强化后束和肩胛稳定。",
        "小肌群细分：背阔肌、大圆肌、菱形肌、斜方肌中下束、后束三角肌、竖脊肌。",
        "训练技巧：背部动作先用肘带动，不要只用手臂拉。",
        "进阶建议：背部训练要同时兼顾宽度和厚度。"
      ],
      arms: [
        targetIntro,
        "训练定位：健美手臂训练重点是手臂围度、二头峰、三头厚度和前臂线条。",
        "动作1：杠铃弯举，4组×8–12次，主打肱二头肌整体张力。",
        "动作2：上斜哑铃弯举，3组×10–12次，强化二头长头拉伸。",
        "动作3：锤式弯举，3组×10–12次，强化肱肌和前臂。",
        "动作4：绳索下压，4组×10–15次，刺激三头外侧头。",
        "动作5：过顶臂屈伸，3组×10–12次，强化三头长头。",
        "动作6：反握下压或窄距俯卧撑，3组×12–15次。",
        "小肌群细分：二头长头、二头短头、肱肌、三头长头、三头外侧头、三头内侧头、前臂屈肌群。",
        "训练技巧：手臂训练最怕借力甩，肘关节位置稳定比重量更重要。"
      ]
    },

    functional: {
      chest: [
        targetIntro,
        "训练定位：功能性胸部训练不是单纯练胸围，而是提升上肢推力、肩胛稳定、核心协同和日常推的能力。",
        "动作1：标准俯卧撑，4组×8–15次。",
        "动作2：斜板俯卧撑或爆发俯卧撑，3组×6–10次。",
        "动作3：单臂支撑触肩，3组×10次/侧，训练抗旋转。",
        "动作4：弹力带推胸，3组×12次，强化肩胛控制。",
        "小肌群细分：胸大肌、前三角、肱三头、前锯肌、肩胛稳定肌。",
        "训练重点：推的时候身体保持一条线，核心不能塌。"
      ],
      legs: [
        targetIntro,
        "训练定位：功能性腿部训练重点是髋膝踝控制、单腿稳定、弹性力量和日常运动能力。",
        "动作1：徒手深蹲，4组×12–15次。",
        "动作2：弓步蹲，3组×10次/侧。",
        "动作3：单腿罗马尼亚硬拉，3组×8–10次/侧。",
        "动作4：臀桥，3组×12–15次。",
        "动作5：小腿提踵，3组×15–20次。",
        "小肌群细分：臀大肌、臀中肌、股四头肌、腘绳肌、小腿、足踝稳定肌。",
        "训练重点：膝盖方向和脚尖一致，骨盆不要左右晃。"
      ],
      core: [
        targetIntro,
        "训练定位：功能性核心训练重点是抗伸展、抗旋转、抗侧屈和呼吸控制。",
        "动作1：Dead Bug，3组×10次/侧。",
        "动作2：Bird Dog，3组×10次/侧。",
        "动作3：Pallof Press，3组×12次/侧。",
        "动作4：侧桥，3组×30–45秒/侧。",
        "动作5：农夫走，4组×20–40米。",
        "小肌群细分：腹横肌、腹斜肌、腹直肌、竖脊肌、骨盆稳定肌、膈肌。",
        "训练重点：每个动作都要慢，核心稳定比动作数量更重要。"
      ],
      back: [
        targetIntro,
        "训练定位：功能性背部训练重点是肩胛控制、拉力、后链稳定和体态改善。",
        "动作1：弹力带划船，4组×12–15次。",
        "动作2：俯身Y-T-W，3组×8–12次。",
        "动作3：哑铃单臂划船，3组×10次/侧。",
        "动作4：面拉，3组×12–15次。",
        "动作5：臀桥或鸟狗，3组，强化后链协同。",
        "小肌群细分：背阔肌、菱形肌、斜方肌中下束、后束三角肌、肩袖、竖脊肌。",
        "训练重点：减少圆肩含胸，提升肩胛后缩和下沉能力。"
      ],
      arms: [
        targetIntro,
        "训练定位：功能性手臂训练重点是握力、肘关节稳定、推拉协同和日常搬抬能力。",
        "动作1：农夫走，4组×20–40米，训练握力和核心稳定。",
        "动作2：俯卧撑，3组×8–15次，训练推力和三头。",
        "动作3：弹力带弯举，3组×12–15次。",
        "动作4：弹力带下压，3组×12–15次。",
        "动作5：腕屈伸或毛巾握力训练，3组。",
        "小肌群细分：肱二头肌、肱三头肌、肱肌、前臂屈伸肌群、握力肌群。",
        "训练重点：手臂功能不是只看围度，还要看控制、稳定和耐力。"
      ]
    }
  };

  return plans[plan.training]?.[plan.bodyPart] || plans.functional.core;
}
function renderAdviceCards(items) {
  return `
    <div class="advice-card-list">
      ${items.map((item, index) => `
        <div class="advice-card">
          <div class="advice-index">${index + 1}</div>
          <div class="advice-content">${item}</div>
        </div>
      `).join("")}
    </div>
  `;
}
function renderProgressLine(label, current, target, unit) {
  const percent = target > 0 ? Math.min(current / target * 100, 120) : 0;
  const remaining = target - current;
  const remainText = remaining >= 0
    ? `还差${round1(remaining)}${unit}`
    : `已超${round1(Math.abs(remaining))}${unit}`;

  return `
    <div class="plan-progress-item">
      <div class="plan-progress-top">
        <span>${label}</span>
        <span>${round1(current)}/${round1(target)}${unit}，${remainText}</span>
      </div>
      <div class="plan-bar">
        <div class="plan-bar-fill" style="width:${Math.min(percent, 100)}%"></div>
      </div>
    </div>
  `;
}

function renderPlan(plan) {
  const totals = getDiaryTotals();
  const mealPlan = getMealPlan(plan);
  const trainingPlan = getTrainingPlan(plan);

  planResult.innerHTML = `
    <div class="plan-section">
  <h3>你的基础结果</h3>
  <div class="plan-cards">
    <div class="plan-mini-card">
      <p>BMR基础代谢</p >
      <strong>${plan.bmr}kcal</strong>
    </div>
    <div class="plan-mini-card">
      <p>TDEE总消耗</p >
      <strong>${plan.tdee}kcal</strong>
    </div>
    <div class="plan-mini-card">
      <p>目标热量</p >
      <strong>${plan.calories}kcal</strong>
    </div>
    <div class="plan-mini-card">
      <p>当前→目标</p >
      <strong>${plan.weight}→${plan.targetWeight}kg</strong>
    </div>
    <div class="plan-mini-card">
      <p>达标天数</p >
      <strong>${plan.targetDays}天</strong>
    </div>
  </div>

  <div class="plan-warning">
    目标变化：${plan.weightChange}kg；预计每周变化：${plan.weeklyChange}kg；每日热量调整：${plan.safeDailyAdjustment}kcal。目标强度：${plan.paceLevel}。${plan.paceWarning}
  </div>
</div>

    <div class="plan-section">
      <h3>每日营养目标</h3>
      <div class="plan-cards">
        <div class="plan-mini-card">
          <p>蛋白质</p >
          <strong>${plan.protein}g</strong>
        </div>
        <div class="plan-mini-card">
          <p>碳水</p >
          <strong>${plan.carbs}g</strong>
        </div>
        <div class="plan-mini-card">
          <p>脂肪</p >
          <strong>${plan.fat}g</strong>
        </div>
        <div class="plan-mini-card">
          <p>纤维</p >
          <strong>${plan.fiber}g</strong>
        </div>
        <div class="plan-mini-card">
          <p>训练频率</p >
          <strong>${plan.days}天/周</strong>
        </div>
      </div>
    </div>

    <div class="plan-section" id="planProgressSection">
      <h3>今日已吃进度</h3>
      ${renderProgressLine("热量", totals.kcal, plan.calories, "kcal")}
      ${renderProgressLine("蛋白质", totals.protein, plan.protein, "g")}
      ${renderProgressLine("碳水", totals.carbs, plan.carbs, "g")}
      ${renderProgressLine("脂肪", totals.fat, plan.fat, "g")}
      ${renderProgressLine("纤维", totals.fiber, plan.fiber, "g")}
    </div>

    <div class="plan-section">
  <h3>专业饮食策略</h3>
  ${renderAdviceCards(mealPlan)}
</div>

<div class="plan-section">
  <h3>今日训练安排</h3>
  ${renderAdviceCards(trainingPlan)}
</div>

    <div class="plan-warning">
      提醒：这是基于公式的基础估算。体重连续2周没有变化时，再微调每日热量100–200kcal。
    </div>
  `;
}

function updatePlanProgress() {
  if (!currentPlan || !planResult) return;
  renderPlan(currentPlan);
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function loadProfile() {
  const saved = JSON.parse(localStorage.getItem(PROFILE_KEY));

  if (!saved) return;

  profileGender.value = saved.gender || "male";
  profileAge.value = saved.age || "";
  profileHeight.value = saved.height || "";
  profileWeight.value = saved.weight || "";
  profileTargetWeight.value = saved.targetWeight || "";
profileTargetDays.value = saved.targetDays || "";
profileGoal.value = saved.goal || "maintain";
profileTraining.value = saved.training || "strength";
profileBodyPart.value = saved.bodyPart || "chest";
profileDays.value = saved.days || "3";
}

function initPlanCalculator() {
  if (!generatePlanBtn) return;

  loadProfile();

  if (currentPlan) {
    renderPlan(currentPlan);
  }

  generatePlanBtn.addEventListener("click", () => {
    const profile = {
      gender: profileGender.value,
      age: Number(profileAge.value),
      height: Number(profileHeight.value),
      weight: Number(profileWeight.value),
      targetWeight: Number(profileTargetWeight.value),
      targetDays: Number(profileTargetDays.value),
      goal: profileGoal.value,
      training: profileTraining.value,
      bodyPart: profileBodyPart.value,
      days: Number(profileDays.value)
    };

    if (!profile.age || profile.age <= 0) {
      alert("请输入正确年龄。");
      return;
    }

    if (!profile.height || profile.height <= 0) {
      alert("请输入正确身高。");
      return;
    }

    if (!profile.weight || profile.weight <= 0) {
      alert("请输入正确体重。");
      return;
    }
    if (!profile.targetWeight || profile.targetWeight <= 0) {
      alert("请输入正确目标体重。");
      return;
    }
    
    if (!profile.targetDays || profile.targetDays <= 0) {
      alert("请输入正确达标天数。");
      return;
    }
    const plan = calculateNutritionPlan(profile);

    currentPlan = plan;
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    saveProfile(profile);
    renderPlan(plan);
  });
}
function isChinese(text) {
  return /[\u4e00-\u9fff]/.test(text);
}

function getSearchTerms(keyword) {
  const text = keyword.trim().toLowerCase();
  const terms = [text];

  Object.keys(chineseSearchMap).forEach(zh => {
    if (keyword.includes(zh)) {
      chineseSearchMap[zh].forEach(en => terms.push(en.toLowerCase()));
    }
  });

  return [...new Set(terms)].filter(Boolean);
}

function getChineseName(food) {
  const name = String(food.name || "").toLowerCase();

  for (const rule of chineseNameRules) {
    const matched = rule.words.some(word => name.includes(word));
    if (matched) return rule.zh;
  }

  return "";
}

function getDisplayFoodName(food) {
    // 标准化食物：直接显示简单中文名/英文名
    // 比如中文模式显示“猕猴桃”，英文模式显示“Kiwi fruit”
    if (food.enName) {
      return currentLang === "zh" ? food.name : food.enName;
    }
  
    // USDA原始食物：能识别中文名就加中文辅助，不能识别就保留英文原名
    const original = food.name || "";
    const cn = getChineseName(food);
  
    if (currentLang === "zh") {
      if (cn) return `${cn}｜${original}`;
      return original;
    }
  
    return original;
  }

function inferChineseCategory(food) {
  const name = String(food.name || "").toLowerCase();

  if (name.includes("babyfood") || name.includes("infant") || name.includes("toddler")) return "婴幼儿食品";

  if (
    name.includes("chicken") ||
    name.includes("beef") ||
    name.includes("pork") ||
    name.includes("lamb") ||
    name.includes("turkey") ||
    name.includes("fish") ||
    name.includes("salmon") ||
    name.includes("cod") ||
    name.includes("tuna") ||
    name.includes("shrimp") ||
    name.includes("egg")
  ) {
    return "肉蛋鱼类";
  }

  if (
    name.includes("rice") ||
    name.includes("oat") ||
    name.includes("bread") ||
    name.includes("pasta") ||
    name.includes("noodle") ||
    name.includes("potato") ||
    name.includes("sweet potato") ||
    name.includes("corn") ||
    name.includes("cereal")
  ) {
    return "主食类";
  }

  if (
    name.includes("milk") ||
    name.includes("yogurt") ||
    name.includes("yoghurt") ||
    name.includes("cheese") ||
    name.includes("cream")
  ) {
    return "奶制品";
  }

  if (
    name.includes("apple") ||
    name.includes("banana") ||
    name.includes("berry") ||
    name.includes("blueberry") ||
    name.includes("strawberry") ||
    name.includes("kiwi") ||
    name.includes("mango") ||
    name.includes("orange") ||
    name.includes("grape") ||
    name.includes("pear") ||
    name.includes("pineapple") ||
    name.includes("watermelon") ||
    name.includes("peach") ||
    name.includes("cherry") ||
    name.includes("avocado")
  ) {
    return "水果类";
  }

  if (
    name.includes("broccoli") ||
    name.includes("tomato") ||
    name.includes("cucumber") ||
    name.includes("lettuce") ||
    name.includes("spinach") ||
    name.includes("carrot") ||
    name.includes("pepper") ||
    name.includes("vegetable")
  ) {
    return "蔬菜类";
  }

  if (
    name.includes("oil") ||
    name.includes("butter") ||
    name.includes("margarine")
  ) {
    return "油脂类";
  }

  if (
    name.includes("peanut") ||
    name.includes("walnut") ||
    name.includes("almond") ||
    name.includes("seed") ||
    name.includes("chia") ||
    name.includes("flax")
  ) {
    return "坚果种子类";
  }

  if (
    name.includes("juice") ||
    name.includes("coffee") ||
    name.includes("tea") ||
    name.includes("beverage") ||
    name.includes("drink")
  ) {
    return "饮品类";
  }

  if (
    name.includes("sauce") ||
    name.includes("salt") ||
    name.includes("sugar") ||
    name.includes("spice") ||
    name.includes("seasoning")
  ) {
    return "调味品类";
  }

  return "其他食品";
}

function getDisplayCategory(food) {
    // 标准化食物：直接显示我们设置好的中文分类
    if (food.enName) {
      return currentLang === "zh" ? food.category : "Standard food";
    }
  
    // USDA原始食物：继续用自动推断分类
    if (currentLang === "zh") {
      return inferChineseCategory(food);
    }
  
    return food.category || "Unknown";
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

function scoreFood(food, keyword, terms) {
  const name = String(food.name || "").toLowerCase();
  const raw = keyword.trim().toLowerCase();

  let score = 100;

  if (name === raw) score -= 80;
  if (name.startsWith(raw)) score -= 50;

  terms.forEach(term => {
    if (name === term) score -= 80;
    if (name.startsWith(term)) score -= 40;
    if (name.includes(term)) score -= 10;
  });

  if (name.includes("babyfood")) score += 80;
  if (name.includes("infant")) score += 80;
  if (name.includes("toddler")) score += 80;
  if (name.includes("junior")) score += 60;
  if (name.includes("strained")) score += 40;

  if (name.includes("raw")) score -= 5;
  if (name.includes("cooked")) score -= 5;

  return score;
}
// ===============================
// 标准化食物层v2：常见食物一个就是一个，特殊食物再查USDA全库
// ===============================

function R(name, enName, category, aliases, include, prefer = [], avoid = [], fallback = {}) {
    return { name, enName, category, aliases, include, prefer, avoid, fallback };
  }
  
  const standardFoodRules = [
    R("鸡蛋", "Egg", "肉蛋鱼类", ["鸡蛋", "蛋", "水煮蛋", "egg"], ["egg"], ["whole", "raw"], ["babyfood", "substitute", "powder", "sandwich"], { kcal: 143, protein: 12.6, carbs: 1.1, fat: 9.5, fiber: 0 }),
    R("蛋白", "Egg white", "肉蛋鱼类", ["蛋白", "鸡蛋白", "egg white"], ["egg", "white"], ["raw"], ["babyfood"], { kcal: 52, protein: 10.9, carbs: 0.7, fat: 0.2, fiber: 0 }),
    R("蛋黄", "Egg yolk", "肉蛋鱼类", ["蛋黄", "鸡蛋黄", "egg yolk"], ["egg", "yolk"], ["raw"], ["babyfood"], { kcal: 322, protein: 15.9, carbs: 3.6, fat: 26.5, fiber: 0 }),
  
    R("鸡胸肉", "Chicken breast", "肉蛋鱼类", ["鸡胸", "鸡胸肉", "chicken breast"], ["chicken", "breast"], ["raw", "meat only"], ["babyfood", "breaded", "fried", "sandwich"], { kcal: 120, protein: 23, carbs: 0, fat: 2, fiber: 0 }),
    R("去皮鸡腿肉", "Chicken thigh without skin", "肉蛋鱼类", ["鸡腿", "鸡腿肉", "去皮鸡腿", "chicken thigh", "chicken leg"], ["chicken", "thigh"], ["meat only", "without skin", "raw"], ["fried", "breaded", "babyfood"], { kcal: 150, protein: 18, carbs: 0, fat: 8, fiber: 0 }),
    R("带皮鸡腿肉", "Chicken thigh with skin", "肉蛋鱼类", ["带皮鸡腿", "带皮鸡腿肉", "chicken thigh with skin"], ["chicken", "thigh"], ["with skin", "raw"], ["fried", "breaded", "babyfood"], { kcal: 220, protein: 17, carbs: 0, fat: 16, fiber: 0 }),
    R("鸡翅", "Chicken wing", "肉蛋鱼类", ["鸡翅", "chicken wing"], ["chicken", "wing"], ["raw"], ["fried", "breaded", "babyfood"], { kcal: 210, protein: 19, carbs: 0, fat: 14, fiber: 0 }),
  
    R("瘦牛肉", "Lean beef", "肉蛋鱼类", ["牛肉", "瘦牛肉", "beef"], ["beef"], ["lean", "raw"], ["babyfood", "jerky", "sausage"], { kcal: 160, protein: 20, carbs: 0, fat: 8, fiber: 0 }),
    R("猪瘦肉", "Lean pork", "肉蛋鱼类", ["猪肉", "瘦猪肉", "pork"], ["pork"], ["lean", "raw"], ["babyfood", "sausage", "bacon"], { kcal: 150, protein: 20, carbs: 0, fat: 7, fiber: 0 }),
    R("羊肉", "Lamb", "肉蛋鱼类", ["羊肉", "lamb", "mutton"], ["lamb"], ["raw"], ["babyfood"], { kcal: 200, protein: 19, carbs: 0, fat: 13, fiber: 0 }),
  
    R("三文鱼", "Salmon", "肉蛋鱼类", ["三文鱼", "鲑鱼", "salmon"], ["salmon"], ["raw"], ["smoked", "babyfood"], { kcal: 200, protein: 20, carbs: 0, fat: 13, fiber: 0 }),
    R("鳕鱼", "Cod", "肉蛋鱼类", ["鳕鱼", "cod"], ["cod"], ["raw"], ["babyfood"], { kcal: 90, protein: 20, carbs: 0, fat: 1, fiber: 0 }),
    R("金枪鱼", "Tuna", "肉蛋鱼类", ["金枪鱼", "tuna"], ["tuna"], ["water"], ["oil", "babyfood"], { kcal: 110, protein: 25, carbs: 0, fat: 1, fiber: 0 }),
    R("鲭鱼", "Mackerel", "肉蛋鱼类", ["鲭鱼", "青花鱼", "mackerel"], ["mackerel"], ["raw"], ["babyfood"], { kcal: 205, protein: 19, carbs: 0, fat: 14, fiber: 0 }),
    R("虾仁", "Shrimp", "肉蛋鱼类", ["虾", "虾仁", "shrimp"], ["shrimp"], ["raw"], ["breaded", "fried"], { kcal: 100, protein: 20, carbs: 1, fat: 1, fiber: 0 }),
  
    R("米饭", "Cooked white rice", "主食类", ["米饭", "白米饭", "熟米饭", "rice"], ["rice"], ["white", "cooked"], ["babyfood", "cereal"], { kcal: 116, protein: 2.6, carbs: 25.9, fat: 0.3, fiber: 0.3 }),
    R("糙米饭", "Brown rice", "主食类", ["糙米", "糙米饭", "brown rice"], ["brown", "rice"], ["cooked"], ["babyfood"], { kcal: 120, protein: 2.7, carbs: 25.6, fat: 1, fiber: 1.8 }),
    R("燕麦", "Oats", "主食类", ["燕麦", "燕麦片", "oat", "oats", "oatmeal"], ["oat"], ["dry"], ["babyfood", "cookie"], { kcal: 370, protein: 13, carbs: 60, fat: 7, fiber: 10 }),
    R("藜麦", "Quinoa", "主食类", ["藜麦", "quinoa"], ["quinoa"], ["cooked"], ["babyfood"], { kcal: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8 }),
    R("面条", "Noodles", "主食类", ["面条", "noodle", "noodles"], ["noodle"], ["cooked"], ["instant"], { kcal: 110, protein: 3.5, carbs: 22, fat: 0.8, fiber: 1 }),
    R("意面", "Pasta", "主食类", ["意面", "意大利面", "pasta"], ["pasta"], ["cooked"], ["sauce"], { kcal: 130, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8 }),
    R("全麦面包", "Whole wheat bread", "主食类", ["全麦面包", "全麦吐司", "whole wheat bread"], ["whole", "wheat", "bread"], [], ["cookie", "cake"], { kcal: 250, protein: 9, carbs: 43, fat: 4, fiber: 6 }),
    R("白面包", "White bread", "主食类", ["白面包", "吐司", "white bread"], ["white", "bread"], [], ["cookie", "cake"], { kcal: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7 }),
  
    R("土豆", "Potato", "主食类", ["土豆", "马铃薯", "potato"], ["potato"], ["raw"], ["chips", "fried", "babyfood"], { kcal: 80, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2 }),
    R("红薯", "Sweet potato", "主食类", ["红薯", "番薯", "地瓜", "sweet potato"], ["sweet", "potato"], ["raw"], ["babyfood", "chips"], { kcal: 90, protein: 1.5, carbs: 21, fat: 0.2, fiber: 3 }),
    R("玉米", "Corn", "主食类", ["玉米", "corn"], ["corn"], ["sweet"], ["chips", "oil", "syrup"], { kcal: 110, protein: 3.4, carbs: 23, fat: 1.2, fiber: 2.7 }),
    R("南瓜", "Pumpkin", "主食类", ["南瓜", "pumpkin"], ["pumpkin"], ["raw"], ["pie"], { kcal: 45, protein: 1, carbs: 11, fat: 0.1, fiber: 2 }),
  
    R("豆腐", "Tofu", "豆类豆制品", ["豆腐", "tofu"], ["tofu"], ["firm"], ["dessert"], { kcal: 80, protein: 8, carbs: 2, fat: 5, fiber: 1 }),
    R("豆浆", "Soy milk", "豆类豆制品", ["豆浆", "soy milk", "soymilk"], ["soy", "milk"], ["unsweetened"], ["chocolate"], { kcal: 45, protein: 3.3, carbs: 3, fat: 2, fiber: 0.5 }),
    R("鹰嘴豆", "Chickpeas", "豆类豆制品", ["鹰嘴豆", "chickpea", "chickpeas"], ["chickpea"], ["cooked"], ["snack"], { kcal: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fiber: 7.6 }),
    R("黑豆", "Black beans", "豆类豆制品", ["黑豆", "black beans"], ["black", "beans"], ["cooked"], ["sauce"], { kcal: 132, protein: 8.9, carbs: 23.7, fat: 0.5, fiber: 8.7 }),
    R("扁豆", "Lentils", "豆类豆制品", ["扁豆", "lentil", "lentils"], ["lentil"], ["cooked"], [], { kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9 }),
  
    R("牛奶", "Milk", "奶制品", ["牛奶", "纯牛奶", "全脂牛奶", "milk"], ["milk"], ["whole"], ["chocolate", "babyfood"], { kcal: 65, protein: 3.3, carbs: 5, fat: 3.5, fiber: 0 }),
    R("脱脂牛奶", "Skim milk", "奶制品", ["脱脂牛奶", "skim milk"], ["milk"], ["skim"], ["chocolate"], { kcal: 34, protein: 3.4, carbs: 5, fat: 0.1, fiber: 0 }),
    R("无糖酸奶", "Plain yogurt", "奶制品", ["酸奶", "无糖酸奶", "原味酸奶", "yogurt"], ["yogurt"], ["plain"], ["sweetened", "flavored", "babyfood"], { kcal: 65, protein: 3.5, carbs: 5, fat: 3.5, fiber: 0 }),
    R("希腊酸奶", "Greek yogurt", "奶制品", ["希腊酸奶", "greek yogurt"], ["greek", "yogurt"], ["plain"], ["flavored"], { kcal: 90, protein: 9, carbs: 4, fat: 4, fiber: 0 }),
    R("奶酪", "Cheese", "奶制品", ["奶酪", "芝士", "cheese"], ["cheese"], ["cheddar"], ["cake", "sauce"], { kcal: 400, protein: 25, carbs: 1.3, fat: 33, fiber: 0 }),
    R("全脂奶粉", "Whole milk powder", "奶制品", ["奶粉", "全脂奶粉", "milk powder"], ["milk", "powder"], ["whole"], [], { kcal: 500, protein: 25, carbs: 38, fat: 27, fiber: 0 }),
  
    R("苹果", "Apple", "水果类", ["苹果", "apple"], ["apple"], ["raw"], ["juice", "pie", "babyfood"], { kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 }),
    R("香蕉", "Banana", "水果类", ["香蕉", "banana"], ["banana"], ["raw"], ["chips", "babyfood"], { kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 }),
    R("蓝莓", "Blueberry", "水果类", ["蓝莓", "blueberry", "blueberries"], ["blueberry"], ["raw"], ["muffin", "jam"], { kcal: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4 }),
    R("草莓", "Strawberry", "水果类", ["草莓", "strawberry", "strawberries"], ["strawberry"], ["raw"], ["jam", "syrup"], { kcal: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2 }),
    R("猕猴桃", "Kiwi fruit", "水果类", ["猕猴桃", "奇异果", "kiwi", "kiwifruit"], ["kiwi"], ["raw"], ["babyfood"], { kcal: 61, protein: 1.1, carbs: 15, fat: 0.5, fiber: 3 }),
    R("芒果", "Mango", "水果类", ["芒果", "mango"], ["mango"], ["raw"], ["dried", "juice", "babyfood"], { kcal: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6 }),
    R("橙子", "Orange", "水果类", ["橙子", "橙", "orange"], ["orange"], ["raw"], ["juice"], { kcal: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4 }),
    R("葡萄", "Grapes", "水果类", ["葡萄", "grape", "grapes"], ["grape"], ["raw"], ["juice", "raisin"], { kcal: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9 }),
    R("梨", "Pear", "水果类", ["梨", "梨子", "pear"], ["pear"], ["raw"], ["juice", "babyfood"], { kcal: 57, protein: 0.4, carbs: 15, fat: 0.1, fiber: 3.1 }),
    R("西瓜", "Watermelon", "水果类", ["西瓜", "watermelon"], ["watermelon"], ["raw"], [], { kcal: 30, protein: 0.6, carbs: 8, fat: 0.2, fiber: 0.4 }),
    R("菠萝", "Pineapple", "水果类", ["菠萝", "凤梨", "pineapple"], ["pineapple"], ["raw"], ["juice", "canned"], { kcal: 50, protein: 0.5, carbs: 13, fat: 0.1, fiber: 1.4 }),
    R("桃子", "Peach", "水果类", ["桃子", "peach"], ["peach"], ["raw"], ["canned"], { kcal: 39, protein: 0.9, carbs: 10, fat: 0.3, fiber: 1.5 }),
    R("樱桃", "Cherry", "水果类", ["樱桃", "车厘子", "cherry", "cherries"], ["cherry"], ["raw"], ["pie", "canned"], { kcal: 63, protein: 1.1, carbs: 16, fat: 0.2, fiber: 2.1 }),
    R("牛油果", "Avocado", "水果类", ["牛油果", "avocado"], ["avocado"], ["raw"], ["oil"], { kcal: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 }),
    R("火龙果", "Dragon fruit", "水果类", ["火龙果", "dragon fruit", "pitaya"], ["dragon", "fruit"], ["raw"], [], { kcal: 60, protein: 1.2, carbs: 13, fat: 0.4, fiber: 3 }),
  
    R("西兰花", "Broccoli", "蔬菜类", ["西兰花", "broccoli"], ["broccoli"], ["raw"], ["babyfood"], { kcal: 34, protein: 2.8, carbs: 6.6, fat: 0.4, fiber: 2.6 }),
    R("番茄", "Tomato", "蔬菜类", ["番茄", "西红柿", "tomato"], ["tomato"], ["raw"], ["sauce", "juice"], { kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 }),
    R("黄瓜", "Cucumber", "蔬菜类", ["黄瓜", "cucumber"], ["cucumber"], ["raw"], ["pickle"], { kcal: 16, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5 }),
    R("生菜", "Lettuce", "蔬菜类", ["生菜", "lettuce"], ["lettuce"], ["raw"], [], { kcal: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3 }),
    R("菠菜", "Spinach", "蔬菜类", ["菠菜", "spinach"], ["spinach"], ["raw"], ["babyfood"], { kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 }),
    R("彩椒", "Bell pepper", "蔬菜类", ["彩椒", "甜椒", "bell pepper", "pepper"], ["pepper"], ["sweet", "raw"], ["hot", "sauce"], { kcal: 30, protein: 1, carbs: 6, fat: 0.2, fiber: 2 }),
    R("胡萝卜", "Carrot", "蔬菜类", ["胡萝卜", "carrot"], ["carrot"], ["raw"], ["babyfood"], { kcal: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8 }),
    R("蘑菇", "Mushroom", "蔬菜类", ["蘑菇", "mushroom"], ["mushroom"], ["raw"], ["soup"], { kcal: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1 }),
    R("洋葱", "Onion", "蔬菜类", ["洋葱", "onion"], ["onion"], ["raw"], ["rings"], { kcal: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 }),
    R("卷心菜", "Cabbage", "蔬菜类", ["卷心菜", "包菜", "cabbage"], ["cabbage"], ["raw"], [], { kcal: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5 }),
  
    R("杏仁", "Almonds", "坚果种子类", ["杏仁", "almond", "almonds"], ["almond"], ["raw"], ["paste", "butter", "chocolate", "candy", "honey", "salted", "flavored"], { kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5 }),
    R("核桃", "Walnuts", "坚果种子类", ["核桃", "walnut", "walnuts"], ["walnut"], ["raw"], ["oil", "cake"], { kcal: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7 }),
    R("花生", "Peanuts", "坚果种子类", ["花生", "peanut", "peanuts"], ["peanut"], ["raw"], ["butter", "candy", "oil"], { kcal: 567, protein: 25, carbs: 16, fat: 49, fiber: 8.5 }),
    R("腰果", "Cashews", "坚果种子类", ["腰果", "cashew", "cashews"], ["cashew"], ["raw"], ["butter", "salted"], { kcal: 553, protein: 18, carbs: 30, fat: 44, fiber: 3.3 }),
    R("开心果", "Pistachios", "坚果种子类", ["开心果", "pistachio", "pistachios"], ["pistachio"], ["raw"], ["salted"], { kcal: 560, protein: 20, carbs: 28, fat: 45, fiber: 10 }),
    R("奇亚籽", "Chia seeds", "坚果种子类", ["奇亚籽", "chia", "chia seeds"], ["chia"], [], [], { kcal: 486, protein: 16.5, carbs: 42, fat: 31, fiber: 34 }),
    R("亚麻籽粉", "Ground flaxseed", "坚果种子类", ["亚麻籽", "亚麻籽粉", "flaxseed"], ["flax"], ["ground"], [], { kcal: 534, protein: 18, carbs: 29, fat: 42, fiber: 27 }),
    R("芝麻", "Sesame seeds", "坚果种子类", ["芝麻", "sesame"], ["sesame"], ["seed"], ["oil"], { kcal: 573, protein: 17, carbs: 23, fat: 50, fiber: 11.8 }),
  
    R("橄榄油", "Olive oil", "油脂类", ["橄榄油", "olive oil"], ["olive", "oil"], [], [], { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 }),
    R("黄油", "Butter", "油脂类", ["黄油", "butter"], ["butter"], [], ["peanut"], { kcal: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0 }),
    R("花生酱", "Peanut butter", "油脂类", ["花生酱", "peanut butter"], ["peanut", "butter"], [], [], { kcal: 588, protein: 25, carbs: 20, fat: 50, fiber: 6 }),
  
    R("乳清蛋白粉", "Whey protein powder", "补剂", ["乳清蛋白", "乳清蛋白粉", "whey protein"], ["whey", "protein"], ["powder"], [], { kcal: 390, protein: 75, carbs: 8, fat: 5, fiber: 0 }),
    R("酵母蛋白粉80%", "Yeast protein powder 80%", "补剂", ["酵母蛋白", "酵母蛋白粉", "yeast protein"], ["yeast", "protein"], ["powder"], [], { kcal: 390, protein: 80, carbs: 6, fat: 3, fiber: 0 })
  ];
  
  function candidateHasTerms(food, terms) {
    const name = String(food.name || "").toLowerCase();
    return terms.every(term => name.includes(term.toLowerCase()));
  }
  
  function scoreStandardCandidate(food, rule) {
    const name = String(food.name || "").toLowerCase();
    let score = name.length;
  
    rule.prefer.forEach(word => {
      if (name.includes(word.toLowerCase())) score -= 30;
    });
  
    rule.avoid.forEach(word => {
      if (name.includes(word.toLowerCase())) score += 80;
    });
  
    if (name.includes("raw")) score -= 8;
    if (name.includes("cooked")) score -= 6;
    if (name.includes("fresh")) score -= 5;
  
    if (!food.kcal || food.kcal <= 0) score += 200;
  
    return score;
  }
  
  function buildStandardFood(rule) {
    const candidates = defaultFoodDatabase
      .filter(food => candidateHasTerms(food, rule.include))
      .sort((a, b) => scoreStandardCandidate(a, rule) - scoreStandardCandidate(b, rule));
  
    const best = candidates[0];
  
    return {
      name: rule.name,
      enName: rule.enName,
      category: rule.category,
      aliases: rule.aliases,
      kcal: best ? safeValue(best.kcal) : safeValue(rule.fallback.kcal),
      protein: best ? safeValue(best.protein) : safeValue(rule.fallback.protein),
      carbs: best ? safeValue(best.carbs) : safeValue(rule.fallback.carbs),
      fat: best ? safeValue(best.fat) : safeValue(rule.fallback.fat),
      fiber: best ? safeValue(best.fiber) : safeValue(rule.fallback.fiber),
      sourceName: best ? best.name : "estimated"
    };
  }
  
  const standardFoodDatabase = standardFoodRules.map(buildStandardFood);
  
  function searchStandardFoods(keyword) {
    const text = keyword.trim().toLowerCase();
    if (!text) return [];
  
    return standardFoodDatabase.filter(food => {
      const nameMatch = food.name.toLowerCase().includes(text) || food.enName.toLowerCase().includes(text);
      const aliasMatch = food.aliases.some(alias => {
        const a = alias.toLowerCase();
        return a.includes(text) || text.includes(a);
      });
  
      return nameMatch || aliasMatch;
    });
  }
  function searchFoods(keyword) {
    const text = keyword.trim();
  
    if (!text) return [];
  
    // 高级查法：输入usda:关键词，强制查看USDA细分结果
    // 比如 usda:almond 可以看到杏仁酱、盐焗杏仁、巧克力杏仁等详细数据
    if (text.toLowerCase().startsWith("usda:")) {
      const realKeyword = text.slice(5).trim();
      const terms = getSearchTerms(realKeyword);
  
      return defaultFoodDatabase
        .filter(food => {
          const name = String(food.name || "").toLowerCase();
          const category = String(food.category || "").toLowerCase();
  
          return terms.some(term => name.includes(term) || category.includes(term));
        })
        .map(food => ({ food, score: scoreFood(food, realKeyword, terms) }))
        .sort((a, b) => a.score - b.score)
        .map(item => item.food)
        .slice(0, 50);
    }
  
    const standardResults = searchStandardFoods(text);
  
    // 常见食物默认只显示标准化结果
    if (standardResults.length > 0) {
      return standardResults;
    }
  
    // 标准库没有，再查USDA全库
    const terms = getSearchTerms(text);
  
    return defaultFoodDatabase
      .filter(food => {
        const name = String(food.name || "").toLowerCase();
        const category = String(food.category || "").toLowerCase();
  
        return terms.some(term => name.includes(term) || category.includes(term));
      })
      .map(food => ({ food, score: scoreFood(food, text, terms) }))
      .sort((a, b) => a.score - b.score)
      .map(item => item.food)
      .slice(0, 50);
  }

function renderSearchResults(keyword) {
  const results = searchFoods(keyword);

  searchResults.innerHTML = "";

  if (!keyword.trim()) {
    searchResults.style.display = "none";
    return;
  }

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
        ${getDisplayCategory(food)}｜
        ${round1(food.kcal)}kcal/100g｜
        ${t("protein")}${round1(food.protein)}g｜
        ${t("carbs")}${round1(food.carbs)}g｜
        ${t("fat")}${round1(food.fat)}g｜
        ${t("fiber")}${round1(food.fiber)}g
      </span>
    `;

    div.addEventListener("click", () => fillFoodForm(food));
    searchResults.appendChild(div);
  });
}

function groupFoodsByCategory() {
  const groups = new Map();

  defaultFoodDatabase.forEach(food => {
    const category = currentLang === "zh" ? inferChineseCategory(food) : (food.category || "Unknown");

    if (!groups.has(category)) {
      groups.set(category, []);
    }

    groups.get(category).push(food);
  });

  return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

function renderCategoryList() {
  // 左侧食品分类已移除，这里保留空函数，防止旧代码调用时报错。
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

function renderDiary() {
  foodList.innerHTML = "";

  if (diary.length === 0) {
    foodList.innerHTML = `<p class="empty">${t("emptyList")}</p>`;

    totalKcal.textContent = "0";
    totalProtein.textContent = "0";
    totalCarbs.textContent = "0";
    totalFat.textContent = "0";
    totalFiber.textContent = "0";updatePlanProgress();
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

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      diary.splice(index, 1);
      saveDiary();
      renderDiary();
    });
  });updatePlanProgress();
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

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    localStorage.setItem(LANG_KEY, currentLang);
    applyLanguage();
  });
}

document.addEventListener("click", event => {
  if (!event.target.closest(".form-section")) {
    searchResults.style.display = "none";
  }
});
initPlanCalculator();
applyLanguage();