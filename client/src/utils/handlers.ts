import React from "react";

const isCheckboxOrRadio = (type: string) => {
  const isCheckboxOrRadio = type === "checkbox" || type === "radio";

  return isCheckboxOrRadio;
};

export const handleTextAreaChange = <State>(
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setFormData: React.Dispatch<React.SetStateAction<State>>
) =>
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));

export const handleInputChange = <State>(
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<State>>,
  force: boolean = false
) => {
  const isControl = isCheckboxOrRadio(e.target.type);
  const value = isControl && !force ? e.target.checked : e.target.value;

  setFormData((prevState) => ({ ...prevState, [e.target.name]: value }));
};

export const handleSelectChange = <OptionType, State>(
  option: OptionType,
  setFormData: React.Dispatch<React.SetStateAction<State>>,
  name: string
) => setFormData((prevState) => ({ ...prevState, [name]: option }));
