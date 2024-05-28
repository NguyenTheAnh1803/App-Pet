"use strict";

const btn = document.getElementById("submit-btn");

const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");

const tableBodyEl = document.getElementById("tbody");

renderTable(breedArr);
btn.addEventListener("click", function () {
  let data = {
    type: typeInput.value,
    breed: breedInput.value,
  };

  const isValidated = validate(data);
  if (isValidated) {
    breedArr.push(data);
    //  thêm dòng sau để lưu dữ liệu xuống LocalStorage
    saveToStorage("breedArr", breedArr);
    // Hiển thị danh sách thú cưng
    renderTable(breedArr);
    // Xóa các dữ liệu nhập trong Form Input
    clearInput();
  }
});

function renderTable() {
  // Xóa nội dụng hiện có của bảng
  tableBodyEl.innerHTML = "";

  // Duyệt qua các phần tử trong breedArr1
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `
          <th scope="row">${i + 1}</th>
          <td>${breedArr[i].breed}</td>
          <td>${breedArr[i].type}</td>
          <td>
          <button class="btn btn-danger" onclick="deleteBreed('${
            breedArr[i].breed
          }')">Delete</button>
          </td>
`;
    tableBodyEl.appendChild(row);
  }
}
function validate(data) {
  let isValidated = true;
  if (breedInput.value.trim().length === 0) {
    alert("Please input for Breed!");
    isValidated = false;
  }
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidated = false;
  }
  return isValidated;
}
// Xoá thông tin giống mèo
function deleteBreed(breedName) {
  const isDelete = confirm(`Are you sure you want to delete ${breedName}?`);
  if (isDelete) {
    breedArr = breedArr.filter((breed) => breed.breed !== breedName);
    saveToStorage("breedArr", breedArr);
    renderTable();
  }
}
// Xóa dữ liệu nhập trên form
function clearInput() {
  typeInput.value = "Select type";

  breedInput.value = "";
}
