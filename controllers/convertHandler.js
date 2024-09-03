function ConvertHandler() {

  this.getNum = function (input) {
    if (input.search(/[a-zA-Z]/) == 0) {
      let result = 1;
      return result;
    }

    let result = input.split(/[a-zA-Z]/)[0];

    let invalid = result.match(/[/]/g);
    if (invalid == null) {
      result = parseFloat(result);
      return result;
    }
    if (invalid.length > 1) {
      let result = 'invalid number';
      return result;
    }

    let fracCheck = result.search(/[/]/);
    if (fracCheck != -1) {
      result = eval(result);
      return result;
    }
    result = parseFloat(result);
    return result;
  };

  this.getUnit = function (input) {
    let split = input.search(/[a-zA-Z]/);
    let unit = input.slice(split);
    let result = unit.toLowerCase();

    if (result == "l") {
      let result = "L";
      return result;
    }

    if (result == "l" || result == "gal" || result == "lbs" || result == "kg" || result == "mi" || result == "km") {
      return result;
    } else {
      result = 'invalid unit';
      return result;
    }
  };

  this.getReturnUnit = function (initUnit) {
    if (initUnit == "L") {
      let result = "gal";
      return result;
    };
    if (initUnit == "gal") {
      let result = "L";
      return result;
    };
    if (initUnit == "lbs") {
      let result = "kg";
      return result;
    };
    if (initUnit == "kg") {
      let result = "lbs";
      return result;
    };
    if (initUnit == "mi") {
      let result = "km";
      return result;
    };
    if (initUnit == "km") {
      let result = "mi";
      return result;
    };
  };

  this.spellOutUnit = function (unit) {
    if (unit == "mi") {
      let result = "miles";
      return result;
    };
    if (unit == "km") {
      let result = "kilometers";
      return result;
    };
    if (unit == "lbs") {
      let result = "pounds";
      return result;
    };
    if (unit == "kg") {
      let result = "kilograms";
      return result;
    }
    if (unit == "gal") {
      let result = "gallons";
      return result;
    };
    if (unit == "L") {
      let result = "liters";
      return result;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    if (initUnit == "gal") {
      let result = Math.round((initNum * galToL) * 100000) / 100000;
      return result;
    };
    if (initUnit == "L") {
      let result = Math.round((initNum / galToL) * 100000) / 100000;
      return result;
    };
    if (initUnit == "lbs") {
      let result = Math.round((initNum * lbsToKg) * 100000) / 100000;
      return result;
    };
    if (initUnit == "kg") {
      let result = Math.round((initNum / lbsToKg) * 100000) / 100000;
      return result;
    };
    if (initUnit == "mi") {
      let result = Math.round((initNum * miToKm) * 100000) / 100000;
      return result;
    };
    if (initUnit == "km") {
      let result = Math.round((initNum / miToKm) * 100000) / 100000;
      return result;
    };
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    return result;
  };
};

module.exports = ConvertHandler;
