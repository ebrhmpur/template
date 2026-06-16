export type TCtr<
  T extends Record<string, object[]> = Record<string, object[]>,
> = {
  success: boolean;
  data: T;
  message: {
    successes?: Record<string, string[]>;
    errors?: Record<string, string[]>;
  };
};

export const createController = (name: string) => {
  const controller: TCtr = {
    success: false,
    message: {},
    data: {},
  };
  return {
    addMessage: (type: "successes" | "errors", value: string[]) => {
      if (controller.message[type]?.[name]) {
        value.forEach((v) => controller.message[type]![name].push(v));
        return;
      }
      controller.message[type] = { ...controller.message[type], [name]: value };
    },
    addData: (key: string, value: Record<string, unknown>[]) => {
      if (controller.data[key]) {
        value.forEach((v) => {
          controller.data[key].push(v);
        });
        return;
      }
      controller.data = { ...controller.data, [key]: value };
    },
    merge: (controllerTwo: TCtr) => {
      (() => {
        if (
          Object.entries(controller.data).length < 1 &&
          Object.entries(controllerTwo.data).length < 1
        )
          return;
        controller.data = {
          ...controller.data,
          ...controllerTwo.data,
        };
      })();

      (() => {
        if (!controller.message.errors && !controllerTwo.message.errors) return;
        controller.message.errors = {
          ...controller.message.errors,
          ...controllerTwo.message.errors,
        };
      })();

      (() => {
        if (!controller.message.successes && !controllerTwo.message.successes)
          return;
        controller.message.successes = {
          ...controller.message.successes,
          ...controllerTwo.message.successes,
        };
      })();
    },
    get: () => {
      if (!controller.message.errors) {
        controller.success = true;
      }
      return controller;
    },
  };
};
