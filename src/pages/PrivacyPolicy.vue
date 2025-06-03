<template>
    <div class="container">
        <header @click="navigateToBack">
            <button class="back-button">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1>Privacy Policy</h1>
            <p class="subtitle">Your privacy matters to us - Learn how we protect your personal information</p>
        </header>
        
        <div class="content-wrapper">
            <div class="effective-date">
                <p><strong>Last Updated: 23rd May 2025</strong></p>
                <p>Sandilya Technologies respects your privacy. This policy explains how we collect, use, and protect your personal data.</p>
            </div>

            <div class="section">
                <h2><i class="fas fa-database"></i> What We Collect</h2>
                <div class="data-grid">
                    <div class="data-card">
                        <div class="data-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="data-info">
                            <strong>Personal Information</strong>
                            <p>Name, email, mobile number</p>
                        </div>
                    </div>
                    
                    <div class="data-card">
                        <div class="data-icon">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div class="data-info">
                            <strong>Optional Details</strong>
                            <p>Age, state, gender (optional)</p>
                        </div>
                    </div>
                    
                    <div class="data-card">
                        <div class="data-icon">
                            <i class="fas fa-credit-card"></i>
                        </div>
                        <div class="data-info">
                            <strong>Payment Information</strong>
                            <p>Securely processed via third-party gateway</p>
                        </div>
                    </div>
                    
                    <div class="data-card">
                        <div class="data-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="data-info">
                            <strong>Security Data</strong>
                            <p>Device and IP information for security</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2><i class="fas fa-cogs"></i> How We Use It</h2>
                <div class="usage-list">
                    <div class="usage-item">
                        <div class="usage-icon">
                            <i class="fas fa-play-circle"></i>
                        </div>
                        <p>To allow participation in quizzes</p>
                    </div>
                    <div class="usage-item">
                        <div class="usage-icon">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <p>To process payments and winnings</p>
                    </div>
                    <div class="usage-item">
                        <div class="usage-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <p>To improve user experience</p>
                    </div>
                    <div class="usage-item">
                        <div class="usage-icon">
                            <i class="fas fa-lock"></i>
                        </div>
                        <p>To prevent fraud and maintain system integrity</p>
                    </div>
                </div>
            </div>

            <div class="section sharing-section">
                <h2><i class="fas fa-share-alt"></i> Data Sharing</h2>
                <div class="sharing-content">
                    <div class="no-sell-badge">
                        <i class="fas fa-times-circle"></i>
                        <span>We do NOT sell your data</span>
                    </div>
                    <p>We only share information with verified partners (e.g., payment gateways, analytics providers) under confidentiality agreements.</p>
                </div>
            </div>

            <div class="section rights-section">
                <h2><i class="fas fa-user-shield"></i> Your Rights</h2>
                <div class="rights-content">
                    <div class="rights-grid">
                        <div class="right-item">
                            <i class="fas fa-trash-alt"></i>
                            <span>Request data deletion</span>
                        </div>
                        <div class="right-item">
                            <i class="fas fa-bell-slash"></i>
                            <span>Opt out of non-essential communications</span>
                        </div>
                    </div>
                    <p class="rights-note">You can exercise these rights at any time by contacting us.</p>
                </div>
            </div>

            <div class="contact-section">
                <h2><i class="fas fa-envelope"></i> Privacy-Related Concerns</h2>
                <div class="privacy-contact">
                    <div class="contact-card">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-info">
                            <strong>Email Us</strong>
                            <p><a href="mailto:info@himpri.com">info@himpri.com</a></p>
                        </div>
                    </div>
                </div>
                <p class="contact-note">For any privacy-related questions or concerns, don't hesitate to reach out to us.</p>
            </div>
            
            <div class="cta-section">
                <h2>Your Privacy is Protected</h2>
                <p>Now that you understand how we handle your data, feel confident in joining our quiz community!</p>
                <p><strong>Play Smart. Play Secure.</strong></p>
                <a href="http://himpri.com" class="cta-button">Start Playing Now</a>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2025 Himpri.com - All Rights Reserved</p>
            <p>For more information, visit <a href="http://himpri.com" target="_blank">www.himpri.com</a></p>
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
        
        .data-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .data-card {
            display: flex;
            align-items: center;
            background-color: #fff9f2;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .data-icon {
            background-color: #ff7e1a;
            color: white;
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .data-info strong {
            display: block;
            color: #ff7e1a;
            margin-bottom: 5px;
            font-size: 14px;
        }
        
        .data-info p {
            margin: 0;
            font-size: 13px;
        }
        
        .usage-list {
            display: grid;
            gap: 10px;
        }
        
        .usage-item {
            display: flex;
            align-items: center;
            padding: 12px;
            background-color: #fff9f2;
            border-radius: 6px;
        }
        
        .usage-icon {
            background-color: #ff7e1a;
            color: white;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .usage-item p {
            margin: 0;
            color: #555;
        }
        
        .sharing-section {
            background-color: #fff9f2;
            padding: 20px;
            border-radius: 8px;
        }
        
        .no-sell-badge {
            display: inline-flex;
            align-items: center;
            background-color: #28a745;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .no-sell-badge i {
            margin-right: 8px;
        }
        
        .rights-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
        }
        
        .rights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .right-item {
            display: flex;
            align-items: center;
            background-color: white;
            padding: 12px;
            border-radius: 6px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .right-item i {
            color: #ff7e1a;
            margin-right: 10px;
            width: 20px;
        }
        
        .rights-note {
            font-style: italic;
            color: #666;
            margin: 0;
        }
        
        .contact-section {
            background-color: #fff9f2;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 25px;
        }
        
        .privacy-contact {
            margin-bottom: 15px;
        }
        
        .contact-card {
            display: flex;
            align-items: center;
            background-color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            max-width: 300px;
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
        
        .contact-note {
            color: #666;
            font-style: italic;
            margin: 0;
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
            
            .data-grid {
                grid-template-columns: 1fr;
            }
            
            .rights-grid {
                grid-template-columns: 1fr;
            }
            
            h2 {
                font-size: 18px;
            }
        }
    </style>