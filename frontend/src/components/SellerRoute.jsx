import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchMe } from "../services/api";

function SellerRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const checkSeller = async () => {
      const user = await fetchMe();

      if (user?.role === "SELLER" || user?.role === "ADMIN") {
        setIsSeller(true);
      }

      setLoading(false);
    };

    checkSeller();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isSeller) {
    return <Navigate to="/profile" />;
  }

  return children;
}

export default SellerRoute;
