"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");

const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtnFind = document.getElementById("find-btn");
console.log(submitBtnFind);
const tableBodyEl = document.getElementById("tbody");

function clearInputs() {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
renderTableData(petArr);
// Su kien nut Find

submitBtnFind.addEventListener("click", function () {
  // Sao chép mảng dữ liệu petArr để không ảnh hưởng đến mảng gốc
  let petArrFind = [...petArr];

  // Lọc dữ liệu dựa trên các tiêu chí tìm kiếm
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  if (vaccinatedInput.checked) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }

  if (dewormedInput.checked) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }

  if (sterilizedInput.checked) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  // Hiển thị kết quả tìm kiếm trong bảng
  renderTableData(petArrFind);
  clearInputs();
});

renderBreed();

function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
// Hiển thị danh sách thú cưng
function renderTableData(petArr) {
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
                
    `;
    tableBodyEl.appendChild(row);
  }
}
