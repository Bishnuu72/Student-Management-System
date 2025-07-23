import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="container py-5">
        <div className="row shadow-lg rounded-4 bg-white overflow-hidden">
          {/* Form Section */}
          <div className="col-md-7 p-5">
            <h2 className="contact-title fw-bold text-primary mb-2">
              <span className="dot me-2"></span>Contact Us
            </h2>
            <p className="text-muted mb-4">
              Please indicate the nature of your inquiry and fill in the form below.
            </p>

            <form>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">First Name *</label>
                  <input type="text" className="form-control border-0 border-bottom" placeholder="Enter your first name" />
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">Last Name *</label>
                  <input type="text" className="form-control border-0 border-bottom" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Email Address *</label>
                <input type="email" className="form-control border-0 border-bottom" placeholder="Enter your email" />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Phone Number *</label>
                <input type="text" className="form-control border-0 border-bottom" placeholder="+977-" />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Message *</label>
                <textarea className="form-control border-0 border-bottom" rows="3" placeholder="Type your Question here..."></textarea>
              </div>

              <button type="submit" className="btn btn-warning text-white px-4 fw-semibold">Submit</button>
            </form>
          </div>

          {/* Contact Info Card */}
          <div className="col-md-5 contact-right d-flex flex-column justify-content-center text-white p-4">
            <div className="bg-white rounded-4 p-4 text-dark shadow">
              <h4 className="fw-bold text-primary mb-3">
                <span className="dot me-2"></span>Reach Us
              </h4>

              <p><i className="fas fa-map-marker-alt me-2 text-warning"></i> New Plaza, Kathmandu</p>
              <p><i className="fas fa-envelope me-2 text-warning"></i> info@mindrisers.com</p>
              <p><i className="fas fa-phone me-2 text-warning"></i> +977-9819748055</p>

              <div className="social-icons mt-3">
                <i className="fab fa-facebook-f me-3"></i>
                <i className="fab fa-twitter me-3"></i>
                <i className="fab fa-google"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
