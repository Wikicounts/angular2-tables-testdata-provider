// @flow

/**
 * Merges a list of objects and all their plain sub-objects.
 * Objects are merged from left to right. So the most right objects properties override other existing properties.
 *
 * @access public
 *
 * @param object {Object} The first object to merge.
 * @param objects {Object[]} Other objects to merge.
 *
 * @return {Object} The merged object.
 */
export function mergeObjects(object: Object, ...objects: Object[]): Object {
  if (objects.length < 1) {
    return object;
  } else {
    const source = objects[0];
    const currResult = Object.getOwnPropertyNames(source).reduce((acc, key) => {
      if (acc[key] && acc[key].__proto__ == Object.prototype && source[key].__proto__ == Object.prototype) {
        // if both current elements are plain objects, but not extended objects
        // (because it doesn't make sense to merge extended objects) merge the sub-objects
        acc[key] = mergeObjects(acc[key], source[key]);
        return acc;
      } else {
        // otherwise use the source value, if it is not null or undefined
        acc[key] = source[key] === undefined || source[key] === null ? acc[key] : source[key];
        return acc
      }
    }, Object.assign({}, object));

    return mergeObjects(currResult, ...objects.slice(1));
  }
}