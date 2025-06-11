export function isEmpty(obj) {
  return !obj || !obj.data || !Array.isArray(obj.data) || obj.data.length === 0;
}
