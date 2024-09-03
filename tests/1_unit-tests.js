const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  // Test: ConvertHandler should correctly read a whole number input.
  test('Whole number input', function(done) {
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });

  // Test: ConvertHandler should correctly read a decimal number input.
  test('Decimal number input', function(done) {
    let input = '3.5mi';
    assert.equal(convertHandler.getNum(input), 3.5);
    done();
  });

  // Test: ConvertHandler should correctly read a fractional input.
  test('Fractional input', function(done) {
    let input = '1/2km';
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  // Test: ConvertHandler should correctly read a fractional input with a decimal.
  test('Fractional input with decimal', function(done) {
    let input = '5.4/3lbs';
    assert.equal(convertHandler.getNum(input), 1.8);
    done();
  });

  // Test: ConvertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
  test('Double-fraction input', function(done) {
    let input = '3/2/3kg';
    assert.equal(convertHandler.getNum(input), 'invalid number');
    done();
  });

  // Test: ConvertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
  test('Default to 1 when no numerical input', function(done) {
    let input = 'kg';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  // Test: ConvertHandler should correctly read each valid input unit.
  test('Valid input unit', function(done) {
    let input = '32g';
    assert.equal(convertHandler.getUnit(input), 'invalid unit');
    done();
  });

  // Test: ConvertHandler should correctly return an error for an invalid input unit.
  test('Invalid input unit', function(done) {
    let input = '32xyz';
    assert.equal(convertHandler.getUnit(input), 'invalid unit');
    done();
  });

  // Test: ConvertHandler should return the correct return unit for each valid input unit.
  test('Return unit', function(done) {
    let input = 'gal';
    assert.equal(convertHandler.getReturnUnit(input), 'L');
    done();
  });

  // Test: ConvertHandler should correctly return the spelled-out string unit for each valid input unit.
  test('Spelled-out string unit', function(done) {
    let input = 'mi';
    assert.equal(convertHandler.spellOutUnit(input), 'miles');
    done();
  });

  // Test: ConvertHandler should correctly convert gal to L.
  test('Convert gal to L', function(done) {
    let input = [5, 'gal'];
    assert.approximately(convertHandler.convert(input[0], input[1]), 18.9271, 0.1);
    done();
  });

  // Test: ConvertHandler should correctly convert L to gal.
  test('Convert L to gal', function(done) {
    let input = [5, 'L'];
    assert.approximately(convertHandler.convert(input[0], input[1]), 1.32086, 0.1);
    done();
  });

  // Test: ConvertHandler should correctly convert mi to km.
  test('Convert mi to km', function(done) {
    let input = [5, 'mi'];
    assert.approximately(convertHandler.convert(input[0], input[1]), 8.0467, 0.1);
    done();
  });

  // Test: ConvertHandler should correctly convert km to mi.
  test('Convert km to mi', function(done) {
    let input = [5, 'km'];
    assert.approximately(convertHandler.convert(input[0], input[1]), 3.10686, 0.1);
    done();
  });

  // Test: ConvertHandler should correctly convert lbs to kg.
  test('Convert lbs to kg', function(done) {
    let input = [5, 'lbs'];
    assert.approximately(convertHandler.convert(input[0], input[1]), 2.26796, 0.1);
    done();
  });

  // Test: ConvertHandler should correctly convert kg to lbs.
  test('Convert kg to lbs', function(done) {
    let input = [5, 'kg'];
    assert.approximately(convertHandler.convert(input[0], input[1]), 11.0231, 0.1);
    done();
  });

});
