"use client"

export default function RefundPolicy() {
  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Refund Policy
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our transparent refund policy ensures fair treatment for all our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Refund Policy Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <p className="text-gray-600">
                    At <strong>Prime EPC and Design Consultants</strong>, we aim to provide reliable and professional EPC inspection services to all our clients across the UK.
                    Our goal is to ensure customer satisfaction while maintaining transparency in every transaction.
                  </p>
                  <p className="text-gray-600">
                    This Refund Policy explains when and how refunds may be issued for our services.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Section 1 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Eligibility for Refunds</h2>
                    <div className="text-gray-600">
                      <p className="mb-4">Refunds may be issued in the following cases:</p>
                      <ul className="space-y-2">
                        <li>If the service was <strong>cancelled by Prime EPC and Design Consultants</strong> due to unforeseen circumstances.</li>
                        <li>If you <strong>cancel your booking at least 24 hours before</strong> the scheduled inspection time.</li>
                        <li>If a <strong>technical or scheduling error</strong> on our part prevents the inspection from taking place.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Non-Refundable Situations</h2>
                    <div className="text-gray-600">
                      <p className="mb-4">Refunds will <strong>not</strong> be issued in the following cases:</p>
                      <ul className="space-y-2">
                        <li>If the assessor arrives and <strong>cannot access the property</strong> (due to client absence, locked property, or wrong address).</li>
                        <li>If the booking is <strong>cancelled less than 24 hours</strong> before the scheduled inspection.</li>
                        <li>If the EPC inspection has already been <strong>completed</strong> and the report has been submitted.</li>
                        <li>If incorrect or incomplete information was provided during booking.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Partial Refunds</h2>
                    <div className="text-gray-600">
                      <p className="mb-4">
                        In some cases, a <strong>partial refund</strong> may be issued at our discretion if:
                      </p>
                      <ul className="space-y-2">
                        <li>You request cancellation after partial work has been completed.</li>
                        <li>Travel or administrative costs have already been incurred.</li>
                      </ul>
                      <p className="mt-4">
                        The deduction amount will depend on the work completed and expenses incurred.
                      </p>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How to Request a Refund</h2>
                    <div className="text-gray-600">
                      <p className="mb-4">
                        To request a refund, please contact us directly via email or phone with your booking details:
                      </p>
                      <div className="mb-4">
                        <p><strong>Email:</strong>info@primeepcdesign.co.uk</p>
                        <p><strong>Phone:</strong> +44 7469 340373</p>
                      </div>
                      <p>
                        Please include your <strong>full name, booking reference, and reason for cancellation</strong> in your request.
                      </p>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Processing Time</h2>
                    <div className="text-gray-600">
                      <p>
                        Approved refunds will be processed within <strong>7-10 business days</strong>.
                        The refund will be issued using the original payment method.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="mt-8 p-4 border-l-4 border-yellow-500 bg-yellow-50">
                  <h3 className="font-bold text-gray-900 mb-2">Important Notice</h3>
                  <p className="text-gray-600">
                    This Refund Policy applies only to services booked directly through <strong>Prime EPC and Design Consultants</strong>.
                    For third-party bookings or special arrangements, please refer to the specific terms agreed upon at the time of booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}