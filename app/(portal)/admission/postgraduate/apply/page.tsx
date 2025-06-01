"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ref, get, set } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import { rtdb, db } from "@/lib/firebase";
import bcrypt from "bcryptjs";

export default function ApplicationFormPage() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [step, setStep] = useState(0);
  const steps = [
    "Personal Info",
    "Family Info",
    "Education",
    "Sponsor",
    "Declaration",
  ];

  const searchParams = useSearchParams();
  const selectedCollegeId = searchParams.get("collegeId");
  const [college, setCollege] = useState<any>(null); // The college object
  const [selectedProgram, setSelectedProgram] = useState("");

  const [formData, setFormData] = useState<any>({
    // Step 1
    studentID: "",
    institute: "",
    department: "",
    admission: "",
    ngatcode: "",
    firstName: "",
    fatherName: "",
    gFatherName: "",
    sex: "",
    dob: "",

    // Step 2
    region: "",
    zone: "",
    woreda: "",
    studentPhone: "",
    studentEmail: "",

    // Step 3 - EDUCATIONAL INFORMATION
    enrolledBefore: "No", // "Yes" or "No"
    postSecondaryEducation: [
      {
        institutionName: "",
        country: "",
        cgpaEarned: "",
      },
    ],

    // Step 4
    sponsor: "",
    sponsorName: "",
    sponsorRegion: "",
    sponsorZone: "",
    sponsorWoreda: "",
    sponsorEmail: "",
    sponsorURL: "",

    // Step 5
    signed: false,
    studentPhoto: null,
    educationDocs: {
      ngatCertificate: null,
      degree: null,
      diploma: null,
      highSchoolTranscript: null,
      grade12th: null,
    },
    // Step 6
    status: "pending",
  });

  // Effect to fetch the college data and update the form state
  useEffect(() => {
    if (!selectedCollegeId) {
      console.error("No college ID found in the URL");
      return;
    }

    // Fetch college data by ID
    async function fetchCollegeData() {
      try {
        const res = await fetch(
          `/api/admission/postgraduate/colleges/${selectedCollegeId}`
        );
        if (!res.ok) {
          console.error("Failed to fetch college data:", res.statusText);
          return;
        }
        const collegeData = await res.json();

        // Update the college data and set it in state
        setCollege(collegeData);

        // Set the college name in the formData (institute)
        setFormData((prev: any) => ({
          ...prev,
          institute: collegeData.name, // Save the college name here
        }));
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    }

    fetchCollegeData();
  }, [selectedCollegeId]); // Run when selectedCollegeId changes

  // Effect to handle department change and update form data
  useEffect(() => {
    // Reset the selected program when college changes (to ensure fresh start)
    if (college) {
      setSelectedProgram("");
      setFormData((prev: any) => ({
        ...prev,
        department: "", // Reset department when college changes
      }));
    }
  }, [college]); // Runs whenever `college` changes

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepartment = e.target.value;
    setSelectedProgram(selectedDepartment);
    setFormData((prev) => ({
      ...prev,
      department: selectedDepartment,
    }));
  };

  // Validation functions

  const validateStep0 = () => {
    const newErrors: { [key: string]: string } = {};
    // First Step
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.fatherName) newErrors.fatherName = "Father name is required.";
    if (!formData.gFatherName)
      newErrors.gFatherName = "Grandfather name is required.";
    if (!formData.sex) newErrors.sex = "Gender is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.ngatcode) newErrors.ngatcode = "NGAT Code is required.";

    if (!formData.studentPhone)
      newErrors.studentPhone = "Student phone number is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.studentEmail)
      newErrors.studentEmail = "Student email is required.";
    else if (!emailRegex.test(formData.studentEmail)) {
      newErrors.studentEmail =
        "Please enter a valid email address (e.g., example@mail.com).";
    }
    if (!formData.region) newErrors.region = "Region is required.";
    if (!formData.zone) newErrors.zone = "Zone is required.";
    if (!formData.woreda) newErrors.woreda = "Woreda is required.";

    // Educational Information
    if (!formData.enrolledBefore)
      newErrors.enrolledBefore = "Enrolled before is required.";
    if (formData.enrolledBefore === "Yes") {
      formData.postSecondaryEducation.forEach((edu, index) => {
        if (!edu.institutionName)
          newErrors[`institutionName_${index}`] =
            "Institution name is required.";
        if (!edu.country)
          newErrors[`country_${index}`] = "Country is required.";
        if (!edu.cgpaEarned)
          newErrors[`cgpaEarned_${index}`] = "CGPA earned is required.";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1: Declaration
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    // Declaration
    if (!formData.signed) newErrors.signed = "Signature is required.";

    // // Uploaded files
    if (!formData.studentPhoto)
      newErrors.studentPhoto = "Student photo is required.";

    // what happen this validation is not working and if i add it will not continue to next step
    

    // if (!formData.educationDocs.ngatCertificate)
    //   newErrors.ngatCertificate = "NGAT certificate is required.";
    // if (!formData.educationDocs.degree)
    //   newErrors.degree = "Degree certificate is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate Password
  const generatePassword = (): string => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(
      { length: 8 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked, files } = e.target;

    // Remove error as user types
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const next = () => {
    if (step === 0) {
      if (!validateStep0()) return;
    } else if (step === 1) {
      if (!validateStep1()) return;
    }

    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  //   Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Upload files
      const form = new FormData();
      form.append("studentPhoto", formData.studentPhoto);
      Object.entries(formData.educationDocs).forEach(([key, file]) => {
        if (file) form.append(key, file);
      });

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const { uploaded } = await uploadRes.json();

      // Generate password
      const password = generatePassword();
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Send all form data (no studentID generation here)
      await fetch("/api/submit-application/post-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          password,
          uploadedFiles: uploaded,
        }),
      });

      router.push("/admission/success");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center ">
        Student Application Form
      </h2>

      {/* Submit Loading */}

      {isSubmitting && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg flex items-center gap-2 shadow">
            <svg
              className="animate-spin h-6 w-6 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-blue-600 font-medium">
              Submitting your application, please wait...
            </span>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Submission
            </h3>
            <p className="text-gray-700 mb-4">
              We will use your email to send you a{" "}
              <span className="text-blue-500">Username</span> and{" "}
              <span className="text-blue-500">Password</span> to Login and check
              your application status.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.studentEmail || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                placeholder="Enter your email"
              />
              {!formData.studentEmail && (
                <p className="text-red-500 text-sm mt-1">Email is required.</p>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  if (!formData.studentEmail) return; // Prevent submit if email is empty
                  setShowConfirmModal(false);
                  handleSubmit(e as any);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 0: Personal Info */}
        {step === 0 && (
          <>
            <h2 className=" font-bold text-blue-600 mb-6">
              1. Institute and Department Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Department */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Department / Field of Study{" "}
                  <span className="text-red-500">*</span>
                </label>
                {!college ? (
                  <p className="text-blue-500">
                    Loading Available Department...
                  </p>
                ) : (
                  <>
                    <select
                      className="w-full p-3 border border-blue-300 rounded mb-6"
                      value={selectedProgram}
                      onChange={handleProgramChange}
                    >
                      <option value="" disabled>
                        -- Choose a department --
                      </option>
                      {college.programs.map((program: any, idx: number) => (
                        <option key={idx} value={program.name}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                    {selectedProgram && (
                      <p className="text-blue-500">
                        Selected Program: {selectedProgram}
                      </p>
                    )}
                  </>
                )}
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Admission Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="admission"
                  value={formData.admission}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-blue-200">
                    Select Admission Type
                  </option>
                  <option value="Regular">Regular</option>
                  <option value="Extension – Weekend">
                    Extension – Weekend
                  </option>
                  <option value="Summer">Summer</option>
                </select>
                {errors.admission && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.admission}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  NGAT Code<span className="text-red-500">*</span>
                </label>
                <input
                  name="ngatcode"
                  placeholder="Enter your NGAT Code"
                  onChange={handleChange}
                  value={formData.ngatcode}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.ngatcode && (
                  <p className="text-red-500 text-sm mt-1">{errors.ngatcode}</p>
                )}
              </div>
            </div>

            {/* Personal Information */}

            <h2 className=" font-bold text-blue-600 mb-6">
              1.1. Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={formData.firstName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Father Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="fatherName"
                  placeholder="Enter your father's name"
                  onChange={handleChange}
                  value={formData.fatherName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.fatherName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fatherName}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Grand Father Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="gFatherName"
                  placeholder="Enter your grandfather's name"
                  onChange={handleChange}
                  value={formData.gFatherName}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.gFatherName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gFatherName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Date of Birth <span className="text-red-500">*</span>
                </label>

                <input
                  name="dob"
                  type="date"
                  placeholder="Date of Birth"
                  onChange={handleChange}
                  value={formData.dob}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-blue-200">
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.sex && (
                  <p className="text-red-500 text-sm mt-1">{errors.sex}</p>
                )}
              </div>
              {/* Student Phone */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Student Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="studentPhone"
                  type="tel"
                  autoCapitalize="none"
                  autoComplete="off"
                  placeholder="+251 9XX XXX XXX"
                  onChange={handleChange}
                  value={formData.studentPhone}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.studentPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.studentPhone}
                  </p>
                )}
              </div>
              {/* Student Email */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Student Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="studentEmail"
                  placeholder="Enter student email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.studentEmail}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.studentEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.studentEmail}
                  </p>
                )}
              </div>
            </div>
            <h2 className="font-bold text-blue-600 mb-6 mt-8">
              1.2. Address & Additional Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Region */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Region <span className="text-red-500">*</span>
                </label>
                <input
                  name="region"
                  placeholder="Enter region"
                  onChange={handleChange}
                  value={formData.region}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">{errors.region}</p>
                )}
              </div>
              {/* Zone */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Zone <span className="text-red-500">*</span>
                </label>
                <input
                  name="zone"
                  placeholder="Enter zone"
                  onChange={handleChange}
                  value={formData.zone}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.zone && (
                  <p className="text-red-500 text-sm mt-1">{errors.zone}</p>
                )}
              </div>
              {/* Woreda */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Woreda <span className="text-red-500">*</span>
                </label>
                <input
                  name="woreda"
                  placeholder="Enter woreda"
                  onChange={handleChange}
                  value={formData.woreda}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                />
                {errors.woreda && (
                  <p className="text-red-500 text-sm mt-1">{errors.woreda}</p>
                )}
              </div>
            </div>
            <h2 className="text font-bold text-blue-600 mb-6">
              1.3. Education Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Enrolled Before */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Have you enrolled in higher education before?
                </label>
                <select
                  name="enrolledBefore"
                  value={formData.enrolledBefore}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {/* Post-Secondary Education Table (if enrolled before) */}
            {formData.enrolledBefore === "Yes" && (
              <div className="mt-6">
                <h3 className="font-semibold text-blue-500 mb-2">
                  Post-Secondary Education History{" "}
                  <span className="text-red-500">*</span>
                </h3>
                {formData.postSecondaryEducation.map(
                  (edu: any, idx: number) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                    >
                      <div>
                        <label className="block mb-2 text-gray-700 font-semibold">
                          University Name{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          name={`postSecondaryEducation[${idx}].institutionName`}
                          placeholder="Institution Name *"
                          value={edu.institutionName}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.postSecondaryEducation];
                              arr[idx].institutionName = value;
                              return { ...prev, postSecondaryEducation: arr };
                            });
                          }}
                          className="p-2 w-full rounded-lg border-2 border-blue-300 text-gray-700"
                        />
                        {errors[`institutionName_${idx}`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`institutionName_${idx}`]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2 text-gray-700 font-semibold">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          name={`postSecondaryEducation[${idx}].country`}
                          placeholder="Enter country"
                          value={edu.country}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.postSecondaryEducation];
                              arr[idx].country = value;
                              return { ...prev, postSecondaryEducation: arr };
                            });
                          }}
                          className="p-2 w-full rounded-lg border-2 border-blue-300 text-gray-700"
                        />
                        {errors[`country_${idx}`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`country_${idx}`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-700 font-semibold">
                          CGPA Earned <span className="text-red-500">*</span>
                        </label>
                        <input
                          name={`postSecondaryEducation[${idx}].cgpaEarned`}
                          placeholder="CGPA Result"
                          value={edu.cgpaEarned}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData((prev: any) => {
                              const arr = [...prev.postSecondaryEducation];
                              arr[idx].cgpaEarned = value;
                              return { ...prev, postSecondaryEducation: arr };
                            });
                          }}
                          className="p-2 rounded-lg border-2 border-blue-300 text-gray-700"
                        />
                        {errors[`cgpaEarned_${idx}`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`cgpaEarned_${idx}`]}
                          </p>
                        )}
                      </div>
                      {/* Remove button */}
                      {formData.postSecondaryEducation.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev: any) => ({
                              ...prev,
                              postSecondaryEducation:
                                prev.postSecondaryEducation.filter(
                                  (_: any, i: number) => i !== idx
                                ),
                            }));
                          }}
                          className="text-red-500 font-bold self-end px-4 py-2 w-fit rounded bg-red-100 hover:bg-red-200"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )
                )}
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev: any) => ({
                      ...prev,
                      postSecondaryEducation: [
                        ...prev.postSecondaryEducation,
                        {
                          institutionName: "",
                          country: "",
                          cgpaEarned: "",
                        },
                      ],
                    }));
                  }}
                  className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded"
                >
                  Add More
                </button>
              </div>
            )}

            <h2 className=" font-bold text-blue-600 mb-6">
              1.4. Sponsor Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sponsor */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Sponsor
                </label>
                <select
                  name="sponsor"
                  value={formData.sponsor}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                >
                  <option value="">Select Sponsor</option>
                  <option value="MOE">MOE</option>
                  <option value="Self">Self</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* Show sponsor fields only if not Self and not empty */}
              {formData.sponsor && formData.sponsor !== "Self" && (
                <>
                  {/* Sponsor Name (only if Other) */}
                  {formData.sponsor === "Other" && (
                    <div>
                      <label className="block mb-2 text-gray-700 font-semibold">
                        Organization Name
                      </label>
                      <input
                        name="sponsorName"
                        placeholder="Organization Name"
                        onChange={handleChange}
                        value={formData.sponsorName}
                        className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                      />
                    </div>
                  )}
                  {/* Sponsor Region */}
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">
                      Sponsor Region
                    </label>
                    <input
                      name="sponsorRegion"
                      placeholder="Sponsor Region"
                      onChange={handleChange}
                      value={formData.sponsorRegion}
                      className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                    />
                  </div>
                  {/* Sponsor Zone */}
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">
                      Sponsor Zone
                    </label>
                    <input
                      name="sponsorZone"
                      placeholder="Sponsor Zone"
                      onChange={handleChange}
                      value={formData.sponsorZone}
                      className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                    />
                  </div>
                  {/* Sponsor Email */}
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">
                      Sponsor Email
                    </label>
                    <input
                      name="sponsorEmail"
                      placeholder="Sponsor Email"
                      onChange={handleChange}
                      value={formData.sponsorEmail}
                      className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                    />
                  </div>
                  {/* Sponsor URL */}
                  <div>
                    <label className="block mb-2 text-gray-700 font-semibold">
                      Sponsor Website (URL)
                    </label>
                    <input
                      name="sponsorURL"
                      placeholder="Sponsor Website"
                      onChange={handleChange}
                      value={formData.sponsorURL}
                      className="w-full p-3 rounded-lg border-2 border-blue-300 text-gray-700"
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className=" font-bold text-blue-600 mb-6">
              2. Declaration & Uploads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Photo */}
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Upload Student Photo <span className="text-red-500">*</span>
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-6 w-fit cursor-pointer hover:bg-blue-50 transition">
                  <svg
                    className="w-12 h-12 text-blue-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16v-8m0 0l-3 3m3-3l3 3M21 16.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.5M16 7V5a2 2 0 00-2-2H10a2 2 0 00-2 2v2"
                    />
                  </svg>
                  <span className="text-blue-600 font-medium mb-1">
                    Click to upload a photo
                  </span>
                  <span className="text-gray-400 text-xs mb-2">
                    (JPG, PNG, or GIF, max 5MB)
                  </span>
                  <input
                    type="file"
                    name="studentPhoto"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormData((prev: any) => ({
                        ...prev,
                        studentPhoto: file,
                      }));
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.studentPhoto;
                        return newErrors;
                      });
                    }}
                    className="hidden"
                  />
                  {formData.studentPhoto && (
                    <div className="mt-2 text-sm text-green-600 flex flex-col items-center">
                      <span>Selected: {formData.studentPhoto.name}</span>
                      <img
                        src={URL.createObjectURL(formData.studentPhoto)}
                        alt="Student Preview"
                        className="mt-2 rounded shadow max-h-40 max-w-xs object-contain border border-blue-200"
                      />
                    </div>
                  )}
                </label>
                {errors.studentPhoto && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.studentPhoto}
                  </p>
                )}
              </div>
              {/* Education Docs */}

              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Upload Education Documents
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      National Graduate Admission Test (NGAT) Certificate
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="ngatCertificate"
                      onChange={(e) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          educationDocs: {
                            ...prev.educationDocs,
                            ngatCertificate: e.target.files?.[0] || null,
                          },
                        }));
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.ngatCertificate;
                          return newErrors;
                        });
                      }}
                      className="w-full p-2 rounded-lg border-2 border-blue-200 text-gray-700 bg-white"
                    />
                    {formData.educationDocs?.ngatCertificate && (
                      <span className="text-green-600 text-xs">
                        Selected: {formData.educationDocs.ngatCertificate.name}
                      </span>
                    )}
                    {errors.ngatCertificate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.ngatCertificate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Degree
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="degree"
                      onChange={(e) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          educationDocs: {
                            ...prev.educationDocs,
                            degree: e.target.files?.[0] || null,
                          },
                        }));
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.degree;
                          return newErrors;
                        });
                      }}
                      className="w-full p-2 rounded-lg border-2 border-blue-200 text-gray-700 bg-white"
                    />
                    {formData.educationDocs?.degree && (
                      <span className="text-green-600 text-xs">
                        Selected: {formData.educationDocs.degree.name}
                      </span>
                    )}
                    {errors.degree && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.degree}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Diploma (if any)
                    </label>
                    <input
                      type="file"
                      name="diploma"
                      onChange={(e) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          educationDocs: {
                            ...prev.educationDocs,
                            diploma: e.target.files?.[0] || null,
                          },
                        }));
                      }}
                      className="w-full p-2 rounded-lg border-2 border-blue-200 text-gray-700 bg-white"
                    />
                    {formData.educationDocs?.diploma && (
                      <span className="text-green-600 text-xs">
                        Selected: {formData.educationDocs.diploma.name}
                      </span>
                    )}
                  </div>{" "}
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      12th Grade Certificate
                    </label>
                    <input
                      type="file"
                      name="grade12result"
                      onChange={(e) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          educationDocs: {
                            ...prev.educationDocs,
                            grade12result: e.target.files?.[0] || null,
                          },
                        }));
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.grade12result;
                          return newErrors;
                        });
                      }}
                      className="w-full p-2 rounded-lg border-2 border-blue-200 text-gray-700 bg-white"
                    />
                    {formData.educationDocs?.grade12result && (
                      <span className="text-green-600 text-xs">
                        Selected: {formData.educationDocs.grade12result.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      High School Transcript
                    </label>
                    <input
                      type="file"
                      name="highSchoolTranscript"
                      onChange={(e) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          educationDocs: {
                            ...prev.educationDocs,
                            highSchoolTranscript: e.target.files?.[0] || null,
                          },
                        }));
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.highSchoolTranscript;
                          return newErrors;
                        });
                      }}
                      className="w-full p-2 rounded-lg border-2 border-blue-200 text-gray-700 bg-white"
                    />
                    {formData.educationDocs?.highSchoolTranscript && (
                      <span className="text-green-600 text-xs">
                        Selected:{" "}
                        {formData.educationDocs.highSchoolTranscript.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="mt-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="signed"
                  checked={formData.signed}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <span className="text-gray-700">
                  I declare all information is correct and complete.{" "}
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.signed && (
                <p className="text-red-500 text-sm mt-1">{errors.signed}</p>
              )}
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50"
          >
            Back
          </button>

          {step === 1 ? (
            <button
              type="button"
              onClick={() => {
                if (!validateStep1()) return; // Validate before submission
                setShowConfirmModal(true);
              }}
              className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
