"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmit } from "@formspree/react";
import { isSubmissionError } from "@formspree/core";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";

const POPUP_DISMISSED_KEY = "aretex-zeroshot-feedback-popup-dismissed";
const ALWAYS_SHOW_POPUP = process.env.NEXT_PUBLIC_ZEROSHOT_POPUP_ALWAYS_SHOW === "0";  // 1 = always, 0 = respect dismissal

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ZeroShotFeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitToFormspree = useSubmit<FormData>("zeroshot-contact");

  useEffect(() => {
    if (ALWAYS_SHOW_POPUP) {
      setIsOpen(true);
      return;
    }

    try {
      const dismissed = localStorage.getItem(POPUP_DISMISSED_KEY);
      if (!dismissed) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  function closeModal() {
    setIsOpen(false);

    if (ALWAYS_SHOW_POPUP) {
      return;
    }

    try {
      localStorage.setItem(POPUP_DISMISSED_KEY, "1");
    } catch {
      // Ignore localStorage failures.
    }
  }

  async function onSubmit(data: FormData) {
    setSubmitError("");
    clearErrors();

    try {
      const result = await submitToFormspree(data);

      if (isSubmissionError(result)) {
        const formErrors = result.getFormErrors();
        if (formErrors.length > 0) {
          setSubmitError(formErrors.map((e) => e.message).join(" "));
        }

        for (const [field, fieldErrors] of result.getAllFieldErrors()) {
          if (field !== "email") {
            continue;
          }

          setError("email", {
            type: "server",
            message: fieldErrors.map((e) => e.message).join(", "),
          });
        }

        return;
      }

      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Form is unavailable right now. Please email sales@aretexlabs.com");
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="zeroshot-popup-title">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-gray-950 p-6 md:p-8 shadow-2xl">
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-4 top-4 rounded-md p-2 text-gray-400 transition hover:text-white hover:bg-white/10"
          aria-label="Close popup"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="flex flex-col gap-4 pr-8">
            <p className="text-xs font-mono text-teal-500 uppercase tracking-[0.3em]">You are in</p>
            <h2 id="zeroshot-popup-title" className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Thanks for helping shape ZeroShot VR.
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              We have your email and will reach out with collaboration and feedback opportunities. You are also entered for a chance to win a free ZeroShot VR kit when we launch.
            </p>
            <div>
              <Button type="button" variant="outline" onClick={closeModal}>
                Continue To Site
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 pr-8">
            
            <p className="text-xs font-mono text-teal-500 uppercase tracking-[0.3em]">Introducing ZeroShot VR</p>
            <h2 id="zeroshot-popup-title" className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Help us shape the future of precision shooting.
            </h2>
            {/* <div className="overflow-hidden rounded-xl border border-white/10">
              <Image
                src="/images/3D_rendering_mounted.png"
                alt="ZeroShot VR promotional preview"
                width={1400}
                height={700}
                className="h-auto w-full object-cover"
                priority
              />
            </div> */}
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              We need your help defining the future of ZeroShot. Share your email to give feedback, collaborate with the team, and enter for a chance to win a free ZeroShot VR kit when we launch.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
              <FormInput
                label="Email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                className="bg-gradient-to-br from-white/10 to-white/[0.03] border-white/20 placeholder:text-gray-500"
                error={errors.email?.message}
                {...register("email")}
              />
              {submitError && <p className="text-xs text-red-400">{submitError}</p>}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Button type="submit" variant="primary" size="md" loading={isSubmitting} className="w-full sm:w-auto">
                  Join The List
                </Button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-xs text-gray-400 hover:text-white transition"
                >
                  Maybe later
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
