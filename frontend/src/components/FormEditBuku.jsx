import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditBuku = () => {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [stok, setStok] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBukuById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bukus/${id}`);
        setJudul(response.data.judul);
        setPenulis(response.data.penulis);
        setPenerbit(response.data.penerbit);
        setTahunTerbit(response.data.tahunTerbit);
        setStok(response.data.stok.toString());
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getBukuById();
  }, [id]);

  const updateBuku = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/bukus/${id}`, {
        judul: judul,
        penulis: penulis,
        penerbit: penerbit,
        tahunTerbit: tahunTerbit,
        stok: parseInt(stok),
      });
      navigate("/bukus");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Buku</h1>
      <h2 className="subtitle">Update Buku</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateBuku}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Judul</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Judul"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Penulis</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={penulis}
                    onChange={(e) => setPenulis(e.target.value)}
                    placeholder="Penulis"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Penerbit</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={penerbit}
                    onChange={(e) => setPenerbit(e.target.value)}
                    placeholder="Penerbit"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tahun Terbit</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={tahunTerbit}
                    onChange={(e) => setTahunTerbit(e.target.value)}
                    placeholder="Tahun Terbit"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    placeholder="Stok"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
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

export default FormEditBuku;
