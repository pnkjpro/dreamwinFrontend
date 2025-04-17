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
        
        .section {
            margin-bottom: 30px;
        }
        
        h2 {
            color: #ff7e1a;
            font-size: 22px;
            margin-bottom: 15px;
            position: relative;
            padding-bottom: 8px;
        }
        
        h2:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 60px;
            height: 3px;
            background-color: #ff7e1a;
        }
        
        h3 {
            color: #ff7e1a;
            font-size: 18px;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        
        p {
            margin-bottom: 15px;
        }
        
        .term-item {
            margin-bottom: 25px;
        }
        
        ul, ol {
            margin-left: 20px;
            margin-bottom: 15px;
        }
        
        li {
            margin-bottom: 8px;
        }
        
        .highlight-box {
            background-color: #fff9f2;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #ff7e1a;
        }
        
        .highlight-box h3 {
            margin-top: 0;
        }
        
        .important {
            font-weight: 600;
            color: #ff7e1a;
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
        
        .last-updated {
            text-align: right;
            font-style: italic;
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }
        
        @media (max-width: 600px) {
            .content-wrapper {
                padding: 20px 15px;
            }
            
            header {
                padding: 20px;
            }
            
            h1 {
                font-size: 24px;
            }
            
            h2 {
                font-size: 20px;
            }
        }
    </style>

<script setup>
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const router = useRouter();
const navigateToBack = () => {
    router.back();
}
</script>

<template>
    <div class="container">
        <header>
            <button class="back-button" onclick="window.history.back()">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1>Terms and Conditions</h1>
            <p class="subtitle">Please read these terms carefully before using Himpri.com</p>
        </header>
        
        <div class="content-wrapper">
            <div class="highlight-box">
                <h3>Agreement to Terms</h3>
                <p>By accessing or using Himpri.com, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the platform.</p>
            </div>
            
            <div class="section">
                <h2>1. Introduction</h2>
                <div class="term-item">
                    <p>Welcome to Himpri.com (the "Platform"), a knowledge-based gaming platform that allows users to participate in quiz contests and earn cash rewards. These Terms and Conditions govern your use of the Platform and form a binding legal agreement between you and Himpri.</p>
                    <p>Himpri.com is owned and operated by Mr. Devi Prasad Pandey and Mr. Jagdamba Prasad Pandey ("We," "Us," or "Our").</p>
                </div>
            </div>
            
            <div class="section">
                <h2>2. Account Registration and Eligibility</h2>
                <div class="term-item">
                    <h3>2.1 Registration Process</h3>
                    <p>To use the Platform, you must register and create an account using your mobile number or email ID. You will need to complete the verification process by providing the OTP (One-Time Password) sent to your registered contact information.</p>
                    
                    <h3>2.2 Eligibility Requirements</h3>
                    <p>By creating an account, you represent and warrant that:</p>
                    <ul>
                        <li>You are at least 18 years of age or the legal age of majority in your jurisdiction, whichever is higher.</li>
                        <li>You are legally permitted to participate in online skill-based gaming with cash prizes in your jurisdiction.</li>
                        <li>You are not accessing the Platform from a jurisdiction where participation in such activities is prohibited by law.</li>
                        <li>The information you provide during registration is accurate, complete, and current.</li>
                    </ul>
                    
                    <h3>2.3 Account Security</h3>
                    <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to:</p>
                    <ul>
                        <li>Immediately notify us of any unauthorized use of your account or any other breach of security.</li>
                        <li>Ensure that you log out from your account at the end of each session.</li>
                        <li>Not share your account credentials with any third party.</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2>3. Contest Participation</h2>
                <div class="term-item">
                    <h3>3.1 Contest Entry</h3>
                    <p>Users can view and join contests from the "Live Contests" or "Upcoming Contests" sections on the dashboard. Certain contests may require an entry fee, which must be paid to confirm participation.</p>
                    
                    <h3>3.2 Payment Methods</h3>
                    <p>The Platform accepts payments through various methods, including:</p>
                    <ul>
                        <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
                        <li>Debit/Credit Cards</li>
                        <li>Net Banking</li>
                        <li>Wallet Balance (if available in your Himpri account)</li>
                    </ul>
                    <p>All payments are processed securely, and we do not store your financial information on our servers.</p>
                    
                    <h3>3.3 Contest Rules</h3>
                    <p>Each contest has specific rules, including:</p>
                    <ul>
                        <li>Time limits for answering questions</li>
                        <li>Scoring mechanisms</li>
                        <li>Prize distribution criteria</li>
                    </ul>
                    <p>By participating in a contest, you agree to abide by its specific rules in addition to these Terms and Conditions.</p>
                    
                    <h3>3.4 Technical Issues</h3>
                    <p>In case of network issues or disconnection during a contest, you may rejoin if the contest is still active. However, Himpri is not responsible for any loss of performance or potential winnings due to connectivity issues, device malfunction, or any other technical problems outside our control.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>4. Rewards and Withdrawals</h2>
                <div class="term-item">
                    <h3>4.1 Earning Rewards</h3>
                    <p>Users who rank among the top scorers in a contest become eligible for cash prizes. The reward amount depends on the contest type and the total number of participants. All prize money is credited to the user's Himpri wallet.</p>
                    
                    <h3>4.2 Withdrawal Process</h3>
                    <p>To withdraw your winnings:</p>
                    <ol>
                        <li>Navigate to the "My Wallet" section in your profile</li>
                        <li>Place a withdrawal request by entering your bank account details or UPI ID</li>
                        <li>Complete any required KYC verification</li>
                        <li>Wait for the processing of your withdrawal request</li>
                    </ol>
                    
                    <h3>4.3 KYC Requirements</h3>
                    <p>To ensure secure transactions and comply with legal requirements, users must complete a Know Your Customer (KYC) verification process before making withdrawals. This may include providing:</p>
                    <ul>
                        <li>Valid government-issued ID proof (Aadhaar card, PAN card, etc.)</li>
                        <li>Proof of address</li>
                        <li>Any other documentation as required by applicable laws</li>
                    </ul>
                    
                    <h3>4.4 Withdrawal Limits and Timeframes</h3>
                    <p>The Platform may impose minimum withdrawal amounts and processing timeframes. These details will be specified in the withdrawal section of the Platform. All withdrawals are subject to verification and approval by our team.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>5. Fair Play and Prohibited Activities</h2>
                <div class="term-item">
                    <p>Himpri is committed to maintaining a fair and transparent gaming environment. The following activities are strictly prohibited:</p>
                    <ul>
                        <li>Using automated systems, bots, or scripts to play games or answer questions</li>
                        <li>Creating multiple accounts to gain unfair advantages</li>
                        <li>Exploiting technical glitches or bugs in the Platform</li>
                        <li>Sharing answers or colluding with other users during live contests</li>
                        <li>Using VPNs or proxy services to circumvent geographical restrictions</li>
                        <li>Any form of cheating or fraudulent activity</li>
                    </ul>
                    <p class="important">Engaging in prohibited activities may result in immediate termination of your account, forfeiture of winnings, and potential legal action.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>6. Referral Program</h2>
                <div class="term-item">
                    <p>Himpri offers a referral program that allows users to invite friends and earn bonus cash when those friends join and participate in the Platform. By participating in the referral program, you agree to:</p>
                    <ul>
                        <li>Only invite individuals who would be genuinely interested in the Platform</li>
                        <li>Not engage in spamming or unsolicited marketing</li>
                        <li>Adhere to any specific terms and conditions of the referral program</li>
                    </ul>
                    <p>Referral bonuses will be credited to your Himpri wallet once the referred user meets the eligibility criteria defined in the referral program.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>7. Intellectual Property</h2>
                <div class="term-item">
                    <p>All content on the Platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Himpri or its content suppliers and is protected by applicable intellectual property laws.</p>
                    <p>You may not:</p>
                    <ul>
                        <li>Reproduce, distribute, display, or transmit any content from the Platform without prior written permission</li>
                        <li>Modify or create derivative works based on the Platform's content</li>
                        <li>Use any data mining, robots, or similar data gathering methods</li>
                        <li>Remove any copyright, trademark, or other proprietary notices from the Platform</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2>8. Privacy Policy</h2>
                <div class="term-item">
                    <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Platform, you consent to the data practices described in our Privacy Policy.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>9. Limitation of Liability</h2>
                <div class="term-item">
                    <p>To the maximum extent permitted by law, Himpri and its affiliates shall not be liable for:</p>
                    <ul>
                        <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                        <li>Loss of profits, data, or goodwill</li>
                        <li>Service interruptions or connection issues</li>
                        <li>Any damages arising from your use or inability to use the Platform</li>
                    </ul>
                    <p>Our liability is limited to the amount paid by you, if any, for accessing the Platform or participating in contests during the three months preceding the claim.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>10. Dispute Resolution</h2>
                <div class="term-item">
                    <p>Any disputes arising from or relating to these Terms shall be resolved through:</p>
                    <ol>
                        <li>Informal negotiation – We encourage users to contact our support team to resolve issues amicably</li>
                        <li>Mediation – If informal resolution is unsuccessful, disputes may be submitted to mediation</li>
                        <li>Arbitration – Any unresolved disputes shall be finally settled by binding arbitration</li>
                    </ol>
                    <p>All dispute resolution proceedings shall be conducted in accordance with the laws of India, and the venue shall be decided by Himpri.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>11. Modifications to Terms</h2>
                <div class="term-item">
                    <p>Himpri reserves the right to modify these Terms and Conditions at any time. We will notify users of any material changes through:</p>
                    <ul>
                        <li>Email notifications</li>
                        <li>Notices on the Platform</li>
                        <li>Updates to the "Last Updated" date at the bottom of these Terms</li>
                    </ul>
                    <p>Your continued use of the Platform after such modifications constitutes your acceptance of the updated Terms.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>12. Termination</h2>
                <div class="term-item">
                    <p>Himpri reserves the right to terminate or suspend your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>13. Contact Information</h2>
                <div class="term-item">
                    <p>If you have any questions about these Terms and Conditions, please contact us through:</p>
                    <ul>
                        <li>The "Help" section on the website</li>
                        <li>Our support form: <a href="https://forms.gle/zB1WEBNwWf3BCzED9" target="_blank">https://forms.gle/zB1WEBNwWf3BCzED9</a></li>
                    </ul>
                </div>
            </div>
            
            <p class="last-updated">Last Updated: April 11, 2025</p>
        </div>
        
        <div class="footer">
            <p>© 2025 Himpri.com - All Rights Reserved</p>
            <p>For more information, visit <a href="http://www.himpri.com" target="_blank">www.himpri.com</a></p>
        </div>
    </div>
</template>