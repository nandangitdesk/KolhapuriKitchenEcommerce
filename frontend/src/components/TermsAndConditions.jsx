import React from 'react'
import Navbar from './layouts/Navbar'
import MetaData from './layouts/MetaData'
const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MetaData title="Terms and Conditions" />
      <Navbar />
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>
        <div className="space-y-8">
          {[
            { title: "1. Introduction", content: "By using our website and purchasing our products, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our website or making a purchase." },
            { title: "2. Intellectual Property Rights", content: "Unless otherwise stated, Kolhapuri Kitchen Masale owns the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and print pages for personal use, but you must not:\n\n• Republish material from our website.\n• Sell, rent, or sub-license material from our website.\n• Reproduce, duplicate, or copy material from our website." },
            { title: "3. Products and Services", content: "Kolhapuri Kitchen Masale offers a range of homemade masalas and other related products. We strive to ensure that all product descriptions, images, and prices are accurate; however, we do not guarantee that product descriptions or other content on this website are completely error-free. In the case of inaccuracies, we reserve the right to modify or update any information and correct errors, inaccuracies, or omissions at any time without prior notice." },
            { title: "4. Orders and Payments", content: "Pricing: All prices listed on the website are in INR and are inclusive of applicable taxes.\n\nOrder Acceptance: Once you place an order, we will send you a confirmation email. We reserve the right to cancel or refuse any order at any time for any reason, including suspected fraud or breach of these terms.\n\nPayment Methods: We accept payments through various methods, including credit/debit cards and online payment gateways. Payment must be made in full before the products are dispatched." },
            { title: "5. Shipping and Delivery", content: "Our Shipping Policy outlines details regarding shipping methods, timelines, and costs. Please refer to the policy for full details. Kolhapuri Kitchen Masale is not responsible for any delays in delivery once the product has been handed over to the carrier." },
            { title: "6. Refunds and Cancellations", content: "Our Refund Policy outlines the terms and conditions for refunds, cancellations, and returns. Please refer to the policy for more information regarding eligibility and procedures." },
            { title: "7. Limitation of Liability", content: "Kolhapuri Kitchen Masale shall not be liable for any damages that arise from the use of, or inability to use, the materials on this website. This includes, but is not limited to, direct, indirect, incidental, and consequential damages, even if we have been advised of the possibility of such damages." },
            { title: "8. User Accounts", content: "You may be required to create an account to purchase products or access certain features of the website. You are responsible for maintaining the confidentiality of your account and password and for all activities that occur under your account. You must notify us immediately of any unauthorized access to your account." },
            { title: "9. Governing Law", content: "These terms and conditions shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts of India." },
            { title: "10. Changes to Terms", content: "Kolhapuri Kitchen Masale reserves the right to change or update these terms and conditions at any time without prior notice. It is your responsibility to review these terms regularly to ensure you are aware of any changes." },
            { title: "11. Contact Information", content: "If you have any questions or concerns about these terms and conditions, please contact us at:\n\nEmail: ppatil0028@gmail.com\nPhone: +91-9137771098\nAddress: Room No.02, Vitthal Niwas chawl, Sai Nath Nagar, Louis Wadi, Thane, Maharashtra 400604" }
          ].map((section, index) => (
            <div key={index} className="p-6 ">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions