import axios from "axios";
import { useEffect, useState } from "react";

const MeineZauber = () => {
  const [mySpell, setMySpell] = useState([]);


  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get("http://localhost:3001/user/user-spells", { withCredentials: true })
      .then((response) => setMySpell(response.data.spells))
      .catch((err) => console.log(err));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const handleDeleteSpell = (egal) => {
    axios
      .delete("https://dnd-spells-backend.vercel.app/user/delete-spell", {
        headers: { spell: JSON.stringify(egal) },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        axios
          .get("https://dnd-spells-backend.vercel.app/user-spells", {
            withCredentials: true,
          })
          .then((response) => {
            setMySpell((pref) => response.data.spells);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="meine-zauber">
      <h2 className="meine-zauber-header">Meine Zauber</h2>
      <p className="anzahl-zauber">Anzahl: {mySpell.length}</p>
      <div className="alle-zauber">
        {mySpell.map((spell) => {
          return (
            <div className="zauber" key={spell._id}>
              <h3 id={spell.name}>{spell.name}</h3>
              {spell.grad>0?(<p>
                {spell.schule} des {spell.grad}. grades
              </p>): (<p>Zaubertrick der {spell.schule}</p>)}
              <p>
                Zeitaufwand: {spell.zeitaufwand} <br />
                Reichweite: {spell.reichweite} <br />
                Koponenten: {spell.komponenten} <br />
                Wirkungsdauer: {spell.wirkungsdauer}
              </p>
              <div>
                {spell.text.map((info, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: info }}></p>
                ))}
              </div>
              <button onClick={() => handleDeleteSpell(spell)}>Löschen</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeineZauber;
