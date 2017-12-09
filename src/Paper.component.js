import _ from 'lodash';

function indexProps(dictionary, props) {
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'children') return;
    const values = dictionary[key];
    if (values) {
      values.push(value);
    } else {
      dictionary[key] = [value]; // eslint-disable-line no-param-reassign
    }
  });
}

export function diffProps(oldProps, newProps) {
  const updatePayload = []; // schema: [propKey1, value2, propKey2, value2, ...]
  const propChanges = {}; // schema: { propKey1: [oldValue1, newValue1], ... }
  indexProps(propChanges, oldProps);
  indexProps(propChanges, newProps);
  Object.entries(propChanges).forEach(([key, values]) => {
    if (values.length === 1) {
      if (key in newProps) {
        const [value] = values;
        updatePayload.push(key, value);
      } else {
        updatePayload.push(key, null);
      }
    } else if (values.length === 2) {
      const [preValue, nextValue] = values;
      if (!_.isEqual(preValue, nextValue)) {
        updatePayload.push(key, nextValue);
      }
    }
  });
  return updatePayload.length ? updatePayload : null;
}

/* eslint no-param-reassign:
 ["error", { "props": true, "ignorePropertyModificationsFor": ["instance"] }]
*/
export function updateProps(instance, updatePayload) {
  for (let i = 1; i < updatePayload.length; i += 2) {
    const key = updatePayload[i - 1];
    const value = updatePayload[i];
    if (key === 'center') {
      instance.position = value;
    } else if (key === 'from') {
      instance.firstSegment.point = value;
    } else if (key === 'to') {
      instance.lastSegment.point = value;
    } else if (key in instance) {
      instance[key] = value;
    } else {
      console.log(`instance does not have property ${key}`, instance); // eslint-disable-line no-console
    }
  }
}
