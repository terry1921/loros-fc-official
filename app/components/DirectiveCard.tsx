import React from 'react';
import Image from 'next/image';

interface DirectiveCardProps {
  name: string;
  role: string;
  photoUrl: string;
}

export const DirectiveCard: React.FC<DirectiveCardProps> = ({ name, role, photoUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <Image
        src={photoUrl}
        alt={name}
        width={128}
        height={128}
        className="rounded-full mx-auto mb-4 object-cover border-4 border-emerald-500"
      />
      <h3 className="text-xl font-bold text-emerald-900">{name}</h3>
      <p className="text-gray-600 font-semibold text-sm">{role}</p>
    </div>
  );
};
