import React, { useState } from "react";
import founderImg from "../assets/founder.jpg";

const faqsData = [
  {
    question: "How do I reset my student portal password?",
    answer: "Go to settings in your profile and click 'Reset Password'. Follow the instructions sent to your email.",
  },
  {
    question: "How can I download my academic transcript?",
    answer: "Navigate to the 'Academics' tab and select 'Download Transcript'.",
  },
  {
    question: "Where do I apply for leave?",
    answer: "Go to the 'Leave Request' section under 'Student Services'.",
  },
  {
    question: "How do I contact my faculty advisor?",
    answer: "Faculty contact details are available under the 'My Advisors' tab.",
  },
  {
    question: "Can I edit my submitted assignments?",
    answer: "Yes, if the assignment deadline hasn’t passed. Go to 'My Assignments' to edit.",
  },
];

const Contact = ({ darkMode }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className={`${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
    // style={{ paddingTop: "170px" }}
    >
      <div className="container contact-page">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Contact with Team</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Our team is always here to assist and communicate with you. Whether you have a question,
            feedback, or suggestion regarding our services, feel free to reach out to us anytime.
            We're committed to delivering a seamless experience and ensuring every query is resolved.
          </p>
        </div>

        <div className="row g-4">
          {/* Contact Cards */}
          <div className="col-lg-6">
            <div className="row g-3">
              {[
                { icon: "fas fa-phone", text: "Phone", value: "+977-9819748055", color: "text-warning" },
                { icon: "fab fa-whatsapp", text: "Whatsapp", value: "+977-9819748055", color: "text-success" },
                { icon: "fas fa-envelope", text: "Email", value: "support@sms.com", color: "text-danger" },
                { icon: "fas fa-store", text: "Institution", value: "New Plaza, Kathmandu, Nepal", color: "text-primary" },
              ].map((item, idx) => (
                <div className="col-6" key={idx}>
                  <div className="contact-card text-center p-4 h-100">
                    <i className={`${item.icon} fa-2x ${item.color} mb-2`}></i>
                    <h6 className="fw-bold">{item.text}</h6>
                    <p className="mb-0 text-muted">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="col-12">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.521969198114!2d85.31856097532355!3d27.70116587618616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19688077a1ff%3A0x3ea9b1c08b4234dc!2sMindrisers%20Institute%20of%20Technology!5e0!3m2!1sen!2snp!4v1753898004267!5m2!1sen!2snp"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: "20px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className={`contact-card p-4 ${darkMode ? "bg-secondary text-white" : "bg-white"}`}>
              <h4 className="fw-bold mb-3">Get In Touch</h4>
              <p className="text-muted mb-4">
                Our Student Management System is designed to simplify communication and support. If you have questions, feedback, or need assistance, don’t hesitate to reach out. We’re here to help you make the most of your academic journey.
              </p>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Your Name..." required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="example@email.com" required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Subject..." required />
                </div>
                <div className="mb-4">
                  <textarea className="form-control" placeholder="Type here..." rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-warning w-100 text-white fw-semibold shadow send-btn">
                  Send Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQs and Founder */}
        <div className="row mt-4">
          {/* FAQs */}
          <div className="col-md-6">
            <div className="faq-box p-4 shadow bg-white">
              <h5 className="fw-bold mb-3">Frequently Asked Questions</h5>
              {faqsData.map((faq, index) => (
                <div key={index} className="mb-2">
                  <button className="btn w-100 text-start fw-semibold faq-question" onClick={() => toggleFAQ(index)}>
                    {faq.question}
                  </button>
                  {activeIndex === index && (
                    <p className="text-muted ps-3 pt-1 faq-answer">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Founder Card - Static */}
          <div className="col-md-6">
            <div className="founder-card p-4 shadow text-center bg-white">
              <div className="founder-image-wrapper mb-3">
                <img src={founderImg} alt="Founder" />
              </div>
              <h5 className="fw-bold">Mr. Bishnu Kumar Yadav</h5>
              <p className="text-muted">
                Founder and CEO of Student Management System, Mr. Yadav is a visionary leader committed to innovation
                in education and technology. His leadership fuels progress and purpose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
