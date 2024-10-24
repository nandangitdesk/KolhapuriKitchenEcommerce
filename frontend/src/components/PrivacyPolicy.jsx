import React from 'react'
import Navbar from './layouts/Navbar'
import MetaData from './layouts/MetaData'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MetaData title="Privacy Policy" />
      <Navbar />
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="space-y-8">
          {[
            { title: "1. Information We Collect", content: "We may collect the following types of personal information:\n\n• Personal Identification Information: This includes your name, email address, shipping address, phone number, and payment information when you make a purchase.\n• Non-Personal Identification Information: This includes browser type, IP address, and technical data regarding your device used to access our website." },
            { title: "2. How We Use Your Information", content: "We use the information we collect for the following purposes:\n\n• To process transactions: We use your personal information to fulfill orders, manage payments, and provide customer service.\n• To send periodic emails: We may send you emails about your order, new products, promotions, or updates regarding our store.\n• To improve our services: Non-personal information helps us analyze user behavior, which in turn allows us to improve our website and services." },
            { title: "3. How We Protect Your Information", content: "We implement a variety of security measures to maintain the safety of your personal information. All sensitive information (like payment details) is encrypted and transmitted securely. We do not store your payment information on our servers." },
            { title: "4. Sharing Your Information", content: "We do not sell, trade, or otherwise transfer your personal information to outside parties except for:\n\n• Service Providers: We may share your information with third-party service providers who assist in operating our website, conducting our business, or serving our customers (such as payment processors or delivery services).\n• Legal Requirements: We may disclose your information when required by law or to protect our rights or the rights of others." },
            { title: "5. Cookies", content: "Our website may use \"cookies\" to enhance user experience. Cookies are small files stored on your device to help us understand and save your preferences for future visits. You may choose to set your browser to refuse cookies, but this may limit some features of the site." },
            { title: "6. Third-Party Links", content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit." },
            { title: "7. Your Rights", content: "As a user, you have the right to:\n\n• Access your personal information.\n• Request the correction of inaccurate information.\n• Request the deletion of your data.\n• Opt-out of receiving marketing communications from us." },
            { title: "8. Changes to This Privacy Policy", content: "Kolhapuri Kitchen Masale reserves the right to update this Privacy Policy at any time. When we do, we will notify you by updating the \"Last Updated\" date at the bottom of this page. We encourage you to review this policy periodically for any changes." },
            { title: "9. Contacting Us", content: "If you have any questions regarding this Privacy Policy or wish to exercise your rights, please contact us at:\n\nEmail: ppatil0028@gmail.com\nPhone: +91-9137771098\nAddress: Room No.02, Vitthal Niwas chawl, Sai Nath Nagar, Louis Wadi, Thane, Maharashtra 400604" }
          ].map((section, index) => (
            <div key={index} className=" p-6">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-8 text-center">Last Updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default PrivacyPolicy