import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { RegisterUser, reset } from "../features/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();

    // Memastikan password dan konfirmasi password cocok
    if (password !== confirmPassword) {
      // Menampilkan pesan kesalahan jika password tidak cocok
      dispatch(reset());
      dispatch(RegisterUser({})); // Mengirim aksi tanpa payload untuk mengatur pesan kesalahan
    } else {
      // Melanjutkan dengan pendaftaran jika password cocok
      dispatch(RegisterUser({ email, password }));
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body"  style={{ backgroundColor: '#01203F' }}>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={handleRegister} className="box"   style={{ backgroundColor: '#FFFFFF' }}>
                {isError && <p className="has-text-centered">{message}</p>}
                <h1 className="title is-2 has-text-centered">Buat Akun</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukan email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Konfirmasi Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Register"}
                  </button>
                </div>
                <p className="has-text-centered mt-3">
                Sudah memiliki akun?{" "}
                <Link to="/" className="has-text-link">
                Kembali ke Login
                </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
