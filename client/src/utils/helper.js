export function style(isActive) {
  return (
    (isActive ? "bg-primary text-white" : "bg-gray-200") +
    " flex items-center gap-1 py-1 px-2 md:px-6 md:py-2 rounded-full text-sm md:text-base"
  );
}

export const validateCheckTime = (value) => {
  const timeValue = parseInt(value);
  if (isNaN(timeValue) || timeValue < 0 || timeValue > 23) {
    return "Please enter a valid hour (0-23)";
  }
  return true;
};
