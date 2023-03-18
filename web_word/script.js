document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const charCount = document.getElementById("charCount");
    const loadButton = document.getElementById("loadButton");
    const saveButton = document.getElementById("saveButton");
    const saveAsButton = document.getElementById("saveAsButton");
    const fileInput = document.getElementById("fileInput");

    editor.addEventListener("input", () => {
        const text = editor.textContent;
        const pureText = text.replace(/\s+/g, "");
        charCount.textContent = pureText.length;
    });

    loadButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                editor.textContent = event.target.result;
            };
            reader.readAsText(file);
        }
    });

    saveButton.addEventListener("click", () => {
        const text = editor.textContent;
        const fileName = "saved_text.txt";
        saveTextToFile(text, fileName);
        alert("Text saved to your default download folder. Move it to the desired location.");
    });

    saveAsButton.addEventListener("click", () => {
        const text = editor.textContent;
        const fileName = prompt("Enter the file name:", "saved_text.txt");
        if (fileName) {
            saveTextToFile(text, fileName);
            alert("Text saved to your default download folder. Move it to the desired location.");
        }
    });
});

function saveTextToFile(text, fileName) {
    const fileBlob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
}
