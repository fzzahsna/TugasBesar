import React /*, { useEffect }*/ from "react";
import Layout from "./Layout";
import FormEditBuku from "../components/FormEditBuku";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getMe } from "../features/authSlice";

const EditBuku = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { isError, user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/");
  //   }
  //   if (user && user.role !== "admin") {
  //     navigate("/dashboard");
  //   }
  // }, [isError, user, navigate]);
  return (
    <Layout>
      <FormEditBuku />
    </Layout>
  );
};

export default EditBuku;
