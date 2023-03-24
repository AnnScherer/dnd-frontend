import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Header = () => {
  const navigate = useNavigate();
  const [checkStatus, setChange] = useState(false);
  const [show, setShow] = useState(false);
  const {
    isLoggedIn,
    setIsLoggedIn,
    spell,
    setSearchSpell,
    searchSpell,
    setFilteredSpells,
    setInhaltsverzeichnis,
  } = useContext(userContext);

  const handleSth = (e) => {
    setChange(!checkStatus);
    if (e.target.value === 0) {
      setShow(false);
    } else setShow(!show);
  };

  const logout = async (e) => {
    setIsLoggedIn(false);
    setChange(!checkStatus);
    const response = await axios.get(
      "http://localhost:3001/user/delete-cookie",
      { withCredentials: true }
    );
    if (response) {
      return navigate("/");
    }
    if (e.target.value === 0) {
      setShow(false);
    } else setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const spellFilter = spell.filter((spell) => {
      return spell.name.includes(searchSpell);
    });
    setFilteredSpells(spellFilter);
    setInhaltsverzeichnis([]);
  };
  const changeValue = (e) => setSearchSpell(e.target.value);

  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input checked={show} onClick={handleSth} readOnly type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <NavLink to="/">
            <li onClick={handleSth}>Home</li>
          </NavLink>
          {!isLoggedIn ? (
            <>
              <NavLink to="/login">
                <li onClick={handleSth}>Login</li>
              </NavLink>
              <NavLink to="/register">
                <li onClick={handleSth}>Register</li>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/myspells">
                <li onClick={handleSth}>Meine Zauber</li>
              </NavLink>
              <NavLink>
                <li onClick={logout}>Logout</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-desktop">
        <ul>
          <NavLink to="/">
            <li onClick={handleSth}>Home</li>
          </NavLink>
          {!isLoggedIn ? (
            <>
              <NavLink to="/login">
                <li onClick={handleSth}>Login</li>
              </NavLink>
              <NavLink to="/register">
                <li onClick={handleSth}>Register</li>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/myspells">
                <li onClick={handleSth}>Meine Zauber</li>
              </NavLink>
              <NavLink>
                <li onClick={logout}>Logout</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <form>
        <input
          onChange={changeValue}
          type="text"
          placeholder="Suchen"
          list="Zauber"
        />
        <datalist id="Zauber">
          {spell.map((spell) => {
            return <option key={spell.name} value={spell.name} />;
          })}
        </datalist>
        <button type="submit" onClick={handleSubmit}>
          Senden
        </button>
      </form>
    </nav>
  );
};

export default Header;
