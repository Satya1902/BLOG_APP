export function otpGenerator(length = 4) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    let temp = parseInt(Math.random() * 10);
    otp += temp;
  }
  return otp;
}

export const safeParseJSON = (data, fallback = null) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn("Failed to parse JSON:", e);
    return fallback;
  }
};
