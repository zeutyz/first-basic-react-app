import "./style.css";
import Trash from "../../assets/trash-blank.svg";
import Edit from "../../assets/pencil-edit.svg";

function Home() {
  const users = [
    { id: 1, name: "Lucas", age: 20, email: "lucas@mail.com" },
    { id: 2, name: "Ana", age: 25, email: "ana@mail.com" },
    { id: 3, name: "João", age: 30, email: "joao@mail.com" },
    { id: 4, name: "Maria", age: 22, email: "maria@mail.com" },
  ];

  return (
    <div>
      <div className="form-container">
        <form>
          <div className="title">
            <h1>Cadastro de Usuários</h1>
          </div>
          <div className="form-container-body">
            <div className="form-inputs">
              <div className="form-inputs-group">
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-inputs-group">
                <label htmlFor="age">Idade:</label>
                <input type="number" id="age" name="age" required />
              </div>
              <div className="form-inputs-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
            </div>
            <button type="button" className="form-container-body-button">
              Cadastrar
            </button>
          </div>
        </form>
      </div>

      {users.map((user) => (
        <div key={user.id} className="user-card">
          <div className="user-card-info">
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
          <div>
            <button>
              <img className="icon" src={Trash} alt="Excluir" />
            </button>
            <button>
              <img className="icon" src={Edit} alt="Editar" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
