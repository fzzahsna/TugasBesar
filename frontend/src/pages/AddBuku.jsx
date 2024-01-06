import React, { /*useEffect*/ } from "react";
import Layout from "./Layout";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getMe } from "../features/authSlice";
import FormAddBuku from "../components/FormAddBuku";

const AddBuku = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { isError } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const fetchMe = async () => {
  //     await dispatch(getMe());
  //   };

  //   fetchMe();
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/"); // or navigate to an error page if available
  //   }
  // }, [isError, navigate]);

  return (
    <Layout>
      <FormAddBuku />
    </Layout>
  );
};

export default AddBuku;
