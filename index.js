// Array of characters used for password generation including uppercase, lowercase, numbers and special characters

const characters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_",
  "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">",
  ".", "?", "/"
];

// SVG path for the original copy icon
const originalSvgPath =
  "M192,72V216a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H184A8,8,0,0,1,192,72Zm24-40H72a8,8,0,0,0,0,16H208V184a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32Z";

// SVG path for the success state of copy icon
const successSvgPath =
  "M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z";

// Get reference to the input text element
let inputText = document.getElementById("input-text");

/**
 * Generates a random password of 12 characters
 * Uses the characters array as the source for random characters
 */
function generatePassword() {
  let password = "";
  for (let i = 0; i < 12; i++) {
    let random = Math.floor(Math.random() * characters.length);
    password += characters[random];
  }
  inputText.textContent = password;
}

/**
 * Copies the generated password to clipboard and shows visual feedback
 * Creates a temporary textarea element to handle the copy operation
 * Updates the copy icon and shows a tooltip for user feedback
 */
function copy() {
  const text = document.getElementById("input-text").textContent;
  if (!text) return;

  // Copy the text using a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  // Get elements for visual feedback
  const copySvg = document.getElementById("copy");
  const copyPath = copySvg.querySelector("path");
  const tooltip = document.getElementById("copy-tooltip");

  // Update UI to show success state
  copyPath.setAttribute("d", successSvgPath);
  tooltip.style.visibility = "visible";

  // Reset UI after 2 seconds
  setTimeout(() => {
    copyPath.setAttribute("d", originalSvgPath);
    tooltip.style.visibility = "hidden";
  }, 2000);
}
