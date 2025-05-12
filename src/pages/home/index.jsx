import "./style.css";
import Trash from "../../assets/trash-blank.svg";
import Edit from "../../assets/pencil-edit.svg";
import { use } from "react";

function Home() {
  const users = [
    { id: 1, name: "Lucas", age: 20, email: "lucas@mail.com" },
    { id: 2, name: "Ana", age: 25, email: "ana  @mail.com" },
    { id: 3, name: "João", age: 30, email: "joao@mail.com" },
    { id: 4, name: "Maria", age: 22, email: "maria@mail.com" },
  ];

  return (
    <div>
      <div>
        <form>
          <h1>Cadastro de Usuários</h1>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Idade:</label>
            <input type="number" id="number" name="number" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="button">Cadastrar</button>
        </form>
      </div>

      {users.map((user) => (
        <div key={user.id} className="user-card">
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
          <div>
            <button>
              <img src={Trash} />
            </button>
            <button>
              <img src={Edit} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
