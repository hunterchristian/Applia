export type TagName = 'div' | 'span' | 'a' | 'h1';
export type Elements = TagName[];
type Observer = (elements: Elements) => void;

let elements: Elements = [];
let observer: Nullable<Observer> = null;

const emitChange = () => {
  if (!observer) {
    throw new Error('Observer does not exist. Did you call observe() yet?');
  }
  observer(elements);
};

export const observe = (o: Observer) => {
  if (observer) {
    throw new Error('Observer already exists. Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
};

export const addTagName = (tagName: TagName) => {
  elements.push(tagName);
  emitChange();
};

export const reset = () => {
  elements = [];
  emitChange();
};
