'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(async (req, res) => {
      try {
        let input = req.query.input;
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let spellout = convertHandler.spellOutUnit(returnUnit);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        if (initUnit == "invalid unit" && initNum == "invalid number") {
          return res.json('invalid number and unit');
        }
        if (initUnit == "invalid unit") {
          return res.json("invalid unit");
        }
        if (initNum == "invalid number") {
          return res.json("invalid number");
        }

        let response = {
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string
        };
        return res.json(response);
      }
      catch (err) {
        console.log(err);
      }
    });
};
