import { auth } from "../../firebase";

export async function getAuthenticatedProfile() {
  let token = localStorage.getItem("token");

  if (!token && auth.currentUser) {
    token = await auth.currentUser.getIdToken();
    localStorage.setItem("token", token);
  }

  if (!token) {
    return null;
  }

  let res = await fetch("http://localhost:5000/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 && auth.currentUser) {
    const refreshedToken = await auth.currentUser.getIdToken(true);
    localStorage.setItem("token", refreshedToken);

    res = await fetch("http://localhost:5000/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshedToken}`,
      },
    });
  }

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data?.profile ?? null;
}

export function buildRecommendationUser(profile: any) {
  const income = Number(profile?.eligibility?.householdIncome ?? 0);

  return {
    personalInfo: {
      age: Number(profile?.personalInfo?.age ?? 25),
    },
    employmentDetails: {
      workplaceLocation: profile?.employmentDetails?.workplaceLocation ?? "",
      workplaceLat: Number(profile?.employmentDetails?.workplaceLat ?? 3.1319),
      workplaceLng: Number(profile?.employmentDetails?.workplaceLng ?? 101.6841),
    },
    propertyPreferences: {
      preferredState: profile?.propertyPreferences?.preferredState ?? "Kuala Lumpur",
      maxBudget: Number(profile?.propertyPreferences?.maxBudget ?? (income > 0 ? income * 90 : 500000)),
      commuteRange: profile?.propertyPreferences?.commuteRange ?? "10km",
      priorities: Array.isArray(profile?.propertyPreferences?.priorities)
        ? profile.propertyPreferences.priorities
        : ["Affordable Price", "Public Transport"],
    },
    eligibility: {
      householdIncome: income || 5000,
      householdSize: profile?.eligibility?.householdSize ?? "3",
      firstTimeHomebuyer: Boolean(
        profile?.eligibility?.firstTimeHomebuyer ?? profile?.eligibility?.isFirstTimeBuyer ?? true
      ),
    },
  };
}

export function getDisplayName(profile: any) {
  const fullName = profile?.personalInfo?.fullName || auth.currentUser?.displayName || "User";
  return String(fullName).split(" ")[0] || "User";
}
