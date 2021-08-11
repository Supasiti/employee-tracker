const util = require('../services/utils');

describe('services/util', () =>{




  describe('filterObjectByKeys', ()=> {
    it('should return an obj with only the allowed properties', () => {
      const allowedKeys = ['firstName', 'lastName', 'roleId', 'managerId'];
      const inputObj = {
        roleId: 4,
        children: 5
      };
      const expected = { roleId: 4};

      const result = util.filterObjectByKeys(inputObj, allowedKeys);

      expect(result).toEqual(expected);
      expect(Object.keys(result).length).toEqual(1);
    
    });
  });

  describe('camelToUnderscore', () => {
    it('should convert string from camel case to underscore', ()=>{
      const input = "helloWorld";
      const expected = 'hello_world';

      const result = util.camelToUnderscore(input);

      expect(result).toEqual(expected);
    });
  });

  describe('getFullName', () => {
    it('should conbine first and last names into fullname', ()=>{
      const inputA = "Steve";
      const inputB = "Job";
      const expected = 'Steve Job';

      const result = util.getFullName(inputA, inputB);

      expect(result).toEqual(expected);
    });
  });
})