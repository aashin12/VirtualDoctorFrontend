import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//register
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/users/register`,reqBody)
}

//login api
export const LoginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/users/login`,reqBody)
}

//Google login api
export const googleLoginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/users/google-login`,reqBody)
}

//save prescription
export const savePrescriptionApi = async (reqBody, token) => {
  return await commonApi("POST",`${serverUrl}/prescriptions`,
    reqBody,
    {
      Authorization: `Bearer ${token}`
    }
  );
};

//medicine suggestion
export const medicineSuggestionApi = async (query) => {
  const res = await fetch(`${serverUrl}/medicines/search?name=${query}`);
  if (!res.ok) {
    throw new Error("Failed to fetch medicine suggestions");
  }
  return await res.json();
};

//print preview
export const printPrescriptionApi = async(prescriptionId) =>{
    return await commonApi("GET",`${serverUrl}/prescriptions/${prescriptionId}`);
}

// get all prescriptions
export const getAllPrescriptionsApi = async (token) => {
  return await commonApi(
    "GET",
    `${serverUrl}/prescriptions`,
    null,
    {
      Authorization: `Bearer ${token}`
    }
  );
};
