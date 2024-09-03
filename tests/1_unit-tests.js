const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  // Test: ConvertHandler should correctly read a whole number input.
  test('Whole number input', function(done) {
    var input = '10kg';
    assert.equal(convertHandler.getNum(input), 10);
    done();
  });

  // Test: ConvertHandler should correctly read a decimal number input.
  test('Decimal number input', function(done) {
    var input = '1.8kg';
    assert.equal(convertHandler.getNum(input), 1.8);
    done();
  });

  // Test: ConvertHandler should correctly read a fractional input.
  test('Fractional input', function(done) {
    var input = '1/2kg';
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  // Test: ConvertHandler should correctly read a fractional input with a decimal.
  test('Fractional input with decimal', function(done) {
    var input = '3.2/2kg';
    assert.equal(convertHandler.getNum(input), 1.6);
    done();
  });

  // Test: ConvertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
  test('Double-fraction input', function(done) {
    var input = '3/2/2kg';
    assert.equal(convertHandler.getNum(input), 'invalid number');
    done();
  });

  // Test: ConvertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
  test('Default to 1 when no numerical input', function(done) {
    var input = 'kg';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  // Test: ConvertHandler should correctly read each valid input unit.
  test('Valid input unit', function(done) {
    var input = ['mi', 'km', 'gal', 'l', 'lbs', 'kg', 'MI', 'KM', 'GAL', 'L', 'LBS', 'KG'];
    var answer = ['mi', 'km', 'gal', 'L', 'lbs', 'kg', 'mi', 'km', 'gal', 'L', 'lbs', 'kg'];
    for (let i = 0; i < input.length; i++) {
      assert.equal(convertHandler.getUnit(input[i]), answer[i]);
    }
    done();
  });

  // Test: ConvertHandler should correctly return an error for an invalid input unit.
  test('Invalid input unit', function(done) {
    var input = 'k';
    assert.equal(convertHandler.getUnit(input), 'invalid unit');
    done();
  });

  // Test: ConvertHandler should return the correct return unit for each valid input unit.
  test('Return unit', function(done) {
    var input = ['mi', 'km', 'gal', 'L', 'lbs', 'kg'];
    var answer = ['km', 'mi', 'L', 'gal', 'kg', 'lbs'];
    for (let i = 0; i < input.length; i++) {
      assert.equal(convertHandler.getReturnUnit(input[i]), answer[i]);
    }
    done();
  });

  // Test: ConvertHandler should correctly return the spelled-out string unit for each valid input unit.
  test('Spelled-out string unit', function(done) {
    var input = ['mi', 'km', 'gal', 'L', 'lbs', 'kg'];
    var answer = ['miles', 'kilometers', 'gallons', 'liters', 'pounds', 'kilograms'];
    for (let i = 0; i < input.length; i++) {
      assert.equal(convertHandler.spellOutUnit(input[i]), answer[i]);
    }
    done();
  });

  // Test: ConvertHandler should correctly convert gal to L.
  test('Convert gal to L', function(done) {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.001);
    done();
  });

  // Test: ConvertHandler should correctly convert L to gal.
  test('Convert L to gal', function(done) {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.001);
    done();
  });

  // Test: ConvertHandler should correctly convert mi to km.
  test('Convert mi to km', function(done) {
    assert.approximately(convertHandler.convert(10, 'mi'), 16.0934, 0.001);
    done();
  });

  // Test: ConvertHandler should correctly convert km to mi.
  test('Convert km to mi', function(done) {
    assert.approximately(convertHandler.convert(10, 'km'), 6.21373, 0.001);
    done();
  });

  // Test: ConvertHandler should correctly convert lbs to kg.
  test('Convert lbs to kg', function(done) {
    assert.approximately(convertHandler.convert(10, 'lbs'), 4.53592, 0.001);
    done();
  });

  // Test: ConvertHandler should correctly convert kg to lbs.
  test('Convert kg to lbs', function(done) {
    assert.approximately(convertHandler.convert(10, 'kg'), 22.04624, 0.001);
    done();
  });
});
