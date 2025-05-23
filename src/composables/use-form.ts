import { MaybePromise } from "@/types";
import { FormHTMLAttributes, MaybeRefOrGetter, useId } from "vue";

export type ObjectData = Record<string, unknown>;

export interface UseFormProps extends FormHTMLAttributes {
  disabled?: MaybeRefOrGetter<boolean>;
  disableHtmlValidation?: boolean;
}

export const useForm = (props?: UseFormProps) => {
  const id = props?.id || useId();

  const reset = (values?: ObjectData) => {
    const form = document.getElementById(id) as HTMLFormElement;
    if (!form) return;

    const elements = Array.from(form.elements);
    for (let element of elements) {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLButtonElement
      ) {
        if (values && values[element.name] !== undefined) {
          element.value = values[element.name] as string;
        } else {
          element.value = "";
        }
      }
    }
  };

  const handleSubmit = (
    submit: (
      data: ObjectData,
      reset: (values?: ObjectData) => void
    ) => MaybePromise<void>
  ) => {
    return async (payload: Event) => {
      payload.preventDefault();
      if (props?.disabled) return;

      const form = payload.target as HTMLFormElement;
      if (!form) return;

      const elements = Array.from(form.elements);

      const data: ObjectData = {};

      for (let element of elements) {
        if (
          element instanceof HTMLInputElement ||
          element instanceof HTMLSelectElement ||
          element instanceof HTMLTextAreaElement ||
          element instanceof HTMLButtonElement
        ) {
          data[element.name] = element.value;
        }
      }

      await submit(data, reset);
    };
  };

  return {
    formProps: {
      id,
      disabled: props?.disabled,
      novalidate: props?.disableHtmlValidation,
    },
    handleSubmit,
  };
};
