/**
 * Pushes an item into the array only if does not already exist
 * @param  {any[]}  array
 * @param  {any}    item
 * @return {any[]}
 */
export function distinctPush (array, item) {
  if (array.indexOf(item) == -1) {
    array.push(item);
  }
}

/**
 * Returns the number of children in the object. Does not count child of child.
 * @param  {object} obj
 * @return {number}
 */
export function objectLength (obj) {
  var size = 0;
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
}

/**
 * Returns whether or not two recetangles intersect.
 * @param  {object} r1 {x,y,width,height}
 * @param  {object} r2 {x,y,width,height}
 * @return {boolean}
 */
export function rectanglesIntersect(r1, r2) {
  return !(r1.x + r1.width < r2.x
    || r1.x > r2.x + r2.width
    || r1.y + r1.height < r2.y
    || r1.y > r2.y + r2.height);
}
