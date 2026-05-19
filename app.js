const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const categoryList = document.getElementById("categoryList");

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
const MAX_SIDEBAR_ITEMS_PER_CATEGORY = 200;

let diary = JSON.parse(localStorage.getItem(DIARY_KEY)) || [];

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

function fillFoodForm(food) {
  foodName.value = food.name || "";
  foodKcal.value = safeValue(food.kcal);
  foodProtein.value = safeValue(food.protein);
  foodCarbs.value = safeValue(food.carbs);
  foodFat.value = safeValue(food.fat);
  foodFiber.value = safeValue(food.fiber);

  searchResults.style.display = "none";
  searchInput.value = food.name || "";
}

function renderSearchResults(keyword) {
  const text = keyword.trim().toLowerCase();

  if (!text) {
    searchResults.style.display = "none";
    searchResults.innerHTML = "";
    return;
  }

  const results = defaultFoodDatabase
    .filter(food => {
      const name = String(food.name || "").toLowerCase();
      const category = String(food.category || "").toLowerCase();
      return name.includes(text) || category.includes(text);
    })
    .slice(0, 20);

  searchResults.innerHTML = "";

  if (results.length === 0) {
    searchResults.style.display = "block";
    searchResults.innerHTML = `
      <div class="search-item">
        <strong>没有找到结果</strong>
        <span>可以换英文关键词，比如chicken、rice、potato、egg、milk。</span>
      </div>
    `;
    return;
  }

  searchResults.style.display = "block";

  results.forEach(food => {
    const div = document.createElement("div");
    div.className = "search-item";

    div.innerHTML = `
      <strong>${food.name}</strong>
      <span>
        ${food.category || "Unknown"}｜
        ${round1(food.kcal)}kcal/100g｜
        蛋白${round1(food.protein)}g｜
        碳水${round1(food.carbs)}g｜
        脂肪${round1(food.fat)}g｜
        纤维${round1(food.fiber)}g
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
    const category = food.category || "未分类";

    if (!groups.has(category)) {
      groups.set(category, []);
    }

    groups.get(category).push(food);
  });

  return Array.from(groups.entries())
    .sort((a, b) => a[0].localeCompare(b[0]));
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
      <div class="sidebar-food-name">${food.name}</div>
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
    note.textContent = `该分类共有${foods.length}条，为避免页面卡顿，左侧只展示前${MAX_SIDEBAR_ITEMS_PER_CATEGORY}条。想找更多请用右侧搜索框。`;
    container.appendChild(note);
  }
}

function renderDiary() {
  foodList.innerHTML = "";

  if (diary.length === 0) {
    foodList.innerHTML = `<p class="empty">还没有添加食物。</p >`;

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
      <div class="food-info">蛋白${round1(item.totalProtein)}g</div>
      <div class="food-info">碳水${round1(item.totalCarbs)}g</div>
      <div class="food-info">脂肪${round1(item.totalFat)}g</div>
      <div class="food-info">纤维${round1(item.totalFiber)}g</div>
      <button class="delete-btn" data-index="${index}">删除</button>
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
    alert("请先选择或输入食物名称。");
    return;
  }

  if (!weight || weight <= 0) {
    alert("请输入正确的食物重量。");
    return;
  }

  if (!kcal || kcal <= 0) {
    alert("请输入正确的每100g热量。");
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
  const ok = confirm("确定清空今日饮食记录吗？");
  if (!ok) return;

  diary = [];
  saveDiary();
  renderDiary();
});

document.addEventListener("click", event => {
  if (!event.target.closest(".form-section")) {
    searchResults.style.display = "none";
  }
});

renderCategoryList();
renderDiary();