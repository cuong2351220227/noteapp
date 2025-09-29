<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <TestimonialsSection />
    <PricingSection />
  </div>
</template>

<script>
import HeroSection from "../components/HeroSection.vue";
import FeaturesSection from "../components/FeaturesSection.vue";
import TestimonialsSection from "../components/TestimonialsSection.vue";
import PricingSection from "../components/PricingSection.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  components: {
    HeroSection,
    FeaturesSection,
    TestimonialsSection,
    PricingSection,
  }
};
</script>
