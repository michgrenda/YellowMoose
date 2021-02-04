import React, { useState, HTMLAttributes } from "react";
// React-hook-form
import { Controller } from "react-hook-form";
// Components
import { Fieldset } from "../../../components/forms/Fieldset";
import { Control } from "../../../components/forms/controls/Control";
// Types
import { ControlReactHookForm, FieldsetWithErrors } from "../../../ts/types";

// Data
const transactions = [
  {
    value: "sell",
    label: "sprzedaj",
  },
  {
    value: "rent",
    label: "wynajmij",
  },
];

// File types
export type TransactionType = "sell" | "rent";

// File interfaces
interface TransactionProps {
  transaction?: TransactionType;
}

// Props and default props
type Props = TransactionProps &
  HTMLAttributes<HTMLDivElement> &
  ControlReactHookForm &
  FieldsetWithErrors;

export const Transaction = React.memo(
  ({
    transaction: transactionProps = "sell",
    register,
    control,
    errors,
    watch,
    ...rest
  }: Props) => {
    // States
    const [transaction, setTransaction] = useState<TransactionType>(
      transactionProps
    );

    // Variables
    const transactionRadioInputs = (
      <Controller
        name="transaction"
        control={control}
        defaultValue={transaction}
        render={(
          { onChange, onBlur, value, name, ref },
          { invalid, isTouched, isDirty }
        ) => (
          <>
            {transactions.map(({ value: transactionValue, label }) => (
              <Control
                id={transactionValue}
                name="transaction"
                label={label}
                checked={transaction === transactionValue}
                onChange={(e) => {
                  const value = e.target.value as TransactionType;
                  setTransaction(value);
                  onChange(value);
                }}
                value={transactionValue}
                type="radio"
                modifiers={["medium-500"]}
                mixes={["fieldset"]}
                key={transactionValue}
              />
            ))}
          </>
        )}
      />
    );

    return (
      <div className="transaction" {...rest}>
        <Fieldset modifiers={["transaction-box"]}>
          {transactionRadioInputs}
        </Fieldset>
      </div>
    );
  }
);
