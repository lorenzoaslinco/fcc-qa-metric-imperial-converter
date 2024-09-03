'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    try {
      const { input } = req.query;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
  
      if (initUnit === 'invalid unit' && initNum !== 'invalid number') {
        return res.status(400).send('invalid unit');
      } else if (initNum === 'invalid number' && initUnit !== 'invalid unit') {
        return res.status(400).send('invalid number');
      } else if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.status(400).send('invalid number and unit');
      }
    
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
      res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
    } catch (err) {
      return err;
    }
  });
};
