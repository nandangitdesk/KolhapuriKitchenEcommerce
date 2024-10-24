import React from 'react'
import Navbar from './layouts/Navbar'
import MetaData from './layouts/MetaData'

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MetaData title="Shipping Policy" />
      <Navbar />
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Kolhapuri Kitchen Shipping Policy</h1>
        <div className="space-y-8">
          {[
            { title: "1. Shipping Locations", content: "Currently, we only ship within India. We are working to expand our services to international locations in the near future. Please check back with us for updates on international shipping options." },
            { title: "2. Delivery Time", content: "Orders are typically processed within 1-2 business days after they are placed. Delivery usually takes between 5-7 business days from the time of dispatch, depending on your location. During peak seasons or holidays, delivery times may be extended due to high demand." },
            { title: "3. Order Tracking", content: "Once your order is dispatched, you will receive a tracking number via email or SMS, which you can use to track your shipment. You can also log in to your account on our website to view your order status." },
            { title: "4. Delivery Areas", content: "We deliver to most pin codes across India. However, there may be certain remote locations where we may not be able to provide delivery services. If your pin code is not serviceable, you will be notified during checkout." },
            { title: "5. Delivery Attempts", content: "Our courier partners will make two delivery attempts to your provided address. If the package is undelivered after two attempts, it will be returned to our warehouse. In such cases, please contact our customer support to arrange for re-shipping (additional charges may apply)." },
            { title: "6. Undelivered Orders", content: "If an order is returned to us due to incorrect address details or failed delivery attempts, we will reach out to you to confirm the correct address and arrange for a re-delivery. Please ensure your shipping details are accurate to avoid delays." },
            { title: "7. Damaged or Missing Items", content: "If your order arrives damaged or incomplete, please contact us within 48 hours of receiving your package. Send an email with your order number, photos of the damaged package or items, and a brief description of the issue to ppatil0028@gmail.com. We will investigate and arrange for a replacement or refund as applicable." },
            { title: "8. Order Cancellation and Changes", content: "You can cancel or modify your order before it is shipped. Please contact our customer support team as soon as possible if you need to make changes. Once the order is dispatched, cancellations or modifications will no longer be possible." },
            { title: "9. Contact Information", content: "For any questions or concerns regarding your order, please contact our customer support team:\n\nEmail: ppatil0028@gmail.com\nPhone: +91-9137771098" }
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

export default ShippingPolicy