import { Link } from "react-router-dom";


const menus = {
  seller: [
    { label: "Dashboard", path: "/seller/dashboard" },
    { label: "My Gigs", path: "/seller/gigs" },
    { label: "Earnings", path: "/seller/earnings" },
  ],
  buyer: [
    { label: "Dashboard", path: "/buyer/dashboard" },
    { label: "My Orders", path: "/buyer/orders" },
    { label: "Saved Services", path: "/buyer/saved" },
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Users", path: "/admin/users" },
    { label: "Manage Gigs", path: "/admin/gigs" },
  ],
};

export default function Sidebar() {
  const role = localStorage.getItem("role") || "seller"; // TEMP — you can change this manually for now
  const links = menus[role] || [];

  return (
    <div className="w-64 h-full bg-white border-r p-5">
      <h2 className="text-xl font-bold mb-6">justERPs</h2>
      <ul className="space-y-3">
        {links.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
