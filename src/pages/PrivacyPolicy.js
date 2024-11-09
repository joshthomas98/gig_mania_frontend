import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <Container className="text-light py-5">
      <h1 className="mb-5 text-center display-4">Privacy Policy</h1>

      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h2 className="mb-4 text-center">GigSweep Privacy Policy</h2>

              <section className="mb-5">
                <h3>1. Introduction</h3>
                <p>
                  Welcome to GigSweep! Your privacy is of the utmost importance
                  to us. This Privacy Policy outlines how we collect, use,
                  disclose, and protect your information when you visit and
                  interact with our website and mobile application.
                </p>
              </section>

              <section className="mb-5">
                <h3>2. Information We Collect</h3>
                <p>We collect the following types of information:</p>
                <ul>
                  <li>
                    <strong>Personal Information</strong>: Name, email, phone
                    number, location, and any other profile information.
                  </li>
                  <li>
                    <strong>Content</strong>: Images, gig details, reviews, and
                    other content you upload.
                  </li>
                  <li>
                    <strong>Transaction Information</strong>: Details about
                    payments for gigs or subscriptions.
                  </li>
                </ul>
              </section>

              <section className="mb-5">
                <h3>3. How We Use Your Information</h3>
                <p>We use your information to:</p>
                <ul>
                  <li>Provide and improve GigSweep's services.</li>
                  <li>
                    Facilitate bookings and interactions between artists and
                    venues.
                  </li>
                  <li>
                    Send notifications, updates, and marketing information
                    related to your account.
                  </li>
                </ul>
              </section>

              <section className="mb-5">
                <h3>4. Sharing Your Information</h3>
                <p>
                  We only share your personal information in the following
                  cases:
                </p>
                <ul>
                  <li>To comply with legal obligations or court orders.</li>
                  <li>
                    To protect the rights, property, or safety of GigSweep,
                    users, or the public.
                  </li>
                  <li>
                    With service providers, such as payment processors, who
                    assist in operating the platform.
                  </li>
                </ul>
              </section>

              <section className="mb-5">
                <h3>5. Cookies</h3>
                <p>
                  GigSweep uses cookies to enhance your experience. Cookies help
                  us understand how you interact with the site and improve our
                  services.
                </p>
              </section>

              <section className="mb-5">
                <h3>6. Data Security</h3>
                <p>
                  We take security seriously and implement measures to protect
                  your data. However, no system is completely secure, and we
                  cannot guarantee absolute protection.
                </p>
              </section>

              <section className="mb-5">
                <h3>7. Your Rights</h3>
                <p>
                  You have the right to access, update, or delete your personal
                  information. Contact us at [Insert Contact Email] to exercise
                  these rights.
                </p>
              </section>

              <section className="mb-5">
                <h3>8. Changes to this Policy</h3>
                <p>
                  We may update this policy from time to time. Please check this
                  page regularly for updates.
                </p>
              </section>

              <section className="mb-5">
                <h3>9. Contact Us</h3>
                <p>
                  If you have any questions or concerns, feel free to contact us
                  at{" "}
                  <a href="mailto:support@gigsweep.com">support@gigsweep.com</a>
                  .
                </p>
              </section>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
