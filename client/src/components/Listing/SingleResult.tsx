import React from "react";

// TEMPORARY
export type Props = {
  singleData: {
    location: string;
    category: string;
    title?: string;
    price: number;
    priceCurrency: number;
  };
};

const SingleResult: React.FC<Props> = ({ singleData, ...rest }) => {
  return (
    <div className="single-result">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <div className="single-result__photo"></div>
          </div>
          <div className="col-8">
            <section className="single-result__information">
              <header className="single-result__header">
                <div className="row">
                  <div className="col-9">
                    <h2 className="single-result__location">
                      {singleData.location}
                    </h2>
                    <p className="single-result__category">
                      {singleData.category}
                    </p>
                  </div>
                  <div className="col-3">
                    <div className="single-result__price-wrapper">
                      <p className="single-result__price">
                        {singleData.price} zł
                      </p>
                      <p className="single-result__price single-result__price--currency">
                        {singleData.priceCurrency} zł/m<sup>2</sup>
                      </p>
                    </div>
                  </div>
                </div>
              </header>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResult;
