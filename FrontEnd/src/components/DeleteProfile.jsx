import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const DeleteProfile = () => {
  const [userId, setUserId] = useState("");

  // !Decoding the token to get userID
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const dcodedToken = jwtDecode(token);
      setUserId(dcodedToken.userId);
    }
    console.log(userId);
  }, [userId]);

  // !Deleting the user
  useEffect(() => {
    const deleteUser = async () => {
      let data = await axios.delete(
        `http://localhost:5000/user/delete/${userId}`
      );
      if (!data) {
        alert("No");
      }
      console.log(data);
    };
    deleteUser();
  }, [userId]);
  // const navigate = useNavigate();

  return (
    <div>
      <Link></Link>
    </div>
  );
};

export default DeleteProfile;
