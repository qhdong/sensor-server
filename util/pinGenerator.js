

/**
 * 生成n个k位的PIN，每位数字范围是0～9,均匀分布
 * @param n
 * @param k
 * @returns {Array}
 */
function getNRandomPins(n, k) {
  if ((n * k) % 10 != 0) {
    console.error("Invalid parameter! n should be divided by 10");
    return [];
  }
  var numPerDigit = n * k / 10;
  var digitSequence = getDigitSequence(numPerDigit);
  var sequence = permutation(digitSequence);
  var nums = getNumsFromSequence(sequence, k);
  return getPinsFromNums(nums, k);
}

function getValidPins(n, k) {
  var pins = getNRandomPins(n, k);
  while (! isPinValid(pins, k)) {
    pins = getNRandomPins(n, k);
  }
  return pins;
}

function isPinValid(pins, k) {
  var nums = pins.map(function(pin) {
    return Number(pin);
  });
  if (k > 1 && isArrayRepeat(nums)) {
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

  var nDigit = pins.length * k / 10;
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

function getPinsFromNums(nums, k) {
  return nums.map(function(num) {
    return num2pin(num, k);
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

function getNumsFromSequence(sequence, k) {
  if (sequence.length % k != 0) {
    console.error("Illegal sequence! %d can not divided by %d.", sequence.length, k);
    return;
  }
  var nums = [];
  while (sequence.length) {
    nums.push(arr2num(sequence.splice(0, k)));
  }
  return nums;
}

function arr2num(arr) {
  return Number(arr.join(''));
}

function num2pin(num, k) {
  var pin = num.toString();
  while (pin.length < k) {
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
