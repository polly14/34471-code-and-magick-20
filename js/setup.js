'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomFromArr = function (arr) {
  var num = 10;
  if (arr.length > num) {
    num *= 2;
  }
  var random = Math.random().toFixed(1) * num;
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
userDialog.querySelector('.setup-similar').classList.remove('hidden');
