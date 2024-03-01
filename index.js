// Select static & shared page elements
const overlayWrapper = document.getElementById("js-overlay");
const overlayContent = document.getElementById("js-overlay-target");

function toggleImageView(index) {
    // Get the image element by ID.
    const image = document.getElementById(`js-gallery-image-${index}`);

    // Apply a CSS class that contains the view-transition-name before the animation starts.
    image.classList.add("gallery__image--active");
    
    // Store image parent element.
    const imageParentElement = image.parentElement;
  

    // Move image node from grid to modal.
    if (!document.startViewTransition) {
        // Fallback
        moveImageToModal(image);
    } else {
        // Start transition
        document.startViewTransition(() => moveImageToModal(image));
    }

    // Create a click listener on the overlay for the active image element.
    overlayWrapper.onclick = async function () {
        // Return the image to its parent element
        if (!document.startViewTransition) {
            // Fallback
            moveImageToGrid(imageParentElement);
            return;
        }

        // Start transition
        const transition = document.startViewTransition(() => moveImageToGrid(imageParentElement));

        // Wait for animation to finish
        await transition.finished;
    
        // Remove class when animation ends
        image.classList.remove("gallery__image--active");
    };
}

// Helper functions for moving the image around and toggling the overlay.
function moveImageToModal(image) {
    // Show the overlay
    overlayWrapper.classList.add("overlay--active");
    overlayContent.append(image);
}

function moveImageToGrid(imageParentElement) {
    imageParentElement.append(overlayContent.querySelector("img"));
    // Hide the overlay.
    overlayWrapper.classList.remove("overlay--active");
}