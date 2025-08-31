import { Link } from "react-router";

const FooterSection = ({ title, links }) => (
  <div>
    <p className="font-medium text-gray-900">{title}</p>
    <ul className="mt-6 space-y-2 text-sm">
      {links.map(({ label, to, isInternal }, idx) => (
        <li key={idx}>
          {isInternal ? (
            <Link
              to={to}
              className="text-gray-700 transition hover:opacity-75"
            >
              {label}
            </Link>
          ) : (
            <a href={to} className="text-gray-700 transition hover:opacity-75">
              {label}
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default FooterSection