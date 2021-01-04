import React, { useState } from "react";
// Components
import TransactionBox from "../components/form/TransactionBox";
import TypesBox from "../components/form/TypesBox";
import BaseParameters from "../components/form/BaseParameters";
import Location from "../components/form/Location";
import Photo from "../components/form/Photo";
import DescriptionData from "../components/form/DescriptionData";
import ContactData from "../components/form/ContactData";
import Details from "../components/form/Details";

const FormPage = () => {
  // States
  // TEMPORARY
  const [inVal, setInVal] = useState<{ [index: string]: any }>({});

  return (
    <section className="form-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <header className="form-page__title">
              <h1 className="form-page__title-headline">Dodaj ogłoszenie</h1>
            </header>
          </div>
          <div className="col-12">
            <form
              autoComplete="off"
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="row">
                <div className="col-12">
                  <TransactionBox setData={setInVal} />
                </div>
                <div className="col-12">
                  <TypesBox setData={setInVal} />
                </div>
                <div className="col-12">
                  <BaseParameters setData={setInVal} />
                </div>
                <div className="col-12">
                  <Location setData={setInVal} />
                </div>
                <div className="col-12">
                  <Photo setData={setInVal} />
                </div>
                <div className="col-12">
                  <DescriptionData setData={setInVal} />
                </div>
                <div className="col-12">
                  <Details setData={setInVal} />
                </div>
                <div className="col-12">
                  <ContactData setData={setInVal} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormPage;
