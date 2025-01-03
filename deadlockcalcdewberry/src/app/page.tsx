import React from 'react';
import CharacterList from './components/CharacterList';

const Home: React.FC = () => {
    return (
        <main>
            <h1> Hello Welcome to the Deadlock damage calculator! </h1>
            <h2> <a href="https://nicholasdewberry.me/"> Check my portfolio </a> </h2>
            <CharacterList />


        </main>
    );
};

export default Home;
