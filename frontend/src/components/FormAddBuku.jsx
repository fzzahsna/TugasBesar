import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddBuku = () => {
  const [id, setId] = useState("");
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [kategori, setKategori] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [stok, setStok] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const kategoriOptions = ["Fiksi", "Non-Fiksi", "Sains", "Sejarah", "Komputer", "Matematika", "Lainnya"];

  const saveBuku = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/bukus", {
        id: id,
        judul: judul,
        penulis: penulis,
        penerbit: penerbit,
        kategori: kategori,
        tahunTerbit: tahunTerbit,
        stok: stok,
      });
      navigate("/buku");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Form Tambah Data Buku</h1>
      <h2 className="subtitle">Masukkan data buku yang ingin ditambah</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveBuku}>
              <p className="has-text-centered">{msg}</p>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Id Buku</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Masukkan id Buku"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Judul</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        placeholder="Masukkan Judul Buku"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Penulis</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={penulis}
                        onChange={(e) => setPenulis(e.target.value)}
                        placeholder="Masukkan Nama Penulis"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Penerbit</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={penerbit}
                        onChange={(e) => setPenerbit(e.target.value)}
                        placeholder="Masukkan Nama Penerbit"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Kategori</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          value={kategori}
                          onChange={(e) => setKategori(e.target.value)}
                        >
                          <option value="" disabled>
                            Pilih Kategori
                          </option>
                          {kategoriOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ... field lainnya ... */}

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Tahun Terbit</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={tahunTerbit}
                        onChange={(e) => setTahunTerbit(e.target.value)}
                        placeholder="Masukkan Tahun terbit"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Stok Buku</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={stok}
                        onChange={(e) => setStok(e.target.value)}
                        placeholder="Masukkan jumlah stok"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label"></div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <button type="submit" className="button is-success">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddBuku;
