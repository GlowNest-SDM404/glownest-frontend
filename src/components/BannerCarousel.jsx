import React, { useEffect, useMemo, useState } from "react";
import "../styles/BannerCarousel.css";

const BannerCarousel = ({
  images,
  overlayTitle = "Reveal Your Natural Radiance",
  overlaySubtitle = "Quality skincare for glowing, youthful, confident skin.",
  intervalMs = 6000,
}) => {
  const autoSlides = useMemo(
    () =>
      Object.values(
        import.meta.glob(
          "../assets/img/banner-slider/*.{jpg,jpeg,png,webp,gif}",
          {
            eager: true,
            import: "default",
          }
        )
      ),
    []
  );

  const slides = images?.length ? images : autoSlides;

  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [ready, setReady] = useState(true);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const goTo = (idx, d = 1) => {
    if (!slides.length) return;
    setDir(d);
    setPrevIndex(current);
    setCurrent((idx + slides.length) % slides.length);
    setReady(false);
  };

  const next = () => goTo(current + 1, 1);
  const prev = () => goTo(current - 1, -1);

  // Auto-play
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [paused, slides.length, intervalMs, current]);

  useEffect(() => {
    if (!slides.length) return;
    const img = new Image();
    img.src = slides[current];
    const done = () => setReady(true);
    img.decode ? img.decode().then(done).catch(done) : (img.onload = done);
  }, [current, slides]);

  if (!slides.length) return null;

  const altFromPath = (p) =>
    (p?.split("/").pop()?.split(".")[0] || "slide").replace(/[-_]/g, " ");

  return (
    <section
      className="home-slider-container"
      role="region"
      aria-label="Hero carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <img
        src={slides[prevIndex]}
        alt={altFromPath(slides[prevIndex])}
        className="home-slider-image home-slider-image--base"
        aria-hidden="true"
      />

      <img
        src={slides[current]}
        alt={altFromPath(slides[current])}
        className={`home-slider-image home-slider-image--in ${
          ready ? (dir === 1 ? "from-right" : "from-left") : "is-waiting"
        }`}
        onAnimationEnd={() => setPrevIndex(current)}
      />

      <div className="home-slider-text">
        <h2>{overlayTitle}</h2>
        <p>{overlaySubtitle}</p>
      </div>

      {slides.length > 1 && (
        <>
          <button
            className="home-slider-button home-prev-button"
            onClick={prev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="home-slider-button home-next-button"
            onClick={next}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="home-dots" role="tablist" aria-label="Carousel dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`home-dot ${i === current ? "active" : ""}`}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === current}
                role="tab"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BannerCarousel;
