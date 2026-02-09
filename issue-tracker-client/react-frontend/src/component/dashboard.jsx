import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    alert("Log Out Successfully")
    navigate('/login');
  }

  return (

    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">DashBoard</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink to="/user-list">User List</NavLink>
                <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={logOut}>Log Out</a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>

  )
}

export default Dashboard;