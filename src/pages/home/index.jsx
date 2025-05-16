import "./style.css";
import { useEffect, useState, useRef } from "react";
import Trash from "../../assets/trash-blank.svg";
import Edit from "../../assets/pencil-edit.svg";
import api from "../../services/api.js";

function Home() {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
  });

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  const inputEditName = useRef();
  const inputEditAge = useRef();
  const inputEditEmail = useRef();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (isEditModalOpen && userToEdit) {
      inputEditName.current.value = userToEdit.name;
      inputEditAge.current.value = userToEdit.age;
      inputEditEmail.current.value = userToEdit.email;
    }
    if (!isEditModalOpen) {
      inputEditName.current = "";
      inputEditAge.current = "";
      inputEditEmail.current = "";
    }
  }, [isEditModalOpen, userToEdit]);

  function openEditModal(user) {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  }

  async function updateUser() {
    try {
      if (!userToEdit) {
        console.log("Erro: userToEdit está indefinido");
        return;
      }

      const updatedUser = {
        name: inputEditName.current.value,
        email: inputEditEmail.current.value,
        age: inputEditAge.current.value,
      };
      console.log(userToEdit);

      await api.put(`/users/${userToEdit.id}`, updatedUser);
      await getUsers();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao editar usuário:", error.response.data.message);
    }
  }

  async function getUsers() {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function createUser() {
    try {
      const newUser = {
        name: inputName.current.value,
        email: inputEmail.current.value,
        age: inputAge.current.value,
      };

      await api.post("/users", newUser);
      await getUsers();

      inputName.current.value = "";
      inputEmail.current.value = "";
      inputAge.current.value = "";
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  async function deleteUser(id) {
    try {
      await api.delete(`/users/${id}`);
      await getUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  return (
    <div>
      <div className={isEditModalOpen ? "blur-background" : ""}>
        <div className="form-container">
          <form>
            <div className="title">
              <h1>Cadastro de Usuários</h1>
            </div>
            <div className="form-container-body">
              <div className="form-inputs">
                <div className="form-inputs-group">
                  <label htmlFor="name">Nome:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    ref={inputName}
                  />
                </div>
                <div className="form-inputs-group">
                  <label htmlFor="age">Idade:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    required
                    ref={inputAge}
                  />
                </div>
                <div className="form-inputs-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    ref={inputEmail}
                  />
                </div>
              </div>
              <button
                type="button"
                className="form-container-body-button"
                onClick={createUser}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
        {!isEditModalOpen && (
          <>
            <h3>Usuários</h3>
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-card-info">
                  <p>Nome: {user.name}</p>
                  <p>Idade: {user.age}</p>
                  <p>Email: {user.email}</p>
                </div>
                <div>
                  <button onClick={() => deleteUser(user.id)}>
                    <img className="icon" src={Trash} alt="Excluir" />
                  </button>
                  <button onClick={() => openEditModal(user)}>
                    <img className="icon" src={Edit} alt="Editar" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {isEditModalOpen && userToEdit && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Usuário</h2>
            <form>...</form>
          </div>
        </div>
      )}
      {isEditModalOpen && userToEdit && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Usuário</h2>
            <form>
              <div className="form-inputs">
                <div className="form-inputs-group">
                  <label htmlFor="editName">Nome:</label>
                  <input
                    type="text"
                    id="editName"
                    name="editName"
                    required
                    ref={inputEditName}
                  />
                </div>
                <div className="form-inputs-group">
                  <label htmlFor="editAge">Idade:</label>
                  <input
                    type="number"
                    id="editAge"
                    name="editAge"
                    required
                    ref={inputEditAge}
                  />
                </div>
                <div className="form-inputs-group">
                  <label htmlFor="editEmail">Email:</label>
                  <input
                    type="email"
                    id="editEmail"
                    name="editEmail"
                    required
                    ref={inputEditEmail}
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </button>
                <button type="button" onClick={updateUser}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
