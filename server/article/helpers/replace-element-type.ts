// Lifted from
// https://github.com/danburzo/percollate/blob/b65f6748d2c5e1f2e2380584e8ad85e354e7763f/src/replace-element-type.js
/*
	Replace the element type (tag name) of an element.
	Does not copy over the children elements (yet).
 */
export default function (
  el: {
    parentNode: { replaceChild: (arg0: any, arg1: any) => void };
    attributes: any;
  },
  type: any,
  doc: { createElement: (arg0: any) => any }
) {
  if (el.parentNode) {
    let new_el = doc.createElement(type);
    for (let attr of el.attributes) {
      new_el.setAttribute(attr.name, attr.value);
    }
    el.parentNode.replaceChild(new_el, el);
  }
}
