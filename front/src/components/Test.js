import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    //db 데이터
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/test');
            setEntities(response.data);
        } catch (error) {
            console.error('데이터 불러오기 에러:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('전송할 데이터:', { id, name });
        try {
            const response = await axios.post('http://localhost:4000/api/test', {
                id: id,
                name: name,
            });
            console.log('데이터 전달 성공: ', response.data);
            fetchData();
        } catch (error) {
            console.error('데이터 전달 에러:', error);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                아이디: <input type="text" value={id} onChange={(e) => setId(e.target.value)}></input>
                이름:<input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                <button type="submit">전송</button>
            </form>

            <div>
                <h2>TestEntity DB</h2>
                <ul>
                    {entities.map((entity) => (
                        <li key={entity.id}>
                            아이디: {entity.id} / 이름: {entity.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Test;