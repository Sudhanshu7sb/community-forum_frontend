import React from "react";
import Footer from "../components/Footer";
import HeroSection from "./HeroSection";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <HeroSection />
        <Footer />
      </>
    );
  }
}

export default HomePage;
