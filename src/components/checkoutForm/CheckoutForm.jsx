import "./CheckoutForm.css";

function CheckoutForm(props) {
  function placeOrder() {
    props.onClose();
    alert("Order placed successfully!!");
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Billing Details</h2>
          <button className="modal-close" onClick={props.onClose}>
            X
          </button>
        </div>
        <form className="modal-checkout-details" onSubmit={placeOrder}>
          {/* Billing Details Form */}
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Shipping Address:</label>
            <textarea
              id="address"
              name="address"
              required
              placeholder="Enter your shipping address"
            ></textarea>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={props.onClose}>
              Close
            </button>
            <button type="submit" className="checkout-confirm-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
