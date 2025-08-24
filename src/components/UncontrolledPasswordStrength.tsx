export default function UncontrolledPasswordStrength({
  length,
}: {
  length: number | undefined;
}) {
  const getStrengthText = () => {
    switch (length) {
      case 1:
        return <span className="font-medium text-blue-600">Good password</span>;
      case 2:
        return (
          <span className="font-medium text-yellow-600">Medium strength</span>
        );
      case 3:
        return (
          <span className="font-medium text-orange-600">Weak password</span>
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
