export default function CardsPage({
  children,
  detail,
}: {
  children: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      {children}
      {detail}
    </div>
  );
}
