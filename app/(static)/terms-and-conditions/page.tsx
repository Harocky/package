"use client";

import { useEffect, useState } from "react";

export default function TermsPage() {
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
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using this EV Charging application, you agree to be legally bound by these Terms and Conditions. If you do not agree, you must not use the application. Continued use of the platform constitutes acceptance of any updates or modifications to these terms. These terms apply to all users, including registered users, visitors, and any individuals accessing the services.",
    },
    {
      title: "2. Security & Authentication",
      content:
        "User access to the application is secured through OTP verification and MPIN authentication. Users are responsible for maintaining the confidentiality of their MPIN and any authentication credentials. The system uses encryption and secure token-based authentication to protect user data. Any unauthorized access or suspicious activity must be reported immediately. The platform may temporarily lock accounts after multiple failed login attempts to prevent misuse.",
    },
    {
      title: "3. User Responsibility",
      content:
        "Users are solely responsible for all activities conducted through their accounts. This includes maintaining accurate profile information, safeguarding login credentials, and ensuring proper use of the application. Users must not share their account with others. Any misuse, fraudulent activity, or violation of these terms may result in account suspension or termination.",
    },
    {
      title: "4. Wallet Usage",
      content:
        "The application provides a prepaid digital wallet for charging transactions. Users must maintain sufficient wallet balance before initiating a charging session. Wallet top-ups are processed through integrated payment gateways, and all transactions are recorded. The system does not allow negative balances or overdrafts. Any discrepancies in wallet transactions will be subject to reconciliation processes.",
    },
    {
      title: "5. Charging Process",
      content:
        "Charging sessions can only be initiated after successful validation of user authentication, selected vehicle, charger availability, and wallet balance. The system continuously monitors the charging process in real time. Charging may automatically stop under the following conditions: battery reaches full capacity, user manually stops the session, or wallet balance becomes insufficient. The system ensures safe and controlled charging operations.",
    },
    {
      title: "6. Billing & Payments",
      content:
        "Charging cost is calculated based on energy consumption (kWh) multiplied by the applicable tariff. Billing is generated automatically at the end of each charging session. Wallet deduction is performed securely, and users can view detailed billing summaries and transaction history. In case of billing failures or discrepancies, the system may mark transactions as pending and resolve them through reconciliation.",
    },
    {
      title: "7. Session Management",
      content:
        "User sessions are managed securely using token-based authentication. Sessions remain active for a defined period unless terminated due to logout, inactivity, or security events such as MPIN reset. Persistent login may be enabled for convenience, but users may be required to re-authenticate when sessions expire or are invalidated.",
    },
    {
      title: "8. Restrictions & Prohibited Activities",
      content:
        "Users agree not to misuse the application, including but not limited to unauthorized access, reverse engineering, tampering with system functionality, fraudulent transactions, or interfering with charging infrastructure. Any attempt to exploit system vulnerabilities or disrupt services is strictly prohibited and may lead to legal action.",
    },
    {
      title: "9. Liability & Service Availability",
      content:
        "The application is provided on an 'as-is' and 'as-available' basis. The platform is not liable for any interruptions caused by external factors such as network failures, charger hardware issues, payment gateway downtime, or third-party service disruptions. While the system aims to provide accurate billing and real-time data, minor delays or discrepancies may occur.",
    },
    {
      title: "10. Account Suspension & Termination",
      content:
        "The platform reserves the right to suspend or terminate user accounts at its discretion in cases of policy violations, fraudulent activities, or security risks. Users may also request account deactivation. Upon termination, access to services will be revoked, and any pending transactions will be processed as per system policies.",
    },
  ];

  return (
    <div className="terms-container">
      <div
        className="bg-layer layer1"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      />
      <div
        className="bg-layer layer2"
        style={{ transform: `translateY(${offset * 0.6}px)` }}
      />

      <div className="content">
        <h1 className="title">Terms & Conditions</h1>

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
