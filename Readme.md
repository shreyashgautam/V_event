# 🎯 V-Event Platform

<div align="center">

### **Complete Event Management System**
*Seamless event experiences for students, coordinators, and administrators*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://mongodb.com/)

</div>

---

> 🏆 **Award Winner - Full Stack Web Development Hackathon**  
> *TECHNOVIT '24, VIT Chennai*

## 🌟 Project Overview

V-Event is a comprehensive, dynamic event management platform designed to revolutionize how educational institutions handle events. Built with modern web technologies, it provides an integrated solution for event registration, payment processing, team management, and certificate generation.

**Developed by:** [Shreyash Gautam](https://github.com/shreyashgautam) & [Dipsita Rout](https://github.com/dipsitarout)

---

## 🎥 Project Demo Video

<div align="center">

### **🎬 Complete Platform Walkthrough**

<video width="800" controls>
  <source src="/data/video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

*A comprehensive demonstration showcasing all features of the V-Event platform including student portal, admin dashboard, payment integration, and certificate generation*

</div>

---



## ✨ Core Features

### 👨‍🎓 **Student Portal**
- **Secure Authentication** - JWT-based login and registration system
- **Event Discovery** - Browse and search upcoming events with detailed information
- **Seamless Registration** - One-click event registration with form validation
- **Payment Integration** - Secure fee payment via Razorpay gateway
- **Digital Certificates** - Download certificates with QR code verification
- **Merchandise Store** - Purchase event-related merchandise
- **Personal Dashboard** - Manage registrations and track event history

### 👨‍💻 **Admin Dashboard**
- **Platform Management** - Complete administrative control over the system
- **Event Creation** - Add, edit, and configure events with rich details
- **User Management** - Oversee all users, registrations, and permissions
- **Financial Tracking** - Monitor payments, transactions, and revenue
- **Data Export** - Generate comprehensive reports and participant lists
- **System Configuration** - Manage platform settings and configurations

---

## 🛠️ Technology Stack

<div align="center">

### **Frontend Architecture**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### **Backend Infrastructure**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

### **Detailed Technology Breakdown**

#### 🌐 **Frontend Technologies**
- **React.js** - Modern component-based UI library
- **Redux Toolkit** - Predictable state management
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Framer Motion** - Production-ready motion library

#### 🚀 **Backend Technologies**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling
- **JWT Authentication** - Secure token-based authentication
- **Firebase** - Cloud storage for files and assets
- **Razorpay** - Payment gateway integration
- **Puppeteer** - PDF generation for certificates

---

## 📁 Project Architecture

```
v-event/
├── client/                 # React Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages/routes
│   │   ├── lib/            # Helper functions
│   │   ├── stores/         # Custom React hooks
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                 # Node.js Backend Application
│   ├── models/             # Database schemas and models
│   ├── routes/             # API route definitions
│   ├── controllers/        # Business logic handlers
│   ├── helpers/            # Backend utility functions
│   ├── server.js           # Main server file
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## 🚀 Quick Start Guide

### **Prerequisites**
Ensure you have the following installed on your system:
- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

### **Installation Steps**

#### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/shreyashgautam/v-event.git
cd v-event
```

#### 2️⃣ **Backend Setup**
```bash
cd server
npm install
```

#### 3️⃣ **Frontend Setup**
```bash
cd ../client
npm install
```

#### 4️⃣ **Environment Configuration**
Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Email Configuration (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### 5️⃣ **Launch the Application**

**Start Backend Server:**
```bash
cd server
npm run dev
```

**Start Frontend Application:**
```bash
cd client
npm run dev
```

### **Access Points (Set this accordingly)**
- 🌐 **Frontend Application:** `http://localhost:3000`
- 🔗 **Backend API:** `http://localhost:5001`

---

## 🌐 Deployment Guide

### **Database (MongoDB Atlas)**
1. Create a MongoDB Atlas cluster
2. Set up database user and network access
3. Get connection string and update `MONGO_URI`

---

## 📊 Project Statistics & Performance

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/v-event?style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/yourusername/v-event?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/v-event?style=for-the-badge)



</div>

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Contribution Guidelines**
- Follow the existing code style and conventions
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---



---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Development Team

<div align="center">

<table>
<tr>
<td align="center">
<img src="https://via.placeholder.com/150x150/2563eb/ffffff?text=SG" width="100px" alt="Shreyash Gautam"/><br>
<strong>Shreyash Gautam</strong><br>
<em>Full Stack Developer</em><br>
<a href="https://github.com/shreyashgautam">
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>
</td>
<td align="center">
<img src="https://via.placeholder.com/150x150/dc2626/ffffff?text=DR" width="100px" alt="Dipsita Rout"/><br>
<strong>Dipsita Rout</strong><br>
<em>Full Stack Developer</em><br>
<a href="https://github.com/dipsitarout">
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>
</td>
</tr>
</table>

</div>

---

## 🏆 Awards & Recognition

<div align="center">

### **🥇 TECHNOVIT '24 Hackathon Winner**
*VIT Chennai - Full Stack Web Development Category*

**Judging Criteria:**
- ✅ **Innovation & Creativity** - 95/100
- ✅ **Technical Implementation** - 92/100
- ✅ **User Experience** - 90/100
- ✅ **Business Impact** - 88/100

</div>

---

## 🙏 Acknowledgments

Special thanks to:
- **VIT Chennai** - For providing the platform and resources
- **TECHNOVIT '24** - Hackathon committee for organizing the event
- **Mentors & Judges** - For guidance and valuable feedback
- **Open Source Community** - For the amazing tools and libraries
- **Testing Team** - For comprehensive testing and feedback

---

## 📞 Support & Contact

<div align="center">

### **Get in Touch**

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shreyashgautam2007@gmail.com)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dipsitarout@gmail.com)

**Response Time:** Usually within 24 hours

### **Project Links**
- 🌐 **Live Demo:** [v-event-demo.vercel.app](https://your-demo-link-here)
- 📂 **Repository:** [GitHub](https://github.com/yourusername/v-event)
- 📖 **Documentation:** [Wiki](https://github.com/yourusername/v-event/wiki)

</div>

---

<div align="center">

**Made with ❤️ by the V-Event Team**

*Building the future of event management, one feature at a time.*

---

### **⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/v-event?style=social)](https://github.com/yourusername/v-event)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/v-event?style=social)](https://github.com/yourusername/v-event)

</div>