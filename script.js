
const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
/* ---------- Prevent default browser behavior ---------- */
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}
/* ---------- Highlight drop area ---------- */
["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.add("highlight");
    });
});
["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove("highlight");
    });
});
/* ---------- Handle dropped files ---------- */
dropArea.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
});
/* ---------- Click to browse ---------- */
dropArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
});
/* ---------- Display files ---------- */
function handleFiles(files) {
    [...files].forEach(displayFile);
}
function displayFile(file) {
    const fileItem = document.createElement("div");
    fileItem.classList.add("file-item");

    const details = document.createElement("div");
    details.classList.add("file-details");

    if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        details.appendChild(img);
    }
    const fileName = document.createElement("span");
    fileName.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    details.appendChild(fileName);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => fileItem.remove();
    fileItem.appendChild(details);
    fileItem.appendChild(removeBtn);
    fileList.appendChild(fileItem);
}
