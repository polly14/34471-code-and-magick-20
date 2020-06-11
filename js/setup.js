'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var setupPlayer = setup.querySelector('.setup-player');
var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');
var wizardCoat = setupPlayer.querySelector('.wizard-coat');
var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
var inputCoat = document.getElementsByName('coat-color');
var inputEyes = document.getElementsByName('eyes-color');
var inputFireball = document.getElementsByName('fireball-color');

var getRandomFromArr = function (arr) {
  var random = Math.random().toFixed(1) * 10;
  if (random > arr.length - 1) {
    random = (random / arr.length).toFixed(0);
  }
  return random;
};

var renderWizard = function (names, surnames, coatColors, eyesColors) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = names[getRandomFromArr(names)] + ' ' + surnames[getRandomFromArr(surnames)];
  wizardElement.querySelector('.wizard-coat').style.fill = coatColors[getRandomFromArr(coatColors)];
  wizardElement.querySelector('.wizard-eyes').style.fill = eyesColors[getRandomFromArr(eyesColors)];
  return wizardElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizard(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLOR, EYES_COLOR));
}
similarListElement.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  if (setupUserName !== document.activeElement) {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
};
setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});
setupClose.addEventListener('click', function () {
  closePopup();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

var getNewColor = function (colors) {
  var shifted = colors.shift();
  colors.push(shifted);
  return colors;
};
var changeColor = function (colors, element, input) {
  var color = getNewColor(colors)[0];
  element.style.fill = color;
  input[0].value = color;
};
wizardCoat.addEventListener('click', function () {
  changeColor(COAT_COLOR, wizardCoat, inputCoat);
});
wizardEyes.addEventListener('click', function () {
  changeColor(EYES_COLOR, wizardEyes, inputEyes);
});
setupFireball.addEventListener('click', function () {
  var color = getNewColor(FIREBALL_COLOR)[0];
  setupFireball.style.background = color;
  inputFireball[0].value = color;
});


