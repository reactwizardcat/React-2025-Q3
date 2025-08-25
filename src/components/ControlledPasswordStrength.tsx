export default function ControlledPasswordStrength({
  data,
}: {
  data: string | undefined;
}) {
  if (!data) return null;

  const hasNumber = /\d/.test(data);
  const hasUppercase = /[A-Z]/.test(data);
  const hasLowercase = /[a-z]/.test(data);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data);

  const conditionsMet = [
    hasNumber,
    hasUppercase,
    hasLowercase,
    hasSpecialChar,
  ].filter(Boolean).length;

  const getStrengthText = () => {
    switch (conditionsMet) {
      case 0:
        return (
          <span className="font-medium text-red-600">Very weak password</span>
        );
      case 1:
        return (
          <span className="font-medium text-orange-600">Weak password</span>
        );
      case 2:
        return (
          <span className="font-medium text-yellow-600">Medium strength</span>
        );
      case 3:
        return <span className="font-medium text-blue-600">Good password</span>;
      case 4:
        return (
          <span className="font-medium text-green-600">Strong password!</span>
        );
      default:
        return (
          <span className="font-medium text-green-600">Strong password!</span>
        );
    }
  };

  return (
    <div className="mt-1 transition-opacity duration-200 peer-not-placeholder-shown:visible peer-not-placeholder-shown:opacity-100 peer-placeholder-shown:invisible peer-placeholder-shown:opacity-0">
      <p className="text-sm text-gray-600">Strength: {getStrengthText()}</p>
    </div>
  );
}
