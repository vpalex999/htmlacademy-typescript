import { Collection } from "./collection";
import { Button } from "./html/button";
import { CustomerSelect } from "./html/customer";
import { Product } from "./html/product";
import { UiCollection } from "./i-control-collection";

let collection: Collection | null = null;

const getHtmlFactory = () => new Collection(Button, CustomerSelect, Product);

const variants = {
  html: getHtmlFactory,
};

const init = (variant: keyof typeof variants): void => {
  collection = variants[variant]();
};

type ControlProvider = <T extends keyof UiCollection>(
  type: T
) => ReturnType<UiCollection[T]>;

const getControl: ControlProvider = (type) => {
  if (collection === null) {
    throw new Error("not initialized");
  }
  return collection[type]() as never;
};

init("html");

const button = getControl("button");
console.log(button);
