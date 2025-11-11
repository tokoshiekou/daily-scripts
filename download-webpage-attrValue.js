/**
 * @description Retrieves the corresponding attribute values of HTML nodes in the browser
 * @param {string} HTMLTag The HTML tag to retrieve
 * @param {string} attr The attribute name on the HTML tag
 * @returns {string[]} attrValues Returns an array of values for the specified attribute name on the tag
 */
function recordAttributeValues({ HTMLTag, attr }) {
  const tag = document.getElementsByTagName(HTMLTag);
  const attrValues = [];
  for (let i = 0; i < tag.length; i++) {
    const attrValue = tag[i].getAttribute(attr);
    // Filter out empty values
    if (attrValue) {
      attrValues.push(attrValue);
    }
  }
  return attrValues;
};

// e.g.
const option = { ele: 'a', HTMLTag: 'img', attr: 'file', user_name: 'aaa' };
const res = recordAttributeValues(option);
console.log(res); // The result only processes the `HTMLTag` and `attr` properties; other properties are not affected
