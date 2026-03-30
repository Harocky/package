"use client";

import { useEffect, useState } from "react";

export default function PrivacyPage() {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  type Section = {
    title: string;
    content: string;
  };

  const sections: Section[] = [
    {
      title: "1. Introduction",
      content:
        "This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the EV Charging application. By accessing or using the application, you consent to the practices described in this policy. We are committed to ensuring that your personal data is handled securely and transparently.",
    },
    {
      title: "2. Information We Collect",
      content:
        "We collect personal and technical information necessary to provide our services. This includes phone number for registration, OTP verification data, MPIN (stored securely in encrypted form), username, email, and profile details. We also collect vehicle information, wallet transactions, charging session data (such as energy consumption, duration, and cost), device information, and usage logs.",
    },
    {
      title: "3. How We Use Your Information",
      content:
        "Your data is used to provide and improve the application’s functionality. This includes account creation and authentication, secure login management, wallet processing, charging session handling, billing generation, and customer support. Data may also be used for analytics, fraud detection, system monitoring, and improving user experience.",
    },
    {
      title: "4. Authentication & Security Data",
      content:
        "We use OTP verification and MPIN authentication to secure user accounts. MPINs are encrypted and never stored in plain text. Authentication tokens are securely generated and used for session management. Security mechanisms are implemented to prevent unauthorized access, including account lockouts after multiple failed attempts.",
    },
    {
      title: "5. Wallet & Payment Information",
      content:
        "Wallet transactions, including top-ups and charging deductions, are securely processed through integrated payment gateways. We do not store sensitive payment details such as card numbers. Transaction data is maintained for billing, reconciliation, and audit purposes. Wallet balances and transaction history are updated in real time.",
    },
    {
      title: "6. Charging & Usage Data",
      content:
        "We collect data related to charging sessions, including charger details, energy consumption (kWh), charging duration, tariff applied, and total cost. This data is used for real-time monitoring, billing calculation, session history, and improving charging services. Location data may be used to identify nearby charging stations.",
    },
    {
      title: "7. Data Sharing & Third Parties",
      content:
        "We may share your data with trusted third-party services required for app functionality, including SMS providers for OTP delivery, payment gateways for wallet transactions, and charging infrastructure providers. These parties are obligated to handle your data securely and only for specified purposes. We do not sell your personal data.",
    },
    {
      title: "8. Data Storage & Retention",
      content:
        "Your data is stored securely on protected servers with appropriate encryption and access controls. Personal and transaction data is retained as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements. When data is no longer required, it is securely deleted or anonymized.",
    },
    {
      title: "9. User Rights & Control",
      content:
        "Users have the right to access, update, or request deletion of their personal data, subject to legal and operational requirements. Users can update profile details within the application. Certain data (such as transaction history) may be retained for compliance and audit purposes even after account deactivation.",
    },
    {
      title: "10. Data Security Measures",
      content:
        "We implement industry-standard security measures including encryption, secure APIs, token-based authentication, and protected storage mechanisms. Sensitive data is never exposed in logs or responses. Despite our efforts, no system is completely secure, and users are encouraged to protect their credentials.",
    },
    {
      title: "11. Cookies & Device Data",
      content:
        "The application may collect device-related information such as device ID, operating system, app version, and usage behavior to improve performance and security. This data helps in troubleshooting issues, optimizing user experience, and detecting fraudulent activities.",
    },
    {
      title: "12. Location Data Usage",
      content:
        "Location data is used to identify nearby charging stations and enhance user experience. Location access is requested only when required, and users can control permissions through device settings. Location data is not used for tracking beyond application functionality.",
    },
    {
      title: "13. Changes to Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time to reflect changes in legal, technical, or business requirements. Users will be notified of significant updates. Continued use of the application after updates constitutes acceptance of the revised policy.",
    },
    {
      title: "14. Contact & Support",
      content:
        "If you have any questions, concerns, or requests regarding this Privacy Policy or your data, you may contact our support team through the application. We are committed to addressing privacy-related issues promptly and transparently.",
    },
  ];

  return (
    <div className="privacy-policy">
      <div
        className="bg-layer layer1"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      />
      <div
        className="bg-layer layer2"
        style={{ transform: `translateY(${offset * 0.6}px)` }}
      />

      <div className="content">
        <h1 className="title">Privacy Policy</h1>

        {sections.map((sec, i) => (
          <div
            key={i}
            className="card"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <h2 className="heading">{sec.title}</h2>
            <p className="text">{sec.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
