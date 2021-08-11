const parseTextRow = (row) => {
  return {...row}
}

//  given a list of allowed keys, return a new object from old filtered by this list
const filterObjectByKeys = (obj, keys) =>{
  return keys.reduce((acc, key) => { 
    const result = {...acc};
    if (obj[key]) result[key] = obj[key];
    return result;
  }, {});
}

// convert camel case to underscore
function camelToUnderscore(key) {
  return key.replace( /([A-Z])/g, "_$1").toLowerCase();
}


module.exports = {
  parseTextRow,
  filterObjectByKeys,
  camelToUnderscore
}