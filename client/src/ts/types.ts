import React from "react";
import { ValueType } from "react-select";

// Types
export type OptionType<isMulti extends boolean> = ValueType<
  { value: string; label: string; [index: string]: any },
  isMulti
>;

// Interfaces
export interface BEM {
  modifiers?: string[];
  mixes?: string[];
}

export interface FieldsetProps<T> {
  setData: React.Dispatch<React.SetStateAction<T>>;
  data: T;
}

export interface ControlReactHookForm {
  register?: any;
  control?: any;
  clearErrors?: any;
  setValue?: any;
  watch?: any;
}

export interface FieldsetWithErrors {
  errors?: any;
}
