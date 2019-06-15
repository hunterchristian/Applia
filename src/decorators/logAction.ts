const formatFunctionArgs = (args: any[]) => JSON.stringify(args);
const logAction =
  (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
    if (!descriptor.value) {
      throw Error(`No value found for descriptor in ${ propertyName }`);
    }
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Action performed: ${ propertyName }, parameters: ${ formatFunctionArgs(args) } `);

      return method.apply(this, args);
    };
  };

export { logAction };
