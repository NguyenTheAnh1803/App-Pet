"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

btnExport.addEventListener("click", function () {
  const isExport = confirm("Are you sure you want to export?");
  if (isExport) {
    saveStaticDataToFile();
  }
});

function saveStaticDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "petData.json");
}

btnImport.addEventListener("click", function () {
  // Kiểm tra xem người dùng đã chọn tệp tin chưa
  if (!fileInput.value) {
    alert("Please select a file");
  } else {
    // Xác nhận Import
    const isImport = confirm("Are you sure you want to import?");
    if (isImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Sự kiện được gọi khi file được load
      reader.addEventListener("load", function () {
        // Kiểm tra cấu trúc của file có hợp lệ với định dạng không
        const importedData = JSON.parse(reader.result);
        const isValidateFile = checkFile(JSON.parse(reader.result));

        // Hiển thị thông báo
        if (isValidateFile) {
          alert("Import success!");
          saveToStorage('petArr',importedData);
        } else {
          alert("Invalid file format");
        }
      });

      // Đọc file
      if (file) {
        reader.readAsText(file);
      }

      // Đặt lại giá trị của input file
      fileInput.value = "";
    }
  }
});
// Hàm checkFile để kiểm tra cấu trúc của file JSON
function checkFile(data) {
  // Kiểm tra xem data có phải là một mảng không
  if (!Array.isArray(data)) {
    return false;
  }

  // Kiểm tra các phần tử của mảng có đúng cấu trúc không
  const validStructure = data.every((item) => {
    return (
      item &&
      typeof item === "object" &&
      "id" in item &&
      "name" in item &&
      "age" in item &&
      "type" in item &&
      "weight" in item &&
      "length" in item &&
      "color" in item &&
      "breed" in item &&
      "vaccinated" in item &&
      "dewormed" in item &&
      "sterilized" in item &&
      "date" in item
    );
  });

  return validStructure;
}
