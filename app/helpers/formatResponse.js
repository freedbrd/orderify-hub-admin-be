const formatResponse = (object) => {
  const formattedObject = JSON.parse(JSON.stringify(object));

  const transform = (obj) => {
    if (obj._id) {
      obj.id = obj._id;
      delete obj._id;
    }
    delete obj.__v;
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        transform(obj[key]);
      }
    }
  };

  transform(formattedObject);
  return formattedObject;
};


module.exports = formatResponse;