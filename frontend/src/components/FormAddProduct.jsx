import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [idBuku, setIdBuku] = useState("");
  const [idAnggota, setIdAnggota] = useState("");
  const [tglPeminjaman, setTglPeminjaman] = useState(new Date());
  const [tglKembali, setTglKembali] = useState(new Date());
  const [petugas, setPetugas] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/peminjamans", {
        name: name,
        idBuku: idBuku,
        idAnggota: idAnggota,
        tglPeminjaman: tglPeminjaman,
        tglKembali: tglKembali,
        petugas: petugas,
      });
      navigate("/peminjamans");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Form Tambah Peminjaman buku</h1>
      <h2 className="subtitle">Masukan data peminjaman buku</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">No</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukan id peminjaman"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">id Buku</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={idBuku}
                    onChange={(e) => setIdBuku(e.target.value)}
                    placeholder="Masukan id buku"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">id anggota</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={idAnggota}
                    onChange={(e) => setIdAnggota(e.target.value)}
                    placeholder="Masukan id anggota"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Peminjaman</label>
                <div className="control">
                  <DatePicker
                    selected={tglPeminjaman}
                    onChange={(date) => setTglPeminjaman(date)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Kembali</label>
                <div className="control">
                  <DatePicker
                    selected={tglKembali}
                    onChange={(date) => setTglKembali(date)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Petugas</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={petugas}
                    onChange={(e) => setPetugas(e.target.value)}
                    placeholder="Masukan nama petugas"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
