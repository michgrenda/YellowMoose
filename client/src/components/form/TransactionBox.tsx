import React, { useState, useEffect } from "react";
// Components
import RadioInput from "../RadioInput";

// Radio inputs
const transactions = [
  {
    id: "sell",
    name: "transaction",
    label: "sprzedaj",
    value: "sell",
  },
  {
    id: "rent",
    name: "transaction",
    label: "wynajmij",
    value: "rent",
  },
];

// File types
type Transaction = "sell" | "rent";

// File interfaces
interface ITransactionBoxProps {
  transaction: Transaction;
  setData: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any;
    }>
  >;
}

// Props and default props
type Props = ITransactionBoxProps;
const defaultProps = {
  transaction: "sell",
};

const TransactionBox = (props: Props) => {
  const { setData } = props;

  // States
  const [transaction, setTransaction] = useState<string>(props.transaction);

  // Update parent's state
  useEffect(() => {
    setData((prevState) => ({ ...prevState, transaction }));
  }, [setData, transaction]);

  // Handlers
  // -------------------------------------------------------------------
  const handleRadioInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTransaction(e.target.value);

  // Variables
  const transactionRadioInputs = transactions.map((data) => (
    <RadioInput
      id={data.id}
      name={data.name}
      label={data.label}
      checked={transaction === data.value}
      value={data.value}
      onChange={handleRadioInputChange}
      mixes={["transaction-box"]}
      modifiers={["medium-500"]}
    />
  ));

  return (
    <fieldset className="transaction-box">{transactionRadioInputs}</fieldset>
  );
};

TransactionBox.defaultProps = defaultProps;

export default TransactionBox;
