"use client"

import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Your privacy is very important to us. Learn how we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <p className="text-gray-600">
                    At <strong>Prime EPC and Design Consultants</strong>, your privacy is very important to us.
                    This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.
                  </p>
                  <p className="text-gray-600">
                    By using our website or submitting your information, you agree to the terms of this Privacy Policy.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Section 1 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                    <div className="text-gray-600">
                      <p className="mb-4">We may collect the following types of information:</p>
                      <ul className="space-y-2">
                        <li><strong>Personal details:</strong> Your name, email address, phone number, and property address.</li>
                        <li><strong>Service-related information:</strong> Details about your EPC booking or property type.</li>
                        <li><strong>Technical data:</strong> IP address, browser type, and device information (for website analytics).</li>
                      </ul>
                      <p className="mt-4">
                        We only collect information that is necessary to provide our services and communicate with you effectively.
                      </p>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                    <div className="text-gray-600">
                      <p className="mb-4">We use your information to:</p>
                      <ul className="space-y-2">
                        <li>Process EPC bookings and deliver certificates.</li>
                        <li>Respond to your inquiries and provide customer support.</li>
                        <li>Improve our website and service experience.</li>
                        <li>Send updates or important notices related to your booking (we never spam).</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Sharing Your Information</h2>
                    <div className="text-gray-600">
                      <p className="mb-4">
                        We <strong>do not sell, rent, or trade</strong> your personal data with anyone.
                      </p>
                      <p className="mb-4">Your information is shared only with:</p>
                      <ul className="space-y-2">
                        <li><strong>Accredited assessors</strong> working with Prime EPC and Design Consultants (for booking and inspection purposes).</li>
                        <li><strong>Legal or government authorities</strong> if required by law.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Protection and Security</h2>
                    <div className="text-gray-600">
                      <p>
                        We take strong security measures to protect your information from unauthorized access, alteration, or disclosure.
                        Your data is stored securely, and only authorized staff can access it for professional use.
                      </p>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
                    <div className="text-gray-600">
                      <p className="mb-4">
                        Our website uses <strong>cookies</strong> to enhance your browsing experience.
                        Cookies help us understand how visitors use our site and allow us to improve functionality.
                      </p>
                      <p>
                        You can disable cookies anytime through your browser settings.
                      </p>
                    </div>
                  </div>

                  {/* Section 6 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                    <div className="text-gray-600">
                      <p className="mb-4">
                        Under UK data protection law, you have the right to:
                      </p>
                      <ul className="space-y-2">
                        <li>Access the personal data we hold about you.</li>
                        <li>Request correction or deletion of your data.</li>
                        <li>Withdraw consent for future communications.</li>
                      </ul>
                      <p className="mt-4">
                        To exercise your rights, contact us at <strong>info@primeepcdesign.co.uk</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Section 7 */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Updates to This Policy</h2>
                    <div className="text-gray-600">
                      <p>
                        We may update this Privacy Policy from time to time.
                        Any changes will be posted on this page with an updated date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}