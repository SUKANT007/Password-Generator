const characterAmountRange = document.getElementById("rangeLength");
const charAmountNumber = document.getElementById("length");
const includeUppercaseEl = document.getElementById("uppercase");
const includeLowercaseEl = document.getElementById("lowercase");
const includeNumbersEl = document.getElementById("numbers");
const includeSymbolsEl = document.getElementById("symbols");
const passwordDisplay = document.getElementById("result");
const clipboard = document.getElementById("clipboard");

const form = document.getElementById("passwordGeneratedForm");

characterAmountRange.addEventListener("input", syncCharacterAmount);
charAmountNumber.addEventListener("input", syncCharacterAmount);

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = passwordDisplay.innerText;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = charAmountNumber.value;
  const includeUppercase = includeUppercaseEl.checked;
  const includeNumbers = includeNumbersEl.checked;
  const includeSymbols = includeSymbolsEl.checked;
  const includeLowercase = includeLowercaseEl.checked;

  const typeCount =
    includeLowercase + includeUppercase + includeSymbols + includeNumbers;

  if (typeCount === 0) return;

  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );

  console.log("password", password);

  passwordDisplay.innerText = password;
});

function generatePassword(
  characterAmount,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = [];
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

  console.log(charCodes);

  const passwordCharacters = [];

  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    console.log(characterCode);
    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  console.log(passwordCharacters);
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  charAmountNumber.value = value;
  characterAmountRange.value = value;
}
