"use client";

import { useState } from "react";
import EvInput from "../../components/ui/EvInput";
import EvCheckbox from "../../components/ui/EvCheckbox";
import EvDropdown from "../../components/ui/EvDropdown";
import EvSubmitButton from "../../components/ui/EvSubmitButton";
import { useToast } from "@/app/components/ui/EvToast";
import EvTextarea from "@/app/components/ui/EvTextArea";

export default function ContactPage() {
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [department, setDepartment] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [agree, setAgree] = useState(false);

  const [nameError, setNameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [messageError, setMessageError] = useState<string | undefined>();
  const [departmentError, setDepartmentError] = useState("");
  const [agreeError, setAgreeError] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const departments = [
    { label: "Support", value: "support" },
    { label: "Sales", value: "sales" },
    { label: "General Inquiry", value: "general" },
  ];

  function validate() {
    let valid = true;

    if (name.length < 3) {
      setNameError("Minimum 3 characters required");
      valid = false;
    } else setNameError(undefined);

    if (!email.includes("@")) {
      setEmailError("Invalid email");
      valid = false;
    } else setEmailError(undefined);

    if (message.length < 10) {
      setMessageError("Minimum 10 characters required");
      valid = false;
    } else setMessageError(undefined);

    if (!department) {
      setDepartmentError("Please select a department");
      valid = false;
    } else setDepartmentError("");

    if (!agree) {
      setAgreeError("You must accept the terms");
      valid = false;
    } else setAgreeError("");

    return valid;
  }

  async function handleSubmit() {
    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    await new Promise((res) => setTimeout(res, 2000));

    setLoading(false);
    setSuccess(true);

    showToast({
      title: "Success",
      description: "Message sent successfully",
      emoji: "✅",
      type: "success",
    });

    setName("");
    setEmail("");
    setMessage("");
    setDepartment(null);
    setAgree(false);

    setTimeout(() => setSuccess(false), 2000);
  }

  return (
    <main className="min-h-screen ev-bg-soft ev-flex ev-items-center ev-justify-center ev-pad-md">
      <div className="ev-flex ev-flex-col ev-gap-lg ev-pad-lg w-full max-w-xl border border-gray-100 ev-rounded-md">
        <EvInput
          label="Name"
          placeholder="Enter your name"
          value={name}
          error={nameError}
          onChange={(v) => {
            setName(v);
            if (v.length >= 3) setNameError(undefined);
          }}
        />

        <EvInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          error={emailError}
          onChange={(v) => {
            setEmail(v);
            if (v.includes("@")) setEmailError(undefined);
          }}
        />

        <EvTextarea
          label="Message"
          placeholder="Enter your message"
          value={message}
          error={messageError}
          onChange={(v) => {
            setMessage(v);
            if (v.length >= 10) setMessageError(undefined);
          }}
        />

        <EvDropdown
          open={openDropdown}
          options={departments}
          selected={department}
          placeholder="Select department"
          error={departmentError}
          onToggle={() => setOpenDropdown(!openDropdown)}
          onClose={() => setOpenDropdown(false)}
          onSelect={(v) => {
            setDepartment(v);
            setDepartmentError("");
          }}
        />

        <EvCheckbox
          label="I agree to the Terms and Conditions"
          checked={agree}
          error={agreeError}
          onChange={(v) => {
            setAgree(v);
            if (v) setAgreeError("");
          }}
        />

        <EvSubmitButton
          text="Send Message"
          successText="Sent!"
          variant="primary"
          loading={loading}
          success={success}
          block={false}
          onClick={handleSubmit}
        />
      </div>
    </main>
  );
}
