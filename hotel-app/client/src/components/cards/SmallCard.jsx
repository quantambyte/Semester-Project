import React from "react";

import { currencyFormatter } from "../../actions/stripe";

import { diffDays } from "../../actions/hotel";

import { useHistory, Link } from "react-router-dom";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();

  return (
    <>
      <div className="card mb-3">
        <div className="row">
          <div className="col-md-4">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                alt=""
                className="card-image img img-fluid"
                style={{
                  height: "500px!important",
                }}
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=HOTEL+IMAGE"
                alt=""
                className="card-image img img-fluid"
              />
            )}
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {h.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price,
                    currency: "usd",
                  })}
                </span>{" "}
              </h3>

              <p className="alert alert-info">{h.location}</p>

              {/* <p className="card-text">Posted By: {h.postedBy}</p> */}

              <p className="card-text">
                {`${h.content.substring(0, 200)} ...`}
              </p>

              <p className="card-text">Posted By: {h.postedBy.name}</p>

              <p className="card-text">
                <span className="float-right text-primary">
                  Available for {diffDays(h.from, h.to)}{" "}
                  {diffDays(h.from, h.to) <= 1 ? " Day" : " Days"}
                </span>
              </p>

              <p className="card-text">
                Beds: {"  "}
                {h.bed}
              </p>

              <p className="card-text">
                Available from {new Date(h.from).toLocaleDateString()}
                {"                      "}Till{" "}
                {new Date(h.to).toLocaleDateString()}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      history.push(`/hotel/${h._id}`);
                    }}>
                    Show More
                  </button>
                )}

                {owner && (
                  <>
                    <Link to={`/hotel/edit/${h._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>

                    <DeleteOutlined
                      onClick={() => handleHotelDelete(h._id)}
                      className="text-danger"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
