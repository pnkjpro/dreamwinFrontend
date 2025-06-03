
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
        
        .faq-wrapper {
            padding: 30px;
        }
        
        .faq-item {
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }
        
        .faq-item:last-child {
            border-bottom: none;
        }
        
        .question {
            display: flex;
            align-items: flex-start;
            cursor: pointer;
            font-weight: 600;
            color: #ff7e1a;
            font-size: 18px;
            margin-bottom: 10px;
        }
        
        .question-number {
            background-color: #ff7e1a;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            flex-shrink: 0;
            font-size: 14px;
        }
        
        .answer {
            padding-left: 40px;
            color: #555;
        }
        
        .highlight {
            background-color: #fff0e3;
            padding: 2px 5px;
            border-radius: 4px;
            font-weight: 500;
            color: #ff7e1a;
        }
        
        .payment-options, .emphasis {
            margin-top: 10px;
            margin-bottom: 10px;
        }
        
        .payment-options li {
            list-style-type: none;
            margin-bottom: 5px;
            padding-left: 20px;
            position: relative;
        }
        
        .payment-options li:before {
            content: "•";
            color: #ff7e1a;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .divider {
            height: 1px;
            background-color: #eee;
            margin: 30px 0;
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
            .faq-wrapper {
                padding: 20px 15px;
            }
            
            .question {
                font-size: 16px;
            }
            
            header {
                padding: 20px;
            }
        }
    </style>
<template>
    <div class="container">
        <header @click="navigateToBack">
            <button class="back-button">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1>Help & FAQs</h1>
            <p class="subtitle">Find answers to commonly asked questions about using Himpri.com</p>
        </header>
        
        <div class="faq-wrapper">
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">1</div>
                    <div>How to Join Himpri?</div>
                </div>
                <div class="answer">
                    Visit <a href="http://www.himpri.com" target="_blank">www.himpri.com</a> and sign up using your mobile number or email ID. After verifying your OTP, you can create your profile and start playing.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">2</div>
                    <div>How to Participate in a Contest?</div>
                </div>
                <div class="answer">
                    Go to the <span class="highlight">Live Contests</span> or <span class="highlight">Upcoming Contests</span> section on the dashboard. Select the contest you want to join and click on <span class="highlight">Join Now</span>. If the contest requires an entry fee, complete the payment to confirm your spot.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">3</div>
                    <div>How to Pay the Entry Fee?</div>
                </div>
                <div class="answer">
                    You can pay using various payment options available such as:
                    <ul class="payment-options">
                        <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
                        <li>Debit/Credit Cards</li>
                        <li>Net Banking</li>
                        <li>Wallet Balance (if available in your Himpri account)</li>
                    </ul>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">4</div>
                    <div>How to Earn Cash Rewards?</div>
                </div>
                <div class="answer">
                    If you rank among the top scorers in any quiz or contest, you become eligible for a cash prize. The reward depends on the contest type and total number of participants. The prize money will be credited to your Himpri wallet.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">5</div>
                    <div>How to Withdraw My Winnings?</div>
                </div>
                <div class="answer">
                    Go to the <span class="highlight">My Wallet</span> section in your profile. You can place a withdrawal request by entering your bank account or UPI ID. Minimum withdrawal amount and KYC verification may be required as per policy.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">6</div>
                    <div>Is KYC required to withdraw money?</div>
                </div>
                <div class="answer">
                    Yes, to ensure secure transactions, you may need to complete KYC verification by uploading your ID proof (like Aadhaar card, PAN card, etc.).
                </div>
            </div>
            
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">7</div>
                    <div>What happens if I get disconnected during a contest?</div>
                </div>
                <div class="answer">
                    In case of network issues or disconnection, you can rejoin the contest if it's still active. However, Himpri is not responsible for any loss of performance due to poor connectivity.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">8</div>
                    <div>Are the contests fair and transparent?</div>
                </div>
                <div class="answer">
                    Absolutely! All questions are randomly generated and results are calculated by our system automatically. We maintain strict anti-cheating protocols to ensure a fair gaming experience for all.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">9</div>
                    <div>Can I invite friends to Himpri?</div>
                </div>
                <div class="answer">
                    Yes! Use your unique referral code to invite friends and earn bonus cash when they join and play.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="question">
                    <div class="question-number">10</div>
                    <div>Where can I get support if I face any issues?</div>
                </div>
                <div class="answer">
                    You can reach our support team through the <span class="highlight">Help</span> section on the website or fill the Google form link - <a href="https://forms.gle/zB1WEBNwWf3BCzED9" target="_blank">https://forms.gle/zB1WEBNwWf3BCzED9</a>. Our team is available to help you 24x7.
                </div>
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
