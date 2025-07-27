import { useLoaderData } from 'react-router';

export default function DetailCard() {
  const data = useLoaderData();
  console.log(data);
  return <p>Detail {data.id}</p>;
}
