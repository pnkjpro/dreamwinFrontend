<template>
    <div class="container">
        <header @click="navigateToBack">
            <button class="back-button">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1>About Us</h1>
            <p class="subtitle">Discover the story behind Himpri.com - Where Knowledge Wins You Rewards!</p>
        </header>
        
        <div class="content-wrapper">
            <div class="section">
                <p>Welcome to Himpri – a unique and engaging online Quiz platform that empowers users to turn their knowledge into real cash prizes. Founded on the belief that intelligence and awareness should be rewarded, Himpri offers a range of quiz-based games that challenge the mind and offer exciting monetary rewards for top performers.</p>
                
                <p>Operated by Sandilya Technologies, a micro enterprise registered with UDYAM (UDYAM-UP-50-0206842) and GST (09CBAPP0925J1ZL), Headquartered in Indra Nagar, Lucknow, Uttar Pradesh, we operate www.himpri.com, a quiz-based edutainment platform built for students, learners, and knowledge seekers across India.</p>
            </div>
            
            <!-- <div class="section founders-section">
                <h2>Our Founders</h2>
                <p>Himpri was launched by two visionary brothers, <strong>Mr. Devi Prasad Pandey</strong> and <strong>Mr. Jagdamba Prasad Pandey</strong>, who shared a common dream—to build a platform that promotes knowledge, curiosity, and smart play.</p>
                
                <p>Coming from humble beginnings, they understood the value of education and innovation, and aimed to create an opportunity where people, especially youth from remote areas, could earn through what they know.</p>
                
                <p>Their commitment to transparency, fair play, and digital inclusion drives everything we do at Himpri.</p>
            </div> -->
            
            <div class="mission-vision">
                <div class="mission">
                    <h3><i class="fas fa-bullseye"></i> Our Mission</h3>
                    <p>To inspire a culture of learning and reward intellect by providing a trustworthy, enjoyable, and challenging gaming experience that allows players to earn while they learn.</p>
                </div>
                
                <div class="vision">
                    <h3><i class="fas fa-eye"></i> Our Vision</h3>
                    <p>To become India's most trusted knowledge-based gaming platform that uplifts and empowers individuals by recognizing and rewarding their intellect.</p>
                </div>
            </div>
            
            <div class="section">
                <h2>Why Choose Himpri?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div class="feature-title">Knowledge-Based Earning</div>
                        <p>Play games based on general knowledge, current affairs, logic, and more.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="feature-title">Real Cash Prizes</div>
                        <p>Win actual money by scoring high in quizzes.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                        <div class="feature-title">User-Friendly Platform</div>
                        <p>Easy-to-use interface for all age groups.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="feature-title">Safe & Transparent</div>
                        <p>Fair play policies and secure transactions.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-globe"></i>
                        </div>
                        <div class="feature-title">Inclusive</div>
                        <p>Open to participants across India, especially empowering youth from rural areas.</p>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <h2>Join the Himpri Movement!</h2>
                <p>Himpri is more than just a game—it's a revolution in how we value knowledge. Whether you're looking to challenge yourself, earn money, or just have fun, Himpri is the platform for you.</p>
                <p><strong>Play Smart. Win Big.</strong></p>
                <a href="http://www.himpri.com" class="cta-button">Start Playing Now</a>
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
        
        p {
            margin-bottom: 15px;
        }
        
        .founders-section {
            background-color: #fff9f2;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #ff7e1a;
        }
        
        .mission-vision {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .mission, .vision {
            flex: 1;
            min-width: 250px;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        }
        
        .mission h3, .vision h3 {
            color: #ff7e1a;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        
        .mission i, .vision i {
            margin-right: 8px;
            color: #ff7e1a;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .feature-card {
            background-color: #fff9f2;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        
        .feature-icon {
            background-color: #ff7e1a;
            color: white;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin: 0 auto 15px auto;
            font-size: 20px;
        }
        
        .feature-title {
            font-weight: 600;
            margin-bottom: 8px;
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
        }
        
        .cta-section h2:after {
            display: none;
        }
        
        .cta-section p {
            margin-bottom: 20px;
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
            
            .mission-vision {
                flex-direction: column;
            }
        }
    </style>