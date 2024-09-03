function ConvertHandler() {
  this.getNum = function(input) {
    let result = input.match(/[.d\d/]+/g) || ['1'];

    if (result[0].includes('//') || result[0].split('/').length > 2) {
      return 'invalid number';
    }

    try {
      result = eval(result[0]);
    } catch (e) {
      return 'invalid number';
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const result = input.match(/[a-zA-Z]+/)[0].toLowerCase();

    if (validUnits.includes(result)) {
      return result === "l" ? "L" : result;
    } else {
      return 'invalid unit';
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return units[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellOut = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellOut[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
