'use strict';
(function () {
  /*
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  */
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var setup = document.querySelector('.setup');
  var inputCoat = document.querySelector('[name="coat-color"]');
  var inputEyes = document.querySelector('[name="eyes-color"]');
  var inputFireball = document.querySelector('[name="fireball-color"]');
  var setupPlayer = setup.querySelector('.setup-player');
  var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  /*
  var renderWizard = function (names, surnames, coatColors, eyesColors) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = names[window.util.getRandomFromArr(names)] + ' ' + surnames[window.util.getRandomFromArr(surnames)];
    wizardElement.querySelector('.wizard-coat').style.fill = coatColors[window.util.getRandomFromArr(coatColors)];
    wizardElement.querySelector('.wizard-eyes').style.fill = eyesColors[window.util.getRandomFromArr(eyesColors)];
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLOR, EYES_COLOR));
  }
  similarListElement.appendChild(fragment);
  setup.querySelector('.setup-similar').classList.remove('hidden');
  */
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  var changeColor = function (colors, element, input) {
    element.addEventListener('click', function () {
      var color = window.util.getNewColor(colors)[0];
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      input.value = color;
    });
  };

  changeColor(COAT_COLOR, wizardCoat, inputCoat);
  changeColor(EYES_COLOR, wizardEyes, inputEyes);
  changeColor(FIREBALL_COLOR, setupFireball, inputFireball);

})();
