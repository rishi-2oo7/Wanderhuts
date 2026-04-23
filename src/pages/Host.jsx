import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Host.css";

const steps = [
  { icon: "🏠", title: "Tell us about your place", desc: "Share some basic info, like where it is and how many guests can stay." },
  { icon: "📸", title: "Make it stand out", desc: "Add 5 or more photos plus a title and description. We'll help you out." },
  { icon: "✨", title: "Finish up and publish", desc: "Choose a starting price, verify a few details, then publish your listing." },
];

export default function Host() {
  const [step, setStep] = useState(0);
  useEffect(() => { document.title = "Become a Host – WanderHuts"; }, []);

  return (
    <div className="host-page">
      <div className="host-hero">
        <div className="host-hero__overlay" />
        <img
          src="https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=1600&q=80"
          alt="Hosting"
          className="host-hero__img"
        />
        <div className="host-hero__content">
          <h1>Open your door<br /><span>to the world</span></h1>
          <p>Join millions of hosts earning extra income with WanderHuts</p>
          <Link to="/" className="host-cta">Get started</Link>
        </div>
      </div>

      <div className="host-container">
        {/* Steps */}
        <section className="host-steps">
          <h2>It's easy to get started on WanderHuts</h2>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className={`step-card ${step === i ? "step-card--active" : ""}`} onClick={() => setStep(i)}>
                <div className="step-number">{i + 1}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Earnings */}
        <section className="host-earnings">
          <div className="earnings-text">
            <h2>How much could you earn?</h2>
            <p>The average WanderHuts host earns <strong>$13,800 per year</strong>. Your earnings will depend on your location, listing quality, and availability.</p>
            <div className="earnings-calc">
              <label>Nightly price estimate</label>
              <div className="earnings-slider-row">
                <input type="range" min={50} max={800} defaultValue={200} className="earnings-slider" />
                <span className="earnings-amount">$200/night</span>
              </div>
            </div>
          </div>
          <div className="earnings-img-wrap">
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80" alt="Beautiful listing" />
          </div>
        </section>

        {/* CTA */}
        <section className="host-final-cta">
          <h2>Ready to WanderHuts?</h2>
          <p>Join our community of hosts and start sharing your space today.</p>
          <Link to="/" className="host-cta host-cta--dark">Start your listing</Link>
        </section>
      </div>
    </div>
  );
}
