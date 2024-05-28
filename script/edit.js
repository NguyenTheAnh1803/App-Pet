"use strict";

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

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

const btnSubmit = document.querySelector("#submit-btn");

renderTableData(petArr);

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
                <button type="button" id ="edit" class="btn btn-warning" onclick="startEditPet('${
                  petArr[i].id
                }')">Edit</button>
                </td>
    `;
    tableBodyEl.appendChild(row);
  }
}

// Hàm chỉnh thông số thú cưng
function startEditPet(petId) {
  //hien du lieu chinh sua
  formEl.classList.remove("hide");
  // Tim du lieu pet can edit
  const pet = petArr.find((petItem) => (petItem.id = petId));
  // thong tin chinh sua
  idInput.value = petId;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  // hien thi tung loai thu cung Dog - Cat
  renderBreed();

  breedInput.value = `${pet.breed}`;
}
typeInput.addEventListener("click", renderBreed);

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
btnSubmit.addEventListener("click", function () {
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

    // date: new Date(),
  };

  // Validate dữ liệu
  const validate = validateData(data);
  if (validate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    // Thêm thú cưng vào danh sách
    petArr[index] = data;
    //  thêm dòng sau để lưu dữ liệu xuống LocalStorage
    saveToStorage("petArr", petArr);
    // Hiển thị danh sách thú cưng
    formEl.classList.add("hide");
    renderTableData();
  }
});
function validateData(data) {
  // //   Không có trường nào bị nhập thiếu dữ liệu.
  let isValidate = true;
  // Giá trị ID không được trùng với các thú cưng còn lại.

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
