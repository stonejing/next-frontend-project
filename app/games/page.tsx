import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link href="/games/2048"> 2048 </Link>
    </div>
  );
}