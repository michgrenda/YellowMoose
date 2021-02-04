import React from "react";
// Containers
import { OfferContainer } from "../containers/OfferContainer";

// Context
export const FormTypeContext = React.createContext({
  transaction: "sell",
  propertyType: "flat",
});

// File interfaces
interface FormPageProps {
  transaction: string;
  propertyType: string;
}

// Props and default props
type Props = FormPageProps;

const FormPage = (props: Props) => {
  return (
    <section className="form-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <header className="form-page__header">
              <h1 className="form-page__title">dodaj ogłoszenie</h1>
            </header>
          </div>
          <div className="col-12">
            <FormTypeContext.Provider value={{ ...props }}>
              <OfferContainer />
            </FormTypeContext.Provider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormPage;
