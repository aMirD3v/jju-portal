"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  // Step 1: Personal Details
  full_name: string;
  preferred_name: string;
  date_of_birth: string;
  place_of_birth: string;
  gender: string;
  nationality: string;

  // Step 2: Identification & Contact
  passport_number: string;
  photo: FileList;
  permanent_address: string;
  local_address: string;
  phone: string;
  email: string;

  // Step 3: Academic & Programme
  previous_school: string;
  graduation_date: string;
  qualification: string;
  gpa: string;
  faculty: string;
  degree_programme: string;
  mode_of_study: string;
  entry_year: string;

  // Step 4: Emergency, Health, Languages
  emergency_name: string;
  emergency_relationship: string;
  emergency_phone: string;
  medical_conditions: string;
  accommodations: string;
  immunization: string;
  mother_tongue: string;
  other_languages: string;
  technical_skills: string;
  extracurricular: string;

  // Step 5: Financial & Personal Statement
  fee_payer: string;
  scholarship_details: string;
  bank_details: string;
  personal_statement: string;
  declaration: boolean;

  // Step 6: Upload additional docs
  transcripts: FileList;
  passport_copy: FileList;
};

export default function BiographyFormPage() {
  const searchParams = useSearchParams();
  const  adm  = searchParams.get("adm") || "";
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted biography:", data);
    alert("Biography submitted (dummy)");
    // router.push("/admission");
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const steps = [
    "Personal Details",
    "Identification & Contact",
    "Academic & Programme",
    "Emergency, Health & Languages",
    "Financial & Statement",
    "Uploads",
  ];

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white backdrop-blur-lg shadow-xl rounded-lg w-full max-w-3xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-semibold text-blue-500 text-center">
            {steps[step]}
          </h2>
          <p className="text-blue-500 text-center">
            Admission Number: <strong>{adm}</strong>
          </p>

          {/* Step 1 */}
          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                {...register("full_name", { required: true })}
                placeholder="Full legal name"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                {...register("preferred_name")}
                placeholder="Preferred name"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="date"
                {...register("date_of_birth", { required: true })}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                {...register("place_of_birth")}
                placeholder="Place of birth"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                {...register("gender")}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                {...register("nationality")}
                placeholder="Nationality/Citizenship"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <div className="space-y-4">
              <input
                {...register("passport_number")}
                placeholder="Passport / National ID number"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label className="block">
                <span className="block text-blue-500 mb-1">Upload photo</span>
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo")}
                  className="w-full text-gray-700"
                />
              </label>
              <input
                {...register("permanent_address")}
                placeholder="Permanent address"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                {...register("local_address")}
                placeholder="Local address (at university)"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  {...register("phone")}
                  placeholder="Phone number"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email address"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <div className="space-y-4">
              <input
                {...register("previous_school")}
                placeholder="Previous school attended"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="date"
                {...register("graduation_date")}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  {...register("qualification")}
                  placeholder="Qualification earned"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  {...register("gpa")}
                  placeholder="GPA / Grades"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  {...register("faculty")}
                  placeholder="Faculty / School"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  {...register("degree_programme")}
                  placeholder="Degree programme"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  {...register("mode_of_study")}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Mode of study</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Distance">Distance</option>
                </select>
                <input
                  type="number"
                  {...register("entry_year")}
                  placeholder="Expected year of entry"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-500">
                Emergency / Next-of-Kin
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  {...register("emergency_name")}
                  placeholder="Contact name"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  {...register("emergency_relationship")}
                  placeholder="Relationship"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <input
                {...register("emergency_phone")}
                placeholder="Contact phone"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <h3 className="text-xl font-semibold text-blue-500 mt-6">
                Health & Needs
              </h3>
              <textarea
                {...register("medical_conditions")}
                placeholder="Medical conditions / allergies"
                rows={2}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                {...register("accommodations")}
                placeholder="Disabilities / accommodations needed"
                rows={2}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                {...register("immunization")}
                placeholder="Immunization records"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <h3 className="text-xl font-semibold text-blue-500 mt-6">
                Languages & Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  {...register("mother_tongue")}
                  placeholder="Mother tongue"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  {...register("other_languages")}
                  placeholder="Other languages & proficiency"
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <textarea
                {...register("technical_skills")}
                placeholder="Computer / technical skills"
                rows={2}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                {...register("extracurricular")}
                placeholder="Extracurricular interests"
                rows={2}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {/* Step 5 */}
          {step === 4 && (
            <div className="space-y-4">
              <input
                {...register("fee_payer")}
                placeholder="Tuition-fee payer (self, sponsor)"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                {...register("scholarship_details")}
                placeholder="Scholarship / grant details"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                {...register("bank_details")}
                placeholder="Bank details for stipends/refunds"
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                {...register("personal_statement")}
                placeholder="Personal statement: background, goals, why this programme"
                rows={4}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <label className="inline-flex items-center mt-4">
                <input
                  type="checkbox"
                  {...register("declaration", { required: true })}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="ml-2 text-gray-700">
                  I confirm that the information provided is true and complete.
                </span>
              </label>
            </div>
          )}

          {/* Step 6 */}
          {step === 5 && (
            <div className="space-y-6">
              <label className="block">
                <span className="block text-blue-500 mb-1">
                  Upload transcripts
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register("transcripts")}
                  className="w-full text-gray-700"
                />
              </label>
              <label className="block">
                <span className="block text-blue-500 mb-1">
                  Upload passport/ID copy
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  {...register("passport_copy")}
                  className="w-full text-gray-700"
                />
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50"
            >
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
  );
}
