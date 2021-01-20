import React, { HTMLAttributes } from "react";
// Components
import { Fieldset } from "../../../components/form/Fieldset";
import { Control } from "../../../components/form/controls/Control";
// Handlers
import { handleInputChange } from "../../../utils/handlers";
// Types
import { TransactionState } from "../forms/OfferForm";
import { FieldsetProps } from "../../../types";

// Data
const transactions = [
  {
    id: "sell",
    label: "sprzedaj",
    value: "sell",
  },
  {
    id: "rent",
    label: "wynajmij",
    value: "rent",
  },
];

// Props and default props
type Props = FieldsetProps<TransactionState> & HTMLAttributes<HTMLDivElement>;

export const Transaction = React.memo(
  ({ data: transaction, setData: setTransaction, ...rest }: Props) => {
    // Variables
    const transactionRadioInputs = transactions.map((data) => (
      <Control
        id={data.id}
        name="transaction"
        label={data.label}
        checked={transaction.transaction === data.value}
        value={data.value}
        onChange={(e) => handleInputChange(e, setTransaction, true)}
        type="radio"
        modifiers={["medium-500"]}
        mixes={["fieldset"]}
        key={data.id}
      />
    ));

    return (
      <div className="transaction" {...rest}>
        <Fieldset modifiers={["transaction-box"]}>
          {transactionRadioInputs}
        </Fieldset>
      </div>
    );
  }
);
