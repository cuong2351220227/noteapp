<template>
  <footer class="notion-footer">
    <div class="footer-content">
      <!-- Brand Info -->
      <div class="footer-section brand-info">
        <img :src="logo" alt="Notion Logo" class="notion-logo" />

        <!-- Social Icons -->
        <div class="social-icons">
          <a href="#"><img :src="logoInstagram" alt="Instagram" /></a>
          <a href="#"><img :src="logoX" alt="X" /></a>
          <a href="#"><img :src="logoLinkedin" alt="LinkedIn" /></a>
          <a href="#"><img :src="logoFacebook" alt="Facebook" /></a>
          <a href="#"><img :src="logoYoutube" alt="YouTube" /></a>
        </div>

        <!-- Language Selector -->
        <div class="language-selector">
          <select>
            <option value="en">🌐 English (US)</option>
            <option value="vi">🇻🇳 Tiếng Việt</option>
          </select>
        </div>

        <a href="#" class="cookie-settings">Cookie settings</a>
        <p class="copyright">© 2025 Notion Labs, Inc.</p>
      </div>

      <!-- Company -->
      <div class="footer-section">
        <h3>Company</h3>
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Security</a></li>
          <li><a href="#">Status</a></li>
          <li><a href="#">Terms & privacy</a></li>
          <li><a href="#">Your privacy rights</a></li>
        </ul>
      </div>

      <!-- Download -->
      <div class="footer-section">
        <h3>Download</h3>
        <ul>
          <li><a href="#">iOS & Android</a></li>
          <li><a href="#">Mac & Windows</a></li>
          <li><a href="#">Calendar</a></li>
          <li><a href="#">Web Clipper</a></li>
        </ul>
      </div>

      <!-- Resources -->
      <div class="footer-section">
        <h3>Resources</h3>
        <ul>
          <li><a href="#">Help center</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#">Integrations</a></li>
          <li><a href="#">Templates</a></li>
          <li><a href="#">Affiliates</a></li>
        </ul>
      </div>

      <!-- Notion for -->
      <div class="footer-section">
        <h3>Notion for</h3>
        <ul>
          <li><a href="#">Enterprise</a></li>
          <li><a href="#">Small business</a></li>
          <li><a href="#">Personal</a></li>
        </ul>
        <a href="#" class="explore-more">Explore more →</a>
      </div>
    </div>
  </footer>
</template>

<script>
import logo from "@/assets/logo1.png";
import logoInstagram from "@/assets/logo-instagram.png";
import logoX from "@/assets/logo-x.png";
import logoLinkedin from "@/assets/logo-linkedin.png";
import logoFacebook from "@/assets/logo-facebook.png";
import logoYoutube from "@/assets/logo-youtube.png";

export default {
  name: "AppFooter",
  data() {
    return {
      logo,
      logoInstagram,
      logoX,
      logoLinkedin,
      logoFacebook,
      logoYoutube,
    };
  },
};
</script>

<style scoped>
.notion-footer {
  background-color: #fff;
  padding: 60px 20px;
  font-family: Arial, sans-serif;
  color: #333;
  border-top: 1px solid #eee;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.footer-section {
  margin-right: 40px;
  margin-bottom: 30px;
  min-width: 180px;
  flex: 1;
}

.footer-section:last-child {
  margin-right: 0;
}

.notion-logo {
  width: 100px;
  margin-bottom: 20px;
}

h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #000;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  margin-bottom: 10px;
}

ul li a,
.cookie-settings,
.explore-more {
  text-decoration: none;
  color: #666;
  font-size: 14px;
}

ul li a:hover,
.cookie-settings:hover,
.explore-more:hover {
  color: #000;
}

.social-icons {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.social-icons img {
  width: 20px;
  height: 20px;
}

.language-selector select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f7f7f7;
  font-size: 14px;
  margin-bottom: 20px;
  appearance: none;
}

.copyright {
  font-size: 12px;
  color: #999;
  margin-top: 20px;
}

.explore-more {
  display: block;
  margin-top: 30px;
  font-weight: 600;
  color: #000;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    margin-right: 0;
    margin-bottom: 40px;
    min-width: unset;
    flex: unset;
  }

  .brand-info {
    order: -1;
  }
}
</style>
