import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './HeroesPage.css';
function Detail(props) {
    const [detailItem, setDetailItem] = useState({ id: '', name: '' });
    useEffect(() => {
        setDetailItem(props.selectedItem);
    }, [props]);
    function setName(event) {
        const newItem = {
            id: detailItem.id,
            name: event.target.value
        };
        props.onChangeName(newItem);
    }
    return (
        <div>
            <span> ID:
                {detailItem.id}
            </span> <br />
            Hero name: <input value={detailItem.name} onChange={setName}></input>
        </div>
    )
}
const HeroesPage = () => {
    const [selectedItem, setSelectedItem] = useState({});
    const [hero, setheroes] = useState([]);

    useEffect(() => {

        axios({
            method: 'GET',
            url: "https://60dff0ba6b689e001788c858.mockapi.io/heroes",
        }).then(response => {
            console.log('response = ', response);
            setheroes(response.data);
        });
    }, []);
    function selectItem(item) {
        setSelectedItem(item);
    }
    function changeName(item) {
        const changeItem = hero.find(({ id }) => id === item.id);
        if (!changeItem) return;
        changeItem.name = item.name;

        setheroes([...hero]);
    }
    function Imessage(item) {
        if (setSelectedItem(item))
            return <div>You have choose {hero.name}</div>

    }
    return (
        <div className="heroes-page">
            <h2>Heroes</h2>
            {hero.map((hero) => (
                <ul key={hero.id} class="heroes" onClick={() => selectItem(hero)} onBlur={() => Imessage(hero)}>
                    <li>
                        <span class="badge">{hero.id}</span> {hero.name}
                    </li>
                </ul>
            ))}
            <h3>Details Hero</h3>
            <Detail selectedItem={selectedItem} onChangeName={(item) => { changeName(item) }}></Detail>
        </div>
    );
};
export default HeroesPage;