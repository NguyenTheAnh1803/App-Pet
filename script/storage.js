/// Hàm lưu dữ liệu xuống LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu từ LocalStorage
function getFromStorage(key, defaultVal) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
}

const data1 = {
  id: "P001",
  name: "TheAnh",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "#000",
  breed: "Tabby",
  vaccinated: true,
  dewormed: false,
  sterilized: true,
  date: new Date(),
};
const data2 = {
  id: "P002",
  name: "Luyn",
  age: 3,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "#000",
  breed: "Tabby",
  vaccinated: true,
  dewormed: false,
  sterilized: true,
  date: new Date(),
};
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");
const breed1 = {
  breed: "TheAnh",
  type: "Cat",
};
const breed2 = {
  breed: "Luyn",
  type: "Cat",
};
const breed3 = {
  breed: "Mix",
  type: "Dog",
};
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed3]);
}
let breedArr = getFromStorage("breedArr");
