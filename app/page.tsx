"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EvInput from "@/app/components/ui/EvInput";
import EvCheckbox from "@/app/components/ui/EvCheckbox";
import EvDropdown from "@/app/components/ui/EvDropdown";
import EvSubmitButton from "@/app/components/ui/EvSubmitButton";
import EvTextarea from "@/app/components/ui/EvTextArea";
import { useToast } from "@/app/components/ui/EvToast";
import EvButton from "@/app/components/ui/EvButton";

const FEATURES_DATA = [
  {
    title: "Secure Registration",
    content:
      "Register securely using your phone number with OTP verification and 4-digit MPIN setup.Register securely using your phone number with OTP verification and 4-digit MPIN setup.Register securely using your phone number with OTP verification and 4-digit MPIN setup.",
    buttonText: "Sign Up Now",
    bgColor: "bg-[#00041a]",
    textColor: "text-white",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Digital Wallet",
    content:
      "Add money via online payment methods and track all charging-related deductions in real-time.Add money via online payment methods and track all charging-related deductions in real-time.Add money via online payment methods and track all charging-related deductions in real-time.",
    buttonText: "Manage Wallet",
    bgColor: "bg-white",
    textColor: "text-slate-900",
    image:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Charger Discovery",
    content:
      "Locate nearby stations using GPS, view real-time availability, and connector types instantly.Locate nearby stations using GPS, view real-time availability, and connector types instantly.Locate nearby stations using GPS, view real-time availability, and connector types instantly.",
    buttonText: "Find Stations",
    bgColor: "bg-[#00041a]",
    textColor: "text-white",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  },
];

const UnifiedMarsEVPage = () => {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            entry.target
              .querySelectorAll(
                ".reveal, .zoomImage, .fadeSlide, .hero-element",
              )
              .forEach((el) => {
                el.classList.add("active");
              });
          }
        });
      },
      { threshold: 0.15 },
    );

    const elementsToAnimate = document.querySelectorAll(
      "[data-animate], .reveal, .zoomImage, .fadeSlide, .scroll-section",
    );
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const validate = () => {
    let valid = true;
    if (name.length < 3) {
      setNameError("Minimum 3 characters");
      valid = false;
    }
    if (!email.includes("@")) {
      setEmailError("Invalid email");
      valid = false;
    }
    if (message.length < 10) {
      setMessageError("Minimum 10 characters");
      valid = false;
    }
    if (!department) {
      setDepartmentError("Select a department");
      valid = false;
    }
    if (!agree) {
      setAgreeError("Required");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSuccess(true);
    showToast({
      title: "Success",
      description: "Message sent!",
      type: "success",
    });
    setName("");
    setEmail("");
    setMessage("");
    setDepartment(null);
    setAgree(false);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="ev-bg-main w-full overflow-x-hidden">
      <div className="relative ev-mar-lg ev-mar-x-md scroll-section bg-black min-h-[90vh] bg-white">
        <div
          className="absolute inset-0 z-0 ev-rounded-xl overflow-hidden hero-element delay-1"
          style={{
            height: "550px",
            clipPath: "ellipse(150% 100% at 50% 0%)",
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://autovista24.autovistagroup.com/wp-content/uploads/sites/5/2021/09/what-is-an-ev-scaled.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          className="absolute right-[5%] bottom-[50px] z-30 pointer-events-none hero-element delay-3"
          style={{ width: "450px" }}
        >
          <Image
            src="/ai.jpg"
            alt="Astronaut"
            width={450}
            height={450}
            priority
            className="drop-shadow-2xl"
          />
        </div>

        <div className="absolute left-12 top-[150px] z-20 max-w-2xl">
          <h1
            className="text-white hero-element delay-2"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            Revealing the Treasures <br /> of the Universe
          </h1>
        </div>

        <div className="absolute left-12 bottom-10 z-20 max-w-[45rem] hero-element delay-4">
          <p className="ev-mar-b-lg text-slate-800 leading-relaxed text-lg">
            Believe in a future that is better than the past. Being a
            spacefaring civilization is about exciting possibilities.
          </p>
          <div className="ev-flex ev-gap-md">
            <EvButton text="Download Android" variant="primary" />
            <EvButton text="Download IOS" variant="secondary" />
          </div>
        </div>
      </div>

      <section className="w-full">
        {FEATURES_DATA.map((feature, index) => (
          <div
            key={index}
            className={`min-h-[80vh] ev-pad-y-lg ${feature.bgColor} flex items-center justify-center overflow-hidden scroll-section`}
          >
            <div
              className={`container mx-auto px-8 flex flex-col gap-16 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : " lg:flex-row"}`}
            >
              <div className="zoomImage delay-1">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={600}
                  height={600}
                  className="object-cover ev-rounded-lg shadow-2xl min-w-[80vw] lg:min-w-[40vw]"
                />
              </div>
              <div
                className={`flex flex-col space-y-6 ev-gap-md ${feature.textColor}`}
              >
                <h2
                  className="reveal delay-2 font-bold"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  {feature.title}
                </h2>
                <p className="fadeSlide delay-3 opacity-80 text-lg">
                  {feature.content}
                </p>
                <div className="fadeSlide delay-4">
                  <EvButton
                    text={feature.buttonText}
                    variant={index === 1 ? "secondary" : "primary"}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section
        id="contact-section"
        className="ev-pad-xl ev-mar-xl ev-pad-x-md ev-flex items-center justify-center bg-white scroll-section"
      >
        <div
          className="ev-flex ev-flex-col ev-gap-lg ev-pad-lg ev-bg-white ev-rounded-xl contact-card xl:max-w-[80%] ev-border w-full shadow-sm"
          data-animate="fade-up"
        >
          <div className="text-center">
            <h2 className="text-5xl font-black ev-mar-b-sm reveal delay-1">
              Build the Future.
            </h2>
            <p className="text-slate-500 fadeSlide delay-2">
              Drop us a message and our team will reach out shortly.
            </p>
          </div>

          <div className="ev-flex ev-flex-col md:ev-flex-row ev-gap-lg fadeSlide delay-3">
            <EvInput
              label="Name"
              placeholder="Elon Musk"
              value={name}
              error={nameError}
              onChange={(v) => {
                setName(v);
                setNameError(undefined);
              }}
            />
            <EvInput
              label="Email"
              placeholder="elon@mars.com"
              value={email}
              error={emailError}
              onChange={(v) => {
                setEmail(v);
                setEmailError(undefined);
              }}
            />
          </div>

          <div className="fadeSlide delay-4">
            <EvTextarea
              label="Message"
              placeholder="How can we help you?"
              value={message}
              error={messageError}
              onChange={(v) => {
                setMessage(v);
                setMessageError(undefined);
              }}
            />
          </div>

          <div className="ev-flex items-center fadeSlide delay-5 z-10">
            <EvDropdown
              open={openDropdown}
              options={departments}
              selected={department}
              placeholder="Department"
              error={departmentError}
              onToggle={() => setOpenDropdown(!openDropdown)}
              onClose={() => setOpenDropdown(false)}
              onSelect={(v) => {
                setDepartment(v);
                setDepartmentError("");
              }}
            />
          </div>
          <div className="ev-flex items-center fadeSlide delay-5">
            <EvCheckbox
              label="I agree to Terms"
              checked={agree}
              error={agreeError}
              onChange={(v) => {
                setAgree(v);
                setAgreeError("");
              }}
            />
          </div>

          <div className="fadeSlide delay-6">
            <EvSubmitButton
              text="Send Message"
              successText="Message Sent!"
              variant="primary"
              loading={loading}
              success={success}
              block={false}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnifiedMarsEVPage;
