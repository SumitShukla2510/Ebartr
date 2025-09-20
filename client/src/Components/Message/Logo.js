import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Logo({ name }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-blue-600 font-bold flex gap-2 p-4 items-center text-xl">
        <FontAwesomeIcon icon={faEnvelope} />
        INBOX
      </div>
      <div className="flex items-center hidden sm:flex">
        <div className="m-2 w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-7 h-7"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="mr-2 text-xl ">{name}</span>
      </div>
    </div>
  );
}
