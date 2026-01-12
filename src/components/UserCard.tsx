
const UserCard = ({ user }: any) => {
  if (!user) return null;
  const { firstName, lastName, gender, age, photoUrl, about} = user;

  return (
    <div className="card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-shadow">
      <figure className="relative h-96">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-6">
          <h2 className="card-title text-white text-3xl">
            {firstName + " " + lastName} 
          </h2>
          <div className="flex gap-2 text-gray-300 text-sm mb-2">
           {age && <span className="badge badge-primary">{age} years</span> }
            {gender && <span className="badge badge-secondary">{gender}</span> }
          </div>
          <p className="text-gray-200">{about}</p>
        </div>
      </figure>
      
      <div className="card-actions justify-center gap-4 p-6">
        <button className="btn btn-circle btn-lg btn-outline">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <button className="btn btn-circle btn-lg btn-primary">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserCard