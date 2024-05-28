"use strict";
// Selector
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const calcBMIBtn = document.getElementById("bmi-btn");
const tableBodyEl = document.getElementById("tbody");

// let petArr = JSON.parse(localStorage.getItem("petArr"));
// let petArr = getFromStorage("petArr") ?? "[]";
console.log(petArr);
console.log(breedArr);
typeInput.addEventListener("click", renderBreed);

// Hiện thi loai cho Cat Dog
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  console.log("day la ham renderbreed");

  // Neu la Dog
  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");

    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
    // neu la Cat
  } else if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter((breed) => breed.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
      console.log(option);
    });
  }
}
// Submit
submitBtn.addEventListener("click", function () {
  // Lấy input
  let data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: new Date(),
  };

  // Validate dữ liệu
  const validate = validateData(data);
  if (validate) {
    // Thêm thú cưng vào danh sách
    petArr.push(data);
    //  thêm dòng sau để lưu dữ liệu xuống LocalStorage
    saveToStorage("petArr", petArr);
    // Hiển thị danh sách thú cưng
    renderTableData();
    // Xóa các dữ liệu nhập trong Form Input
    clearInput();
  }
});
function validateData(data) {
  // //   Không có trường nào bị nhập thiếu dữ liệu.
  let isValidate = true;
  // Giá trị ID không được trùng với các thú cưng còn lại.
  if (data.id.trim() === "") {
    alert("ID must fill in!");
    isValidate = false;
  }
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      isValidate = false;
      break;
    }
  }
  // Giá trị name không để trống
  if (data.name.trim() === "") {
    alert("Name must fill in!");
    isValidate = false;
  }
  // Trường Age chỉ được nhập giá trị trong khoảng 1 đến 15.
  if (isNaN(data.age) || data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  // Trường Weight chỉ được nhập giá trị trong khoảng 1 đến 15.
  if (isNaN(data.weight) || data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }
  // Trường Length chỉ được nhập giá trị trong khoảng 1 đến 100.
  if (isNaN(data.length) || data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  // Bắt buộc phải chọn giá trị cho trường Type.
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  // Bắt buộc phải chọn giá trị cho trường Breed.
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }
  return isValidate;
}

// Hiển thị danh sách thú cưng
function renderTableData() {
  // Xóa nội dụng hiện có của bảng
  tableBodyEl.innerHTML = "";

  // Duyệt qua các phần tử trong petArr
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    const date = petArr[i].date instanceof Date ? petArr[i].date : new Date(); // Kiểm tra xem `date` có tồn tại không
    const dateFormatted = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    row.innerHTML = `
                <th scope="row">${petArr[i].id}</th>
                <td>${petArr[i].name}</td>
                <td>${petArr[i].age}</td>
                <td>${petArr[i].type}</td>
                <td>${petArr[i].weight} kg</td>
                <td>${petArr[i].length} cm</td>
                <td>${petArr[i].breed}</td>
                <td>
                  <i class="bi bi-square-fill" 
                  style="color: ${petArr[i].color}"></i>
                </td>
                <td>
                  <i class="bi ${
                    petArr[i].vaccinated
                      ? "bi-check-circle-fill"
                      : "bi-x-circle-fill"
                  }"></i>
                </td>
                <td>
                  <i class="bi ${
                    petArr[i].dewormed
                      ? "bi-check-circle-fill"
                      : "bi-x-circle-fill"
                  }"></i>
                </td>
                <td>
                  <i class="bi ${
                    petArr[i].sterilized
                      ? "bi-check-circle-fill"
                      : "bi-x-circle-fill"
                  }"></i>
                  </td>
                   ${dateFormatted}
                
                <td>
                <button class="btn btn-danger" onclick="deletePet('${
                  petArr[i].id
                }')">Delete</button>
                </td>
    `;
    tableBodyEl.appendChild(row);
  }
}

// Xoó thông tin thú cưng
function deletePet(petID) {
  const isDelete = confirm("Are you sure?");
  if (isDelete) {
    for (let i = 0; i < petArr.length; i++) {
      if (petID === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
      }
    }
  }
}

// Xóa dữ liệu nhập trên form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Hiển thị thú cưng khỏe mạnh

let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    // Lọc thú cưng khỏe mạnh
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (
        petArr[i].vaccinated === true &&
        petArr[i].dewormed === true &&
        petArr[i].sterilized === true
      ) {
        healthyPetArr.push(petArr[i]);
      }
    }
    // Hiển thị ra màn hình
    renderTableData(healthyPetArr);
    // Đổi tên nút thành 'Show all pet'
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Heahthy Pet";
    healthyCheck = true;
  }
});
// ${petArr[i].date.getDate()}/
// ${petArr[i].date.getMonth()}/
// ${petArr[i].date.getFullYear()}
