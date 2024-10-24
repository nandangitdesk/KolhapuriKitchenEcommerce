import React from 'react'
import Navbar from './layouts/Navbar'
import MetaData from './layouts/MetaData'


const RefundPolicy = () => {
  return (
    <div className="h-full flex flex-col">
    <MetaData title="Refund Policy" />
    <Navbar />
    <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Kolhapuri Kitchen Masale Refund Policy</h1>
      <div className="space-y-8">
        {[
          { title: "Eligibility for Refunds", content: "You may be eligible for a refund under the following conditions:\n\n• The product you received is defective, damaged, or expired.\n• You received an incorrect product or an item that does not match your order.\n• You must request a refund within 7 days of receiving the product.\n• The product must be unused, unopened, and in its original packaging." },
          { title: "Refund Process", content: "To initiate a refund, please follow these steps:\n\n1. Contact Us: Send an email to ppatil0028@gmail.com or call us at +91-9137771098 within 7 days of receiving the product, explaining the issue and providing your order details.\n2. Inspection: Once we receive your request, we will inspect the details and approve or reject your refund request based on eligibility.\n3. Return the Product: If the refund is approved, you will need to return the product to us. Please make sure it is in its original packaging and condition.\n4. Processing Refunds: After we receive and inspect the returned product, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed, and a credit will automatically be applied to your original method of payment within 7–10 business days." },
          { title: "Non-Refundable Items", content: "The following items are non-refundable:\n\n• Products that have been opened or used.\n• Products returned after 7 days from delivery.\n• Customized or special-order products." },
          { title: "Shipping Costs", content: "Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.\nIf the refund is due to an error on our part (e.g., incorrect or damaged product), we will cover the shipping costs." },
          { title: "Exchanges", content: "If you received a damaged or defective product and would like to exchange it for the same item, please contact us at ppatil0028@gmail.com. We will guide you through the process of returning the damaged item and sending you a replacement." },
          { title: "Contact Information", content: "For any further questions or to initiate a refund, please contact us:\n\nEmail: ppatil0028@gmail.com\nPhone: +91-9137771098\nAddress: Room No.02, Vitthal Niwas chawl, Sai Nath Nagar, Louis Wadi, Thane, Maharashtra 400604" }
        ].map((section, index) => (
          <div key={index} className=" p-6">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default RefundPolicy