function getNRandomPins(n) {
  if ((n * 4) % 10 != 0) {
    console.error("Invalid parameter! n should be divided by 10");
    return [];
  }
  var numPerDigit = n * 4 / 10;
  var digitSequence = getDigitSequence(numPerDigit);
  var sequence = permutation(digitSequence);
  var nums = getNumsFromSequence(sequence);
  return getPinsFromNums(nums);
}

function getValidPins(n) {
  var pins = getNRandomPins(n);
  while (! isPinValid(pins)) {
    pins = getNRandomPins(n);
  }
  return pins;
}

function isPinValid(pins) {
  var nums = pins.map(function(pin) {
    return Number(pin);
  });
  if (isArrayRepeat(nums)) {
    return false;
  }

  var map = {};
  pins.forEach(function(pin, index, array) {
    for (var i = 0; i < pin.length; i++) {
      if (map[pin[i]] == undefined) {
        map[pin[i]] = 0;
      }
      map[pin[i]] += 1;
    }
  });

  var nDigit = pins.length * 4 / 10;
  for (var index in map) {
    if (map.hasOwnProperty(index)) {
      if (map[index] != nDigit) {
        console.log('map[%d] = %d', index, map[index]);
        return false;
      }
    }
  }
  return true;
}

function getDigitSequence(numPerDigit) {
  var s = [];
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < numPerDigit; j++) {
      s.push(i);
    }
  }
  return s;
}

function permutation(sequence) {
  for (var i = 1; i < sequence.length; i++) {
    var j = getRandomIntInclusive(0, i);
    var tmp = sequence[i];
    sequence[i] = sequence[j];
    sequence[j] = tmp;
  }
  return sequence;
}

function getPinsFromNums(nums) {
  return nums.map(function(num) {
    return num2pin(num);
  });
}

function isArrayRepeat(arr) {
  var hash = {};
  for (var i = 0; i < arr.length; i++) {
    if (hash[arr[i]]) {
      console.log("arr has repeat element: ", arr[i]);
      return true;
    }
    hash[arr[i]] = true;
  }
  return false;
}

function getNumsFromSequence(sequence) {
  if (sequence.length % 4 != 0) {
    console.error("Illegal sequence! %d can not divided by 4.", sequence.length);
    return;
  }
  var nums = [];
  while (sequence.length) {
    nums.push(arr2num(sequence.splice(0, 4)));
  }
  return nums;
}

function arr2num(arr) {
  return Number(arr.join(''));
}

function num2pin(num) {
  var pin = num.toString();
  while (pin.length < 4) {
    pin = '0' + pin;
  }
  return pin;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getValidPins = getValidPins;
