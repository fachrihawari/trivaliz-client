'use client'

import CountrySelector from "./components/country_selector";
import Header from "./components/header";
import ModeSelector from "./components/mode_selector";

export default function StartPage() {
  return (
    <div>
      <Header />
      <CountrySelector />
      <ModeSelector />
    </div>
  );
}
