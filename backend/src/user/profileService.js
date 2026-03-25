import { db } from "../auth/firebase.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const saveUserProfile = async (userId, formData) => {
  try {
    await setDoc(doc(db, "users", userId), {
      personalInfo: {
        fullName: formData.fullName,
        nric: formData.nric,
        email: formData.email,
        age: formData.age,
        citizenship: formData.citizenship,
        race: formData.race,
        maritalStatus: formData.maritalStatus,
      },

      employmentDetails: {
        employmentStatus: formData.employmentStatus,
        jobSector: formData.jobSector,
        yearsOfEmployment: formData.yearsOfEmployment,
        workplaceLocation: formData.workplaceLocation,
      },

      propertyPreferences: {
        preferredState: formData.preferredState,
        maxBudget: formData.maxBudget,
        commuteRange: formData.commuteRange,
        priorities: formData.priorities,
        financing: {
          interestRate: formData.interestRate,
          loanTenure: formData.loanTenure,
          downpayment: formData.downpayment,
        },
      },

      eligibility: {
        firstTimeHomebuyer: formData.firstTimeHomebuyer,
        householdIncome: formData.householdIncome,
        dependents: formData.dependents,
        householdSize: formData.householdSize,
        ownResidentialProperty: formData.ownResidentialProperty,
        applyingJointly: formData.applyingJointly,
        spouseIncome: formData.spouseIncome,
        currentResidentialState: formData.currentResidentialState,
        financingStatus: formData.financingStatus,
      },

      schemeInterest: {
        selectedSchemes: formData.selectedSchemes,
      },

      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving profile:", error);
    throw error;
  }
};