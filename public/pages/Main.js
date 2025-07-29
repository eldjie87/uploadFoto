export function Main() {
    const section = document.createElement('section');
    section.innerHTML = `
        <form action="upload" class="upload-form" method="POST" enctype="multipart/form-data">
            <input type="file" name="image" accept="image/video">
            <button type="submit" class="uploadBtn">Upload</button>
        </form>
    `;

    const uploadBtn = section.querySelector('.uploadBtn').addEventListener('click', (event) => {
        event.preventDefault();
        const form = section.querySelector('.upload-form');
        const formData = new FormData(form);
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
            } else {
                alert('Upload failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while uploading the files.');
        })       
    });

    return section;
}