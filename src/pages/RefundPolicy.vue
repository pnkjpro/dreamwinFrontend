<template>
    <div class="container">
        <header @click="navigateToBack">
            <button class="back-button">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1>Refund Policy</h1>
            <p class="subtitle">Clear guidelines for refunds and payment-related concerns</p>
        </header>
        
        <div class="content-wrapper">
            <div class="intro-section">
                <p>Our refund policy is designed to be fair and transparent. Please read the following guidelines carefully to understand when refunds are applicable.</p>
            </div>

            <div class="section policy-section">
                <h2><i class="fas fa-ticket-alt"></i> 1. Quiz Entry Fee</h2>
                <div class="policy-content">
                    <div class="policy-card no-refund">
                        <div class="policy-icon">
                            <i class="fas fa-times-circle"></i>
                        </div>
                        <div class="policy-info">
                            <strong>Generally Non-Refundable</strong>
                            <p>Once paid, entry fees are non-refundable under normal circumstances.</p>
                        </div>
                    </div>
                    
                    <div class="exception-note">
                        <h4><i class="fas fa-exclamation-triangle"></i> Exceptions:</h4>
                        <ul class="exception-list">
                            <li>Technical failure on our platform</li>
                            <li>Duplicate charges processed</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="section policy-section">
                <h2><i class="fas fa-ban"></i> 2. Failure to Participate</h2>
                <div class="policy-content">
                    <div class="policy-card refund-eligible">
                        <div class="policy-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="policy-info">
                            <strong>Automatic Refund</strong>
                            <p>If the system prevents you from joining a quiz after payment due to our fault, you will be refunded automatically.</p>
                        </div>
                    </div>
                    
                    <div class="timeline-note">
                        <div class="timeline-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <span><strong>Processing Time:</strong> 3–7 business days</span>
                    </div>
                </div>
            </div>

            <div class="section policy-section">
                <h2><i class="fas fa-wallet"></i> 3. Wrong Fund Additions</h2>
                <div class="policy-content">
                    <div class="policy-card action-required">
                        <div class="policy-icon">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div class="policy-info">
                            <strong>Contact Support Required</strong>
                            <p>In case of incorrect fund transfer to your HIMPRI wallet, contact support immediately.</p>
                        </div>
                    </div>
                    
                    <div class="urgent-note">
                        <div class="urgent-icon">
                            <i class="fas fa-stopwatch"></i>
                        </div>
                        <span><strong>Time Limit:</strong> Contact within 48 hours</span>
                    </div>
                </div>
            </div>

            <div class="section policy-section">
                <h2><i class="fas fa-user-times"></i> 4. Disqualification Refunds</h2>
                <div class="policy-content">
                    <div class="policy-card no-refund">
                        <div class="policy-icon">
                            <i class="fas fa-times-circle"></i>
                        </div>
                        <div class="policy-info">
                            <strong>No Refund Eligible</strong>
                            <p>Users disqualified due to misconduct or rule violations are not eligible for refunds.</p>
                        </div>
                    </div>
                    
                    <div class="warning-note">
                        <i class="fas fa-shield-alt"></i>
                        <span>This includes cheating, multiple accounts, or any violation of fair play policies.</span>
                    </div>
                </div>
            </div>

            <div class="contact-section">
                <h2><i class="fas fa-headset"></i> Need a Refund?</h2>
                <div class="refund-contact">
                    <p class="contact-instruction">For all refund-related requests, please write to us with your transaction details:</p>
                    
                    <div class="contact-card">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-info">
                            <strong>Email Support</strong>
                            <p><a href="mailto:info@himpri.com">info@himpri.com</a></p>
                        </div>
                    </div>
                    
                    <div class="contact-tips">
                        <h4><i class="fas fa-lightbulb"></i> Include in your email:</h4>
                        <ul class="tips-list">
                            <li>Transaction ID or reference number</li>
                            <li>Date and time of transaction</li>
                            <li>Amount involved</li>
                            <li>Detailed description of the issue</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <h2>Questions About Refunds?</h2>
                <p>Our support team is here to help resolve any payment-related concerns quickly and fairly.</p>
                <p><strong>Fair Play. Fair Refunds.</strong></p>
                <a href="mailto:info@himpri.com" class="cta-button">Contact Support</a>
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
        
        .intro-section {
            background-color: #fff9f2;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #ff7e1a;
        }
        
        .intro-section p {
            margin: 0;
            color: #555;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .policy-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
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
        
        .policy-content {
            margin-top: 15px;
        }
        
        .policy-card {
            display: flex;
            align-items: flex-start;
            background-color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            margin-bottom: 15px;
            border-left: 4px solid;
        }
        
        .policy-card.no-refund {
            border-left-color: #dc3545;
        }
        
        .policy-card.refund-eligible {
            border-left-color: #28a745;
        }
        
        .policy-card.action-required {
            border-left-color: #ffc107;
        }
        
        .policy-icon {
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 15px;
            flex-shrink: 0;
            color: white;
        }
        
        .no-refund .policy-icon {
            background-color: #dc3545;
        }
        
        .refund-eligible .policy-icon {
            background-color: #28a745;
        }
        
        .action-required .policy-icon {
            background-color: #ffc107;
        }
        
        .policy-info strong {
            display: block;
            margin-bottom: 5px;
            font-size: 16px;
        }
        
        .no-refund .policy-info strong {
            color: #dc3545;
        }
        
        .refund-eligible .policy-info strong {
            color: #28a745;
        }
        
        .action-required .policy-info strong {
            color: #856404;
        }
        
        .policy-info p {
            margin: 0;
            color: #555;
        }
        
        .exception-note, .timeline-note, .urgent-note, .warning-note {
            background-color: #fff9f2;
            padding: 12px;
            border-radius: 6px;
            margin-top: 10px;
        }
        
        .exception-note h4 {
            color: #ff7e1a;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }
        
        .exception-note h4 i {
            margin-right: 8px;
        }
        
        .exception-list {
            list-style: none;
            padding-left: 0;
        }
        
        .exception-list li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 5px;
            color: #555;
        }
        
        .exception-list li:before {
            content: "•";
            color: #ff7e1a;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .timeline-note, .urgent-note {
            display: flex;
            align-items: center;
        }
        
        .timeline-icon, .urgent-icon {
            background-color: #ff7e1a;
            color: white;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 10px;
            flex-shrink: 0;
        }
        
        .warning-note {
            display: flex;
            align-items: flex-start;
        }
        
        .warning-note i {
            color: #ff7e1a;
            margin-right: 10px;
            margin-top: 2px;
        }
        
        .contact-section {
            background-color: #fff9f2;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 25px;
        }
        
        .contact-instruction {
            margin-bottom: 20px;
            color: #555;
        }
        
        .contact-card {
            display: flex;
            align-items: center;
            background-color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            margin-bottom: 20px;
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
        
        .contact-tips h4 {
            color: #ff7e1a;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        
        .contact-tips h4 i {
            margin-right: 8px;
        }
        
        .tips-list {
            list-style: none;
            padding-left: 0;
        }
        
        .tips-list li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 5px;
            color: #555;
        }
        
        .tips-list li:before {
            content: "•";
            color: #ff7e1a;
            font-weight: bold;
            position: absolute;
            left: 0;
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
        
        p {
            margin-bottom: 15px;
            color: #555;
        }
        
        @media (max-width: 600px) {
            .content-wrapper {
                padding: 20px 15px;
            }
            
            header {
                padding: 20px;
            }
            
            h2 {
                font-size: 18px;
            }
            
            .policy-card {
                flex-direction: column;
                text-align: left;
            }
            
            .policy-icon {
                margin-right: 0;
                margin-bottom: 10px;
                align-self: flex-start;
            }
        }
    </style>