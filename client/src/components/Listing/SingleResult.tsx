import React from "react";

// Delete
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
      <div className="single-result__item">
        <div className="single-result__photo"></div>
        <section className="single-result__information">
          <header className="single-result__header">
            <h2 className="single-result__location">{singleData.location}</h2>
            <p className="single-result__category">{singleData.category}</p>
            {singleData.title && (
              <h3 className="single-result__title">{singleData.title}</h3>
            )}
          </header>
          <div className="single-result__price-wrapper">
            <p className="single-result__price">{singleData.price}</p>
            <p className="single-result__price single-result__price--currency">
              {singleData.priceCurrency}
            </p>
          </div>
          <div>
            <ul></ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleResult;
