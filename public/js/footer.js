export function CampaignFooter() {
  const footer = document.getElementById("footer");
  footer.innerHTML = `
    <div class="campaign-footer">
      <div class="footer-container">
     <div class="footer-box footer-logo" >
              <a href="/index.html"><img src="../image/logo.png" alt="Campaign Logo" class="footer-logo-img"></a>
      </div>
        <div class="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
        <li><a href="/pages/groupcampaign.html" class="nav-link">Campaigns</a></li>
        <li><a href="/index.html#about" class="nav-link">About</a></li>
        <li><a href="/index.html#testimonials" class="nav-link">Testimonials</a></li>
          </ul>
        </div>

        <div class="footer-box">
          <h3>Our Services</h3>
          <ul>
            <li><a href="#">Community Projects</a></li>
            <li><a href="#">Volunteering</a></li>
            <li><a href="#">Donations</a></li>
            <li><a href="#">Partnerships</a></li>
          </ul>
        </div>

        <div class="footer-box">
          <h3>Follow Us</h3>
          <div class="social">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2025 Campaign All Rights Reserved</p>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", CampaignFooter);
