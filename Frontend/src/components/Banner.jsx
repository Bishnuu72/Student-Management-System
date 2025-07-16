import React from "react";
import B1 from "../assets/banner1.jpg";
import B2 from "../assets/banner2.jpg";

const Banner = () => {
  const banners = [
    {
      img: B1,
      title: "Empowering Students for a Better Future",
      desc:
        "Our Student Management System helps streamline academic processes, improves student performance tracking, and fosters better communication between institutions and students for holistic growth.",
    },
    {
      img: B2,
      title: "Smart Student Management System",
      desc:
        "Discover a modern way to manage student data, attendance, grades, and course enrollment efficiently. Built with scalable tech, it's secure, intuitive, and easy to manage for admins.",
    },
  ];

  return (
    <div className="banner-container">
      <div id="studentCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators custom-indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#studentCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {banners.map((banner, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <img src={banner.img} className="d-block w-100 banner-img" alt={`slide-${index}`} />
              <div className="carousel-caption d-none d-md-block text-start">
                <h2 className="banner-title">{banner.title}</h2>
                <p className="banner-desc">{banner.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button className="carousel-control-prev custom-arrow" type="button" data-bs-target="#studentCarousel" data-bs-slide="prev" style={{marginLeft: "70px"}}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button className="carousel-control-next custom-arrow" type="button" data-bs-target="#studentCarousel" data-bs-slide="next" style={{marginRight: "70px"}}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
