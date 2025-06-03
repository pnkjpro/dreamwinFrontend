<template>
    <div class="container">
        <header @click="navigateToBack">
            <button class="back-button">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1>Terms and Conditions</h1>
            <p class="subtitle">Please read these terms carefully before using Himpri.com</p>
        </header>
        
        <div class="content-wrapper">
            <div class="effective-date">
                <p><strong>Effective Date: 23 May 2025</strong></p>
                <p>By accessing or using Himpri.com, you agree to be bound by these Terms and Conditions. If you disagree with any part, please do not access the platform.</p>
            </div>

            <div class="section">
                <h2><i class="fas fa-user-check"></i> 1. Account Registration and Eligibility</h2>
                <ul class="terms-list">
                    <li>Must be 18 years or older.</li>
                    <li>Must comply with local laws.</li>
                    <li>Must provide accurate information and complete KYC for withdrawals.</li>
                </ul>
            </div>

            <div class="section">
                <h2><i class="fas fa-trophy"></i> 2. Contest Participation</h2>
                <ul class="terms-list">
                    <li>Pay entry fee (if applicable) via UPI, cards, net banking, or Himpri wallet.</li>
                    <li>Join from Live or Upcoming Contests.</li>
                    <li>Contest rules and scoring are published per contest.</li>
                </ul>
            </div>

            <div class="section">
                <h2><i class="fas fa-gift"></i> 3. Rewards & Withdrawals</h2>
                <ul class="terms-list">
                    <li>Prizes are credited to the Himpri wallet.</li>
                    <li>Withdrawals require KYC verification.</li>
                    <li>Minimum withdrawal amounts may apply.</li>
                </ul>
            </div>

            <div class="section">
                <h2><i class="fas fa-shield-alt"></i> 4. Fair Play & Prohibited Conduct</h2>
                <ul class="terms-list">
                    <li>No bots, scripts, multiple accounts, or cheating.</li>
                    <li>Violators will be banned and winnings forfeited.</li>
                </ul>
            </div>

            <div class="section">
                <h2><i class="fas fa-users"></i> 5. Referral Program</h2>
                <ul class="terms-list">
                    <li>Invite friends with your code.</li>
                    <li>Earn bonus when they join and play.</li>
                </ul>
            </div>

            <div class="section">
                <h2><i class="fas fa-copyright"></i> 6. Intellectual Property</h2>
                <p>All content is owned by Himpri or licensed. Reproduction, data mining, or unauthorized distribution is prohibited.</p>
            </div>

            <div class="section">
                <h2><i class="fas fa-gavel"></i> 7. Dispute Resolution</h2>
                <ul class="terms-list">
                    <li>Contact support for resolution.</li>
                    <li>If unresolved, disputes may proceed to mediation or arbitration under Indian law.</li>
                </ul>
            </div>

            <div class="section">
                <h2><i class="fas fa-ban"></i> 8. Termination</h2>
                <p>Accounts may be suspended for violations or suspicious activity.</p>
            </div>

            <div class="section">
                <h2><i class="fas fa-edit"></i> 9. Modifications</h2>
                <p>Terms may be updated periodically. Continued use constitutes agreement to the updated terms.</p>
            </div>

            <div class="contact-section">
                <h2><i class="fas fa-phone"></i> 10. Contact Information</h2>
                <div class="contact-grid">
                    <div class="contact-card">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-info">
                            <strong>Email</strong>
                            <p><a href="mailto:info@himpri.com">info@himpri.com</a></p>
                        </div>
                    </div>
                    
                    <div class="contact-card">
                        <div class="contact-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="contact-info">
                            <strong>Phone</strong>
                            <p><a href="tel:+917985890675">+91 7985890675</a></p>
                        </div>
                    </div>
                    
                    <div class="contact-card full-width">
                        <div class="contact-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="contact-info">
                            <strong>Address</strong>
                            <p>A-1141, Indira Nagar, Lucknow, Uttar Pradesh, 226016</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <h2>Ready to Start Playing?</h2>
                <p>Now that you've read our terms, join thousands of players earning through knowledge!</p>
                <p><strong>Play Smart. Win Big.</strong></p>
                <a href="http://himpri.com" class="cta-button">Start Playing Now</a>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2025 Himpri.com - All Rights Reserved</p>
            <p>For more information, visit <a href="http://www.himpri.com" target="_blank">www.himpri.com</a></p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter();
const navigateToBack = () => {
    router.back();
}
</script>

<style scoped>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f7f9fc;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        header {
            background: linear-gradient(135deg, #ff7e1a 0%, #ff9f50 100%);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
        }
        
        .back-button {
            position: absolute;
            left: 15px;
            top: 15px;
            color: white;
            background-color: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .back-button:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: translateX(-3px);
        }
        
        h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .subtitle {
            font-size: 16px;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .content-wrapper {
            padding: 30px;
        }
        
        .effective-date {
            background-color: #fff9f2;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #ff7e1a;
        }
        
        .effective-date strong {
            color: #ff7e1a;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        h2 {
            color: #ff7e1a;
            font-size: 20px;
            margin-bottom: 15px;
            position: relative;
            padding-bottom: 8px;
            display: flex;
            align-items: center;
        }
        
        h2 i {
            margin-right: 10px;
            width: 20px;
        }
        
        h2:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 50px;
            height: 2px;
            background-color: #ff7e1a;
        }
        
        p {
            margin-bottom: 15px;
            color: #555;
        }
        
        .terms-list {
            list-style: none;
            padding-left: 0;
        }
        
        .terms-list li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 8px;
            color: #555;
        }
        
        .terms-list li:before {
            content: "•";
            color: #ff7e1a;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .contact-section {
            background-color: #fff9f2;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 25px;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .contact-card {
            display: flex;
            align-items: center;
            background-color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .contact-card.full-width {
            grid-column: 1 / -1;
        }
        
        .contact-icon {
            background-color: #ff7e1a;
            color: white;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .contact-info strong {
            display: block;
            color: #ff7e1a;
            margin-bottom: 5px;
        }
        
        .contact-info p {
            margin: 0;
        }
        
        .contact-info a {
            color: #555;
            text-decoration: none;
        }
        
        .contact-info a:hover {
            color: #ff7e1a;
        }
        
        .cta-section {
            text-align: center;
            background: linear-gradient(135deg, #ff7e1a 0%, #ff9f50 100%);
            padding: 30px;
            border-radius: 8px;
            color: white;
            margin-bottom: 20px;
        }
        
        .cta-section h2 {
            color: white;
            padding-bottom: 0;
            justify-content: center;
        }
        
        .cta-section h2:after {
            display: none;
        }
        
        .cta-section p {
            margin-bottom: 20px;
            color: white;
        }
        
        .cta-button {
            display: inline-block;
            background-color: white;
            color: #ff7e1a;
            padding: 12px 25px;
            border-radius: 30px;
            font-weight: bold;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #fff9f2;
            font-size: 14px;
            color: #666;
        }
        
        .footer a {
            color: #ff7e1a;
            text-decoration: none;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 600px) {
            .content-wrapper {
                padding: 20px 15px;
            }
            
            header {
                padding: 20px;
            }
            
            .contact-grid {
                grid-template-columns: 1fr;
            }
            
            .contact-card.full-width {
                grid-column: 1;
            }
            
            h2 {
                font-size: 18px;
            }
        }
    </style>