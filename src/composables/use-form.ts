import { MaybePromise } from "@/types";
import { FormHTMLAttributes, MaybeRefOrGetter, useId } from "vue";

export type ObjectData = Record<string, unknown>;

export interface UseFormProps extends FormHTMLAttributes {
  disabled?: MaybeRefOrGetter<boolean>;
  disableHtmlValidation?: boolean;
  submit?: (
    data: ObjectData,
    reset: (values?: ObjectData) => void
  ) => MaybePromise<void>;
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

  const handleSubmit = (payload: Event) => {
    payload.preventDefault();

    if (props?.disabled || !props?.submit) return;

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

    const submit = props.submit(data, reset);

    if (submit instanceof Promise) {
      submit.catch((error) => {
        console.error("Form submission error:", error);
      });
    }
  };

  return {
    formProps: {
      id,
      disabled: props?.disabled,
      novalidate: props?.disableHtmlValidation,
      onSubmit: handleSubmit,
    },
  };
};
