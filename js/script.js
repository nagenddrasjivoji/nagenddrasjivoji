function showImage(degreeId) {
    // Hide all degree blocks
    document.querySelectorAll('.degree-block').forEach(block => {
        block.style.display = 'none';
    });

    // Show the selected degree image
    document.getElementById(degreeId).style.display = 'block';
}

function hideImage() {
    // Hide all degree images
    document.querySelectorAll('.degree-image').forEach(image => {
        image.style.display = 'none';
    });

    // Show all degree blocks again
    document.querySelectorAll('.degree-block').forEach(block => {
        block.style.display = 'block';
    });
}
